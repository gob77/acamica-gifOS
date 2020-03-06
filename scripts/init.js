document.addEventListener("DOMContentLoaded", () => {
    function getRandoms(n) {
        getGifs.randoms(n);
        if (n < 1) {
            return;
        } else if (n === 1) {
            return 1;
        }

        return getRandoms(n - 1);
    }

    getRandoms(4);

    /* getGifs.trends(); */
});
