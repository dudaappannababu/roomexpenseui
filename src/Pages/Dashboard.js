import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import CustomModal from "../Components/CustomModal";
import CustomTable from "../Components/CustomTable";

const hostUrl = "https://awkward-arlette-my-developments.koyeb.app"; // "http://localhost:8000";

function Dashboard() {

    const [expenses, setExpenses] = useState([]);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [newExpenses, setNewExpenses] = useState([]);

    useEffect(() => {
        axios.get( hostUrl + "/alltransactions")
        .then((response) => {
            setExpenses(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
        

    useEffect(() => {
        console.log(currentExpense);
        if(currentExpense){
            setNewExpenses([...newExpenses, currentExpense]);
            setExpenses([...expenses, currentExpense]);
        }
    }, [currentExpense]);

    function handlePushNewExpenses(){
        console.log(newExpenses);            
        // possible error, refer to https://stackoverflow.com/questions/71802652/react-not-showing-post-response-from-fastapi-backend-application
        axios(
            {
                method: "post",
                url: hostUrl + "/addtransactions",
                data:  newExpenses,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }



    return(
        <div>
            <h1>Dashboard</h1>
            {
                expenses.length > 0 ? <CustomTable expenses={expenses} /> : <h3>No expenses to show</h3>
            }
            <CustomModal setCurrentExpense={setCurrentExpense} />
            <button onClick={handlePushNewExpenses}>Push New Expenses</button>
        </div>
    );
}

export default Dashboard;