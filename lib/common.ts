export const capitalizeWords = (inputString: string) => {
  const words = inputString.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const result = capitalizedWords.join(" ");

  return result;
};

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};
