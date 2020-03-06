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

function showData(caller, data, n) {
    console.log(caller);
    console.log(data.data.images);
    let random_container = document.getElementById("suggested-container");
    let random_elem = `
        <div class="suggested-img">
            <div class="img-title">
                <h2>#Imagen nro ${n}</h2>
                <img src="./img/close.svg" class="close" />
            </div>
            <img src="${data.data.images.fixed_height.url}" />
        </div>
    `;

    if (caller === "random") {
        random_container.insertAdjacentHTML("afterbegin", random_elem);
    }
}

btn.addEventListener("click", () => {
    getGifs.search();
});
