//!using Using Utility Functions to clean up reducers - a cleaner case for immutability

export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};
