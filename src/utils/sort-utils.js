const sortCaseInsensitive = (a, b) => {
  const A = a.toUpperCase(); // ignore upper and lowercase
  const B = b.toUpperCase(); // ignore upper and lowercase
  if (A < B) {
    return -1;
  }
  if (A > B) {
    return 1;
  }
  // names must be equal
  return 0;
};

export default {
  sortCaseInsensitive,
};
