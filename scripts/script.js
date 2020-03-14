document.addEventListener("DOMContentLoaded", () => {
    const themesContainer = document.getElementById("themes-container");
    const input = document.getElementById("search");
    const API_KEY = "wi0q59XfKI285mmhSNvmSSBSBdNi8NSo";
    const searchBTN = document.getElementById("search-btn");
    const suggested = document.getElementById("suggested-container");
    const trends = document.getElementById("trends-container");
    const trend = document.getElementsByClassName("trend");

    /* document.getElementById("search-btn").addEventListener("click", () => {
        alert("hello world");
    }); */

    Object.prototype.fetchData = async function(url) {
        let data = await fetch(url);
        let parsedData = await data.json(data);
        return parsedData;
    };

    Object.prototype.API_KEY = "wi0q59XfKI285mmhSNvmSSBSBdNi8NSo";

    let getData = {
        API_KEY: "wi0q59XfKI285mmhSNvmSSBSBdNi8NSo",
        RNDM_URL: "http://api.giph.com/v1/gifs/random?api_key=",
        TRND_URL: "http://api.giphy.com/v1/gifs/trending?limit=24&api_key="
    };

    function getRNDM() {
        console.log(this);
        try {
            Object.fetchData(`http://api.giphy.com/v1/gifs/random?api_key=${Object.API_KEY}`).then(function(data) {
                console.log(data);
            });
        } catch (error) {
            console.log(error);
        }
        /* Object.fetchData(`http://api.giphy.com/v1/gifs/random?api_key=${Object.API_KEY}`).then(function(data) {
            console.log(data);
        });
        console.log(Object.fetchData(`http://api.giphy.com/v1/gifs/random?api_key=${Object.API_KEY}`)); */
    }

    getRNDM();

    function showTRND(data) {
        console.log(data);
    }

    /* get suggested gifs */

    /*  async function getRandoms(n) {
        let data = await fetch(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);
        let parsedData = await data.json();

        let container = document.createElement("div");
        container.setAttribute("class", "suggested-img");

        let title = document.createElement("div");
        title.setAttribute("class", "img-title");

        let titleContainer = document.createElement("h2");

        let img = document.createElement("img");
        img.setAttribute("class", "suggested-img");

        img.src = parsedData.data.images.fixed_height.url;

        let close = document.createElement("img");
        close.setAttribute("class", "close");
        close.src = "./img/close.svg";

        let name = document.createTextNode(`#Imagen nro ${n}`);

        title.appendChild(titleContainer);
        title.appendChild(close);
        titleContainer.appendChild(name);
        container.appendChild(title);
        container.appendChild(img);
        suggested.appendChild(container);

        if (n < 1) {
            return;
        } else if (n === 1) {
            return 1;
        }

        return getRandoms(n - 1);
    }

    getRandoms(4); */

    /* get trending on load */

    /* async function getTrends() {
        let data = await fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=24`);
        let parsedData = await data.json();

        parsedData.data.forEach((data, index) => {
            trend[index].src = data.images.fixed_height.url;
            trend;
        });
    }

    getTrends(); */

    /* get gifs on search */

    /* searchBTN.addEventListener("click", async () => {
        

        let value = input.value;

        let data = await fetch(`http://api.giphy.com/v1/gifs/search?q=${value}&api_key=${API_KEY}&limit=5`);
        let parsedData = await data.json(data);

        console.log(parsedData);

        

        data.data.forEach((data, index) => {
            trend[index].src = data.iamges.fixed_height;

            let img = document.createElement("img");
            img.src = data.images.fixed_height.url;
            trends.appendChild(img);

            img.addEventListener("error", () => {
                console.log(`loading error on img ${index} `);
            });
        });
    }); */

    /* THEMES */

    themesContainer.addEventListener("click", event => {
        const themes = document.getElementById("themes");

        if (event.target.id === "themes" || "dropdownArrow" || "elegir") {
            themes.classList.toggle("show");
        } else {
            themes.classList.remove("show");
        }
    });
});
