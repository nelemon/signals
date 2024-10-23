document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");
    const totalTiles = 25;
    const tilesToOpen = 5;
    const tileFadeDuration = 1000; // Продолжительность анимации исчезновения
    const tileDelay = 500; // Интервал между анимациями плиток

    function resetTiles() {
        // Сбрасываем состояние всех плиток
        Array.from(tileGrid.children).forEach((child, index) => {
            if (child.classList.contains("tile")) {
                child.classList.remove("fade-out");
            } else {
                child.style.display = "none"; // Скрываем звезды
            }
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

                // Показать звезду под плиткой
                const star = tileGrid.children[tileIndex + totalTiles]; // Звезда будет сразу под плиткой
                star.style.display = "block"; // Показываем звезду

                if (i === tilesToOpen - 1) {
                    // Активируем кнопку после завершения последней анимации
                    setTimeout(() => toggleButtonState(false), tileFadeDuration);
                }
            }, i * tileDelay); // Интервал между анимациями плиток
        });
    });
});
