document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");

    getSignalButton.addEventListener("click", () => {
        // Случайно открываем 5 плиток
        let openedTiles = [];
        while (openedTiles.length < 5) {
            const randomIndex = Math.floor(Math.random() * 25);
            if (!openedTiles.includes(randomIndex)) {
                openedTiles.push(randomIndex);
            }
        }

        // Функция для открытия плитки с задержкой
        openedTiles.forEach((tileIndex, i) => {
            setTimeout(() => {
                const tile = tileGrid.children[tileIndex];
                tile.classList.add("fade-out"); // Добавляем класс для исчезновения
                setTimeout(() => {
                    tile.classList.add("star"); // Меняем на звезду после исчезновения
                }, 1000); // Дождаться окончания анимации исчезновения
            }, i * 2000); // Устанавливаем задержку 2 секунды между открытием плиток
        });
    });
});
