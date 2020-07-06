import React from 'react';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formula: "",
      previousOperand: "",
      currentOperand: "0",
      operation: undefined
    }
    this.clear = this.clear.bind(this);
    this.compute = this.compute.bind(this);
    this.appendNumber = this.appendNumber.bind(this);
    this.chooseOperation = this.chooseOperation.bind(this);
  }
  clear() {
    this.setState({
      formula: "",
      previousOperand: "",
      currentOperand: "0",
      operation: undefined,
    });
  }
  appendNumber(e) {
    const display = document.getElementById("display");
    if (display.innerText === "0") {
      this.setState({
        formula: this.state.formula.toString() + e.target.value.toString(),
        currentOperand: e.target.value,
      });
      return;
    }
    if (e.target.value === "." && this.state.currentOperand.includes(".")) return;
    this.setState({
      formula: this.state.formula.toString() + e.target.value.toString(),
      currentOperand: this.state.currentOperand.toString() + e.target.value.toString(), 
    });
  }
  chooseOperation(e) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.setState({
      formula: this.state.formula.toString() + e.target.value.toString(),
      operation: e.target.value,
      previousOperand: this.state.currentOperand,
      currentOperand: ""
    });
  }
  compute() {
    let computation;
    const prev = parseFloat(this.state.previousOperand);
    const current = parseFloat(this.state.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.state.formula[0]) {
      case "/":
      case "*":
      case "+":
        return;
    }

    computation = eval(this.state.formula);
    this.setState({
      formula: "" + computation.toString(),
      currentOperand: computation,
      operation: undefined,
      previousOperand: "",
    });
  }
  render() {
    return (
      <div id="calculator">
        <div id="display-wrapper">
          <div id="input">{this.state.formula}</div>
          <div id="display">{this.state.currentOperand}</div>
        </div>
        <div id="grid">
          <button onClick={this.appendNumber} className="calc-btn" id="zero" value="0">0</button>
          <button onClick={this.appendNumber} className="calc-btn" id="one" value="1">1</button>
          <button onClick={this.appendNumber} className="calc-btn" id="two" value="2">2</button>
          <button onClick={this.appendNumber} className="calc-btn" id="three" value="3">3</button>
          <button onClick={this.appendNumber} className="calc-btn" id="four" value="4">4</button>
          <button onClick={this.appendNumber} className="calc-btn" id="five" value="5">5</button>
          <button onClick={this.appendNumber} className="calc-btn" id="six" value="6">6</button>
          <button onClick={this.appendNumber} className="calc-btn" id="seven" value="7">7</button>
          <button onClick={this.appendNumber} className="calc-btn" id="eight" value="8">8</button>
          <button onClick={this.appendNumber} className="calc-btn" id="nine" value="9">9</button>
          <button onClick={this.appendNumber} className="calc-btn" id="decimal" value=".">.</button>
          <button onClick={this.chooseOperation} className="calc-btn" id="add" value="+">+</button>
          <button onClick={this.chooseOperation} className="calc-btn" id="subtract" value="-">-</button>
          <button onClick={this.chooseOperation} className="calc-btn" id="multiply" value="*">*</button>
          <button onClick={this.chooseOperation} className="calc-btn" id="divide" value="/">/</button>
          <button onClick={this.compute} className="calc-btn" id="equals">=</button>
          <button onClick={this.clear} className="calc-btn" id="clear">AC</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
