function DisplayLiveTranscript(){
    let liveTranscriptArray = [
        `Welcome to the world of crypto...`,
        `The prices are live and updates every second...`,
        `Your favourite crypto's are just a click away...`,
        `Create Watchlist using Watchlist tab (present at the top)...`,
        `Seach for your favourite crypto's...`,
        `Watchlist tab can also be used to check the already existing watchlist...`,
        `Investment in crypto can be risky, kindly research before investing...`,
        `Sign Up to save your watchlists...`,
        `Have any feedback for us, feel free to share...`,
        `Feedbacks are always welcome...`,
    ]
    let para = document.getElementById('live-transcript');
    async function liveTranscript(){
        for(let value of liveTranscriptArray){
            para.textContent = "";
            let i = 0;
            await new Promise((resolve)=>{
                let id1 = setInterval(()=>{
                    if(i < value.length){
                        para.textContent += value[i++];
                    }
                    else{
                        setTimeout(()=>{
                            clearInterval(id1);
                            resolve(1);
                        },1000)
                    }
                }, 30)
            })
            .then(null, (error)=>{
                console.log("Error: ", error);
            })
        }
        liveTranscript();
    }
    liveTranscript();
}
DisplayLiveTranscript();



const cryptoAbbreviations = ["BTC","ETH","BNB","ADA","SOL","XRP","DOT","DOGE",
"AVAX","LUNA","MATIC","LTC","BCH","LINK","ALGO","UNI","TRX","MANA","ATOM"];

var halfURL = 'https://api.binance.com/api/v3/ticker/price?symbol=';
let intervalForCryptoId = setInterval(() => {
    async function fetchPrice() {
        for (let i = 0; i < cryptoAbbreviations.length; i++) {
            let url = halfURL + cryptoAbbreviations[i] + "USDT";
            let newId = document.getElementById('id-' + cryptoAbbreviations[i]);
            let p = await fetch(url);
            let res = await p.json();
            newId.innerHTML = "$" + parseFloat(res.price).toFixed(4) ;
        }
    }
    fetchPrice();
}, 1000);
