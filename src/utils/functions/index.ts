export const getRandomElements = <T>(array: T[], count: number = 3): T[] => {
  const result: T[] = [];
  const arrayLength = array.length;

  // If the array length is 0, return an empty array
  if (arrayLength === 0) {
    return result;
  }

  // If the array length is more than 2, ensure no repetitions
  if (arrayLength > 2) {
    const indices = new Set<number>();

    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * arrayLength);
      indices.add(randomIndex);
    }

    indices.forEach((index) => result.push(array[index]));
  } else {
    // Loop to pick random elements with repetition if necessary
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * arrayLength);
      result.push(array[randomIndex]);
    }
  }

  return result;
};
