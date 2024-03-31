//To get the corresponding codes of cryptocurrencies
//The following codes are used in API to fetch the data of different cryptocurrencies
let currencyCode = {
    "Bitcoin"          : ["BTC"  , 'images/bitcoin.png'],
    "Ethereum"         : ["ETH"  , 'images/ethereum.png'],
    "Binancecoin"     : ["BNB"  , 'images/binancecoin.png'],
    "Cardano"          : ["ADA"  , 'images/cardano.png'],
    "Solana"           : ["SOL"  , 'images/solana.png'],
    "Ripple"           : ["XRP"  , 'images/ripple.png'],
    "Polkadot"         : ["DOT"  , 'images/polkadot.png'],
    "Dogecoin"        : ["DOGE" , 'images/dogecoin.png'],
    "Avalanche"        : ["AVAX" , 'images/avalanche.png'],
    "Terra"            : ["LUNA" , 'images/terra.png'],
    "Polygon"          : ["MATIC", 'images/polygon.png'],
    "Litecoin"         : ["LTC"  , 'images/litecoin.png'],
    "Bitcoincash"     : ["BCH"  , 'images/bitcoincash.png'],
    "Chainlink"        : ["LINK" , 'images/chainlink.png'],
    "Algorand"         : ["ALGO" , 'images/algorand.png'],
    "Uniswap"          : ["UNI"  , 'images/uniswap.png'],
    "Tron"             : ["TRX"  , 'images/tron.png'],
    "Decentraland"     : ["MANA" , 'images/decentraland.png'],
    "Cosmos"           : ["ATOM" , 'images/cosmos.png'],
}



//Crypto Saved By User In Watchlist
const savedCurrencyNames = [];





//Check if the CryptoName Entered by User is Correct
const is_match = (currencyName) =>{
    for(let key in currencyCode){
        if(key === currencyName){
            return 1;
        }
    }
    return 0;
}





//Prototype of list elements
function addToList(currencyName){
    let divElement = document.createElement('div');
    divElement.classList.add('watchlist-crypto-box');
    let parent = document.getElementsByClassName('watchlist-main-box')[0];
    parent.appendChild(divElement);
    divElement.innerHTML = `
                            <div class="watchlist-name-img-box">
                                <img id='empty-img' class="crypto-img watchlist-crypto-img" src="" alt="">
                                <span id='empty-span' class="crypto-name watchlist-crypto-name"></span>
                            </div>
                            <h3 id='empty-h3' class="crypto-price watchlist-crypto-price"></h3>
                            <i id=empty-i></i>
                        `;
    let img = document.getElementById('empty-img');
    let span = document.getElementById('empty-span');
    let h3 = document.getElementById('empty-h3');
    let i = document.getElementById('empty-i');
    img.removeAttribute('id');
    span.removeAttribute('id');
    h3.removeAttribute('id');
    img.setAttribute('src', currencyCode[currencyName][1]);
    img.setAttribute('alt', currencyName);
    span.textContent = currencyName;
    h3.setAttribute('id', 'id-' + currencyCode[currencyName][0]);
    i.setAttribute('id', 'i-id-' + currencyCode[currencyName][0]);
}





//Add Item to the list
function addItem(currencyName){
    savedCurrencyNames.push(currencyName);
    addToList(currencyName);

    //event listener to remove an element form the list 
    document.querySelector(`#i-id-`+currencyCode[currencyName][0]).addEventListener('click', ()=>{
        localStorage.removeItem(currencyName);
        for(let i = 0; i < savedCurrencyNames.length; i++){
            if(savedCurrencyNames[i] === currencyName){
                savedCurrencyNames.splice(i, 1);
            }
        }
        let ElementNode = document.getElementById('id-'+currencyCode[currencyName][0]);
        let parentElement = ElementNode.parentElement;
        parentElement.remove();
    })
}





//Make the code works even if the user input consists 
//1. Extra white spaces
//2. All small letters
//3. All capital letters
//4. combinaton of small and capitals
function formatString(inputString) {
    // Split the string into words
    const words = inputString.split(' ');

    // Remove leading and trailing whitespace from each word, convert to lowercase
    const formattedWords = words.map(word => word.trim().toLowerCase());

    // Join the formatted words into a single string
    const formattedString = formattedWords.join('');

    // Capitalize the first letter of the formatted string
    const firstLetterCapitalized = formattedString.charAt(0).toUpperCase() + formattedString.slice(1);

    return firstLetterCapitalized;
}






//Event listener to be excecuted on click
let input = document.getElementById('addToWatchlist-Subdiv').firstElementChild;
let button = input.nextElementSibling;
button.addEventListener('click', ()=>{
    let currencyName = formatString(input.value);
    if(!is_match(currencyName)){
        input.value = "Invalid code !";
        return;
    }
    input.value = "";
    localStorage.setItem(currencyName, 'cryptoCurrency');
    addItem(currencyName);
})




//API URL
let halfURL = 'https://api.binance.com/api/v3/ticker/price?symbol=';

//Fetch the Price Every Second to keep the user Updated
let intervalForCryptoId = setInterval(() => {
    async function fetchPrice() {
        for (let i = 0; i < savedCurrencyNames.length; i++) {
            let code = currencyCode[savedCurrencyNames[i]][0];
            let url = halfURL + code + "USDT";
            let newId = document.getElementById('id-' + code);
            let p = await fetch(url);
            let res = await p.json();
            if(newId != null) newId.innerHTML = "$" + parseFloat(res.price).toFixed(4) ;
        }
    }
    fetchPrice();
}, 1000);



//to delete the Watchlist
document.addEventListener("DOMContentLoaded", function() {
    // Get the clear button element
    const clearButton = document.getElementById("watchlist-delete");

    // Add click event listener to the clear button
    clearButton.addEventListener("click", function() {
        // Clear local storage
        localStorage.clear();
        // Reload the page
        location.reload();
    });
});



//Store the Wathlist in local storage, so that the list won't vanish on reload
(function () {
    for (let x in localStorage) {
        let value = localStorage.getItem(x);
        if (value === 'cryptoCurrency') {
           addItem(x);
        }
    }
})();





