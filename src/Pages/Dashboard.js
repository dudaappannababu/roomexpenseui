import React from "react";
import { useState, useEffect } from "react";

import CustomModal from "../Components/CustomModal";
import CustomTable from "../Components/CustomTable";

function Dashboard() {

    const [expenses, setExpenses] = useState([]);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [amount, setAmount] = useState(null);
    const [category, setCategory] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        console.log(currentExpense);
        if(currentExpense){
            setExpenses([...expenses, currentExpense]);
        }
    }, [currentExpense]);



    return(
        <div>
            <h1>Dashboard</h1>
            {
                expenses.length > 0 ? <CustomTable expenses={expenses} /> : <h3>No expenses to show</h3>
            }
            <CustomModal setCurrentExpense={setCurrentExpense} />
        </div>
    );
}

export default Dashboard;