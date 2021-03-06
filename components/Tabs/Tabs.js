class Tabs {

  constructor(tabElement) {

    this.tabElement = tabElement;

    this.tabs = tabElement.querySelectorAll('.tab');

    // Map over the array and convert each tab reference into a new TabLink object.  Pass in the tab object to the Tabs class.  After you finish this line of code, it's time to build out your TabLink class at the top of the page!
    this.tabs = Array.from(this.tabs).map(tab => new TabLink(tab));

    this.tabs[0].selectTab();

  }

  addCard(card, tabID) {

    this.tabs[0].addCard(card);
    let correctTab = this.tabs.find(function(tab) {
      return tab.tabData == tabID;
    });
    correctTab.addCard(card);

  }

  addTab(tab) {

    this.tabs.push(tab);

  }

}

class TabLink {
  constructor(tabElement){
    // assign this.tabElement to the tabElement DOM reference
    this.tabElement = tabElement;

    // Get the `data-tab` value from this.tabElement and store it here
    this.tabData = tabElement.dataset.tab;

    // We need to find out if a user clicked 'all' cards or a specific category.  Follow the instructions below to accomplish this task:

    // Check to see if this.tabData is equal to 'all'
    if(this.tabData == 'all'){
      // If `all` is true, select all cards regardless of their data attribute values
      this.cards = document.querySelectorAll('.card');
    } else {
      // else if `all` is false, only select the cards with matching this.tabData values
      this.cards = document.querySelectorAll(`.card[data-tab='${this.tabData}']`);

    }

     // Map over the newly converted NodeList we just created in our if statement above. Convert each this.cards element into a new instance of the TabCard class. Pass in a card object to the TabCard class.
    this.cards = Array.from(this.cards).map(card => new TabCard(card));

    // Add a click event that invokes this.selectTab
    this.tabElement.addEventListener('click', () => this.selectTab());

  }

  selectTab(){

    // Select all elements with the .tab class on them
    const tabs = document.querySelectorAll('.tab');

    // Iterate through the NodeList removing the .active-tab class from each element
    tabs.forEach(tab => tab.classList.remove('active-tab'));

    // Select all of the elements with the .card class on them
    const cards = document.querySelectorAll('.card');

    // Iterate through the NodeList setting the display style each one to 'none'
    cards.forEach(card => TweenMax.to(card, 1, {scale: 0, onComplete: () => {

      // Add a class of ".active-tab" to this.tabElement
      this.tabElement.classList.add('active-tab');

      card.style.display = "none";

      // Notice we are looping through the this.cards array and invoking selectCard() from the TabCard class. Just un-comment the code and study what is happening here.
      this.cards.forEach(card => {
        card.selectCard();
        TweenMax.to(card.cardElement, 1, {scale: 1});
      });

    }}));

  }

  addCard(card) {

    this.cards.push(new TabCard(card));

  }

}

class TabCard {
  constructor(cardElement){
    // Assign this.cardElement to the cardElement DOM reference
    this.cardElement = cardElement;
  }
  selectCard(){
    // Update the style of this.cardElement to display = "flex"
    this.cardElement.style.display = "flex";
  }

}

let tabs = new Tabs(document.querySelector('.tabs'));
