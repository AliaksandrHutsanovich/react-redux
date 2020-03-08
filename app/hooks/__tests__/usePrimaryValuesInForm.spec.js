import usePrimaryValuesInForm from '../usePrimaryValuesInForm';

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    getValues: () => ({ title: 'a' }),
    reset: jest.fn().mockReturnValue(2),
  }),
}));

describe('test hook usePrimaryValuesInForm', () => {
  it('reset should be called', () => {
    expect(usePrimaryValuesInForm(true, false, { title: 'b' })).toEqual(2);
  });
});
