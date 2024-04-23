// Oyun tahtası üzerindeki mevcut köstebek ve bitki karelerini izleyen değişkenler.
let currMoleTile;
let currPlantTile;

// Oyuncunun topladığı puan.
let score = 0;

// Oyunun bitip bitmediğini belirten bayrak.
let gameOver = false;

// Sayfa yüklendiğinde oyunu başlatan işlev.
window.onload = function() {
    setGame();
}

// Oyun tahtasını oluşturan işlev.
function setGame() {
    // HTML'de tahtayı oluştur ve tıklama olaylarını dinle.
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    // Belirli aralıklarla köstebek ve bitki ekleyen işlevleri çağır.
    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

// Rastgele bir kare seçen işlev.
function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

// Köstebek ekleyen işlev.
function setMole() {
    // Oyun bitti mi kontrol et.
    if (gameOver) {
        return;
    }
    // Eğer mevcut bir köstebek karesi varsa, onu temizle.
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    // Yeni bir köstebek oluştur ve rastgele bir kareye yerleştir.
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

// Bitki ekleyen işlev.
function setPlant() {
    // Oyun bitti mi kontrol et.
    if (gameOver) {
        return;
    }
    // Eğer mevcut bir bitki karesi varsa, onu temizle.
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    // Yeni bir bitki oluştur ve rastgele bir kareye yerleştir.
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

// Kare seçildiğinde gerçekleşen işlev.
function selectTile() {
    // Oyun bitti mi kontrol et.
    if (gameOver) {
        return;
    }
    // Köstebek karesine tıklanırsa, puanı artır.
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    }
    // Bitki karesine tıklanırsa, oyunu bitir ve skoru göster.
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
    }
}
