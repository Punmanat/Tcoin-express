const express = require('express');
const app = express();
const path = require('path');
const Web3 = require('web3');
var bodyParser = require("body-parser");


//Set provider for web3
if (typeof web3 !== 'undefined') {

    // Use the browser's ethereum provider
    var provider = web3.currentProvider

} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
}
//Set provider
const contract = require("truffle-contract");
const TcoinArt = require('./build/contracts/Tcoin.json');
const Tcoin = contract(TcoinArt);
Tcoin.setProvider(web3.currentProvider);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Coin
let status_1 = false;
let status_2 = false;
let status_3 = false;

app.get('/', (req, res) => {
    Tcoin.deployed().then((instance) => {
        return instance.checkCoin.call(web3.eth.accounts[2]);
    }).then((result) => {
        coin_ = parseInt(result);
        res.render('index', { address: web3.eth.accounts[2], coin: result, status1: status_1, status2: status_2, status3: status_3 })
    })
})
app.get('/buy', (req, res) => {
    res.render('buycoin', {address: web3.eth.accounts[1], tx: 0 });
})
app.get('/send', (req, res) => {
    Tcoin.deployed().then((instance) => {
        return instance.checkCoin.call(web3.eth.accounts[1]);
    }).then((result) => {
        coin_ = parseInt(result);
        res.render('sendcoin', {address: web3.eth.accounts[1], coin: result})
    })
})
app.post('/sendcoinit', (req, res) => {
    const address = req.param("address")
    const amount = req.param("amount")
    let instance;
    Tcoin.deployed().then((_instance) => {
        instance = _instance
        instance.sendCoin.sendTransaction(web3.eth.accounts[1], address, parseInt(amount), { from: web3.eth.accounts[1] });
        return instance.checkCoin.call(web3.eth.accounts[1]);
    }).then((result) => {
        coin_ = parseInt(result);
        res.render('sendcoin', {address: web3.eth.accounts[1], coin:result})
    }) 
})
app.get('/add1000', (req, res) => {
    Tcoin.deployed().then((instance) => {
        return instance.add1000.sendTransaction(web3.eth.accounts[1], { from: web3.eth.accounts[1], value: web3.toWei('0.06', 'ether') });
    }).then((txid) => {
        res.send({ tx: txid })
    })
})
app.get('/add2000', (req, res) => {
    Tcoin.deployed().then((instance) => {
        return instance.add2000.sendTransaction(web3.eth.accounts[1], { from: web3.eth.accounts[1], value: web3.toWei('0.1', 'ether') });
    }).then((txid) => {
        res.send({ tx: txid });
    })
})
app.get('/sendToOwner', (req, res) => {
    Tcoin.deployed().then((instance) => {
        return instance.recieveCoin.sendTransaction({ from: web3.eth.accounts[0] });
    }).then((txid) => {
        res.send({ tx: txid });
    })
})
app.get('/buy1', (req, res) => {
    let instance;
    Tcoin.deployed().then((_instance) => {
        instance = _instance
        return instance.checkCoin.call(web3.eth.accounts[1]);
    }).then((coin) => {
        if (coin >= 1500) {
            let result = instance.buyItem.sendTransaction(web3.eth.accounts[1], 1500, { from: web3.eth.accounts[1] });
            status_1 = result;
            res.send({ status1: status_1 })
        }
        else {
            res.send({ status1: false })
        }
    })
})
app.get('/buy2', (req, res) => {
    let instance;
    Tcoin.deployed().then((_instance) => {
        instance = _instance;
        return instance.checkCoin.call(web3.eth.accounts[1]);
    }).then((coin) => {
        if (coin >= 2000) {
            let result = instance.buyItem.sendTransaction(web3.eth.accounts[1], 2000, { from: web3.eth.accounts[1] });
            status_2 = result;
            res.send({ status2: status_2 })
        }
        else {
            res.send({ status2: false })
        }
    })
})
app.get('/buy3', (req, res) => {
    let instance;
    Tcoin.deployed().then((_instance) => {
        instance = _instance;
        return instance.checkCoin.call(web3.eth.accounts[1]);
    }).then((coin) => {
        if (coin >= 5000) {
            let result = instance.buyItem.sendTransaction(web3.eth.accounts[1], 5000, { from: web3.eth.accounts[1] });
            status_3 = result;
            res.send({ status3: status_3 })
        }
        else {
            res.send({ status3: false })
        }
    })
})

app.get('/user', (req, res)=>{
    var user = req.param('user');
    Tcoin.deployed().then((instance)=>{
        return instance.checkCoin.call(web3.eth.accounts[user]);
    }).then((result)=>{
        res.send(JSON.stringify({account: result, address:web3.eth.accounts[user]}))
    })
})

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Port 8888
app.listen(8888, () => {
    console.log('Web start at http://127.0.0.1:8888');
})