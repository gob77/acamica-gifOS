document.addEventListener("DOMContentLoaded", () => {
    const themesContainer = document.getElementById("themes-container");
    const input = document.getElementById("search");
    const API_KEY = "wi0q59XfKI285mmhSNvmSSBSBdNi8NSo";
    const searchBTN = document.getElementById("search-btn");
    const suggested = document.getElementById("suggested-container");
    const trends = document.getElementById("trends-container");

    /* get suggested gifs */

    async function getRandoms(n) {
        let data = await fetch(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);
        let parsedData = await data.json();
        /* console.log(parsedData); */

        let container = document.createElement("div");
        let title = document.createElement("div");
        let titleContainer = document.createElement("h2");
        let img = document.createElement("img");
        let close = document.createElement("img");
        let name = document.createTextNode(`#Imagen nro ${n}`);

        container.setAttribute("class", "suggested-img");
        title.setAttribute("class", "img-title");

        img.src = parsedData.data.images.fixed_height.url;
        img.setAttribute("class", "suggested-img");

        close.src = "./img/close.svg";
        close.setAttribute("class", "close");

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

    getRandoms(4);

    /* get trending on load */

    async function getTrends() {
        let data = await fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=24`);
        let parsedData = await data.json();

        console.log(parsedData);
    }

    getTrends();

    /* get gifs on search */

    searchBTN.addEventListener("click", async () => {
        /* get the data from giphy */

        let value = input.value;

        let data = await fetch(`http://api.giphy.com/v1/gifs/search?q=${value}&api_key=${API_KEY}&limit=5`);
        let parsedData = await data.json(data);

        console.log(parsedData);

        /* put data into the DOM */

        parsedData.data.forEach((data, index) => {
            let img = document.createElement("img");
            img.src = data.images.fixed_height.url;
            trends.appendChild(img);

            img.addEventListener("error", () => {
                console.log(`loading error on img ${index} `);
            });
        });
    });

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
