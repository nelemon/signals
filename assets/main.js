document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");
    const starsContainer = document.querySelector('.stars-container');
    const totalTiles = 25; // Общее количество плиток
    const tilesToOpen = 5; // Количество плиток, которые будут открыты
    const tileFadeDuration = 1000; // Продолжительность анимации исчезновения
    const tileDelay = 500; // Интервал между анимациями плиток
    const buttonInactiveDuration = 1500; // 2 секунды неактивности кнопки

    let openedTiles = new Set(); // Хранит уже открытые плитки

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

    // Функция для выбора уникальных индексов
    function getUniqueRandomIndexes(count, max) {
        const indexes = new Set();
        while (indexes.size < count) {
            const randomIndex = Math.floor(Math.random() * max);
            indexes.add(randomIndex);
        }
        return Array.from(indexes);
    }

    // Обработчик события нажатия на кнопку
    getSignalButton.addEventListener("click", () => {
        resetTiles(); // Сбрасываем состояние плиток и звезд
        toggleButtonState(true); // Блокируем кнопку

        // Проверяем, сколько плиток еще можно открыть
        if (openedTiles.size + tilesToOpen > totalTiles) {
            openedTiles.clear(); // Сбрасываем открытые плитки
        }

        // Получаем уникальные индексы, исключая уже открытые плитки
        const availableTiles = Array.from({ length: totalTiles }, (_, i) => i).filter(i => !openedTiles.has(i));
        const openedTilesThisRound = getUniqueRandomIndexes(tilesToOpen, availableTiles.length).map(i => availableTiles[i]);

        // Добавляем открытые плитки в общий список
        openedTiles = new Set([...openedTiles, ...openedTilesThisRound]);

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
