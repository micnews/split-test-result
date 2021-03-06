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
    distinctWinner: {
      id: 2,
      stats: { impressions: 200, conversions: 50 }
    },
    losers: [{
      id: 1,
      stats: { impressions: 100, conversions: 10 }
    }, {
      id: 3,
      stats: { impressions: 150, conversions: 3 }
    }]
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
    losers: [{
      id: 3,
      stats: { impressions: 190, conversions: 2 }
    }]
  }, 'Can return losers without declaring distinct winner');

  var variations4 = [
    {
      id: 1,
      stats: { impressions: 0, conversions: 0 }
    },
    {
      id: 2,
      stats: { impressions: 50, conversions: 0 }
    }
  ];

  t.deepEqual(getSplitTestResult(variations4), {
    distinctWinner: null,
    losers: []
  }, 'No winners or losers if impressions and/or conversions is 0');

  var variations5 = [
    {
      id: 1,
      stats: { impressions: 5, conversions: 3 }
    },
    {
      id: 2,
      stats: { impressions: 1100, conversions: 100 }
    },
    {
      id: 2,
      stats: { impressions: 1200, conversions: 90 }
    }
  ];

  t.deepEqual(getSplitTestResult(variations5), {
    distinctWinner: {
      id: 1,
      stats: { impressions: 5, conversions: 3 }
    },
    losers: [
      {
        id: 2,
        stats: { impressions: 1100, conversions: 100 }
      },
      {
        id: 2,
        stats: { impressions: 1200, conversions: 90 }
      }
    ]
  }, 'Can declare distinct winner with few impressions');

  t.deepEqual(getSplitTestResult(variations5, { minImpressions: 1000 }), {
    distinctWinner: null,
    losers: []
  }, 'Does not include variations below minImpressions limit');

  t.end();
});
