document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");
    const starsContainer = document.querySelector('.stars-container');
    const totalTiles = 25;
    const tilesToOpen = 5;
    const tileFadeDuration = 1000; // Продолжительность анимации исчезновения
    const tileDelay = 500; // Интервал между анимациями плиток

    function resetTiles() {
        // Сбрасываем состояние всех плиток
        Array.from(tileGrid.children).forEach(tile => {
            tile.classList.remove("fade-out", "star");
        });
    }

    function resetStars() {
        // Скрываем все звезды
        Array.from(starsContainer.children).forEach(star => {
            star.style.opacity = 0;
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
        resetStars(); // Скрываем звезды
        resetTiles(); // Сбрасываем состояние плиток

        // Выбираем случайные 5 плиток
        let openedTiles = [];
        while (openedTiles.length < tilesToOpen) {
            const randomIndex = Math.floor(Math.random() * totalTiles);
            if (!openedTiles.includes(randomIndex)) {
                openedTiles.push(randomIndex);
            }
        }

        // Сначала скрываем звезды
        openedTiles.forEach((tileIndex, i) => {
            const star = starsContainer.children[tileIndex];
            star.style.opacity = 0; // Скрываем звезду перед анимацией плитки

            setTimeout(() => {
                const tile = tileGrid.children[tileIndex];
                tile.classList.add("fade-out"); // Запускаем анимацию исчезновения плитки
                setTimeout(() => {
                    tile.classList.add("star"); // Добавляем класс star к плитке
                    star.style.opacity = 1; // Показываем звезду
                    if (i === tilesToOpen - 1) {
                        // Активируем кнопку после завершения последней анимации
                        toggleButtonState(false);
                    }
                }, tileFadeDuration); // Ждем завершения анимации исчезновения плитки
            }, i * tileDelay); // Интервал между анимациями плиток
        });
    });
});
