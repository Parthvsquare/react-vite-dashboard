import { differenceInHours, differenceInMinutes } from "date-fns";

function getRemainingTimeDifference(targetDateString: string): string {
  // Parse the target date string into a Date object
  const targetDate: Date = new Date(Number(targetDateString));

  // Get the current date and time
  const currentDate: Date = new Date();

  // Calculate the difference between the target and current date in milliseconds
  const timeDifference: number = targetDate.getTime() - currentDate.getTime();

  // Calculate the difference in minutes and hours using date-fns functions
  const minutesDifference: number = differenceInMinutes(
    targetDate,
    currentDate,
  );
  const hoursDifference: number = differenceInHours(targetDate, currentDate);

  // Calculate remaining hours and minutes
  let remainingHours: number = Math.abs(hoursDifference);
  let remainingMinutes: number = Math.abs(minutesDifference) % 60;

  // Determine if any component is negative
  const isNegative: boolean = timeDifference < 0;

  // Format the remaining time
  let formattedTime: string = "";
  if (Math.abs(timeDifference) < 60000) {
    // If less than 1 minute
    formattedTime = `few sec ago`;
  } else {
    const formattedHours: string =
      remainingHours > 0 ? `${remainingHours} h ` : "";
    const formattedMinutes: string =
      remainingMinutes > 0 ? `${remainingMinutes} m` : "";
    formattedTime = `${formattedHours}${formattedMinutes}`;
  }

  return formattedTime.trim(); // Trim any extra whitespace
}

export { getRemainingTimeDifference };
