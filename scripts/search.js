const search = "http://api.giphy.com/v1/gifs/search?limit=16&";
const searchBar = document.getElementById("search");
const suggestedSearch = document.getElementById("suggested-search");
const suggestions = [...document.getElementsByClassName("suggestions")];
const tags = ["action", "animals", "anime", "art and desing", "cartoons and comics", "celebrities", "emotions", "food and drink", "gaming", "memes", "movies", "music", "nature", "news and politics", "reactions", "science", "sports", "cars", "tv series"];
const searchBtn = document.getElementById("search-btn");
let printed = false;

/* Search gif by user input or suggested search */

async function searchGifs(url, string) {
    let data = await fetch(url);
    let parsed = await data.json();
    searchBar.value = string;
    printGifs(parsed, string);
}

searchBtn.addEventListener("click", () => {
    let value = searchBar.value;
    let convertedString = value.split(" ").join("+");
    searchGifs(`${search}${api_key}&q=${convertedString}`, value);
});

suggestions.forEach(index => {
    index.addEventListener("click", () => {
        searchGifs(`${search}${api_key}&q=${index.textContent}`, index.textContent);
    });
});

/* Print search results */

function printGifs(data, string) {
    let dataArray = data.data;
    let container = document.getElementById("results-container");
    let heading = document.getElementById("results-heading");

    heading.textContent = `Mostrando resultados para: ${string}`;

    let trends = document.getElementById("trends");
    trends.style.display = "none";

    results.style.display = "block";

    if (printed) {
        let childs = [...document.getElementById("results-container").childNodes];

        childs.forEach(index => {
            index.remove();
        });

        dataArray.forEach(test);
        printed = true;
    } else {
        dataArray.forEach(test);
        printed = true;
    }

    function test(index, currentValue, array) {
        let template = document.getElementById("results-template");
        let clone = document.importNode(template.content, true);
        let title = index.title.split(" ");
        let splice = title.splice(title.indexOf("GIF"), title.length);

        clone.querySelector(".results-img").src = index.images.fixed_height.url;
        clone.querySelector(".results-title").textContent = `#${title.join(" #").toLowerCase()}`;

        container.appendChild(clone);
    }
}

/* styling on click */

document.addEventListener("click", event => {
    let target = event.target;
    let btn = document.getElementById("search-btn");

    suggestions.forEach((index, currentValue) => {
        let random = Math.floor(Math.random() * tags.length) + currentValue;
        index.textContent = tags[random];
    });

    if (target.tagName === "INPUT") {
        btn.disabled = false;
        suggestedSearch.style.display = "flex";
    } else {
        btn.disabled = true;
        suggestedSearch.style.display = "none";
    }
});
