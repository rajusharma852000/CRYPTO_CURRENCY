let currencyCode = {
    "BTC" : ["Bitcoin", 'images/bitcoin.png'],
    "ETH" : ["Ethereum", 'images/ethereum.png'],
    "BNB" : ["Binance Coin", 'images/binancecoin.png'],
    "ADA" : ["Cardano", 'images/cardano.png'],
    "SOL" : ["Solana", 'images/solana.png'],
    "XRP" : ["Ripple", 'images/ripple.png'],
    "DOT" : ["Polkadot", 'images/polkadot.png'],
    "DOGE": ["Doge Coin", 'images/dogecoin.png'],
    "AVAX": ["Avalanche", 'images/avalanche.png'],
    "LUNA": ["Terra", 'images/terra.png'],
    "MATIC":[ "Polygon", 'images/polygon.png'],
    "LTC" : ["Litecoin", 'images/litecoin.png'],
    "BCH" : ["Bitcoin Cash", 'images/bitcoincash.png'],
    "LINK": ["Chainlink", 'images/chainlink.png'],
    "ALGO": ["Algorand", 'images/algorand.png'],
    "UNI" : ["Uniswap", 'images/uniswap.png'],
    "TRX" : ["Tron", 'images/tron.png'],
    "MANA": ["Decentraland", 'images/decentraland.png'],
    "ATOM": ["Cosmos", 'images/cosmos.png'],
}
const savedCodes = [];

const is_match = (code) =>{
    for(let key in currencyCode){
        if(key === code){
            return 1;
        }
    }
    return 0;
}
function addToList(code){
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
    img.setAttribute('src', currencyCode[code][1]);
    img.setAttribute('alt', currencyCode[code][0]);
    span.textContent = currencyCode[code][0];
    h3.setAttribute('id', 'id-' + code);
    i.setAttribute('id', 'i-id-' + code);
}

function addItem(code){
    savedCodes.push(code);
    addToList(code);

    document.querySelector(`#i-id-`+code).addEventListener('click', ()=>{
        localStorage.removeItem(code);
        for(let i = 0; i < savedCodes.length; i++){
            if(savedCodes[i] === code){
                savedCodes.splice(i, 1);
            }
        }
        let ElementNode = document.getElementById('id-'+code);
        let parentElement = ElementNode.parentElement;
        parentElement.remove();
    })
}
let input = document.getElementById('addToWatchlist-Subdiv').firstElementChild;
let button = input.nextElementSibling;
button.addEventListener('click', ()=>{
    let code = input.value;
    if(!is_match(code)){
        input.value = "Invalid code !";
        return;
    }
    input.value = "";
    localStorage.setItem(code, 'cryptoCurrency');
    addItem(code);
})

let halfURL = 'https://api.binance.com/api/v3/ticker/price?symbol=';
let intervalForCryptoId = setInterval(() => {
    async function fetchPrice() {
        for (let i = 0; i < savedCodes.length; i++) {
            let url = halfURL + savedCodes[i] + "USDT";
            let newId = document.getElementById('id-' + savedCodes[i]);
            let p = await fetch(url);
            let res = await p.json();
            if(newId != null) newId.innerHTML = "$" + parseFloat(res.price).toFixed(4) ;
        }
    }
    fetchPrice();
}, 1000);

(function () {
    for (let x in localStorage) {
        let value = localStorage.getItem(x);
        if (value === 'cryptoCurrency') {
           addItem(x);
        }
    }
})();








