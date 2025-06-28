// components/calculators/CalculatorTemplate.js
// Template for creating new calculator components

import React, { useState } from 'react';

const CalculatorTemplate = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    // Add your calculation logic here
    if (input1 && input2) {
      const result = parseFloat(input1) + parseFloat(input2); // Example calculation
      setResult(result);
    }
  };

  const clearInputs = () => {
    setInput1('');
    setInput2('');
    setResult(null);
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Input 1
          </label>
          <input
            type="number"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter first value"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Input 2
          </label>
          <input
            type="number"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter second value"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={calculate}
          className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          Calculate
        </button>
        <button
          onClick={clearInputs}
          className="px-6 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-semibold"
        >
          Clear
        </button>
      </div>

      {/* Result Section */}
      {result !== null && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 rounded-lg">
          <p className="text-blue-800 dark:text-blue-300 font-semibold text-center">
            Result: <span className="text-lg">{result.toFixed(2)}</span>
          </p>
        </div>
      )}

      {/* Optional: Additional Information */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        This is a template calculator component
      </div>
    </div>
  );
};

export default CalculatorTemplate;