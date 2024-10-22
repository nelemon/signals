document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");

    getSignalButton.addEventListener("click", () => {
        // Случайно выбираем 5 уникальных индексов плиток
        let openedTiles = [];
        while (openedTiles.length < 5) {
            const randomIndex = Math.floor(Math.random() * 25);
            if (!openedTiles.includes(randomIndex)) {
                openedTiles.push(randomIndex);
            }
        }

        // Функция для открытия плитки по очереди
        const openTile = (index) => {
            const tile = tileGrid.children[index];
            tile.classList.add("fade-out");
            setTimeout(() => {
                tile.classList.add("star");
            }, 1000);
        };

        // Открываем плитки с задержкой 2 секунды
        openedTiles.forEach((tileIndex, i) => {
            setTimeout(() => {
                openTile(tileIndex);
            }, i * 2000); // 2000 мс = 2 секунды
        });
    });
});
