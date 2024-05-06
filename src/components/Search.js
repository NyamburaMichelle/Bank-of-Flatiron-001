import React, { useState, useEffect } from "react";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions data when the component mounts
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("https://bank-of-flatiron-001.onrender.com/transactions");
      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data); // Initialize filtered transactions with all transactions
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    // Filter transactions based on the search query whenever it changes
    filterTransactions();
  }, [searchQuery, transactions]);

  const filterTransactions = () => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="ui large fluid icon input">
        <input
          type="text"
          placeholder="Search your Recent Transactions"
          value={searchQuery}
          onChange={handleChange}
        />
        <i className="circular search link icon"></i>
      </div>
      <div>
        {/* Display filtered transactions */}
        <ul>
          {filteredTransactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.description} - {transaction.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
