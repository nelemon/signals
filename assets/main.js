document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");
    const starsContainer = document.querySelector('.stars-container');
    const totalTiles = 25; // Общее количество плиток
    const tilesToOpen = 5; // Количество плиток, которые будут открыты
    const tileFadeDuration = 1000; // Продолжительность анимации исчезновения
    const tileDelay = 500; // Интервал между анимациями плиток
    const buttonInactiveDuration = 5000; // 5 секунд неактивности кнопки

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

    // Функция для перемешивания массива
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Обработчик события нажатия на кнопку
    getSignalButton.addEventListener("click", () => {
        resetTiles(); // Сбрасываем состояние плиток и звезд
        toggleButtonState(true); // Блокируем кнопку

        // Создаем массив индексов от 0 до 24 и перемешиваем его
        const indexes = shuffleArray(Array.from({ length: totalTiles }, (_, i) => i));
        const openedTiles = indexes.slice(0, tilesToOpen); // Берем первые 5 уникальных индексов

        // Проверка на случай, если меньше 5 плиток открывается
        if (openedTiles.length < tilesToOpen) {
            console.error("Не удалось открыть 5 уникальных плиток.");
            toggleButtonState(false); // Разблокируем кнопку
            return; // Прерываем выполнение
        }

        // Анимация исчезновения плиток и появления звезд
        openedTiles.forEach((tileIndex, i) => {
            setTimeout(() => {
                const tile = tileGrid.children[tileIndex];
                tile.classList.add("fade-out"); // Запускаем анимацию исчезновения

                // Получаем звезду с тем же индексом
                const star = starsContainer.children[tileIndex];
                star.style.opacity = 1; // Показываем звезду
                star.classList.add("show-star"); // Добавляем класс для анимации появления звезды

                if (i === tilesToOpen - 1) {
                    // После завершения последней анимации ждем 5 секунд перед активацией кнопки
                    setTimeout(() => {
                        toggleButtonState(false); // Активируем кнопку
                    }, buttonInactiveDuration);
                }
            }, i * tileDelay); // Интервал между анимациями плиток
        });
    });
});
