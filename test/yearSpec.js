var assert = require('chai').assert;
var _ = require('lodash');
var YearPart = require('../lib/year.js');
var MonthName = require('../lib/monthName.js');


describe('YearPart', function() {

  var leapYears = [1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048, 2052, 2056, 2060, 2064, 2068, 2072, 2076, 2080, 2084, 2088, 2092, 2096, 2104, 2108, 2112, 2116, 2120, 2124, 2128, 2132, 2136, 2140, 2144, 2148, 2152, 2156, 2160, 2164, 2168, 2172, 2176, 2180, 2184, 2188, 2192, 2196, 2204, 2208, 2212, 2216, 2220, 2224, 2228, 2232, 2236, 2240, 2244, 2248, 2252, 2256, 2260, 2264, 2268, 2272, 2276, 2280, 2284, 2288, 2292, 2296, 2304, 2308, 2312, 2316, 2320, 2324, 2328, 2332, 2336, 2340, 2344, 2348, 2352, 2356, 2360, 2364, 2368, 2372, 2376, 2380, 2384, 2388, 2392, 2396, 2400, 2404, 2408, 2412, 2416, 2420, 2424, 2428, 2432, 2436, 2440, 2444, 2448, 2452, 2456, 2460, 2464, 2468, 2472, 2476, 2480, 2484, 2488, 2492, 2496, 2504, 2508, 2512, 2516, 2520, 2524, 2528, 2532, 2536, 2540, 2544, 2548, 2552, 2556, 2560, 2564, 2568, 2572, 2576, 2580, 2584, 2588, 2592, 2596, 2604, 2608, 2612, 2616, 2620, 2624, 2628, 2632, 2636, 2640, 2644, 2648, 2652, 2656, 2660, 2664, 2668, 2672, 2676, 2680, 2684, 2688, 2692, 2696, 2704, 2708, 2712, 2716, 2720, 2724, 2728, 2732, 2736, 2740, 2744, 2748, 2752, 2756, 2760, 2764, 2768, 2772, 2776, 2780, 2784, 2788, 2792, 2796, 2800, 2804, 2808, 2812, 2816, 2820, 2824, 2828, 2832, 2836, 2840, 2844, 2848, 2852, 2856, 2860, 2864, 2868, 2872, 2876, 2880, 2884, 2888, 2892, 2896, 2904, 2908, 2912, 2916, 2920, 2924, 2928, 2932, 2936, 2940, 2944, 2948, 2952, 2956, 2960, 2964, 2968, 2972, 2976, 2980, 2984, 2988, 2992, 2996];
  var years = _.range(1901, 2999);

  it('should return the year which was passed in', function() {
    var myYear = new YearPart(1989);
    assert.equal(myYear.year, 1989);
  });

  describe('isValid', function() {
    it('should return false when year is empty', function() {
      var myYear = new YearPart();
      assert.isFalse(myYear.isValid());
    });

    it('should return false when input cannot be parsed as int', function() {
      var myYear = new YearPart('xx');
      assert.isFalse(myYear.isValid());
    });

    it('should return false when year is less than 1901', function() {
      var myYear = new YearPart(1900);
      assert.isFalse(myYear.isValid());
    });

    it('should return false when year is greater than 2999', function() {
      var myYear = new YearPart(3000);
      assert.isFalse(myYear.isValid());
    });

    it('should return true when year is between 1901 and 2999', function() {
      years.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.isTrue(myYear.isValid(), y + ' is a valid year');
      })

    });

    it('should return true when a valid year is passed in as a string', function() {
      var myYear = new YearPart('2125');
      assert.isTrue(myYear.isValid(), 'YearPart 2125 is a valid year');
    })

  });

  describe('isLeapYear', function() {

    it('should return true for valid leap years', function() {
      leapYears.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.isTrue(myYear.isLeapYear(), y + ' is a valid leap year');
      });
    });

    it('should return false for year which is not a leap year', function() {
      years.forEach(function(y) {
        if (!_.includes(leapYears, y)) {
          var myYear = new YearPart(y);
          var actual = myYear.isLeapYear();
          assert.isFalse(actual, y + ' is not a leap year');
        }
      })

    });

  });

  describe('numberOfDaysInMonth', function(month) {

    // January
    it('should always return 31 days for January', function() {
      years.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.equal(myYear.numberOfDaysInMonth(MonthName.January), 31);
      })
    });

    // February
    it('should return 28 days for February when not a leap year', function() {
      years.forEach(function(y) {
        if (!_.includes(leapYears, y)) {
          var myYear = new YearPart(y);
          assert.equal(myYear.numberOfDaysInMonth(MonthName.February), 28);
        }
      })
    });

    it('should return 29 days for February when not a leap year', function() {
      leapYears.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.equal(myYear.numberOfDaysInMonth(MonthName.February), 29);
      });
    });

    // March
    it('should always return 31 days for March', function() {
      years.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.equal(myYear.numberOfDaysInMonth(MonthName.March), 31);
      })
    });

    // April
    it('should always return 30 days for April', function() {
      years.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.equal(myYear.numberOfDaysInMonth(MonthName.April), 30);
      })
    });

    // May
    it('should always return 31 days for May', function() {
      years.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.equal(myYear.numberOfDaysInMonth(MonthName.May), 31);
      })
    });

    // June
    it('should always return 30 days for June', function() {
      years.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.equal(myYear.numberOfDaysInMonth(MonthName.June), 30);
      })
    });


    // July
    it('should always return 31 days for July', function() {
      years.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.equal(myYear.numberOfDaysInMonth(MonthName.July), 31);
      })
    });

    // August
    it('should always return 31 days for August', function() {
      years.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.equal(myYear.numberOfDaysInMonth(MonthName.August), 31);
      })
    });

    // September
    it('should always return 30 days for September', function() {
      years.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.equal(myYear.numberOfDaysInMonth(MonthName.September), 30);
      })
    });

    // October
    it('should always return 31 days for October', function() {
      years.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.equal(myYear.numberOfDaysInMonth(MonthName.October), 31);
      })
    });

    // November
    it('should always return 30 days for November', function() {
      years.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.equal(myYear.numberOfDaysInMonth(MonthName.November), 30);
      })
    });

    // December
    it('should always return 31 days for December', function() {
      years.forEach(function(y) {
        var myYear = new YearPart(y);
        assert.equal(myYear.numberOfDaysInMonth(MonthName.December), 31);
      })
    });

  });


});
