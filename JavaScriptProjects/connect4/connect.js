// Oyuncuların sembollerini tanımla
var playerRed = "R"; // Kırmızı oyuncunun sembolü
var playerYellow = "Y"; // Sarı oyuncunun sembolü
var currPlayer = playerRed; // Başlangıçta sıra kırmızı oyuncuda

// Oyun durumu ve tahta
var gameOver = false; // Oyunun bitip bitmediğini kontrol eden değişken
var board; // Oyun tahtası

// Tahtanın boyutları
var rows = 6; // Satır sayısı
var columns = 7; // Sütun sayısı
var currColumns = []; // Her sütundaki mevcut boş hücre sayısı

// Sayfa yüklendiğinde oyunu başlat
window.onload = function() {
    setGame();
}

// Oyunu başlatan fonksiyon
function setGame() {
    board = []; // Tahtayı temsil eden dizi
    currColumns = [5, 5, 5, 5, 5, 5, 5]; // Her sütundaki boş hücre sayısını takip eden dizi

    // Tahtayı oluştur
    for (let r = 0; r < rows; r++) {
        let row = []; // Satırı temsil eden dizi
        for (let c = 0; c < columns; c++) {
            row.push(' '); // Her hücreyi boş olarak ayarla
            let tile = document.createElement("div"); // Yeni bir hücre div elementi oluştur
            tile.id = r.toString() + "-" + c.toString(); // Hücrenin id'sini belirle
            tile.classList.add("tile"); // Hücreye tile class'ını ekle
            tile.addEventListener("click", setPiece); // Hücreye tıklandığında setPiece fonksiyonunu çağır
            document.getElementById("board").append(tile); // Hücreyi tahtaya ekle
        }
        board.push(row); // Satırı tahtaya ekle
    }
}

// Oyuncunun sembolünü tahtaya yerleştiren fonksiyon
function setPiece() {
    if (gameOver) { // Oyun bitti mi kontrol et
        return; // Oyun bitmişse işlem yapma
    }

    let coords = this.id.split("-"); // Tıklanan hücrenin koordinatlarını al
    let r = parseInt(coords[0]); // Satır numarası
    let c = parseInt(coords[1]); // Sütun numarası

    r = currColumns[c]; // Sütundaki mevcut boş hücrenin satır numarasını al

    if (r < 0) { // Eğer sütun doluysa
        return; // İşlem yapma
    }

    // Oyuncunun sembolünü tahtaya yerleştir
    board[r][c] = currPlayer; 
    let tile = document.getElementById(r.toString() + "-" + c.toString()); // Yerleştirilen hücreyi seç
    if (currPlayer == playerRed) { // Eğer sıra kırmızı oyuncuda ise
        tile.classList.add("red-piece"); // Kırmızı renkte bir sembol ekle
        currPlayer = playerYellow; // Sırayı sarı oyuncuya geçir
    }
    else { // Eğer sıra sarı oyuncuda ise
        tile.classList.add("yellow-piece"); // Sarı renkte bir sembol ekle
        currPlayer = playerRed; // Sırayı kırmızı oyuncuya geçir
    }

    r -= 1; // Bir alt satıra geç
    currColumns[c] = r; // Sütundaki mevcut boş hücrenin satır numarasını güncelle

    checkWinner(); // Kazananı kontrol et
}

// Kazananı kontrol eden fonksiyon
function checkWinner() {
    // Yatay kontrol
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') { // Eğer hücre boş değilse
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) { // Üst üste aynı semboller varsa
                    setWinner(r, c); // Kazananı ilan et
                    return; // Fonksiyondan çık
                }
            }
         }
    }

    // Dikey kontrol
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') { // Eğer hücre boş değilse
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) { // Yan yana aynı semboller varsa
                    setWinner(r, c); // Kazananı ilan et
                    return; // Fonksiyondan çık
                }
            }
        }
    }

    // Çapraz kontrol (soldan sağa)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') { // Eğer hücre boş değilse
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) { // Çapraz olarak aynı semboller varsa
                    setWinner(r, c); // Kazananı ilan et
                    return; // Fonksiyondan çık
                }
            }
        }
    }

    // Çapraz kontrol (sağdan sola)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') { // Eğer hücre boş değilse
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) { // Çapraz olarak aynı semboller varsa
                    setWinner(r, c); // Kazananı ilan et
                    return; // Fonksiyondan çık
                }
            }
        }
    }
}

// Kazananı belirleyen ve oyunu bitiren fonksiyon
function setWinner(r, c) {
    let winner = document.getElementById("winner"); // Kazananı gösteren elementi seç
    if (board[r][c] == playerRed) { // Eğer kırmızı oyuncu kazandıysa
        winner.innerText = "Kırmızı Kazandı"; // Kırmızı oyuncunun kazandığını göster
    } else { // Eğer sarı oyuncu kazandıysa
        winner.innerText = "Sarı Kazandı"; // Sarı oyuncunun kazandığını göster
    }
    gameOver = true; // Oyunu bitir
}
