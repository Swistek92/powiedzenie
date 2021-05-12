import {Quote} from './Quote.js'

class Game {
  currentStep=0;
  laststep=7;

  quotes = [{
    text: 'bedzie was pis ruchal w dupe',
    category: 'powiedzenie',
}, 
];

  constructor({ 
    letterWrapper, 
    categoryWrapper, 
    wordWrapper, 
    outputWrapper, 
  }) {
    this.letterWrapper = letterWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper =wordWrapper;
    this.outputWrapper =outputWrapper;

    const {text, category} = this.quotes[Math.floor(Math.random()* this.quotes.length )];
    this.categoryWrapper.innerHTML = category;
    this.Quote = new Quote(text);

  }
  guess(letter, event) {
    event.target.disabled = true;
    if(this.Quote.guess(letter)) {
      this.drawQuote();
    }else {
      this.currentStep++;
      document.getElementsByClassName('step')[this.currentStep].style.opacity =1;
      if(this.currentStep==this.laststep){
        this.loosing();
      }
    }
    
  }

  drawLetters () {
    for (let i=0; i<26; i++){ 
      const label = (i+10).toString(36);
      const button = document.createElement('button');
      button.innerHTML = label; 
      button.addEventListener('click', (event) => this.guess(label, event))
      this.letterWrapper.appendChild(button);
  }
}

drawQuote (){
  const content = this.Quote.getContent();
    this.wordWrapper.innerHTML= content;
    if(!content.includes('_')){
      this.winning();
    }
}
  start() {
    document.getElementsByClassName('step')[this.currentStep].style.opacity =1;
    this.drawLetters();
    this.drawQuote();
  }

winning(){
  this.wordWrapper.innerHTML = 'GRATUALCJE'
  this.letterWrapper.innerHTML='';
}

loosing(){
  this.wordWrapper.innerHTML = 'przegrałeś i z gry wyleciałeś'
  this.letterWrapper.innerHTML='';
}
  
}
const game = new Game({
  letterWrapper: document.getElementById('letters'),
  categoryWrapper: document.getElementById('category'),
  wordWrapper: document.getElementById('word'),
  outputWrapper: document.getElementById('output'),
});

game.start();