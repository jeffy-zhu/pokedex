export const goNextPage = (offset, setOffset, limit, setLimit) => {
  if (offset + 12 > 151) {
    setLimit(151 - offset);
  } else {
    if (offset + 2 * limit > 151) {
      setLimit(151 - (offset + limit));
    }
    setOffset(offset + 12);
  }
};

export const goBackPage = (offset, setOffset, limit, setLimit) => {
  if (offset > 0) {
    if (limit !== 12) setLimit(12);
    setOffset(offset - 12);
  }
};
