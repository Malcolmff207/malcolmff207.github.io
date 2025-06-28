import React, { useState, useEffect, useCallback } from 'react';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [ageData, setAgeData] = useState(null);

  const calculateAge = useCallback(() => {
    if (!birthDate) {
      setAgeData(null);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();
    
    // Check if birth date is in the future
    if (birth > today) {
      setAgeData(null);
      return;
    }

    // Calculate exact age
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // Adjust if days are negative
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    // Adjust if months are negative
    if (months < 0) {
      years--;
      months += 12;
    }



    // Calculate total days lived
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Calculate what day of the week they were born
    const birthDayName = birth.toLocaleDateString('en-US', { weekday: 'long' });

    setAgeData({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      birthDayName,
      zodiacSign: getZodiacSign(birth.getMonth() + 1, birth.getDate())
    });
  }, [birthDate]);

  const getZodiacSign = (month, day) => {
    const signs = [
      { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
      { sign: 'Pisces', start: [2, 19], end: [3, 20] },
      { sign: 'Aries', start: [3, 21], end: [4, 19] },
      { sign: 'Taurus', start: [4, 20], end: [5, 20] },
      { sign: 'Gemini', start: [5, 21], end: [6, 20] },
      { sign: 'Cancer', start: [6, 21], end: [7, 22] },
      { sign: 'Leo', start: [7, 23], end: [8, 22] },
      { sign: 'Virgo', start: [8, 23], end: [9, 22] },
      { sign: 'Libra', start: [9, 23], end: [10, 22] },
      { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
      { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
      { sign: 'Capricorn', start: [12, 22], end: [1, 19] }
    ];

    for (const { sign, start, end } of signs) {
      if (
        (month === start[0] && day >= start[1]) ||
        (month === end[0] && day <= end[1]) ||
        (start[0] === 12 && end[0] === 1 && ((month === 12 && day >= 22) || (month === 1 && day <= 19)))
      ) {
        return sign;
      }
    }
    return 'Unknown';
  };

  const clearInput = () => {
    setBirthDate('');
    setAgeData(null);
  };

  useEffect(() => {
    calculateAge();
  }, [calculateAge]);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  // Get max date (today)
  const getMaxDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
      <div className="space-y-4">
        {/* Birth Date Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Birth Date
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={getMaxDate()}
            className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={calculateAge}
            disabled={!birthDate}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Calculate Age
          </button>
          <button
            onClick={clearInput}
            className="px-6 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-semibold"
          >
            Clear
          </button>
        </div>



        {/* Age Results */}
        {ageData && (
          <div className="space-y-4">
            {/* Age Breakdown */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-3 text-center">
                Age Breakdown
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Years:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{ageData.years}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Additional Months:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{ageData.months}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Additional Days:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{ageData.days}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
                  <span className="text-gray-600 dark:text-gray-400">Total Minutes:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(ageData.totalMinutes)}</span>
                </div>
              </div>
            </div>



            {/* Fun Facts */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 p-4 rounded-lg">
              <h3 className="text-purple-700 dark:text-purple-300 font-semibold mb-3 text-center">
                Fun Facts
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center">
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {formatNumber(ageData.totalDays)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Days Lived</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {formatNumber(ageData.totalHours)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Hours Lived</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {ageData.birthDayName}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Born On</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {ageData.zodiacSign}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Zodiac Sign</p>
                </div>
              </div>
            </div>


          </div>
        )}

        {/* Error State */}
        {birthDate && !ageData && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-4 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-400 font-medium">
              Please select a valid birth date (not in the future)
            </p>
          </div>
        )}
      </div>
  );
};

export default AgeCalculator;