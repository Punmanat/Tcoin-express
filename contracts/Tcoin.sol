pragma solidity ^0.4.17;

contract Tcoin{
    address public owner;
    mapping(address => uint) coin;
    function Tcoin(){
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    function recieveCoin() onlyOwner{
        owner.transfer(this.balance);
    }
    function sendCoin(address _sender, address _reciever, uint _amount) public returns(bool){
        if(coin[_sender] < _amount) return false;
        coin[_sender] -= _amount;
        coin[_reciever] += _amount;
        return true;
        }
    function buyItem(address _buyer, uint _amount) public returns(bool){
        if(coin[_buyer] < _amount) return false;
        coin[_buyer] -= _amount;
        return true;
    }
    
    function checkCoin(address _sender) public view returns(uint){
        return coin[_sender];
    }
    // Pay method
    function add1000(address _reciever) public payable{
        require(msg.value == 0.06 ether);
        coin[_reciever] += 1000;
    }
    function add2000(address _reciever) public payable{
        require(msg.value == 0.1 ether);
        coin[_reciever] += 2000;
    }
}