const { useState } = React;

const App = () => {
    const [display, setDisplay] = useState("0");
    const [currentInput, setCurrentInput] = useState("");
    const [operator, setOperator] = useState(null);
    const [previousInput, setPreviousInput] = useState("");

    const handleNumberClick = (num) => {
        if (display === "0" || currentInput === "=") {
            setCurrentInput(num);
            setDisplay(num);
        } else {
            setCurrentInput(currentInput + num);
            setDisplay(display + num);
        }
    };

    const handleOperatorClick = (op) => {
        if (currentInput === "") return;

        if (operator && currentInput) {
            const result = calculate();
            setDisplay(result);
            setPreviousInput(result);
        } else {
            setPreviousInput(display);
        }

        setOperator(op);
        setCurrentInput("");
    };

    const handleEqualClick = () => {
        if (!operator || currentInput === "") return;

        const result = calculate();
        setDisplay(result);
        setCurrentInput("=");
        setOperator(null);
    };

    const handleClear = () => {
        setDisplay("0");
        setCurrentInput("");
        setOperator(null);
        setPreviousInput("");
    };

    const calculate = () => {
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(curr)) return "0";

        switch (operator) {
            case "+":
                return (prev + curr).toString();
            case "-":
                return (prev - curr).toString();
            case "*":
                return (prev * curr).toString();
            case "/":
                return (prev / curr).toString();
            default:
                return "0";
        }
    };

    return (
        <div className="calculator">
            <div id="display" className="display">{display}</div>
            <button id="clear" className="button" onClick={handleClear}>C</button>
            <button id="divide" className="button" onClick={() => handleOperatorClick("/")}>/</button>
            <button id="multiply" className="button" onClick={() => handleOperatorClick("*")}>*</button>
            <button id="subtract" className="button" onClick={() => handleOperatorClick("-")}>-</button>
            <button id="add" className="button" onClick={() => handleOperatorClick("+")}>+</button>
            <button id="seven" className="button" onClick={() => handleNumberClick("7")}>7</button>
            <button id="eight" className="button" onClick={() => handleNumberClick("8")}>8</button>
            <button id="nine" className="button" onClick={() => handleNumberClick("9")}>9</button>
            <button id="four" className="button" onClick={() => handleNumberClick("4")}>4</button>
            <button id="five" className="button" onClick={() => handleNumberClick("5")}>5</button>
            <button id="six" className="button" onClick={() => handleNumberClick("6")}>6</button>
            <button id="one" className="button" onClick={() => handleNumberClick("1")}>1</button>
            <button id="two" className="button" onClick={() => handleNumberClick("2")}>2</button>
            <button id="three" className="button" onClick={() => handleNumberClick("3")}>3</button>
            <button id="zero" className="button" onClick={() => handleNumberClick("0")}>0</button>
            <button id="decimal" className="button" onClick={() => {
                if (!currentInput.includes(".")) {
                    handleNumberClick(".");
                }
            }}>.</button>
            <button id="equals" className="button" onClick={handleEqualClick}>=</button>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
