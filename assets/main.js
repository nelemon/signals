document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");
    const totalTiles = 25;
    const tilesToOpen = 5;
    const tileFadeDuration = 1000; // Продолжительность анимации исчезновения
    const tileDelay = 500; // Интервал между анимациями плиток

    // Генерация плиток
    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("data-index", i);

        // Создание звезды
        const star = document.createElement("div");
        star.classList.add("star");
        tile.appendChild(star); // Добавляем звезду в плитку

        tileGrid.appendChild(tile); // Добавляем плитку в сетку
    }

    function resetTiles() {
        // Сбрасываем состояние всех плиток
        Array.from(tileGrid.children).forEach(tile => {
            tile.classList.remove("fade-out");
            const star = tile.querySelector(".star"); // Получаем элемент звезды
            if (star) {
                star.style.opacity = 0; // Скрываем звезду
            }
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
                    if (star) {
                        star.style.opacity = 1; // Появление звезды
                    }
                    if (i === tilesToOpen - 1) {
                        // Активируем кнопку после завершения последней анимации
                        toggleButtonState(false);
                    }
                }, tileFadeDuration); // Ждём завершения анимации исчезновения
            }, i * tileDelay); // Интервал между анимациями плиток
        });
    });
});
