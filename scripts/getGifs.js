(function callFetch() {
    async function getGifs() {
        let data = await fetch(`${trends}${api_key}`);
        let parsed = await data.json();
        printData(parsed);
    }

    getGifs();
})();

const btn = document.getElementById("btnNew");

btn.addEventListener("click", () => {
    location.replace("misGuifos.html");
});

function printData(data) {
    let dataArray = [...data.data];
    let trend_container = document.getElementById("trends-container");
    let suggest_container = document.getElementById("suggested-container");

    dataArray.forEach((index, currentValue) => {
        let title = index.title.split(" ");
        let splice = title.splice(title.indexOf("GIF"), title.length);

        if (currentValue < 4) {
            let template = document.getElementById("template");
            let clone = document.importNode(template.content, true);

            clone.querySelector(".main-img").src = index.images.fixed_height.url;
            clone.querySelector(".main-title").textContent = `#${title.join("")}`;
            suggest_container.appendChild(clone);
        } else {
            let template = document.getElementById("trend-template");
            let clone = document.importNode(template.content, true);

            clone.querySelector(".trend-img").src = index.images.fixed_height.url;
            clone.querySelector(".trend-title").textContent = `#${title.join(" #").toLowerCase()}`;
            trend_container.appendChild(clone);
        }
    });
}
