let btc = document.getElementById("bitcoin");
let eth = document.getElementById("ethereum");
let wld = document.getElementById("worldcoin");


var liveprice = {
    "async": true,
    "scroosDomain": true,
    "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cworldcoin&vs_currencies=usd",

    "method": "GET",
    "headers": {}
}

$.ajax(liveprice).done(function (response) {
    console.log(response);
    btc.innerHTML = response.bitcoin.usd;
    eth.innerHTML = response.ethereum.usd;
    wld.innerHTML = response.worldcoin.usd;
});