import unique from './unique.js';

test('should format list when a number list', () => {
    const formattedList = unique([1, 1, 2]);
    expect(formattedList).toEqual([1, 2]);
    expect(formattedList).toMatchSnapshot();
});

test('should format list when a string list', () => {
    const formattedList = unique(['a', 'b', 'a']);
    expect(formattedList).toEqual(['a', 'b']);
    expect(formattedList).toMatchSnapshot();
});

test('should format list when a undefined, null, NaN list', () => {
    const formattedList = unique(['a', 'a', undefined, undefined, null, null, NaN, NaN]);
    expect(formattedList).toEqual(['a', undefined, null, NaN]);
    expect(formattedList).toMatchSnapshot();
});
