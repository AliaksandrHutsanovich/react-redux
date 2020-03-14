export const getEqualityToInitial = (values, props) => (
  Object
    .keys(values)
    .every((key) => values[key] === props[key])
);

const usePrimaryValuesInForm = (prop, prevProp, currentValues, primaryValues, reset) => {
  if (prop && prop !== prevProp && !getEqualityToInitial(currentValues, primaryValues)) {
    reset(primaryValues);
  }
};

export default usePrimaryValuesInForm;
