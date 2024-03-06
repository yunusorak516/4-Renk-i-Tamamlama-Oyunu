const cardArray = 
[
    {name: 'Kartal', img: 'images/Kartal.png'},
    {name: 'keçi', img: 'images/keçi.png'},
    {name: 'ördek', img: 'images/ördek.png'},
    {name: 'yilan', img: 'images/yilan.png'},
    {name: 'zebra', img: 'images/zebra.png'},
    {name: 'zürafa', img: 'images/zürafa.png'},
    {name: 'Kartal', img: 'images/Kartal.png'},
    {name: 'keçi', img: 'images/keçi.png'},
    {name: 'ördek', img: 'images/ördek.png'},
    {name: 'yilan', img: 'images/yilan.png'},
    {name: 'zebra', img: 'images/zebra.png'},
    {name: 'zürafa', img: 'images/zürafa.png'},
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
let score = document.getElementById('score')
let cardChosen = []
let cardChosenID = []
const cardWon = []


function createBoard()
{
    for(let i=0;i<cardArray.length;i++)
    {
        const card = document.createElement('img')
        card.setAttribute('src' , 'images/blank.jpg')
        card.setAttribute('data-id' , i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
}
createBoard()

function checkMatch()
{
    const cards = document.querySelectorAll('#grid img')

    const optionOneID = cardChosenID[0]
    const optionTwoID = cardChosenID[1]

    if(cardChosen[0] === cardChosen[1])
    {
        cards[optionOneID].setAttribute('src', 'images/white.png')
        cards[optionTwoID].setAttribute('src', 'images/white.png')
        cards[optionOneID].removeEventListener('click', flipCard)
        cards[optionTwoID].removeEventListener('click', flipCard)
        cardWon.push(cardChosen)
    }
    else
    {
        cards[optionOneID].setAttribute('src', 'images/blank.jpg')
        cards[optionTwoID].setAttribute('src', 'images/blank.jpg')
    }

    score.textContent = cardWon.length
    cardChosen = []
    cardChosenID = []
    if(cardWon.length == cardArray.length/2)
    {
        score.innerHTML = 'Tebrikler Kazandınız!'
    }

}

function flipCard()
    {
        const cardID = this.getAttribute('data-id')
        cardChosen.push(cardArray[cardID].name)
        cardChosenID.push(cardID)
        this.setAttribute('src', cardArray[cardID].img)

        if(cardChosen.length ==2)
        {
            setTimeout(checkMatch, 500)
        }
    }
    