(function checkThemes() {
    let theme = localStorage.getItem("theme");
    let html = document.documentElement;
    html.setAttribute("data-theme", theme);
})();

document.addEventListener("DOMContentLoaded", async () => {
    const capture = document.getElementById("capture_container");
    const stop = document.getElementById("stop");
    const video = document.querySelector("video");
    const timer = document.getElementById("timer");
    const startContainer = document.getElementById("cardFooter");
    const mainCard = document.getElementById("mainCard");
    const preview = document.getElementById("preview");
    const stopContainer = document.getElementById("stop_container");
    const previewTitle = document.getElementById("preview_title");
    const uploadContainer = document.getElementById("upload_container");
    const repeatBTN = document.getElementById("repeat");
    const uploadBTN = document.getElementById("upload");
    const previewGif = document.getElementById("preview_gif");
    const api_key = "api_key=wi0q59XfKI285mmhSNvmSSBSBdNi8NSo";
    let capturedGif;
    let recorder;
    let streamTest;
    let gifURL;

    startContainer.addEventListener("click", (event) => {
        let target = event.target;

        if (target.id === "start") {
            setStyles();
        } else if (target.id === "cancel") {
            mainCard.style.display = "none";
        }
    });

    function setStyles() {
        mainCard.style.display = "none";
        uploadContainer.style.display = "none";
        previewGif.src = "#";
        preview.style.display = "flex";
        capture.style.display = "flex";
        video.style.display = "flex";
        previewTitle.textContent = "Capturando Tu Guifo";
        getVideo();
    }

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
                video.srcObject = stream;
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
        capture.style.display = "none";
        stopContainer.style.display = "flex";
        getTimer();
        recorder.record();
    });

    stop.addEventListener("click", async () => {
        streamTest.stop();
        alert("stoped recording");
        await recorder.stop((blob) => {
            gifURL = URL.createObjectURL(blob);

            video.style.display = "none";

            previewGif.src = gifURL;

            stopContainer.style.display = "none";
            uploadContainer.style.display = "flex";

            capturedGif = new FormData();

            capturedGif.append("file", blob, "myGif.gif");

            recorder.clearRecordedData();
        });
    });

    repeatBTN.addEventListener("click", setStyles);

    uploadBTN.addEventListener("click", async () => {
        /* console.log(capturedGif.get("file")); */

        printCapturedGif();

        let options = {
            method: "POST",
            body: capturedGif,
        };

        let endPoint = `https://upload.giphy.com/v1/gifs?${api_key}`;

        let upload = await fetch(endPoint, options);
        let resp = await upload.json();

        console.log(resp);
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

        stop.addEventListener("click", function () {
            clearInterval(interval);
        });
    }

    function printCapturedGif(url) {
        let container = document.getElementById("guifosContainer");

        let img = document.createElement("img");
        img.src = gifURL;

        container.appendChild(img);
    }
});
