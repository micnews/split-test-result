'use strict';

var test = require('tape');
var getSplitTestResult = require('./index');

test('getSplitTestResult()', function (t) {
  var variations1 = [
    {
      id: 1,
      stats: { impressions: 100, conversions: 10 }
    },
    {
      id: 2,
      stats: { impressions: 200, conversions: 50 }
    },
    {
      id: 3,
      stats: { impressions: 150, conversions: 3 }
    }
  ];

  t.deepEqual(getSplitTestResult(variations1), {
    distinctWinner: 2,
    losers: [1, 3]
  }, 'Should return distinct winner and losers');

  var variations2 = [
    {
      id: 1,
      stats: { impressions: 200, conversions: 50 }
    },
    {
      id: 2,
      stats: { impressions: 190, conversions: 45 }
    }
  ];

  t.deepEqual(getSplitTestResult(variations2), {
    distinctWinner: null,
    losers: []
  }, 'No distinct winner or losers');

  var variations3 = [
    {
      id: 1,
      stats: { impressions: 200, conversions: 50 }
    },
    {
      id: 2,
      stats: { impressions: 190, conversions: 45 }
    },
    {
      id: 3,
      stats: { impressions: 190, conversions: 2 }
    }
  ];

  t.deepEqual(getSplitTestResult(variations3), {
    distinctWinner: null,
    losers: [3]
  }, 'Can return losers without declaring distinct winner');

  t.end();
});
