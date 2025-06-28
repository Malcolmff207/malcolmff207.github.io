import React, { useState, useEffect, useCallback } from 'react';

const DateDifferenceCalculator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [differenceData, setDifferenceData] = useState(null);

  const calculateDifference = useCallback(() => {
    if (!startDate || !endDate) {
      setDifferenceData(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setDifferenceData(null);
      return;
    }

    // Determine if dates are reversed (for negative calculation)
    const isReversed = start > end;
    const earlierDate = isReversed ? end : start;
    const laterDate = isReversed ? start : end;

    // Calculate exact difference
    let years = laterDate.getFullYear() - earlierDate.getFullYear();
    let months = laterDate.getMonth() - earlierDate.getMonth();
    let days = laterDate.getDate() - earlierDate.getDate();

    // Adjust if days are negative
    if (days < 0) {
      months--;
      const lastMonth = new Date(laterDate.getFullYear(), laterDate.getMonth(), 0);
      days += lastMonth.getDate();
    }

    // Adjust if months are negative
    if (months < 0) {
      years--;
      months += 12;
    }

    // Apply negative sign if dates are reversed
    if (isReversed) {
      years = -years;
      months = -months;
      days = -days;
    }

    // Calculate total differences
    const totalMilliseconds = end.getTime() - start.getTime();
    const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const totalMinutes = Math.floor(totalMilliseconds / (1000 * 60));
    const totalSeconds = Math.floor(totalMilliseconds / 1000);

    // Calculate working days (exclude weekends)
    let workingDays = 0;
    const currentDate = new Date(earlierDate);
    while (currentDate <= laterDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
        workingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Apply negative sign to working days if reversed
    if (isReversed) {
      workingDays = -workingDays;
    }

    // Calculate weeks
    const totalWeeks = Math.floor(Math.abs(totalDays) / 7) * (totalDays < 0 ? -1 : 1);
    const remainingDaysAfterWeeks = Math.abs(totalDays) % 7 * (totalDays < 0 ? -1 : 1);

    setDifferenceData({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      remainingDaysAfterWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      workingDays,
      weekends: (isReversed ? -1 : 1) * (Math.abs(totalDays) - Math.abs(workingDays)),
      startDateFormatted: start.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      endDateFormatted: end.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    });
  }, [startDate, endDate]);

  const clearInputs = () => {
    setStartDate('');
    setEndDate('');
    setDifferenceData(null);
  };

  const setToday = (field) => {
    const today = new Date().toISOString().split('T')[0];
    if (field === 'start') {
      setStartDate(today);
    } else {
      setEndDate(today);
    }
  };

  const swapDates = () => {
    const temp = startDate;
    setStartDate(endDate);
    setEndDate(temp);
  };

  useEffect(() => {
    calculateDifference();
  }, [calculateDifference]);

  // Format number with commas and handle negative values
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  // Format difference display with proper signs and hide zero values
  const formatDifference = (years, months, days) => {
    const isNegative = years < 0 || months < 0 || days < 0;
    const absYears = Math.abs(years);
    const absMonths = Math.abs(months);
    const absDays = Math.abs(days);
    
    const parts = [];
    
    if (absYears > 0) {
      parts.push(`${absYears} year${absYears !== 1 ? 's' : ''}`);
    }
    
    if (absMonths > 0) {
      parts.push(`${absMonths} month${absMonths !== 1 ? 's' : ''}`);
    }
    
    if (absDays > 0 || parts.length === 0) { // Always show days if it's the only value or if there are days
      parts.push(`${absDays} day${absDays !== 1 ? 's' : ''}`);
    }
    
    return {
      text: parts.join(', '),
      isNegative
    };
  };

  return (
      <div className="space-y-4">

        {/* Date Inputs - Side by Side */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Start Date */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date
              </label>
              <button
                onClick={() => setToday('start')}
                className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 text-sm underline"
              >
                Use today
              </button>
            </div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* End Date */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                End Date
              </label>
              <button
                onClick={() => setToday('end')}
                className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 text-sm underline"
              >
                Use today
              </button>
            </div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={swapDates}
            disabled={!startDate || !endDate}
            className="px-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 py-3 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Swap
          </button>
          <button
            onClick={calculateDifference}
            disabled={!startDate || !endDate}
            className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Calculate Difference
          </button>
          <button
            onClick={clearInputs}
            className="px-6 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-semibold"
          >
            Clear
          </button>
        </div>

        {/* Results */}
        {differenceData && (
          <div className="space-y-4">
            {/* Main Difference Display */}
            <div className={`p-6 rounded-lg border ${
              formatDifference(differenceData.years, differenceData.months, differenceData.days).isNegative
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
            }`}>
              <h3 className={`font-semibold mb-3 text-center ${
                formatDifference(differenceData.years, differenceData.months, differenceData.days).isNegative
                  ? 'text-red-700 dark:text-red-300'
                  : 'text-green-700 dark:text-green-300'
              }`}>
                {formatDifference(differenceData.years, differenceData.months, differenceData.days).isNegative ? 'Negative Difference' : 'Exact Difference'}
              </h3>
              <p className="text-gray-800 dark:text-gray-200 font-bold text-2xl text-center mb-2">
                {formatDifference(differenceData.years, differenceData.months, differenceData.days).isNegative && '- '}
                {formatDifference(differenceData.years, differenceData.months, differenceData.days).text}
              </p>
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                <p>From: {differenceData.startDateFormatted}</p>
                <p>To: {differenceData.endDateFormatted}</p>
                {formatDifference(differenceData.years, differenceData.months, differenceData.days).isNegative && (
                  <p className="text-red-600 dark:text-red-400 font-medium mt-2">
                    ⚠️ End date is before start date
                  </p>
                )}
              </div>
            </div>

            {/* Time Breakdown */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Total Time Units */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 rounded-lg">
                <h3 className="text-blue-700 dark:text-blue-300 font-semibold mb-3 text-center">
                  Total Time
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Days:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(differenceData.totalDays)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Hours:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(differenceData.totalHours)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Minutes:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(differenceData.totalMinutes)}</span>
                  </div>
                  <div className="flex justify-between border-t border-blue-200 dark:border-blue-600 pt-2">
                    <span className="text-gray-600 dark:text-gray-400">Seconds:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(differenceData.totalSeconds)}</span>
                  </div>
                </div>
              </div>

              {/* Work Days Analysis */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 p-4 rounded-lg">
                <h3 className="text-purple-700 dark:text-purple-300 font-semibold mb-3 text-center">
                  Work Days
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Working Days:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(differenceData.workingDays)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Weekend Days:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(differenceData.weekends)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Weeks:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(differenceData.totalWeeks)}</span>
                  </div>
                  <div className="flex justify-between border-t border-purple-200 dark:border-purple-600 pt-2">
                    <span className="text-gray-600 dark:text-gray-400">Extra Days:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{differenceData.remainingDaysAfterWeeks}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!startDate && !endDate && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Select both start and end dates to calculate the difference
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
              💡 Tip: You can enter dates in any order - negative values will show if end date is before start date
            </p>
          </div>
        )}
      </div>
  );
};

export default DateDifferenceCalculator;