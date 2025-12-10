import { useEffect, useState } from "react";
import "./splitter.css";

export default function ExpenseSplitter() {
  const [amount, setAmount] = useState("");
  const [people, setPeople] = useState("");
  const [names, setNames] = useState([]);
  const [personName, setPersonName] = useState("");

  // retrive from storage
  useEffect(() => {
    const savedNames = JSON.parse(localStorage.getItem("names"));
    const savedAmount = JSON.parse(localStorage.getItem("amount"));
    if (savedNames || savedAmount)
      setPeople(savedNames.length);
    setAmount(savedAmount);
    setNames(savedNames);
  }, []);

  // store
  useEffect(() => {
    localStorage.setItem("names", JSON.stringify(names));
  }, [names]);

  useEffect(() => {
    localStorage.setItem("amount", JSON.stringify(amount));
  }, [amount]);

  const addPerson = () => {
    if (!personName.trim()) return;
    setNames([...names, { name: personName, paid: 0 }]);

    if (people < personName.length) {
      setPeople(Number(arr.length));
    }
  }

  const perPerson = amount && people ? (amount / people).toFixed(2) : 0;

  const updateContribution = (index, value) => {
    const arr = [...names];

    arr[index].paid = value;

    setNames(arr);
  }

  const balances = names.map((p) => ({
    name: p.name,
    paid: Number(p.paid),
    balance: Number(p.paid) - perPerson
  }));


  const creditors = balances.filter(person => person.balance > 0);
  const debtors = balances.filter(person => person.balance < 0);

  let settlements = [];
  if (creditors.length && debtors.length) {
    let credIndex = 0;
    let debtIndex = 0;

    while (credIndex < creditors.length && debtIndex < debtors.length) {
      let creditor = creditors[credIndex];
      let debtor = debtors[debtIndex];

      let amount = Math.min(
        creditor.balance,
        -debtor.balance
      );

      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: amount.toFixed(2)
      });

      // Update balances
      creditor.balance -= amount;
      debtor.balance

      // move pointer
      if (creditor.balance === 0) credIndex++;
      if (debtor.balance === 0) debtIndex++;
    }
  }

  const reset = () => {
    const userConfirm = window.confirm("about to clear content. Do you wish to continue?")

    if (!userConfirm) {
      return;
    }
    setAmount("");
    setPeople("");
    setNames([]);
    setPersonName("");
  }
  return (
    <div className="expense-container">
      <h2>Expense Splitter</h2>

      <div className="input-row">
        <label>Total Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter total amount"
        />
      </div>

      <div className="input-row">
        <label >Number of People</label>
        <input
          type="number"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          placeholder="Enter number of people"
        />
      </div>

      <div className="result-box">
        <p>
          Amount Per Person: ₦ {perPerson}
        </p>
        <button onClick={reset}>Reset</button>
      </div>

      {/* Optional: Track each person */}
      <h3>People</h3>

      <div className="add-person">
        <input
          type="text"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          placeholder="Enter name"
        />
        <button onClick={addPerson}>Add</button>
      </div>

      <div className="person-list">
        {names.map((p, i) => (
          <div key={i} className="person-item">
            <span>{p.name}</span>
            <input
              type="number"
              value={p.paid}
              onChange={(e) => updateContribution(i, e.target.value)}
              placeholder="Paid?"
            />
          </div>
        ))}
      </div>

      <div className="summary-box">
        <h3>Summary</h3>
        <p>Each person should pay: <strong>₦{perPerson}</strong></p>

        {balances.map((b, i) => (
          <p key={i}>
            {b.name}:
            {b.balance > 0 ? (
              <span className="credit"> is owed ₦{b.balance.toFixed(2)}</span>
            ) : b.balance < 0 ? (
              <span className="debit"> owes ₦{(-b.balance).toFixed(2)}</span>
            ) : (
              <span> is settled</span>
            )}
          </p>
        ))}

        <h3>Settle-Up</h3>
        {settlements.length === 0 && <p>No transfers needed yet.</p>}

        {settlements.map((s, i) => (
          <p key={i}>
            <strong>{s.from}</strong> should pay <strong>₦{s.amount}</strong> to <strong>{s.to}</strong>
          </p>
        ))}
      </div>

    </div>
  );
}
