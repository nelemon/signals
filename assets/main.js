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

    const getSignalButton = document.getElementById("getSignalButton");
    const totalTiles = 25; // Общее количество плиток
    const tilesToOpen = 5; // Количество плиток, которые будут открыты
    const tileFadeDuration = 500; // Продолжительность анимации исчезновения
    const tileDelay = 500; // Интервал между анимациями плиток

    const buttonInactiveDuration = (tilesToOpen - 1) * tileDelay + tileFadeDuration; 

    let openedTiles = new Set();  // Хранит уже открытые плитки

    // Функция сброса состояния плиток и звезд
    function resetTiles() {
        Array.from(tileGrid.children).forEach(tile => {
            tile.classList.remove("fade-out");
        });

        Array.from(starsContainer.children).forEach(star => {
            star.style.opacity = 0;
            star.classList.remove("show-star");
        });
    }

    // Функция управления состоянием кнопки
    function toggleButtonState(isDisabled) {
        getSignalButton.disabled = isDisabled;
        getSignalButton.style.backgroundColor = isDisabled ? "#cccccc" : ""; 
        getSignalButton.style.cursor = isDisabled ? "not-allowed" : "pointer";
    }

    // Функция для выбора случайных плиток
    function getRandomTiles() {
        const availableTiles = Array.from({ length: totalTiles }, (_, i) => i).filter(i => !openedTiles.has(i));

        if (availableTiles.length < tilesToOpen) {
            console.warn("Недостаточно плиток для открытия, сбрасываем состояние.");
            openedTiles.clear();
            return null;
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

    // Основной обработчик кнопки
    getSignalButton.addEventListener("click", () => {
        toggleButtonState(true); // Блокируем кнопку

        const openedTilesThisRound = getRandomTiles();
        if (!openedTilesThisRound) {
            // Недостаточно плиток для открытия, активируем кнопку
            toggleButtonState(false);
            return;
        }

        // Обновляем список открытых плиток
        openedTiles = new Set([...openedTiles, ...openedTilesThisRound]);

        // Анимация исчезновения плиток и появления звезд
        openedTilesThisRound.forEach((tileIndex, i) => {
            setTimeout(() => {
                const tile = tileGrid.children[tileIndex];
                tile.classList.add("fade-out");

                const star = starsContainer.children[tileIndex];
                star.style.opacity = 1;
                star.classList.add("show-star");

                if (i === tilesToOpen - 1) {
                    // После завершения анимаций плиток
                    setTimeout(() => {
                        toggleButtonState(false); // Активируем кнопку после завершения всех анимаций
                    }, buttonInactiveDuration);
                }
            }, i * tileDelay);
        });

        // Теперь сбрасываем плитки и звезды только после того, как все действия завершены
        setTimeout(() => {
            resetTiles(); // Сбрасываем плитки и звезды после всех анимаций
        }, buttonInactiveDuration + 500); // + 500ms для плавного завершения
    });
});
