document.addEventListener("DOMContentLoaded", function() {
    const tileGrid = document.getElementById("tileGrid");
    const getSignalButton = document.getElementById("getSignalButton");
    
    getSignalButton.addEventListener("click", () => {
        const tiles = Array.from(document.querySelectorAll(".tile"));
        const unopenedTiles = tiles.filter(tile => !tile.classList.contains("star"));

        if (unopenedTiles.length < 5) return;

        const randomTiles = [];
        while (randomTiles.length < 5) {
            const randomIndex = Math.floor(Math.random() * unopenedTiles.length);
            if (!randomTiles.includes(unopenedTiles[randomIndex])) {
                randomTiles.push(unopenedTiles[randomIndex]);
            }
        }

        randomTiles.forEach(tile => {
            tile.classList.add("fade-out");
            setTimeout(() => {
                tile.classList.remove("fade-out");
                tile.classList.add("star");
            }, 1000);
        });
    });
});
