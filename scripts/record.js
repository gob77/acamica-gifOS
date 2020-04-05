document.addEventListener("DOMContentLoaded", async () => {
    let capture = document.getElementById("capture_container");
    let stop = document.getElementById("stop");
    let video = document.querySelector("video");
    let timer = document.getElementById("timer");
    let startContainer = document.getElementById("cardFooter");
    let mainCard = document.getElementById("mainCard");
    let preview = document.getElementById("preview");
    let stopContainer = document.getElementById("stop_container");

    startContainer.addEventListener("click", (event) => {
        let target = event.target;

        if (target.id === "start") {
            mainCard.style.display = "none";
            preview.style.display = "flex";
            getVideo();
        } else if (target.id === "cancel") {
            mainCard.style.display = "none";
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

                        printCapturedGif(url);
                    });
                });
            });
    }

    function getTimer() {
        let counter = 0;

        let interval = window.setInterval(() => {
            counter++;
            let getMinutes = Math.floor(counter / 60);
            let seconds = counter % 60;
            let fomartSecs = seconds < 10 ? `0${seconds}` : seconds;
            timer.textContent = `00:00:0${getMinutes}:${fomartSecs}`;
        }, 1000);

        stop.addEventListener("click", function () {
            clearInterval(interval);
            timer.textContent = "00:00:00:00";
        });
    }

    function printCapturedGif(url) {
        let container = document.getElementById("guifosContainer");

        let img = document.createElement("img");
        img.src = url;

        container.appendChild(img);
    }

    getVideo();
});
