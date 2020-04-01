const logo = document.getElementById("logo");
const themesBTN = [...document.getElementsByClassName("themes-btn")];

themesBTN.forEach(index => {
    index.addEventListener("click", changeThemeTo);
});

const themes = {
    light: () => {
        logo.src = "./img/gifOF_logo.png";
        document.documentElement.setAttribute("data-theme", "light");
    },
    dark: () => {
        logo.src = "./img/gifOF_logo_dark.png";
        document.documentElement.setAttribute("data-theme", "dark");
    }
};

function changeThemeTo(event) {
    let target = event.target;

    if (target.id === "light") {
        return themes.light();
    } else if (target.id === "dark") {
        return themes.dark();
    }
}

/* dropdown functonality */

document.addEventListener("click", event => {
    const themes = document.getElementById("themes");
    const target = event.target;
    if (target.parentNode.id === "themes-container") {
        themes.classList.add("show");
    } else {
        themes.classList.remove("show");
    }
});
