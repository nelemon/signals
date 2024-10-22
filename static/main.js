document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");

    getSignalButton.addEventListener("click", () => {
        // Случайно открываем 5 плиток
        let openedTiles = [];
        while (openedTiles.length < 5) {
            const randomIndex = Math.floor(Math.random() * 25);
            if (!openedTiles.includes(randomIndex)) {
                openedTiles.push(randomIndex);
                const tile = tileGrid.children[randomIndex];
                tile.classList.add("fade-out");
                setTimeout(() => {
                    tile.classList.add("star");
                }, 1000);
            }
        }

        // Отправляем данные в Telegram Web App
        sendDataToBot(JSON.stringify(openedTiles));
    });

    function sendDataToBot(data) {
        if (window.Telegram.WebApp) {
            window.Telegram.WebApp.sendData(data);
        } else {
            alert("Telegram Web App не найден");
        }
    }
});
