 const computerChoiseDisplay= document.getElementById('computer-choise')
 const userChoiseDisplay = document.getElementById('user-choise')
 const resultDisplay =  document.getElementById('result')   
 const possibleChoise=document.querySelectorAll('button')
 let userChoice
let computerChoice
let result


 possibleChoise.forEach(possibleChoise => possibleChoise.addEventListener('click',(e)=>{
    userChoice=e.target.id
    userChoiseDisplay.innerHTML=userChoice
    generateComputerChoice()
    getResult()
 }))
 function   generateComputerChoice(){
    const randomNumber= Math.floor (Math.random() * possibleChoise.length+1)
    if(randomNumber===1){
        computerChoice='Taş'
    }
    if(randomNumber===2){
        computerChoice='Kağit'
    }
    if(randomNumber===3){
        computerChoice='Makas'
    }
    computerChoiseDisplay.innerHTML=computerChoice

 }
 function getResult(){
    if(computerChoice===userChoice){
        result="Berabere!"
    }
    if(computerChoice==='Tas'&&userChoice==='Makas')
    result="Maalesef.. Kaybettiniz"

    if(computerChoice==='Tas'&&userChoice==='Kağit')
    result="Tebrikler.. Kazandınız!"

    if(computerChoice==='Kağit'&&userChoice==='Makas')
    result="Tebrikler.. Kazandınız!"

    if(computerChoice==='Kağit'&&userChoice==='Taş')
    result="Maalesef.. Kaybettiniz"

    if(computerChoice==='makas'&&userChoice==='Kağit')
    result="Maalesef.. Kaybettiniz"

    if(computerChoice==='makas'&&userChoice==='Taş')
    result="Tebrikler.. kazandınız"
resultDisplay.innerHTML=result

 }
