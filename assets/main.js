document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");
    const starsContainer = document.querySelector('.stars-container');
    const totalTiles = 25; // Общее количество плиток
    const tilesToOpen = 5; // Количество плиток, которые будут открыты
    const tileFadeDuration = 1000; // Продолжительность анимации исчезновения
    const buttonInactiveDuration = 1000; // 1 секунды неактивности кнопки

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
        const selectedTiles = new Set();

        // Выбираем уникальные плитки до тех пор, пока не получим 5
        while (selectedTiles.size < tilesToOpen) {
            const randomIndex = Math.floor(Math.random() * totalTiles);
            selectedTiles.add(randomIndex); // Добавляем случайный индекс
        }

        return Array.from(selectedTiles); // Возвращаем массив уникальных индексов плиток
    }

    // Обработчик события нажатия на кнопку
    getSignalButton.addEventListener("click", () => {
        resetTiles(); // Сбрасываем состояние плиток и звезд
        toggleButtonState(true); // Блокируем кнопку

        const openedTilesThisRound = getRandomTiles();

        console.log("Открытые плитки:", openedTilesThisRound); // Отладочное сообщение

        // Анимация исчезновения плиток и появления звезд
        openedTilesThisRound.forEach((tileIndex) => {
            const tile = tileGrid.children[tileIndex];
            tile.classList.add("fade-out"); // Запускаем анимацию исчезновения
            const star = starsContainer.children[tileIndex]; // Получаем звезду с тем же индексом
            star.style.opacity = 1; // Показываем звезду
            star.classList.add("show-star"); // Добавляем класс для анимации появления звезды
        });

        // Ждем 2 секунды перед активацией кнопки
        setTimeout(() => {
            toggleButtonState(false); // Активируем кнопку
        }, buttonInactiveDuration);
    });
});
