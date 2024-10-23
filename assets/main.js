document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");
    const starsContainer = document.querySelector('.stars-container');
    const totalTiles = 25; // Общее количество плиток
    const tilesToOpen = 5; // Количество плиток, которые будут открыты
    const tileFadeDuration = 1000; // Продолжительность анимации исчезновения
    const tileDelay = 500; // Интервал между анимациями плиток
    const buttonInactiveDuration = 1000; // 1 секунды неактивности кнопки

    // Хранит уже открытые плитки
    let openedTiles = new Set();

    // Функция сброса состояния плиток и звезд
    function resetTiles() {
        Array.from(tileGrid.children).forEach(tile => {
            tile.classList.remove("fade-out", "star");
        });

        // Скрываем звезды сразу
        Array.from(tileGrid.querySelectorAll('.star')).forEach(star => {
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

    // Функция для выбора плиток
    function getRandomTiles() {
        const availableTiles = Array.from({ length: totalTiles }, (_, i) => i).filter(i => !openedTiles.has(i));

        if (availableTiles.length < tilesToOpen) {
            console.warn("Недостаточно плиток для открытия, сбрасываем состояние.");
            resetTiles();
            openedTiles.clear(); // Очищаем список открытых плиток
            return null; // Вернем null, если недостаточно плиток
        }

        const selectedTiles = [];
        while (selectedTiles.length < tilesToOpen) {
            const randomIndex = Math.floor(Math.random() * availableTiles.length);
            const tileIndex = availableTiles[randomIndex];

            if (!selectedTiles.includes(tileIndex)) {
                selectedTiles.push(tileIndex);
            }
        }

        return selectedTiles;
    }

    // Обработчик события нажатия на кнопку
    getSignalButton.addEventListener("click", () => {
        resetTiles(); // Сбрасываем состояние плиток и звезд
        toggleButtonState(true); // Блокируем кнопку

        const openedTilesThisRound = getRandomTiles();

        if (!openedTilesThisRound) {
            toggleButtonState(false); // Активируем кнопку
