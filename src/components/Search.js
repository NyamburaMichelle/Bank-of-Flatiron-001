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

  const filterTransactions = () => {
    // Check if searchQuery is not empty before filtering
    if (searchQuery.trim() !== "") {
      const filtered = transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTransactions(filtered);
    } else {
      // If searchQuery is empty, show no transactions
      setFilteredTransactions([]);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Filter transactions based on the search query whenever it changes
    filterTransactions();
  }, [searchQuery, transactions]);

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
        {/* Display filtered transactions if searchQuery is not empty */}
        {searchQuery.trim() !== "" && (
          <ul>
            {filteredTransactions.map((transaction) => (
              <li key={transaction.id}>
                {transaction.description} - {transaction.amount}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;