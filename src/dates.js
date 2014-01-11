const moment = require('moment');

const toMomentDate = (dateStr) => moment(dateStr).startOf('day');

const toJsDate = (momentDate) => momentDate.clone().toDate();

const getDaysBetween = function(startDateStr, endDateStr) {
  const dates = [];

  let currDate = toMomentDate(startDateStr);
  let lastDate = toMomentDate(endDateStr);

  while(currDate.diff(lastDate) <= 0) {
    dates.push(currDate.clone().toDate());
    currDate.add(1, 'day');
  }

  return dates;
};

const H = [
  ...getDaysBetween('2014-01-05', '2014-01-11'),
  toJsDate(toMomentDate('2014-01-15')),
  toJsDate(toMomentDate('2014-01-22')),
  ...getDaysBetween('2014-01-26', '2014-02-01'),
];

const I = getDaysBetween('2014-02-09', '2014-02-15');

const all_dates = [
  ...H, ...I
];

module.exports = all_dates.map(d => d.toString());
