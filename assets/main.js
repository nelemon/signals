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
            }, 1000); // 1000 мс для добавления класса "star"
        };

        // Открываем плитки с задержкой 1 секунда
        openedTiles.forEach((tileIndex, i) => {
            setTimeout(() => {
                openTile(tileIndex);
            }, i * 1000); // 1000 мс = 1 секунда
        });
    });
});
