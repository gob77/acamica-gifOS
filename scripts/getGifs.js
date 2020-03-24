const api_key = "api_key=wi0q59XfKI285mmhSNvmSSBSBdNi8NSo";
const random = "http://api.giphy.com/v1/gifs/random?";
const trends = "http://api.giphy.com/v1/gifs/trending?limit=16&";
const search = "http://api.giphy.com/v1/gifs/search?limit=16&";
const btn = document.getElementById("search-btn");
const query = document.getElementById("search");

const getGifs = {
    fetch: async function(url) {
        let getData = await fetch(url);
        let data = await getData.json();

        return data;
    },

    randoms: async function(n) {
        let getRandoms = await this.fetch(`${random}${api_key}`);
        showData("random", getRandoms, n);
    },

    trends: async function() {
        let getTrend = await this.fetch(`${trends}${api_key}`);
        showData("trend", getTrend);
    },

    search: async function() {
        let getSearch = await this.fetch(`${search}${api_key}&q=${query.value}`);
        showData("search", getSearch);
    }
};

function showData(caller, data) {
    let random_container = document.getElementById("suggested-container");
    let trend_container = document.getElementById("trends-container");
    let results_container = document.getElementById("results-container");
    let heading = document.getElementById("results-heading");

    if (caller === "random") {
        let template = document.getElementById("template");
        let clone = document.importNode(template.content, true);

        clone.querySelector(".main-img").src = data.data.images.fixed_height.url;
        clone.querySelector(".main-title").textContent = `#${data.data.title}`;
        random_container.appendChild(clone);
    } else if (caller === "trend") {
        data.data.forEach(index => {
            let template = document.getElementById("trend-template");
            let clone = document.importNode(template.content, true);

            clone.querySelector(".trend-img").src = index.images.fixed_height.url;
            clone.querySelector(".trend-title").textContent = `#${index.title}`;
            trend_container.appendChild(clone);
        });
    } else if (caller === "search") {
        heading.textContent = `Mostrando resultados para: ${query.value.toUpperCase()}`;
        document.getElementById("suggested").style.display = "none";
        document.getElementById("trends").style.display = "none";
        console.log(logo.parentNode);
        let back = document.createElement("button");
        let arrow = document.createElement("img");

        back.setAttribute("onclick", "getBack()");

        arrow.src = "./img/arrow.svg";
        back.appendChild(arrow);
        logo.parentNode.insertBefore(back, logo);

        history.pushState(null, null, "results.html");

        data.data.forEach(index => {
            let template = document.getElementById("results-template");
            let clone = document.importNode(template.content, true);

            clone.querySelector(".results-img").src = index.images.fixed_height.url;
            clone.querySelector(".results-title").textContent = `#${index.title}`;
            results_container.appendChild(clone);
        });
        document.getElementById("results").style.display = "inline";
    }
}

function getBack() {
    console.log("executed");
    history.go(-1);
}

btn.addEventListener("click", () => {
    getGifs.search();
});
