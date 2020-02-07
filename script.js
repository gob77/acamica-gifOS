document.addEventListener("DOMContentLoaded", () => {
    const themesContainer = document.getElementById("themes-container");

    themesContainer.addEventListener("click", event => {
        const themes = document.getElementById("themes");

        if (event.target.id === "themes" || "dropdownArrow" || "elegir") {
            themes.classList.toggle("show");
        } else {
            themes.classList.remove("show");
        }
    });
});
