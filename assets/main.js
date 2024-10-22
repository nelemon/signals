document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");

    getSignalButton.addEventListener("click", () => {
        // Деактивируем кнопку
        getSignalButton.disabled = true;

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
                const tile = tileGrid.children[tileIndex].querySelector('.tile');
                tile.classList.add("fade-out"); // Добавляем класс для исчезновения

                setTimeout(() => {
                    // Активируем кнопку после завершения анимации последней плитки
                    if (i === openedTiles.length - 1) {
                        getSignalButton.disabled = false;
                    }
                }, 1000); // Дождаться окончания анимации исчезновения
            }, i * 500); // Устанавливаем задержку 500 мс между открытием плиток
        });
    });
});
