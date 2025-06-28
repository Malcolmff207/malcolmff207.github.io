// components/calculators/BasicCalculator.js
import React, { useState } from 'react';

const BasicCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState('');

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
      // Clear history if we're starting fresh after equals
      if (!operation) {
        setCalculationHistory('');
      }
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      // Clear history if we're starting fresh after equals
      if (!operation) {
        setCalculationHistory('');
      }
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setCalculationHistory('');
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setCalculationHistory(`${display} ${nextOperation}`);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      setPreviousValue(newValue);
      setCalculationHistory(`${newValue} ${nextOperation}`);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setCalculationHistory(`${previousValue} ${operation} ${display} =`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const handleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const Button = ({ onClick, className = '', children, ...props }) => (
    <button
      className={`h-10 px-3 text-sm font-medium rounded-lg transition-all duration-100 active:translate-y-[-2px] active:shadow-lg hover:shadow-md ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-2 max-h-72">
      {/* Display */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-500 p-3 rounded-md min-h-[60px] flex flex-col justify-end">
        {/* Calculation History - Small text above */}
        {calculationHistory && (
          <div className="text-right mb-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-normal">
              {calculationHistory}
            </div>
          </div>
        )}
        
        {/* Main Display - Large text */}
        <div className="text-right">
          <div className="text-xl font-medium text-gray-800 dark:text-gray-100 overflow-hidden">
            {display}
          </div>
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-1.5">
        {/* Row 1 */}
        <Button
          onClick={clear}
          className="bg-gray-400 dark:bg-gray-500 text-white hover:bg-gray-500 dark:hover:bg-gray-400"
        >
          AC
        </Button>
        <Button
          onClick={handleSign}
          className="bg-gray-400 dark:bg-gray-500 text-white hover:bg-gray-500 dark:hover:bg-gray-400"
        >
          ±
        </Button>
        <Button
          onClick={handlePercentage}
          className="bg-gray-400 dark:bg-gray-500 text-white hover:bg-gray-500 dark:hover:bg-gray-400"
        >
          %
        </Button>
        <Button
          onClick={() => performOperation('÷')}
          className="bg-orange-500 dark:bg-orange-600 text-white hover:bg-orange-600 dark:hover:bg-orange-700"
        >
          ÷
        </Button>

        {/* Row 2 */}
        <Button
          onClick={() => inputNumber(7)}
          className="bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          7
        </Button>
        <Button
          onClick={() => inputNumber(8)}
          className="bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          8
        </Button>
        <Button
          onClick={() => inputNumber(9)}
          className="bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          9
        </Button>
        <Button
          onClick={() => performOperation('×')}
          className="bg-orange-500 dark:bg-orange-600 text-white hover:bg-orange-600 dark:hover:bg-orange-700"
        >
          ×
        </Button>

        {/* Row 3 */}
        <Button
          onClick={() => inputNumber(4)}
          className="bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          4
        </Button>
        <Button
          onClick={() => inputNumber(5)}
          className="bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          5
        </Button>
        <Button
          onClick={() => inputNumber(6)}
          className="bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          6
        </Button>
        <Button
          onClick={() => performOperation('-')}
          className="bg-orange-500 dark:bg-orange-600 text-white hover:bg-orange-600 dark:hover:bg-orange-700"
        >
          -
        </Button>

        {/* Row 4 */}
        <Button
          onClick={() => inputNumber(1)}
          className="bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          1
        </Button>
        <Button
          onClick={() => inputNumber(2)}
          className="bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          2
        </Button>
        <Button
          onClick={() => inputNumber(3)}
          className="bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          3
        </Button>
        <Button
          onClick={() => performOperation('+')}
          className="bg-orange-500 dark:bg-orange-600 text-white hover:bg-orange-600 dark:hover:bg-orange-700"
        >
          +
        </Button>

        {/* Row 5 */}
        <Button
          onClick={() => inputNumber(0)}
          className="bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 col-span-2"
        >
          0
        </Button>
        <Button
          onClick={inputDecimal}
          className="bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600"
        >
          .
        </Button>
        <Button
          onClick={handleEquals}
          className="bg-orange-500 dark:bg-orange-600 text-white hover:bg-orange-600 dark:hover:bg-orange-700"
        >
          =
        </Button>
      </div>

      {/* Calculator Info */}
      <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Calculator
      </div>
    </div>
  );
};

export default BasicCalculator;