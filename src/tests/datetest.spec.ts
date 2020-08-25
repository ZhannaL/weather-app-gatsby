// eslint-disable-next-line import/no-extraneous-dependencies
import { advanceTo } from 'jest-date-mock';
import { get3DaysWeekName } from 'src/Translations/helpers';

describe('date unit tests', () => {
  it('test get days week name', () => {
    advanceTo(new Date(2020, 5, 3, 10, 34, 0));
    expect(get3DaysWeekName('en', 'Europe/Warsaw')).toStrictEqual([
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });
});
