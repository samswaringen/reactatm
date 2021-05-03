import React, {useState, useEffect} from 'react'
import '../App.css'; 

function Withdraw({withdrawMoney, handleWithdraw, withdraw}) {
    return (
        <div>
             <div>
                <h2>Withdraw</h2>
            </div>
                <h3>Amount: ${withdraw}</h3>
            <div>
            <div>Quick Cash</div>
            <div  id = 'addStuff'> 
            <div>
                <button onClick={()=>withdrawMoney(20)}>$20</button>
                <button onClick={()=>withdrawMoney(80)}>$80</button>
            </div>
            <div>
            <button onClick={()=>withdrawMoney(40)}>$40</button>
            <button onClick={()=>withdrawMoney(100)}>$100</button>
            </div>
            <div>
                <button onClick={()=>withdrawMoney(60)}>$60</button>
                <button onClick={()=>withdrawMoney(200)}>$200</button>
            </div>       
            <div>
                <input type = 'number' id = 'withdraw' onChange = {handleWithdraw}></input>
                <button onClick = {()=>withdrawMoney(Number(document.getElementById('withdraw').value))}>Other Amount</button>
            
            </div></div>
            </div>
        </div>
    )
};

function Deposit({handleDeposit, depositMoney, deposit}) {
    return(
        <div>
            <h2>Deposit</h2>
            <h3>Amount: ${deposit}</h3>
            <input type = 'number' id = 'deposit' onChange = {handleDeposit}></input>
            <button type = 'button' onClick = {depositMoney}>Deposit</button>
        </div>
    )
}

function ATM() {

    const [accountBalance, setAccountBalance] = useState(0);
    const [withdraw, setWithdraw] = useState(0);
    const [deposit, setDeposit] = useState(0);
    const [accountHistory, setAccountHistory] = useState([]);
    const [isWithdraw, setIsWithdraw] = useState(false);
    const [isDeposit, setIsDeposit] = useState(false);

    const withdrawMoney = (amount)=>{
        if((accountBalance - amount) < 0){
            return alert(`You don't have the funds!`)
        }else{
        let newAmount = accountBalance - amount;
        setWithdraw(amount);
        setAccountBalance(newAmount);
        setAccountHistory([...accountHistory, {withdraw:amount,account:newAmount}]);
        document.getElementById('withdraw').value = 0;
        }
    }

    const handleWithdraw = ()=>{
        let newwithdraw = document.getElementById('withdraw').value;
        setWithdraw(newwithdraw);
    }

    const handleDeposit = ()=>{
        let newDeposit = document.getElementById('deposit').value;
        setDeposit(newDeposit);
    }

    const depositMoney = ()=>{
        let deposit = Number(document.getElementById('deposit').value);
        let newAmount = accountBalance + deposit;
        setAccountBalance(newAmount);
        setAccountHistory([...accountHistory, {deposit:deposit,account:newAmount}]);
        setDeposit(0);
        document.getElementById('deposit').value = 0;
    }
    const handleSelection = (event)=>{
        if (event.target.style.backgroundColor === 'red'){
            event.target.style.backgroundColor = 'white'
            setIsWithdraw(false);
            setIsDeposit(false);
        }else{
            event.target.style.backgroundColor = 'red';
            if(event.target === document.getElementById('withdrawBtn') && document.getElementById('withdrawBtn').style.backgroundColor === 'red'){
                document.getElementById('depositBtn').style.backgroundColor = 'white';
                setIsWithdraw(true);
                setIsDeposit(false);
            }else{ 
                document.getElementById('depositBtn').style.backgroundColor = 'red'
                document.getElementById('withdrawBtn').style.backgroundColor = 'white'
                setIsWithdraw(false);
                setIsDeposit(true);
            }    
        }

    }

    const handleHistory = accountHistory.map((item)=>{
        return (
            <li>{JSON.stringify(item)}</li>
        )
    });

    return (
        <div>
            <h1>Account Balance: ${accountBalance}</h1>
            <div>
            <div>Would you like to</div>
            <div>
                <button onClick={handleSelection} id = 'withdrawBtn'>Withdraw</button>
                <button onClick={handleSelection} id = 'depositBtn'>Deposit</button>
                ?
            </div>
            {isWithdraw && <Withdraw withdrawMoney = {withdrawMoney} handleWithdraw = {handleWithdraw} withdraw = {withdraw}/>}
            {isDeposit && <Deposit depositMoney = {depositMoney} handleDeposit = {handleDeposit}  deposit = {deposit} />}
            <div id = 'history'>
                <ul>
                    <h3>Account History</h3>
                {handleHistory}
                </ul>
            </div>
        </div>
        </div>
    )
}

export default ATM
