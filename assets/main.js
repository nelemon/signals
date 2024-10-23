document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const starsContainer = document.querySelector('.stars-container');
    
    // Генерация плиток
    for (let i = 0; i < 25; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('data-index', i);
        tileGrid.appendChild(tile);
    }

    // Генерация звезд
    for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.setAttribute('data-index', i);
        starsContainer.appendChild(star);
    }

    // Остальной ваш код
    const getSignalButton = document.getElementById("getSignalButton");
    const totalTiles = 25; // Общее количество плиток
    const tilesToOpen = 5; // Количество плиток, которые будут открыты
    const tileFadeDuration = 10; // Продолжительность анимации исчезновения
    const tileDelay = 500; // Интервал между анимациями плиток
    const buttonInactiveDuration = 1000; // 1 секунды неактивности кнопки

    // Хранит уже открытые плитки
    let openedTiles = new Set();

    // Функция сброса состояния плиток и звезд
    function resetTiles() {
        Array.from(tileGrid.children).forEach(tile => {
            tile.classList.remove("fade-out");
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

    // Функция для выбора плиток
    function getRandomTiles() {
        // Создаем массив всех доступных плиток, которые еще не открыты
        const availableTiles = Array.from({ length: totalTiles }, (_, i) => i).filter(i => !openedTiles.has(i));

        // Проверяем, достаточно ли плиток
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

            // Если плитка еще не была открыта, добавляем её в список открытых плиток
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

        // Если недостаточно плиток, просто возвращаем
        if (!openedTilesThisRound) {
            toggleButtonState(false); // Активируем кнопку
            return;
        }

        // Обновляем список открытых плиток
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
