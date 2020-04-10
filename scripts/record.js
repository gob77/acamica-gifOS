(async function checkThemes() {
    let theme = localStorage.getItem("theme");
    let html = document.documentElement;
    html.setAttribute("data-theme", theme);
})();

document.addEventListener("DOMContentLoaded", async () => {
    /* buttons */

    const start = document.getElementById("start");
    const cancel = document.getElementById("cancel");
    const capture = document.getElementById("capture");
    const finish = document.getElementById("finish");
    const upload = document.getElementById("upload");
    const repeat = document.getElementById("repeat");
    const cancelUpload = document.getElementById("cancelUpload");
    const donde = document.getElementById("done");

    /* containers */

    const createCard = document.getElementById("create_card");
    const previewCard = document.getElementById("preview_card");
    const recordCard = document.getElementById("record_card");
    const uploadCard = document.getElementById("upload_card");
    const uploadingCard = document.getElementById("uploading_card");
    const successCard = document.getElementById("success_card");
    const container = document.getElementById("guifosContainer");

    /* video and images */

    const previewVideo = document.getElementById("preview_video");
    const recordVideo = document.getElementById("record_video");
    const uploadGif = document.getElementById("upload_gif");
    const successGif = document.getElementById("success_gif");

    /* variables globales  */

    let capturedGif;
    let recorder;
    let streamTest;
    let gifURL;

    getMisGuifos();

    start.addEventListener("click", () => {
        getVideo();
        createCard.style.display = "none";
        previewCard.style.display = "flex";
    });

    function getVideo() {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    max: 720,
                    min: 480,
                },
            })
            .then((stream) => {
                streamTest = stream;
                previewVideo.srcObject = stream;
                recordVideo.srcObject = stream;
                recorder = new GifRecorder(stream, {
                    type: "gif",
                    width: 720,
                    height: 480,
                    frameRate: 120,
                    quality: 30,
                });
            });
    }

    capture.addEventListener("click", (time) => {
        previewCard.style.display = "none";
        recordCard.style.display = "flex";
        getTimer();
        recorder.record();
    });

    finish.addEventListener("click", async () => {
        streamTest.stop();
        uploadCard.style.display = "flex";
        await recorder.stop((blob) => {
            gifURL = URL.createObjectURL(blob);

            capturedGif = new FormData();

            capturedGif.append("file", blob, "myGif.gif");
        });
    });

    repeat.addEventListener("click", () => {
        previewCard.style.display = "flex";
        getVideo();
    });

    upload.addEventListener("click", async () => {
        uploadCard.style.display = "none";
        uploadingCard.style.display = "flex";

        let options = {
            method: "POST",
            body: capturedGif,
        };

        let endPoint = `https://upload.giphy.com/v1/gifs?${api_key}`;

        let upload = await fetch(endPoint, options);
        let resp = await upload.json();

        if (resp.meta.status === 200) {
            uploadingCard.style.display = "none";
            successGif.src = gifURL;
            successCard.style.display = "flex";
            localStorage.setItem(`gif ${resp.data.id}`, resp.data.id);
            getMisGuifos();
        }
    });

    function getTimer() {
        let counter = 0;

        let interval = window.setInterval(() => {
            timer.textContent = "00:00:00:00";
            counter++;
            let getMinutes = Math.floor(counter / 60);
            let seconds = counter % 60;
            let fomartSecs = seconds < 10 ? `0${seconds}` : seconds;
            timer.textContent = `00:00:0${getMinutes}:${fomartSecs}`;
        }, 1000);

        finish.addEventListener("click", function () {
            recordCard.style.display = "none";
            uploadGif.src = gifURL;
            clearInterval(interval);
        });
    }

    function printCapturedGif(url) {
        let img = document.createElement("img");
        img.setAttribute("class", "capturedGif_container");
        img.src = url;

        container.appendChild(img);
    }

    donde.addEventListener("click", () => {
        successCard.style.display = "none";
        createCard.style.display = "flex";
    });

    async function getMisGuifos() {
        let length = localStorage.length;

        for (let i = 0; i < length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(localStorage.key(i));
            let gif = document.getElementById("capturedGif_container");

            if (key.includes("gif")) {
                let data = await fetch(`http://api.giphy.com/v1/gifs/${value}?${api_key}`);
                let resp = await data.json();
                console.log(gif);

                if (container.childNodes > 0) {
                    gif[i].remove();
                }

                console.log(resp.data.images.fixed_height.url);
                printCapturedGif(resp.data.images.fixed_height.url);
            } else {
                console.log("not a gif");
            }
        }
    }
});
