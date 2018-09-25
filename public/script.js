const buy1000Elem = $('#buy1000')
const buy2000Elem = $('#buy2000')
const sendOwnerElem = $('#sendOwner')
const transactionIdElem = $('#transactionId')
const buy1Elem = $('#buy1')
const buy2Elem = $('#buy2')
const buy3Elem = $('#buy3')
const sendcoin = $('#sendcoin')

buy1000Elem.click(() => {
    buy1000Elem.prop('disabled', true)
    axios.get('/add1000')
        .then(({ data }) => {
            buy1000Elem.prop('disabled', false)
            transactionIdElem.text(data.tx)
            alert("Success");
            console.log(data);
        })
        .catch(function (error) {
            buy1000Elem.prop('disabled', false)
            console.error(error);
        });
})

buy2000Elem.click(() => {
    buy2000Elem.prop('disabled', true)
    axios.get('/add2000')
        .then(({ data }) => {
            buy2000Elem.prop('disabled', false)
            transactionIdElem.text(data.tx)
            alert("Success");
            console.log(data);
        })
        .catch(function (error) {
            buy2000Elem.prop('disabled', false)
            console.error(error);
        });
})
sendOwnerElem.click(() => {
    sendOwnerElem.prop('disabled', true)
    axios.get('/sendToOwner')
        .then(({ data }) => {
            sendOwnerElem.prop('disabled', false)
            transactionIdElem.text(data.tx)
            alert("Success");
            console.log(data);
        })
        .catch(function (error) {
            sendOwnerElem.prop('disabled', false)
            console.error(error);
        });
})

buy1Elem.click(() => {
    buy1Elem.prop('disabled', true)
    axios.get('/buy1')
        .then(({ data }) => {
            buy1Elem.prop('disabled', false)
            console.log(data)
            if(data.status1 == false){
                alert("Coin not enough")
            }
            else{
                alert("Success")
            }
        })
        .catch(function (error) {
            buy1Elem.prop('disabled', false)
            console.error(error);
        });
})
buy2Elem.click(() => {
    buy2Elem.prop('disabled', true)
    axios.get('/buy2')
        .then(({ data }) => {
            buy2Elem.prop('disabled', false)
            if(data.status2 == false){
                alert("Coin not enough")
            }
            else{
                alert("Success")
            }
        })
        .catch(function (error) {
            buy2Elem.prop('disabled', false)
            console.error(error);
        });
})

buy3Elem.click(() => {
    buy3Elem.prop('disabled', true)
    axios.get('/buy3')
        .then(({ data }) => {
            buy3Elem.prop('disabled', false)
            if(data.status3 == false){
                alert("Coin not enough")
            }
            else{
                alert("Success")
            }
        })
        .catch(function (error) {
            buy3Elem.prop('disabled', false)
            console.error(error);
        });
})