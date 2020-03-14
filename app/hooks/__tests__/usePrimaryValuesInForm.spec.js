import usePrimaryValuesInForm from '../usePrimaryValuesInForm';

describe('test hook usePrimaryValuesInForm', () => {
  const testFn = jest.fn();
  it('reset should be called', () => {
    usePrimaryValuesInForm(true, false, { title: 'b' }, { tile: 'a' }, testFn);
    expect(testFn).toHaveBeenCalled();
  });
});
