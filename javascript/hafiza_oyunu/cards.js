var errors = 0; // Hata sayısını saklamak için bir değişken.
var cardList = [ // Kullanılacak kartların listesi.
    "darkness", // Karanlık
    "double", // Çift
    "fairy", // Peri
    "fighting", // Dövüş
    "fire", // Ateş
    "grass", // Çimen
    "lightning", // Şimşek
    "metal", // Metal
    "psychic", // Psikik
    "water" // Su
]

var cardSet; // Karıştırılmış kartların saklanacağı set.
var board = []; // Oyun tahtasını temsil eden bir matris.
var rows = 4; // Tahtadaki satır sayısı.
var columns = 5; // Tahtadaki sütun sayısı.

var card1Selected; // İlk seçilen kart.
var card2Selected; // İkinci seçilen kart.

window.onload = function() { // Sayfa yüklendiğinde çalışacak olan fonksiyon.
    shuffleCards(); // Kartları karıştır.
    startGame(); // Oyunu başlat.
}

function shuffleCards() { // Kartları karıştıran fonksiyon.
    cardSet = cardList.concat(cardList); // Kart listesini kopyalayarak set oluştur.
    console.log(cardSet); // Karıştırılmadan önce kart setini konsola yazdır.
    for (let i = 0; i < cardSet.length; i++) { // Kartların dizilimini karıştıran döngü.
        let j = Math.floor(Math.random() * cardSet.length); // Rastgele bir kartın indisini seç.
        let temp = cardSet[i]; // Geçici bir değişkene mevcut kartı sakla.
        cardSet[i] = cardSet[j]; // Mevcut kartın yerine rastgele seçilen kartı koy.
        cardSet[j] = temp; // Rastgele seçilen kartın yerine mevcut kartı koy.
    }
    console.log(cardSet); // Kartların karıştırıldıktan sonraki halini konsola yazdır.
}

function startGame() { // Oyunu başlatan fonksiyon.
    for (let r = 0; r < rows; r++) { // Satırları oluşturan döngü.
        let row = []; // Satırı temsil eden bir dizi oluştur.
        for (let c = 0; c < columns; c++) { // Sütunları oluşturan döngü.
            let cardImg = cardSet.pop(); // Kart setinden bir kart çıkar ve resmini al.
            row.push(cardImg); // Kart resmini satır dizisine ekle.

            let card = document.createElement("img"); // Yeni bir img elementi oluştur.
            card.id = r.toString() + "-" + c.toString(); // Kartın id'sini belirle.
            card.src = cardImg + ".jpg"; // Kartın görüntüsünü belirle.
            card.classList.add("card"); // Kartın CSS sınıfını ayarla.
            card.addEventListener("click", selectCard); // Kart tıklandığında selectCard fonksiyonunu çağır.
            document.getElementById("board").append(card); // Kartı tahtaya ekle.
        }
        board.push(row); // Oluşturulan satırı tahta matrisine ekle.
    }

    console.log(board); // Tahtayı konsola yazdır.
    setTimeout(hideCards, 1000); // Kartları gizlemek için bir saniye beklet.
}

function hideCards() { // Kartları gizleyen fonksiyon.
    for (let r = 0; r < rows; r++) { // Satırları döngüye al.
        for (let c = 0; c < columns; c++) { // Sütunları döngüye al.
            let card = document.getElementById(r.toString() + "-" + c.toString()); // İlgili kartı seç.
            card.src = "back.jpg"; // Kartın görüntüsünü arkaya çevir.
        }
    }
}

function selectCard() { // Kart seçildiğinde çağrılan fonksiyon.
    if (this.src.includes("back")) { // Kartın arkası görünüyorsa işlem yap.
        if (!card1Selected) { // Eğer birinci kart seçilmemişse,
            card1Selected = this; // Seçilen kartı birinci kart olarak ata.

            let coords = card1Selected.id.split("-"); // Kartın konumunu al.
            let r = parseInt(coords[0]); // Satırı al.
            let c = parseInt(coords[1]); // Sütunu al.

            card1Selected.src = board[r][c] + ".jpg"; // Kartın görüntüsünü belirle.
        } else if (!card2Selected && this != card1Selected) { // Eğer ikinci kart seçilmemiş ve seçilen kart birinci kart değilse,
            card2Selected = this; // Seçilen kartı ikinci kart olarak ata.

            let coords = card2Selected.id.split("-"); // Kartın konumunu al.
            let r = parseInt(coords[0]); // Satırı al.
            let c = parseInt(coords[1]); // Sütunu al.

            card2Selected.src = board[r][c] + ".jpg"; // Kartın görüntüsünü belirle.
            setTimeout(update, 1000); // Bir saniye sonra kontrol et.
        }
    }
}

function update() { // Seçilen kartları kontrol eden fonksiyon.
    if (card1Selected.src != card2Selected.src) { // Kartlar eşleşmiyorsa,
        card1Selected.src = "back.jpg"; // Birinci kartın görüntüsünü arkaya çevir.
        card2Selected.src = "back.jpg"; // İkinci kartın görüntüsünü arkaya çevir.
        errors += 1; // Hata sayısını bir artır.
        document.getElementById("errors").innerText = errors; // Hata sayısını ekranda güncelle.
    }

    card1Selected = null; // Birinci kartı sıfırla.
    card2Selected = null; // İkinci kartı sıfırla.
}
