global.OriginalDate = global.Date;
global.OriginalDateTimeFormat = Intl.DateTimeFormat;

function travelTo(mockedDate, timezone = 'UTC') {
  global.Date = jest.fn((date) => date ? new global.OriginalDate(date) : mockedDate);
  global.Date.UTC = global.OriginalDate.UTC;
  global.Date.parse = global.OriginalDate.parse;
  global.Date.now = () => mockedDate.getTime();
  global.Intl.DateTimeFormat = () => ({ resolvedOptions: () => ({ timeZone: timezone }) });
}

function travelBack() {
  global.Date = global.OriginalDate;
  global.Intl.DateTimeFormat = global.OriginalDateTimeFormat;
}

exports.travelTo = travelTo;
exports.travelBack = travelBack;
