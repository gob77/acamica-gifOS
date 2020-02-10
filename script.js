document.addEventListener("DOMContentLoaded", () => {
    const themesContainer = document.getElementById("themes-container");
    const imput = document.getElementById("search");
    const API_KEY = "wi0q59XfKI285mmhSNvmSSBSBdNi8NSo";
    /* const API_URL = `http://api.giphy.com/v1/gifs/search?q=${imput}&api_key=${API_KEY}`; */
    const searchBTN = document.getElementById("search-btn");
    let test;

    searchBTN.addEventListener("click", async () => {
        let value = imput.value;
        console.log(value);

        let data = await fetch(`http://api.giphy.com/v1/gifs/search?q=${value}&api_key=${API_KEY}`);
        let parsedData = await data.json(data);
        test = parsedData;

        let container = document.getElementById("img-container");
        debugger;

        test.data.forEach((data, index) => {
            /* console.log(data.images.original.url); */
            let img = document.createElement("img");
            img.src = data.images.fixed_height.url;
            container.appendChild(img);
            img.addEventListener("error", () => {
                console.log(`loading error on img ${index} `);
            });
        });
    });

    themesContainer.addEventListener("click", event => {
        const themes = document.getElementById("themes");

        if (event.target.id === "themes" || "dropdownArrow" || "elegir") {
            themes.classList.toggle("show");
        } else {
            themes.classList.remove("show");
        }
    });

    /* async function getGifs() {
        let data = await fetch(API_URL);
        let parsedData = await data.json();
        console.log(parsedData);
        
        placeIMG(parsedData);
    } */

    /* function placeIMG(data) {
        console.log(data.data[0].images);

        test.src = data.data[0].images.original.url;
    }

    getGifs(); */
});
