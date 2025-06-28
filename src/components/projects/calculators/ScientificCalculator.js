import React, { useState } from 'react';

const ScientificCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [calculationHistory, setCalculationHistory] = useState('');
  const [memory, setMemory] = useState(0);
  const [angleMode, setAngleMode] = useState('DEG'); // DEG or RAD
  const [lastResult, setLastResult] = useState(null);
  const [isNewNumber, setIsNewNumber] = useState(true);

  // Helper function to convert degrees to radians
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  
  // Helper function to convert radians to degrees
  const toDegrees = (radians) => radians * (180 / Math.PI);

  // Apply angle mode conversion for trigonometric functions
  const applyAngleMode = (value) => {
    return angleMode === 'DEG' ? toRadians(value) : value;
  };

  // Reverse angle mode conversion for inverse trig functions
  const reverseAngleMode = (value) => {
    return angleMode === 'DEG' ? toDegrees(value) : value;
  };

  const inputNumber = (num) => {
    if (isNewNumber) {
      setDisplay(String(num));
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (isNewNumber) {
      setDisplay('0.');
      setIsNewNumber(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setCalculationHistory('');
    setLastResult(null);
    setIsNewNumber(true);
  };

  const clearEntry = () => {
    setDisplay('0');
    setIsNewNumber(true);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  };

  const inputOperation = (op) => {
    const currentValue = display;
    setExpression(prev => {
      if (prev === '') {
        return currentValue + ' ' + op + ' ';
      }
      return prev + currentValue + ' ' + op + ' ';
    });
    setIsNewNumber(true);
  };

  const calculateExpression = (expr) => {
    try {
      // Replace display-friendly operators with JavaScript operators
      let jsExpression = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, Math.PI)
        .replace(/e/g, Math.E);

      // Handle scientific functions
      jsExpression = jsExpression
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/asin\(/g, 'Math.asin(')
        .replace(/acos\(/g, 'Math.acos(')
        .replace(/atan\(/g, 'Math.atan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/abs\(/g, 'Math.abs(');

      const result = Function('"use strict"; return (' + jsExpression + ')')();
      return isFinite(result) ? result : 'Error';
    } catch (error) {
      return 'Error';
    }
  };

  const calculate = () => {
    const fullExpression = expression + display;
    const result = calculateExpression(fullExpression);
    
    if (result !== 'Error') {
      setCalculationHistory(fullExpression + ' =');
      setDisplay(String(result));
      setLastResult(result);
      setExpression('');
      setIsNewNumber(true);
    } else {
      setDisplay('Error');
      setIsNewNumber(true);
    }
  };

  // Scientific functions
  const performScientificFunction = (func) => {
    const value = parseFloat(display);
    let result;

    switch (func) {
      case 'sin':
        result = Math.sin(applyAngleMode(value));
        break;
      case 'cos':
        result = Math.cos(applyAngleMode(value));
        break;
      case 'tan':
        result = Math.tan(applyAngleMode(value));
        break;
      case 'asin':
        result = reverseAngleMode(Math.asin(value));
        break;
      case 'acos':
        result = reverseAngleMode(Math.acos(value));
        break;
      case 'atan':
        result = reverseAngleMode(Math.atan(value));
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'x²':
        result = value * value;
        break;
      case 'x³':
        result = value * value * value;
        break;
      case '1/x':
        result = 1 / value;
        break;
      case 'x!':
        result = factorial(Math.floor(value));
        break;
      case '10^x':
        result = Math.pow(10, value);
        break;
      case 'e^x':
        result = Math.exp(value);
        break;
      case 'abs':
        result = Math.abs(value);
        break;
      case '±':
        result = -value;
        break;
      default:
        result = value;
    }

    if (isFinite(result)) {
      setCalculationHistory(`${func}(${display}) =`);
      setDisplay(String(result));
      setLastResult(result);
      setIsNewNumber(true);
    } else {
      setDisplay('Error');
      setIsNewNumber(true);
    }
  };

  const factorial = (n) => {
    if (n < 0 || n > 170) return NaN; // Prevent overflow
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const inputConstant = (constant) => {
    switch (constant) {
      case 'π':
        setDisplay(String(Math.PI));
        break;
      case 'e':
        setDisplay(String(Math.E));
        break;
    }
    setIsNewNumber(true);
  };

  const powerFunction = (power) => {
    const value = parseFloat(display);
    let result;
    
    if (power === 'y') {
      inputOperation('^');
      return;
    }
    
    switch (power) {
      case '2':
        result = Math.pow(value, 2);
        break;
      case '3':
        result = Math.pow(value, 3);
        break;
      default:
        result = value;
    }
    
    if (isFinite(result)) {
      setCalculationHistory(`${display}^${power} =`);
      setDisplay(String(result));
      setLastResult(result);
      setIsNewNumber(true);
    }
  };

  // Memory functions
  const memoryRecall = () => {
    setDisplay(String(memory));
    setIsNewNumber(true);
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const memoryStore = () => {
    setMemory(parseFloat(display));
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const memorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  const toggleAngleMode = () => {
    setAngleMode(angleMode === 'DEG' ? 'RAD' : 'DEG');
  };

  const Button = ({ onClick, className = '', children, variant = 'number', ...props }) => {
    const baseClasses = "h-8 px-2 text-xs font-medium rounded-md transition-all duration-100 active:translate-y-[-1px] active:shadow-md hover:shadow-sm";
    
    const variants = {
      number: "bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600",
      operator: "bg-orange-500 dark:bg-orange-600 text-white hover:bg-orange-600 dark:hover:bg-orange-700",
      function: "bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700",
      special: "bg-gray-400 dark:bg-gray-500 text-white hover:bg-gray-500 dark:hover:bg-gray-400",
      memory: "bg-purple-500 dark:bg-purple-600 text-white hover:bg-purple-600 dark:hover:bg-purple-700"
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="space-y-2 max-h-96 overflow-hidden">
      {/* Display */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-500 p-3 rounded-md min-h-[60px] flex flex-col justify-end">
        {/* Calculation History */}
        {calculationHistory && (
          <div className="text-right mb-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-normal">
              {calculationHistory}
            </div>
          </div>
        )}
        
        {/* Expression */}
        {expression && (
          <div className="text-right mb-1">
            <div className="text-sm text-gray-600 dark:text-gray-300 font-normal">
              {expression}
            </div>
          </div>
        )}
        
        {/* Main Display */}
        <div className="text-right">
          <div className="text-lg font-medium text-gray-800 dark:text-gray-100 overflow-hidden">
            {display}
          </div>
        </div>
      </div>

      {/* Mode and Memory Indicators */}
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded ${angleMode === 'DEG' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : ''}`}>
            {angleMode}
          </span>
          {memory !== 0 && (
            <span className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
              M
            </span>
          )}
        </div>
        <button
          onClick={toggleAngleMode}
          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {angleMode}
        </button>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-6 gap-1">
        {/* Row 1 - Memory and Special Functions */}
        <Button onClick={memoryClear} variant="memory">MC</Button>
        <Button onClick={memoryRecall} variant="memory">MR</Button>
        <Button onClick={memoryStore} variant="memory">MS</Button>
        <Button onClick={memoryAdd} variant="memory">M+</Button>
        <Button onClick={memorySubtract} variant="memory">M-</Button>
        <Button onClick={clear} variant="special">AC</Button>

        {/* Row 2 - Scientific Functions */}
        <Button onClick={() => performScientificFunction('sin')} variant="function">sin</Button>
        <Button onClick={() => performScientificFunction('cos')} variant="function">cos</Button>
        <Button onClick={() => performScientificFunction('tan')} variant="function">tan</Button>
        <Button onClick={() => performScientificFunction('log')} variant="function">log</Button>
        <Button onClick={() => performScientificFunction('ln')} variant="function">ln</Button>
        <Button onClick={clearEntry} variant="special">CE</Button>

        {/* Row 3 - Inverse Functions */}
        <Button onClick={() => performScientificFunction('asin')} variant="function">sin⁻¹</Button>
        <Button onClick={() => performScientificFunction('acos')} variant="function">cos⁻¹</Button>
        <Button onClick={() => performScientificFunction('atan')} variant="function">tan⁻¹</Button>
        <Button onClick={() => performScientificFunction('10^x')} variant="function">10ˣ</Button>
        <Button onClick={() => performScientificFunction('e^x')} variant="function">eˣ</Button>
        <Button onClick={backspace} variant="special">⌫</Button>

        {/* Row 4 - Powers and Roots */}
        <Button onClick={() => performScientificFunction('x²')} variant="function">x²</Button>
        <Button onClick={() => performScientificFunction('x³')} variant="function">x³</Button>
        <Button onClick={() => inputOperation('^')} variant="function">xʸ</Button>
        <Button onClick={() => performScientificFunction('sqrt')} variant="function">√x</Button>
        <Button onClick={() => performScientificFunction('1/x')} variant="function">1/x</Button>
        <Button onClick={() => performScientificFunction('x!')} variant="function">x!</Button>

        {/* Row 5 - Constants and Basic Operations */}
        <Button onClick={() => inputConstant('π')} variant="function">π</Button>
        <Button onClick={() => inputConstant('e')} variant="function">e</Button>
        <Button onClick={() => performScientificFunction('abs')} variant="function">|x|</Button>
        <Button onClick={() => inputOperation('(')} variant="special">(</Button>
        <Button onClick={() => inputOperation(')')} variant="special">)</Button>
        <Button onClick={() => inputOperation('÷')} variant="operator">÷</Button>

        {/* Row 6 - Numbers */}
        <Button onClick={() => inputNumber(7)} variant="number">7</Button>
        <Button onClick={() => inputNumber(8)} variant="number">8</Button>
        <Button onClick={() => inputNumber(9)} variant="number">9</Button>
        <Button onClick={() => inputOperation('×')} variant="operator">×</Button>
        <Button onClick={() => inputOperation('%')} variant="operator">%</Button>
        <Button onClick={() => performScientificFunction('±')} variant="special">±</Button>

        {/* Row 7 - Numbers */}
        <Button onClick={() => inputNumber(4)} variant="number">4</Button>
        <Button onClick={() => inputNumber(5)} variant="number">5</Button>
        <Button onClick={() => inputNumber(6)} variant="number">6</Button>
        <Button onClick={() => inputOperation('-')} variant="operator">-</Button>
        <Button onClick={() => inputNumber(0)} variant="number" className="col-span-2">0</Button>

        {/* Row 8 - Numbers */}
        <Button onClick={() => inputNumber(1)} variant="number">1</Button>
        <Button onClick={() => inputNumber(2)} variant="number">2</Button>
        <Button onClick={() => inputNumber(3)} variant="number">3</Button>
        <Button onClick={() => inputOperation('+')} variant="operator">+</Button>
        <Button onClick={inputDecimal} variant="number">.</Button>
        <Button onClick={calculate} variant="operator">=</Button>
      </div>

      {/* Calculator Info */}
      <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Scientific Calculator
      </div>
    </div>
  );
};

export default ScientificCalculator;