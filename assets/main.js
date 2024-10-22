document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");

    function resetTiles() {
        // Убираем все классы у плиток, чтобы вернуть их в исходное состояние
        Array.from(tileGrid.children).forEach(tile => {
            tile.classList.remove("fade-out", "star");
        });
    }

    function toggleButtonState(isDisabled) {
        // Переключение состояния кнопки
        getSignalButton.disabled = isDisabled;
        getSignalButton.style.backgroundColor = isDisabled ? "#cccccc" : ""; // Темнеем, когда кнопка неактивна
        getSignalButton.style.cursor = isDisabled ? "not-allowed" : "pointer";
    }

    getSignalButton.addEventListener("click", () => {
        toggleButtonState(true); // Делаем кнопку неактивной
        resetTiles(); // Сбрасываем плитки перед новым раундом

        // Случайно открываем 5 плиток
        let openedTiles = [];
        while (openedTiles.length < 5) {
            const randomIndex = Math.floor(Math.random() * 25);
            if (!openedTiles.includes(randomIndex)) {
                openedTiles.push(randomIndex);
            }
        }

        // Открываем плитки с задержкой
        openedTiles.forEach((tileIndex, i) => {
            setTimeout(() => {
                const tile = tileGrid.children[tileIndex];
                tile.classList.add("fade-out"); // Добавляем класс для исчезновения
                setTimeout(() => {
                    tile.classList.add("star"); // Меняем на звезду после исчезновения
                    if (i === openedTiles.length - 1) {
                        // Включаем кнопку, когда все плитки обработаны
                        toggleButtonState(false);
                    }
                }, 1000); // Ждём окончания анимации исчезновения
            }, i * 500); // Устанавливаем задержку между плитками
        });
    });
});
