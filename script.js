document.addEventListener("DOMContentLoaded", () => {
    const themesContainer = document.getElementById("themes-container");

    themesContainer.addEventListener("click", event => {
        const themes = document.getElementById("names");

        if (event.target.id === "names" || "dropdownArrow" || "elegir") {
            themes.classList.toggle("show");
        } else {
            themes.classList.remove("show");
        }
    });
});
