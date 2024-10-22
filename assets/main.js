document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");

    let isFullscreen = false; // Флаг, отслеживающий состояние полноэкранного режима

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
        isFullscreen = true; // Устанавливаем флаг в true
    }

    getSignalButton.addEventListener("click", () => {
        if (!isFullscreen) {
            openFullscreen(); // Переход в полноэкранный режим, только если он еще не активен
        }

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

    // Обработчик выхода из полноэкранного режима
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                isFullscreen = false; // Сбрасываем флаг при выходе из полноэкранного режима
            }
        }
    });
});
