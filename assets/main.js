document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");

    // Функция для перехода в полноэкранный режим
    function openFullscreen() {
        if (tileGrid.requestFullscreen) {
            tileGrid.requestFullscreen();
        } else if (tileGrid.mozRequestFullScreen) { // Firefox
            tileGrid.mozRequestFullScreen();
        } else if (tileGrid.webkitRequestFullscreen) { // Chrome, Safari and Opera
            tileGrid.webkitRequestFullscreen();
        } else if (tileGrid.msRequestFullscreen) { // IE/Edge
            tileGrid.msRequestFullscreen();
        }
    }

    getSignalButton.addEventListener("click", () => {
        // Переход в полноэкранный режим
        openFullscreen();

        // Случайно открываем 5 плиток
        let openedTiles = [];
        while (openedTiles.length < 5) {
            const randomIndex = Math.floor(Math.random() * 25);
            if (!openedTiles.includes(randomIndex)) {
                openedTiles.push(randomIndex);
                const tile = tileGrid.children[randomIndex];
                tile.classList.add("fade-out");
                setTimeout(() => {
                    tile.classList.add("star");
                }, 1000);
            }
        }
    });
});
