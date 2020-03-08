import { useForm } from 'react-hook-form';
import usePrimaryValuesInForm from '../usePrimaryValuesInForm';

jest.mock('react-hook-form');

describe('test hook usePrimaryValuesInForm', () => {
  const testFn = jest.fn();
  const returnValue = {
    getValues: () => ({ title: 'a' }),
    reset: testFn,
  };
  useForm.mockReturnValue(returnValue);
  it('reset should be called', () => {
    usePrimaryValuesInForm(true, false, { title: 'b' });
    expect(testFn).toHaveBeenCalled();
  });
});
