document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");
    const totalTiles = 25;
    const tilesToOpen = 5;
    const tileFadeDuration = 1000; // Продолжительность анимации исчезновения
    const tileDelay = 500; // Интервал между анимациями плиток

    // Создание плиток
    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("data-index", i);
        
        const star = document.createElement("div");
        star.classList.add("star");
        
        tile.appendChild(star);
        tileGrid.appendChild(tile);
    }

    function resetTiles() {
        // Сбрасываем состояние всех плиток
        Array.from(tileGrid.children).forEach(tile => {
            tile.classList.remove("fade-out");
        });
    }

    function toggleButtonState(isDisabled) {
        // Управляем состоянием кнопки
        getSignalButton.disabled = isDisabled;
        getSignalButton.style.backgroundColor = isDisabled ? "#cccccc" : "";
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

                if (i === tilesToOpen - 1) {
                    // Активируем кнопку после завершения последней анимации
                    setTimeout(() => toggleButtonState(false), tileFadeDuration);
                }
            }, i * tileDelay); // Интервал между анимациями плиток
        });
    });
});
