const conversion = (int) => {
  let total = int / 1000;
  let hours = 0;
  if (int > 0) {
    hours = Math.floor(total / 3600);
  } else {
    hours = Math.ceil(total / 3600);
  }
  let minutes = Math.floor((total % 3600) / 60);
  let seconds = Math.floor(total % 60);

  return { hours, minutes, seconds };
};

export default conversion;
