'use strict';
var Abba = require('abbajs').Abba;

module.exports = function (variations) {
  var sorted = variations
    .filter(function (variation) {
      return variation.stats.impressions && variation.stats.impressions > 0;
    })
    .sort(function (a, b) {
      var aConversionRate = a.stats.conversions / a.stats.impressions;
      var bConversionRate = b.stats.conversions / b.stats.impressions;
      return bConversionRate - aConversionRate;
    });

  if (!sorted.length) {
    return {
      distinctWinner: null,
      losers: []
    };
  }

  // Basline is the variation with highest conversionRate.
  var baseline = sorted.shift();

  var experiment = new Abba.Experiment(
    sorted.length,
    baseline.stats.conversions,
    baseline.stats.impressions,
    0.5
  );
  var hasDistinctWinner = true;
  var losers = [];

  sorted.forEach(function (item) {
    var result = experiment.getResults(
      item.stats.conversions,
      item.stats.impressions
    );
    // pValue < 0.05 = Statistically significant difference from baseline.
    if (result.pValue < 0.05) {
      losers.push(item);
    } else {
      // If any of the variations are not statistically significant worse
      // than baseline we do not have a distinct winner yet.
      hasDistinctWinner = false;
    }
  });

  return {
    distinctWinner: hasDistinctWinner ? baseline : null,
    losers: losers
  };
};
