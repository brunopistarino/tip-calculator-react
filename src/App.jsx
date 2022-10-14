import { useState, useEffect, useRef } from "react";
import { ReactComponent as Logo } from "./assets/logo.svg";

function App() {
  const [bill, setBill] = useState(142.55);
  const [tip, setTip] = useState(15);
  const inputTip = useRef();
  const [people, setPeople] = useState(5);
  const [valid, setValid] = useState(false);
  const [tipAmountPerson, setTipAmountPerson] = useState(0);
  const [totalPerson, setTotalPerson] = useState(0);

  const handleBillChange = (e) => {
    setBill(e.target.value);
  };

  const handleTipChange = (value) => {
    setTip(value);
  };

  const handlePeopleChange = (e) => {
    setPeople(e.target.value);
  };

  const reset = () => {
    setBill("");
    setTip("");
    inputTip.current.value = "";
    setPeople("");
  };

  const tips = [5, 10, 15, 25, 50];

  useEffect(() => {
    if (people > 0 && tip >= 0 && bill > 0) {
      const tipAmount = (bill * tip) / 100;
      const total = +bill + tipAmount;
      setTipAmountPerson(tipAmount / people);
      setTotalPerson(total / people);
    } else {
      setValid(false);
      setTipAmountPerson(0);
      setTotalPerson(0);
    }
    if (people !== "" || tip !== "" || bill !== "") {
      setValid(true);
      console.log("valid");
    }
    console.log("bill", bill);
    console.log("tip", tip);
    console.log("people", people);
  }, [bill, tip, people]);

  return (
    <div className="App">
      <Logo className="logo" />
      <div className="container">
        <div className="inputs">
          <div className="input-field">
            <label htmlFor="bill">Bill</label>
            <input
              type="number"
              id="bill"
              min="0"
              placeholder="0"
              value={bill}
              onChange={handleBillChange}
            />
          </div>

          <div className="input-field">
            <label>Select Tip %</label>
            <div className="buttons">
              {tips.map((tip_btn) => (
                <button
                  key={tip_btn}
                  className={tip_btn === tip ? "active" : ""}
                  onClick={() => handleTipChange(tip_btn)}
                >
                  {tip_btn}%
                </button>
              ))}
              <input
                type="number"
                id="tip"
                min="0"
                placeholder="Custom"
                ref={inputTip}
                onChange={(e) => handleTipChange(e.target.value)}
              />
            </div>
          </div>

          <div
            className={`input-field ${
              people <= 0 && people !== "" ? "error" : ""
            }`}
          >
            <div className="input-info">
              <label htmlFor="people">Number of People</label>
              <p>Can't be zero</p>
            </div>
            <input
              type="number"
              id="people"
              min="0"
              placeholder="0"
              value={people}
              onChange={handlePeopleChange}
            />
          </div>
        </div>
        <div className="results">
          <div className="data-container">
            <div className="data-field">
              <div>
                <p className="title">Tip Amount</p>
                <p className="description">/ person</p>
              </div>
              <p className="amount">${tipAmountPerson.toFixed(2)}</p>
            </div>
            <div className="data-field">
              <div>
                <p className="title">Total</p>
                <p className="description">/ person</p>
              </div>
              <p className="amount">${totalPerson.toFixed(2)}</p>
            </div>
          </div>
          <button className="reset-btn" disabled={!valid} onClick={reset}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
