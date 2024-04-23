// Oyuncunun seçimi için değişken
var you;

// Oyuncunun puanı
var yourScore = 0;

// Bilgisayarın seçimi için değişken
var opponent;

// Bilgisayarın puanı
var opponentScore = 0;

// Taş, kağıt, makas seçenekleri
var choices = ["taş", "kağıt", "makas"];

// Sayfa yüklendiğinde oyunu ayarlayan fonksiyon
window.onload = function() {
    // Her seçenek için bir resim oluştur
    for (let i = 0; i < 3; i++) {
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = choices[i] + ".png";
        choice.addEventListener("click", selectChoice);
        document.getElementById("seçenekler").append(choice);
    }
}

// Oyuncunun seçimini işleyen fonksiyon
function selectChoice() {
    // Oyuncunun seçimini al
    you = this.id;
    // Oyuncunun seçimini göstermek için resmi güncelle
    document.getElementById("sizin-seçiminiz").src = you + ".png";

    // Bilgisayarın seçimini rastgele yap
    opponent = choices[Math.floor(Math.random() * 3)];
    // Bilgisayarın seçimini göstermek için resmi güncelle
    document.getElementById("rakibin-seçimi").src = opponent + ".png";

    // Kazananı belirle ve puanları güncelle
    if (you == opponent) {
        yourScore += 1;
        opponentScore += 1;
    }
    else {
        if (you == "taş") {
            if (opponent == "makas") {
                yourScore += 1;
            }
            else if (opponent == "kağıt") {
                opponentScore += 1;
            }
        }
        else if (you == "makas") {
            if (opponent == "kağıt") {
                yourScore += 1;
            }
            else if (opponent == "taş") {
                opponentScore += 1;
            }
        }
        else if (you == "kağıt") {
            if (opponent == "taş") {
                yourScore += 1;
            }
            else if (opponent == "makas") {
                opponentScore += 1;
            }
        }
    }

    // Yeni puanları ekrana yazdır
    document.getElementById("sizin-puanınız").innerText = yourScore;
    document.getElementById("rakibin-puanı").innerText = opponentScore;
}
