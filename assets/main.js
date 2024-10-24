document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const starsContainer = document.querySelector('.stars-container');
    
    for (let i = 0; i < 25; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('data-index', i);
        tileGrid.appendChild(tile);
    }

    for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.setAttribute('data-index', i);
        starsContainer.appendChild(star);
    }

    const getSignalButton = document.getElementById("getSignalButton");
    const totalTiles = 25;
    const tilesToOpen = 5;
    const tileFadeDuration = 500;
    const tileDelay = 500;
    const buttonInactiveDuration = 1000;

    let openedTiles = new Set();

    function resetTiles() {
        Array.from(tileGrid.children).forEach(tile => {
            tile.classList.remove("fade-out");
        });

        Array.from(starsContainer.children).forEach(star => {
            star.style.opacity = 0;
            star.classList.remove("show-star");
        });
    }

    function toggleButtonState(isDisabled) {
        getSignalButton.disabled = isDisabled;
        getSignalButton.style.backgroundColor = isDisabled ? "#cccccc" : ""; 
        getSignalButton.style.cursor = isDisabled ? "not-allowed" : "pointer";
    }

    function getRandomTiles() {
        const availableTiles = Array.from({ length: totalTiles }, (_, i) => i).filter(i => !openedTiles.has(i));

        if (availableTiles.length < tilesToOpen) {
            console.warn("Недостаточно плиток для открытия, сбрасываем состояние.");
            resetTiles();
            openedTiles.clear();

            // После сброса нужно снова выбрать плитки для открытия
            return getRandomTiles(); // Повторяем вызов, чтобы снова получить плитки
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

    getSignalButton.addEventListener("click", () => {
        resetTiles(); 
        toggleButtonState(true); 

        const openedTilesThisRound = getRandomTiles();

        if (!openedTilesThisRound) {
            toggleButtonState(false);
            return;
        }

        openedTiles = new Set([...openedTiles, ...openedTilesThisRound]);

        console.log("Открытые плитки:", openedTilesThisRound);

        openedTilesThisRound.forEach((tileIndex, i) => {
            setTimeout(() => {
                const tile = tileGrid.children[tileIndex];
                tile.classList.add("fade-out");

                const star = starsContainer.children[tileIndex];
                star.style.opacity = 1;
                star.classList.add("show-star");

                if (i === tilesToOpen - 1) {
                    setTimeout(() => {
                        toggleButtonState(false);
                    }, buttonInactiveDuration);
                }
            }, i * tileDelay);
        });
    });
});
