export const picturesArrayFilter = array =>
  array.map(({ id, webformatURL, largeformatURL }) => ({
    id,
    webformatURL,
    largeformatURL,
  }));
