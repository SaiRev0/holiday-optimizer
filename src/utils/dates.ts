// Handles Safari bug `new Date()` doesn't work properly
export const convertToDateObject = (inputDate: string) => {
  // Handle case where inputDate might be undefined or null
  if (!inputDate) {
    throw new Error('Invalid date input: date string is required');
  }

  // Split by space to separate date and time
  const [date, time] = inputDate.split(' ');

  // Parse the date part
  const [year, month, day] = date.split('-').map(Number);

  // Parse the time part (default to 00:00:00 if not provided)
  let hour = 0,
    minute = 0,
    seconds = 0;

  if (time) {
    [hour, minute, seconds] = time.split(':').map(Number);
  }

  return new Date(year, month - 1, day, hour, minute, seconds);
};
