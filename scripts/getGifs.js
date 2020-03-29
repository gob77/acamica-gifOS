const api_key = "api_key=wi0q59XfKI285mmhSNvmSSBSBdNi8NSo";
const trends = "http://api.giphy.com/v1/gifs/trending?limit=20&";
const search = "http://api.giphy.com/v1/gifs/search?limit=16&";
const btn = document.getElementById("search-btn");

function callFetch() {
    async function getGifs(url) {
        let data = await fetch(url);
        let parsed = await data.json();
        printData(parsed);
    }

    getGifs(`${trends}${api_key}`);
}

function printData(data) {
    let dataArray = [...data.data];
    let trend_container = document.getElementById("trends-container");
    let suggest_container = document.getElementById("suggested-container");

    dataArray.forEach((index, currentValue) => {
        if (currentValue < 4) {
            let template = document.getElementById("template");
            let clone = document.importNode(template.content, true);

            clone.querySelector(".main-img").src = index.images.fixed_height.url;
            clone.querySelector(".main-title").textContent = `#${index.title}`;
            suggest_container.appendChild(clone);
        } else {
            let template = document.getElementById("trend-template");
            let clone = document.importNode(template.content, true);

            clone.querySelector(".trend-img").src = index.images.fixed_height.url;
            clone.querySelector(".trend-title").textContent = `#${index.title}`;
            trend_container.appendChild(clone);
        }
    });
}

btn.addEventListener("click", () => {
    getGifs.search();
});
