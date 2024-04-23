var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"]; // Oyun için kullanılacak şekerlerin renklerini içeren bir dizi
var board = []; // Oyun tahtasını temsil eden bir dizi
var rows = 9; // Oyun tahtasının satır sayısı
var columns = 9; // Oyun tahtasının sütun sayısı
var score = 0; // Oyuncunun skorunu tutan değişken

var currTile; // Sürüklenen şekerin mevcut konumunu tutan değişken
var otherTile; // Sürüklenen şekerin bırakılmak istendiği konumu temsil eden değişken

window.onload = function() { // Sayfa yüklendiğinde çalışacak fonksiyon
    startGame(); // Oyunu başlat
    // Belirli aralıklarla oyunun işleyişini sağlayan fonksiyonları çağır
    window.setInterval(function(){
        crushCandy(); // Üçlü eşleşmeleri kontrol edip şekerleri kır
        slideCandy(); // Boş alanları doldurmak için şekerleri kaydır
        generateCandy(); // Yeni şekerler üret
    }, 100); // 100 milisaniyede bir işlemleri gerçekleştir
}

function randomCandy() { // Rastgele bir şeker rengi seçen fonksiyon
    return candies[Math.floor(Math.random() * candies.length)]; // candies dizisinden rastgele bir şeker seç
}

function startGame() { // Oyunu başlatan fonksiyon
    for (let r = 0; r < rows; r++) { // Satırlar için döngü
        let row = []; // Satırı temsil eden bir dizi oluştur
        for (let c = 0; c < columns; c++) { // Sütunlar için döngü
            let tile = document.createElement("img"); // Yeni bir img elementi oluştur
            tile.id = r.toString() + "-" + c.toString(); // Her şeker için benzersiz bir ID oluştur
            tile.src = "./images/" + randomCandy() + ".png"; // Şekerin rastgele bir resmini ata

            // Sürükle-bırak işlemleri için olay dinleyicileri ekle
            tile.addEventListener("dragstart", dragStart); 
            tile.addEventListener("dragover", dragOver); 
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave); 
            tile.addEventListener("drop", dragDrop); 
            tile.addEventListener("dragend", dragEnd); 

            document.getElementById("board").append(tile); // Oyun tahtasına şekerleri ekle
            row.push(tile); // Şekeri satır dizisine ekle
        }
        board.push(row); // Satır dizisini oyun tahtası dizisine ekle
    }
}

function dragStart() { // Sürükleme işlemi başladığında çalışan fonksiyon
    currTile = this; // Sürüklenen şekerin mevcut konumunu kaydet
}

function dragOver(e) { // Sürüklenen nesne üzerine başka bir nesnenin sürüklendiğinde çalışan fonksiyon
    e.preventDefault(); // Varsayılan davranışı engelle
}

function dragEnter(e) { // Sürüklenen nesne bir hedefe girdiğinde çalışan fonksiyon
    e.preventDefault(); // Varsayılan davranışı engelle
}

function dragLeave() { // Sürüklenen nesne bir hedeften çıktığında çalışan fonksiyon

}

function dragDrop() { // Sürüklenen nesne bir hedefe bırakıldığında çalışan fonksiyon
    otherTile = this; // Şekerin bırakılmak istendiği konumu kaydet
}

function dragEnd() { // Sürükleme işlemi sona erdiğinde çalışan fonksiyon
    // Eğer sürüklenen veya bırakılmak istenen şeker boş bir alan ise, işlemi iptal et
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    // Şekerlerin koordinatlarını al
    let currCoords = currTile.id.split("-"); 
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    // Şekerlerin yan yana mı, yoksa üst üste mi olduğunu kontrol et
    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;
    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    // Şekerlerin yan yana veya üst üste olduğunu kontrol et
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    // Eğer şekerler yan yana veya üst üste ise
    if (isAdjacent) {
        // Şekerlerin resimlerini değiştir
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        // Yapılan hareketin geçerli olup olmadığını kontrol et
        let validMove = checkValid();
        // Eğer hareket geçerli değilse, şekerleri tekrar değiştir
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;    
        }
    }
}

function crushCandy() { // Şekerleri ezmek için kontrol eden fonksiyon
    crushThree(); // Üçlü eşleşmeleri kontrol et ve şekerleri kır
    document.getElementById("score").innerText = score; // Skoru güncelle
}

function crushThree() { // Üçlü eşleşmeleri kontrol eden fonksiyon
    // Satırlar boyunca döngü
    for (let r = 0; r < rows; r++) {
        // Sütunlar boyunca döngü, son iki sütunu geç
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            // Eğer üç şekerin rengi aynı ve boş bir şeker değilse
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                // Üç şekerin resmini boş bir şekerin resmiyle değiştir
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30; // Skoru artır
            }
        }
    }

    // Sütunlar boyunca döngü
    for (let c = 0; c < columns; c++) {
        // Satırlar boyunca döngü, son iki satırı geç
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            // Eğer üç şekerin rengi aynı ve boş bir şeker değilse
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                // Üç şekerin resmini boş bir şekerin resmiyle değiştir
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30; // Skoru artır
            }
        }
    }
}

function checkValid() { // Geçerli bir hareket olup olmadığını kontrol eden fonksiyon
    // Satırlar boyunca döngü
    for (let r = 0; r < rows; r++) {
        // Sütunlar boyunca döngü, son iki sütunu geç
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            // Eğer üç şekerin rengi aynı ve boş bir şeker değilse
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true; // Geçerli bir hareket varsa true döndür
            }
        }
    }

    // Sütunlar boyunca döngü
    for (let c = 0; c < columns; c++) {
        // Satırlar boyunca döngü, son iki satırı geç
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            // Eğer üç şekerin rengi aynı ve boş bir şeker değilse
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true; // Geçerli bir hareket varsa true döndür
            }
        }
    }

    return false; // Hiçbir geçerli hareket yoksa false döndür
}

function slideCandy() { // Şekerleri kaydırmak için fonksiyon
    // Sütunlar boyunca döngü
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1; // Kaydırma işlemi için indis belirle
        // Satırlar boyunca sondan başa doğru döngü
        for (let r = columns-1; r >= 0; r--) {
            // Eğer boş olmayan bir şeker ise
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src; // Şekeri bir alt satıra kaydır
                ind -= 1; // İndisi bir azalt
            }
        }

        // Kalan boş satırları boş şeker ile doldur
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy() { // Şeker üretmek için fonksiyon
    // Sütunlar boyunca döngü
    for (let c = 0; c < columns;  c++) {
        // Eğer ilk satırdaki bir hücre boş ise
        if (board[0][c].src.includes("blank")) {
            // Rastgele bir şeker üret
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}
