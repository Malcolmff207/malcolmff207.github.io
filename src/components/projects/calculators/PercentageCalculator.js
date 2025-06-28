import React, { useState } from 'react';

const PercentageCalculator = () => {
  const [amount, setAmount] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState(null);

  const calculatePercentage = () => {
    if (amount && percentage) {
      const result = (parseFloat(amount) * parseFloat(percentage)) / 100;
      setResult(result);
    }
  };

  const clearInputs = () => {
    setAmount('');
    setPercentage('');
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Percentage (%)
          </label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter percentage"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={calculatePercentage}
          className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
        >
          Calculate Percentage
        </button>
        <button
          onClick={clearInputs}
          className="px-6 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-semibold"
        >
          Clear
        </button>
      </div>

      {result !== null && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-4 rounded-lg">
          <p className="text-green-800 dark:text-green-300 font-semibold text-center">
            {percentage}% of {amount} = <span className="text-lg">{result.toFixed(2)}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PercentageCalculator;