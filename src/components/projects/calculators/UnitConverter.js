import React, { useState, useEffect, useCallback } from 'react';

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  // Unit categories and their conversion factors (to base unit)
  const unitCategories = {
    length: {
      name: 'Length',
      icon: '📏',
      baseUnit: 'meter',
      units: {
        meter: { name: 'Meter', symbol: 'm', factor: 1 },
        kilometer: { name: 'Kilometer', symbol: 'km', factor: 1000 },
        centimeter: { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
        millimeter: { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
        inch: { name: 'Inch', symbol: 'in', factor: 0.0254 },
        foot: { name: 'Foot', symbol: 'ft', factor: 0.3048 },
        yard: { name: 'Yard', symbol: 'yd', factor: 0.9144 },
        mile: { name: 'Mile', symbol: 'mi', factor: 1609.34 },
        nauticalMile: { name: 'Nautical Mile', symbol: 'nmi', factor: 1852 }
      }
    },
    weight: {
      name: 'Weight',
      icon: '⚖️',
      baseUnit: 'kilogram',
      units: {
        kilogram: { name: 'Kilogram', symbol: 'kg', factor: 1 },
        gram: { name: 'Gram', symbol: 'g', factor: 0.001 },
        pound: { name: 'Pound', symbol: 'lb', factor: 0.453592 },
        ounce: { name: 'Ounce', symbol: 'oz', factor: 0.0283495 },
        ton: { name: 'Metric Ton', symbol: 't', factor: 1000 },
        stone: { name: 'Stone', symbol: 'st', factor: 6.35029 }
      }
    },
    temperature: {
      name: 'Temperature',
      icon: '🌡️',
      baseUnit: 'celsius',
      units: {
        celsius: { name: 'Celsius', symbol: '°C' },
        fahrenheit: { name: 'Fahrenheit', symbol: '°F' },
        kelvin: { name: 'Kelvin', symbol: 'K' }
      }
    },
    volume: {
      name: 'Volume',
      icon: '🥤',
      baseUnit: 'liter',
      units: {
        liter: { name: 'Liter', symbol: 'L', factor: 1 },
        milliliter: { name: 'Milliliter', symbol: 'mL', factor: 0.001 },
        gallon: { name: 'Gallon (US)', symbol: 'gal', factor: 3.78541 },
        quart: { name: 'Quart (US)', symbol: 'qt', factor: 0.946353 },
        pint: { name: 'Pint (US)', symbol: 'pt', factor: 0.473176 },
        cup: { name: 'Cup (US)', symbol: 'cup', factor: 0.236588 },
        fluidOunce: { name: 'Fluid Ounce (US)', symbol: 'fl oz', factor: 0.0295735 },
        tablespoon: { name: 'Tablespoon', symbol: 'tbsp', factor: 0.0147868 },
        teaspoon: { name: 'Teaspoon', symbol: 'tsp', factor: 0.00492892 }
      }
    },
    area: {
      name: 'Area',
      icon: '📐',
      baseUnit: 'squareMeter',
      units: {
        squareMeter: { name: 'Square Meter', symbol: 'm²', factor: 1 },
        squareKilometer: { name: 'Square Kilometer', symbol: 'km²', factor: 1000000 },
        squareCentimeter: { name: 'Square Centimeter', symbol: 'cm²', factor: 0.0001 },
        squareFoot: { name: 'Square Foot', symbol: 'ft²', factor: 0.092903 },
        squareInch: { name: 'Square Inch', symbol: 'in²', factor: 0.00064516 },
        acre: { name: 'Acre', symbol: 'ac', factor: 4046.86 },
        hectare: { name: 'Hectare', symbol: 'ha', factor: 10000 }
      }
    },
    speed: {
      name: 'Speed',
      icon: '🏃',
      baseUnit: 'meterPerSecond',
      units: {
        meterPerSecond: { name: 'Meter/Second', symbol: 'm/s', factor: 1 },
        kilometerPerHour: { name: 'Kilometer/Hour', symbol: 'km/h', factor: 0.277778 },
        milePerHour: { name: 'Mile/Hour', symbol: 'mph', factor: 0.44704 },
        footPerSecond: { name: 'Foot/Second', symbol: 'ft/s', factor: 0.3048 },
        knot: { name: 'Knot', symbol: 'kn', factor: 0.514444 }
      }
    }
  };

  // Temperature conversion functions
  const convertTemperature = useCallback((value, from, to) => {
    if (from === to) return value;
    
    let celsius;
    // Convert to Celsius first
    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        return value;
    }
    
    // Convert from Celsius to target
    switch (to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        return celsius;
    }
  }, []);

  // Regular unit conversion
  const convertRegularUnits = useCallback((value, from, to, categoryData) => {
    if (from === to) return value;
    
    const fromFactor = categoryData.units[from]?.factor || 1;
    const toFactor = categoryData.units[to]?.factor || 1;
    
    // Convert to base unit, then to target unit
    const baseValue = value * fromFactor;
    return baseValue / toFactor;
  }, []);

  // Main conversion function
  const convertValue = useCallback((value, from, to, currentCategory) => {
    if (!value || !from || !to) return '';
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    
    const categoryData = unitCategories[currentCategory];
    
    if (currentCategory === 'temperature') {
      return convertTemperature(numValue, from, to);
    } else {
      return convertRegularUnits(numValue, from, to, categoryData);
    }
  }, [convertTemperature, convertRegularUnits]);

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setFromValue('');
    setToValue('');
    setFromUnit('');
    setToUnit('');
  };

  // Set default units when category changes
  useEffect(() => {
    const categoryData = unitCategories[category];
    const unitKeys = Object.keys(categoryData.units);
    
    if (unitKeys.length >= 2) {
      setFromUnit(unitKeys[0]);
      setToUnit(unitKeys[1]);
    }
  }, [category]);

  // Convert when values or units change
  useEffect(() => {
    if (fromValue && fromUnit && toUnit) {
      const result = convertValue(fromValue, fromUnit, toUnit, category);
      setToValue(result !== '' ? result.toFixed(6).replace(/\.?0+$/, '') : '');
    } else {
      setToValue('');
    }
  }, [fromValue, fromUnit, toUnit, category, convertValue]);

  // Handle from value change
  const handleFromValueChange = (value) => {
    setFromValue(value);
  };

  // Handle to value change (reverse conversion)
  const handleToValueChange = (value) => {
    setToValue(value);
    if (value && fromUnit && toUnit) {
      const result = convertValue(value, toUnit, fromUnit, category);
      setFromValue(result !== '' ? result.toFixed(6).replace(/\.?0+$/, '') : '');
    } else {
      setFromValue('');
    }
  };

  // Swap units
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  // Clear all values
  const clearAll = () => {
    setFromValue('');
    setToValue('');
  };

  const currentCategory = unitCategories[category];

  return (
      <div className="space-y-4">

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {Object.entries(unitCategories).map(([key, data]) => (
              <option key={key} value={key}>
                {data.icon} {data.name}
              </option>
            ))}
          </select>
        </div>

        {/* From and To Conversion - Side by Side */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* From Conversion */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              From
            </label>
            <div className="space-y-2">
              <input
                type="number"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter value"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(currentCategory.units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.symbol} - {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* To Conversion */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              To
            </label>
            <div className="space-y-2">
              <input
                type="number"
                value={toValue}
                onChange={(e) => handleToValueChange(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Result"
              />
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {Object.entries(currentCategory.units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.symbol} - {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={swapUnits}
            className="px-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 py-3 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors font-semibold"
            title="Swap units"
          >
            Swap
          </button>
          <button
            onClick={clearAll}
            className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-semibold"
          >
            Clear
          </button>
        </div>



        {/* Available Units Info */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-2 text-center">
            {currentCategory.icon} {currentCategory.name} Available
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            {Object.keys(currentCategory.units).length} units available for conversion
          </p>
        </div>
      </div>
  );
};

export default UnitConverter;