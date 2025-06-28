import React, { useState, useEffect, useCallback } from 'react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [bmi, setBmi] = useState(null);

  // Convert units to metric for calculation
  const convertToMetric = useCallback(() => {
    if (!height || !weight) return { heightInM: 0, weightInKg: 0 };

    // Convert height to meters
    let heightInM;
    if (heightUnit === 'cm') {
      heightInM = parseFloat(height) / 100;
    } else { // inches
      heightInM = parseFloat(height) * 0.0254;
    }

    // Convert weight to kg
    let weightInKg;
    if (weightUnit === 'kg') {
      weightInKg = parseFloat(weight);
    } else { // lbs
      weightInKg = parseFloat(weight) * 0.453592;
    }

    return { heightInM, weightInKg };
  }, [height, weight, heightUnit, weightUnit]);

  const calculateBMI = useCallback(() => {
    if (height && weight) {
      const { heightInM, weightInKg } = convertToMetric();
      if (heightInM > 0 && weightInKg > 0) {
        const bmiValue = weightInKg / (heightInM * heightInM);
        setBmi(bmiValue);
      }
    } else {
      setBmi(null);
    }
  }, [height, weight, convertToMetric]);

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { 
      category: 'Underweight', 
      color: 'text-blue-600 dark:text-blue-400', 
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-700'
    };
    if (bmi < 25) return { 
      category: 'Normal weight', 
      color: 'text-green-600 dark:text-green-400', 
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-700'
    };
    if (bmi < 30) return { 
      category: 'Overweight', 
      color: 'text-yellow-600 dark:text-yellow-400', 
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-700'
    };
    return { 
      category: 'Obese', 
      color: 'text-red-600 dark:text-red-400', 
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-700'
    };
  };

  const clearInputs = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
  };

  useEffect(() => {
    calculateBMI();
  }, [calculateBMI]);

  return (
      <div className="space-y-4">
        {/* Height Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Height :
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="flex-1 px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder={heightUnit === 'cm' ? 'e.g. 175' : 'e.g. 69'}
            />
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium min-w-[70px]"
            >
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
        </div>

        {/* Weight Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Weight :
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder={weightUnit === 'kg' ? 'e.g. 70' : 'e.g. 154'}
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium min-w-[70px]"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={calculateBMI}
            disabled={!height || !weight}
            className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Calculate BMI
          </button>
          <button
            onClick={clearInputs}
            className="px-6 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-semibold"
          >
            Clear
          </button>
        </div>

        {/* Current Selection Display */}
        {(height || weight) && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            Using: {heightUnit} for height, {weightUnit} for weight
          </div>
        )}

        {/* BMI Result */}
        {bmi && (
          <div className={`${getBMICategory(bmi).bgColor} ${getBMICategory(bmi).borderColor} border p-6 rounded-lg text-center transition-all duration-300`}>
            <p className="text-gray-800 dark:text-gray-200 font-bold text-3xl mb-2">
              BMI: {bmi.toFixed(1)}
            </p>
            <p className={`font-semibold text-lg ${getBMICategory(bmi).color} mb-4`}>
              {getBMICategory(bmi).category}
            </p>
            
            {/* BMI Scale Visual */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden">
                <div className="flex-1 bg-blue-300"></div>
                <div className="flex-1 bg-green-300"></div>
                <div className="flex-1 bg-yellow-300"></div>
                <div className="flex-1 bg-red-300"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>&lt;18.5</span>
                <span>18.5-24.9</span>
                <span>25-29.9</span>
                <span>≥30</span>
              </div>
            </div>

            {/* Detailed Categories */}
            <div className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg p-3">
              <p className="font-medium mb-2">BMI Categories:</p>
              <div className="grid grid-cols-1 gap-1 text-xs">
                <div className="flex justify-between">
                  <span>Underweight:</span>
                  <span>&lt; 18.5</span>
                </div>
                <div className="flex justify-between">
                  <span>Normal weight:</span>
                  <span>18.5 - 24.9</span>
                </div>
                <div className="flex justify-between">
                  <span>Overweight:</span>
                  <span>25 - 29.9</span>
                </div>
                <div className="flex justify-between">
                  <span>Obese:</span>
                  <span>≥ 30</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default BMICalculator;