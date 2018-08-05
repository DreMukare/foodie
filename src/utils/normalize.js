function normalize(array) {
  if (Array.isArray(array)) {
    return array.reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.id]: currentValue
      }),
      {}
    );
  }
}

export default normalize;
