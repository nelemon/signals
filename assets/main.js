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

        // Открываем плитки без анимации
        openedTiles.forEach((tileIndex) => {
            const tile = tileGrid.children[tileIndex];
            tile.classList.add("star"); // Применяем класс "star" сразу
        });
    });
});
