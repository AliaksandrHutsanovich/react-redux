import { useForm } from 'react-hook-form';

export const getEqualityToInitial = (values, props) => (
  Object
    .keys(values)
    .every((key) => values[key] === props[key])
);

const usePrimaryValuesInForm = (prop, prevProp, primaryValues) => {
  const {
    getValues,
    reset,
  } = useForm();
  if (prop && prop !== prevProp && !getEqualityToInitial(getValues(), primaryValues)) {
    return reset(primaryValues);
  }
  return null;
};

export default usePrimaryValuesInForm;
