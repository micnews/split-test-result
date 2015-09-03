## @mic/split-test-result

### Install

```shell
npm install @mic/split-test-result
```

### Usage

```js
var getSplitTestResult = require('@mic/split-test-result');
var variations = [
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

console.log(getSplitTestResult(variations));

// Output:
// {
//   distinctWinner: 2,
//   losers: [1, 3]
// }
```

### About
Using [abbajs](https://github.com/thii/abbajs) to calculate results of a/b test experiment. The version with highest conversion rate is the baseline which the other variations are compared against. Any variation with a p-value less than 0.05 is a loser and if all the variations are losers the baseline is the `distinctWinner`.
