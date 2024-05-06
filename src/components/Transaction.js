import React, { useEffect, useState } from "react";

function Transaction() {
  const [transactions, setTransactions] = useState([]);

  //fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:8001/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  //handle delete
  
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8001/transactions/${id}`, {
        method: 'DELETE'
      });
    
      alert("Transaction deleted successfully!");
  
      // After successful deletion, update the transactions list by removing the deleted transaction
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <>
      {transactions.map((oneTransaction) => (
        <tr key={oneTransaction.id}>
          <td>{oneTransaction.date}</td>
          <td>{oneTransaction.description}</td>
          <td>{oneTransaction.category}</td>
          <td>{oneTransaction.amount}</td>
          <td>  <button onClick={() => handleDelete(oneTransaction.id)}>Delete</button></td>
        </tr>
      ))}
    </>
  );
}

export default Transaction;
