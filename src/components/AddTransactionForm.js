import React, { useState } from "react";

function AddTransactionForm() {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0
  });

  function postData() {
    fetch("https://bank-of-flatiron-001.onrender.com/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
      
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    postData(); // Call the postData function to submit the form data
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input type="date" name="date" onChange={handleChange} />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            onChange={handleChange}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
