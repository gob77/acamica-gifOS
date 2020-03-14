const themesContainer = document.getElementById("themes-container");
const themeLight = document.getElementById("light");
const themeDark = document.getElementById("dark");
const logo = document.getElementById("logo");
const body = document.getElementsByTagName("body")[0];
const lightClass = document.getElementsByClassName("light");
const lightArr = [...lightClass];
const html = document.getElementsByTagName("html")[0];

themeLight.addEventListener("click", () => {
    document.documentElement.setAttribute("data-theme", "light");
    logo.src = "./img/gifOF_logo.png";
});

themeDark.addEventListener("click", () => {
    document.documentElement.setAttribute("data-theme", "dark");
    logo.src = "./img/gifOF_logo_dark.png";
});

themesContainer.addEventListener("click", event => {
    const themes = document.getElementById("themes");
    themes.classList.toggle("show");
});
