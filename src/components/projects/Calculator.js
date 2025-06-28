// src/components/projects/Calculator.js
import React, { useState } from 'react';
import { 
  BsCalculator, 
  BsPercent, 
  BsHeartPulse, 
  BsCurrencyDollar, 
  BsArrowLeftRight, 
  BsCalendarEvent,
  BsGear,
  BsClock,
  BsCalendar2Date,
  BsBarChart,
  BsCode,
  BsFire
} from 'react-icons/bs';

// Import individual calculator components
// Make sure to create these files in the calculators folder first!
import {
  BasicCalculator,
  PercentageCalculator,
  BMICalculator,
  AgeCalculator,
  UnitConverter,
  DateDifferenceCalculator,
  ScientificCalculator,
} from './calculators';

const Calculator = () => {
  const [activeTab, setActiveTab] = useState('basic');

  // Calculator tabs configuration
  const calculatorTabs = {
    basic: { title: 'Basic Calculator', icon: BsCalculator, color: 'blue', component: BasicCalculator },
    percentage: { title: 'Percentage', icon: BsPercent, color: 'green', component: PercentageCalculator },
    bmi: { title: 'BMI Calculator', icon: BsHeartPulse, color: 'red', component: BMICalculator },
    age: { title: 'Age Calculator', icon: BsCalendarEvent, color: 'purple', component: AgeCalculator },
    converter: { title: 'Unit Converter', icon: BsArrowLeftRight, color: 'indigo', component: UnitConverter },
    interest: { title: 'Simple Interest', icon: BsCurrencyDollar, color: 'yellow', component: null },
    calorie: { title: 'Calorie Calculator', icon: BsFire, color: 'pink', component: null },
    // timezone: { title: 'Time Zone', icon: BsClock, color: 'red', component: null },
    scientific: { title: 'Scientific', icon: BsGear, color: 'gray', component: ScientificCalculator },
    dateDiff: { title: 'Date Difference', icon: BsCalendar2Date, color: 'blue', component: DateDifferenceCalculator },
    statistics: { title: 'Statistics', icon: BsBarChart, color: 'emerald', component: null },
    baseConverter: { title: 'Base Converter', icon: BsCode, color: 'violet', component: null }
  };

  const renderCalculator = () => {
    const currentTab = calculatorTabs[activeTab];
    
    if (currentTab.component) {
      const CalculatorComponent = currentTab.component;
      return <CalculatorComponent />;
    }
    
    // Placeholder for components that haven't been created yet
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <currentTab.icon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
          {currentTab.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          This calculator is coming soon!
        </p>
        <div className="mt-4 text-sm text-gray-400 dark:text-gray-600">
          <p>Create this component to add functionality</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="flex h-96">
        {/* Left Sidebar - Calculator List */}
        <div className="w-64 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600 overflow-y-auto">
          <div className="p-2">
            <div className="mb-3 px-3 py-2">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Calculators
              </h3>
            </div>
            {Object.entries(calculatorTabs).map(([key, tab]) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === key;
              const hasComponent = tab.component !== null;
              
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 mb-1 text-left relative ${
                    isActive 
                      ? `bg-${tab.color}-500 text-white shadow-md` 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <TabIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium text-sm">{tab.title}</span>
                  {!hasComponent && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" title="Coming Soon" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Area */}
       <div className={`flex-1 overflow-y-auto ${calculatorTabs[activeTab].component ? 'p-6' : 'px-6 pt-6'}`}>
            {!calculatorTabs[activeTab].component && (
                <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    {React.createElement(calculatorTabs[activeTab].icon, {
                    className: "w-6 h-6 text-" + calculatorTabs[activeTab].color + "-500"
                    })}
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This calculator will be available soon
                    </p>
                </div>
                </div>
            )}
          
          {renderCalculator()}
        </div>
      </div>
    </div>
  );
};

export default Calculator;