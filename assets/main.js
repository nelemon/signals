document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");
    const starsContainer = document.querySelector('.stars-container');
    const totalTiles = 25; // Общее количество плиток
    const tilesToOpen = 5; // Количество плиток, которые будут открыты
    const tileFadeDuration = 1000; // Продолжительность анимации исчезновения
    const tileDelay = 500; // Интервал между анимациями плиток
    const buttonInactiveDuration = 2000; // 2 секунды неактивности кнопки

    // Функция сброса состояния плиток и звезд
    function resetTiles() {
        Array.from(tileGrid.children).forEach(tile => {
            tile.classList.remove("fade-out", "star");
        });

        // Скрываем звезды сразу
        Array.from(starsContainer.children).forEach(star => {
            star.style.opacity = 0; // Скрываем звезды
            star.classList.remove("show-star"); // Убираем класс анимации
        });
    }

    // Функция управления состоянием кнопки
    function toggleButtonState(isDisabled) {
        getSignalButton.disabled = isDisabled;
        getSignalButton.style.backgroundColor = isDisabled ? "#cccccc" : ""; // Меняем цвет кнопки
        getSignalButton.style.cursor = isDisabled ? "not-allowed" : "pointer";
    }

    // Функция для выбора 5 случайных плиток
    function getRandomTiles() {
        const selectedTiles = [];
        const tileIndices = Array.from({ length: totalTiles }, (_, i) => i); // Массив индексов плиток

        // Перемешиваем массив индексов плиток
        for (let i = tileIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tileIndices[i], tileIndices[j]] = [tileIndices[j], tileIndices[i]];
        }

        // Берем первые 5 случайных плиток
        selectedTiles.push(...tileIndices.slice(0, tilesToOpen));

        return selectedTiles;
    }

    // Обработчик события нажатия на кнопку
    getSignalButton.addEventListener("click", () => {
        resetTiles(); // Сбрасываем состояние плиток и звезд
        toggleButtonState(true); // Блокируем кнопку

        const openedTilesThisRound = getRandomTiles();

        console.log("Открытые плитки:", openedTilesThisRound); // Отладочное сообщение

        // Анимация исчезновения плиток и появления звезд
        openedTilesThisRound.forEach((tileIndex, i) => {
            setTimeout(() => {
                const tile = tileGrid.children[tileIndex];
                tile.classList.add("fade-out"); // Запускаем анимацию исчезновения

                // Получаем звезду с тем же индексом
                const star = starsContainer.children[tileIndex];
                star.style.opacity = 1; // Показываем звезду
                star.classList.add("show-star"); // Добавляем класс для анимации появления звезды

                if (i === tilesToOpen - 1) {
                    // После завершения последней анимации ждем 2 секунды перед активацией кнопки
                    setTimeout(() => {
                        toggleButtonState(false); // Активируем кнопку
                    }, buttonInactiveDuration);
                }
            }, i * tileDelay); // Интервал между анимациями плиток
        });
    });
});
