function setFlag() {
    if (flagEnabled) { // Bayrak modu etkinse
        flagEnabled = false; // Bayrak modunu kapat
        document.getElementById("flag-button").style.backgroundColor = "lightgray"; // Bayrak butonunun arka plan rengini değiştir
    }
    else { // Bayrak modu etkin değilse
        flagEnabled = true; // Bayrak modunu aç
        document.getElementById("flag-button").style.backgroundColor = "darkgray"; // Bayrak butonunun arka plan rengini değiştir
    }
}

function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) { // Oyun bitti veya karo tıklanmışsa
        return; // İşlemi sonlandır
    }

    let tile = this; // Tıklanan karo
    if (flagEnabled) { // Bayrak modu etkinse
        if (tile.innerText == "") { // Karo boşsa
            tile.innerText = "🚩"; // Karoya bayrak ikonunu ekle
        }
        else if (tile.innerText == "🚩") { // Karo bayraklıysa
            tile.innerText = ""; // Bayrağı kaldır
        }
        return; // İşlemi sonlandır
    }

    if (minesLocation.includes(tile.id)) { // Tıklanan karo mayın içeriyorsa
        gameOver = true; // Oyunu bitir
        revealMines(); // Mayınları göster
        return; // İşlemi sonlandır
    }

    let coords = tile.id.split("-"); // Karonun koordinatlarını ayır
    let r = parseInt(coords[0]); // Satır
    let c = parseInt(coords[1]); // Sütun
    checkMine(r, c); // Mayın kontrolü yap
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) { // Mayın varsa
                tile.innerText = "💣"; // Karoya bomba ikonunu ekle
                tile.style.backgroundColor = "red"; // Karonun arka plan rengini kırmızı yap
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) { // Geçersiz konum kontrolü
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) { // Karonun zaten tıklanıp tıklanmadığını kontrol et
        return;
    }

    board[r][c].classList.add("tile-clicked"); // Karoyu tıklanmış olarak işaretle
    tilesClicked += 1; // Tıklanan karo sayısını arttır

    let minesFound = 0; // Bulunan mayın sayısı

    minesFound += checkTile(r - 1, c - 1); // Sol üst
    minesFound += checkTile(r - 1, c); // Üst
    minesFound += checkTile(r - 1, c + 1); // Sağ üst

    minesFound += checkTile(r, c - 1); // Sol
    minesFound += checkTile(r, c + 1); // Sağ

    minesFound += checkTile(r + 1, c - 1); // Sol alt
    minesFound += checkTile(r + 1, c); // Alt
    minesFound += checkTile(r + 1, c + 1); // Sağ alt

    if (minesFound > 0) { // Etrafta mayın varsa
        board[r][c].innerText = minesFound; // Karoya bulunan mayın sayısını yaz
        board[r][c].classList.add("x" + minesFound.toString()); // Karoya mayın sayısına göre bir stil sınıfı ekle
    }
    else { // Etrafta mayın yoksa
        board[r][c].innerText = ""; // Karoyu boş bırak

        // Komşu karoları kontrol et
        checkMine(r - 1, c - 1); // Sol üst
        checkMine(r - 1, c); // Üst
        checkMine(r - 1, c + 1); // Sağ üst

        checkMine(r, c - 1); // Sol
        checkMine(r, c + 1); // Sağ

        checkMine(r + 1, c - 1); // Sol alt
        checkMine(r + 1, c); // Alt
        checkMine(r + 1, c + 1); // Sağ alt
    }

    if (tilesClicked == rows * columns - minesCount) { // Tüm boş karolar tıklandıysa
        document.getElementById("mines-count").innerText = "Cleared"; // Mayın sayısını temizlendi olarak güncelle
        gameOver = true; // Oyunu bitir
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) { // Geçersiz konum kontrolü
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) { // Mayın kontrolü
        return 1;
    }
    return 0;
}
