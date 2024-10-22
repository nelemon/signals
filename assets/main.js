document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");
    const totalTiles = 25;
    const tilesToOpen = 5;
    const tileFadeDuration = 1000; // Продолжительность анимации исчезновения
    const tileDelay = 500; // Интервал между анимациями плиток

    function resetTiles() {
        // Сбрасываем состояние всех плиток
        Array.from(tileGrid.children).forEach(tile => {
            tile.classList.remove("fade-out");
            tile.querySelector(".star").style.opacity = "0"; // Скрываем звезду
        });
    }

    function toggleButtonState(isDisabled) {
        // Управляем состоянием кнопки
        getSignalButton.disabled = isDisabled;
        getSignalButton.style.backgroundColor = isDisabled ? "#cccccc" : ""; // Меняем цвет кнопки
        getSignalButton.style.cursor = isDisabled ? "not-allowed" : "pointer";
    }

    getSignalButton.addEventListener("click", () => {
        toggleButtonState(true); // Блокируем кнопку
        resetTiles(); // Сбрасываем состояние плиток

        // Выбираем случайные 5 плиток
        let openedTiles = [];
        while (openedTiles.length < tilesToOpen) {
            const randomIndex = Math.floor(Math.random() * totalTiles);
            if (!openedTiles.includes(randomIndex)) {
                openedTiles.push(randomIndex);
            }
        }

        // Анимация исчезновения плиток
        openedTiles.forEach((tileIndex, i) => {
            setTimeout(() => {
                const tile = tileGrid.children[tileIndex];
                tile.classList.add("fade-out"); // Запускаем анимацию исчезновения
                setTimeout(() => {
                    const star = tile.querySelector(".star");
                    star.style.opacity = "1"; // Показать звезду после исчезновения плитки
                    if (i === tilesToOpen - 1) {
                        // Активируем кнопку после завершения последней анимации
                        toggleButtonState(false);
                    }
                }, tileFadeDuration); // Ждем завершения анимации исчезновения
            }, i * tileDelay); // Интервал между анимациями плиток
        });
    });
});
