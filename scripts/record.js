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
    const api_key = "api_key=wi0q59XfKI285mmhSNvmSSBSBdNi8NSo";
    let capturedGif;

    startContainer.addEventListener("click", (event) => {
        let target = event.target;

        if (target.id === "start") {
            setStyles();
            getVideo();
        } else if (target.id === "cancel") {
            mainCard.style.display = "none";
        }

        function setStyles() {
            mainCard.style.display = "none";
            preview.style.display = "flex";
            capture.style.display = "flex";
            previewTitle.textContent = "Capturando Tu Guifo";
        }
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
                video.srcObject = stream;
                let recorder = new GifRecorder(stream, {
                    type: "gif",
                    width: 1280,
                    height: 720,
                    frameRate: 500,
                    quality: 50,
                });

                capture.addEventListener("click", (time) => {
                    capture.style.display = "none";
                    stopContainer.style.display = "flex";
                    getTimer();
                    recorder.record();
                });

                stop.addEventListener("click", async () => {
                    alert("stoped recording");
                    await recorder.stop((blob) => {
                        let url = URL.createObjectURL(blob);
                        stopContainer.style.display = "none";
                        uploadContainer.style.display = "flex";

                        capturedGif = blob;
                        printCapturedGif(url);
                    });
                });
            });
    }

    repeatBTN.addEventListener("click", getVideo);

    uploadBTN.addEventListener("click", async () => {
        console.log(capturedGif);

        let data = new FormData();

        data.append("file", capturedGif);

        const options = {
            method: "POST",
            body: data.file,
        };

        let endPoint = `https://upload.giphy.com/v1/gifs?${api_key}`;

        let upload = await fetch(endPoint, options);
        let response = await upload.json();
        console.log(response);
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
        img.src = url;

        container.appendChild(img);
    }
});

/* fetch("https://upload.giphy.com/v1/gifs" + "?api_key=" + "znXEZG58twcEoPcbw5gG4a7F9I990uaL", {
    method: "POST",
    body: form,
})
    .then((res) => {
        console.log(res.status);
        if (res.status != 200) {
            // Mostrar que hubo un error subiendo tu Guifo
        }
        return res.json();
    })
    .then((data) => {
        var dataId = data.data.id;
        fetch("http://api.giphy.com/v1/gifs/" + dataId + "?&api_key=" + "znXEZG58twcEoPcbw5gG4a7F9I990uaL");
        then((res) => {
            console.log(res.status);
            if (res.status != 200) {
                // Mostrar que hubo un error subiendo tu Guifo
            }
            return res.json();
        }).catch((error) => {
            // Mostrar que hubo un error subiendo tu Guifo
            console.error("Error:", error);
        });
        console.log(form.get("file"));
    });
 */
