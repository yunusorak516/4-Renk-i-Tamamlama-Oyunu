// Oyun tahtasını temsil eden bir matris tanımlanır.
// Her bir hücre başlangıçta boş bir karakterle (' ') doldurulur.
var board;

// "O" sembolünü temsil eden oyuncu değişkeni.
var playerO = "O";

// "X" sembolünü temsil eden oyuncu değişkeni.
var playerX = "X";

// Mevcut oyuncuyu belirlemek için kullanılan değişken. Başlangıçta "O" oyuncusuyla başlar.
var currPlayer = playerO;

// Oyunun bitip bitmediğini belirten bayrak.
var gameOver = false;

// Sayfa yüklendiğinde oyun tahtasını ayarlayan fonksiyon.
window.onload = function() {
    setGame();
}

// Oyun tahtasını oluşturan fonksiyon.
function setGame() {
    // 3x3'lük bir matris oluşturulur ve boşluk karakterleriyle doldurulur.
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    // Oyun tahtasının HTML temsili oluşturulur.
    // Her bir hücre (kutu) oluşturulur, CSS sınıfları eklenir ve tıklanabilirlik özelliği eklenir.
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}

// Bir hücreye sembol ekleyen ve sırayı değiştiren fonksiyon.
function setTile() {
    // Oyun bittiyse işlem yapılmaz.
    if (gameOver) {
        return;
    }

    // Tıklanan hücrenin koordinatları alınır.
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // Seçilen hücre boş değilse işlem yapılmaz.
    if (board[r][c] != ' ') { 
        return;
    }
    
    // Seçilen hücreye mevcut oyuncunun sembolü eklenir.
    board[r][c] = currPlayer; 
    this.innerText = currPlayer; 

    // Sıra diğer oyuncuya geçer.
    if (currPlayer == playerO) {
        currPlayer = playerX;
    }
    else {
        currPlayer = playerO;
    }

    // Kazanan kontrol edilir.
    checkWinner();
}

// Kazananı kontrol eden fonksiyon.
function checkWinner() {
    // Satırların kontrolü yapılır.
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            // Kazanan satır belirlenir ve ilgili hücrelere "winner" sınıfı eklenir.
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    // Sütunların kontrolü yapılır.
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            // Kazanan sütun belirlenir ve ilgili hücrelere "winner" sınıfı eklenir.
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    // Çapraz kontrol yapılır.
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        // Sol üstten sağ alta doğru olan çapraz için kazanan belirlenir ve ilgili hücrelere "winner" sınıfı eklenir.
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    // Diğer çapraz kontrol yapılır.
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        // Sağ üstten sol alta doğru olan çapraz için kazanan belirlenir ve ilgili hücrelere "winner" sınıfı eklenir.
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");

        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        gameOver = true;
        return;
    }
}
