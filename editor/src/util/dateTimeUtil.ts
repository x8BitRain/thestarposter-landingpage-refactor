//const supportsTime = require('time-input-polyfill/supportsTime');
import dayjs from "dayjs";
import { ICurrentDate } from "../posterTypes";
const userLang = navigator.language;
const MAX_YEARS = 2025;
const MIN_YEARS = 1900;

// const momentDateToIOSDate = (momentDate) => {
//   return momentDate.format('YYYY-MM-DD')
// }

const dateToDatePickerDate = (currentDate): {} => {
  return {
    day: addZero(dayjs(currentDate).date()),
    // This returns month number starting from zero so we add 1 to get the real month number
    month: dayjs(currentDate).month(),
    year: dayjs(currentDate).year(),
    time: dayjs(currentDate).format("HH:mm")
  };
};

const safariDatePickerData = (date = undefined) => {
  // Converts date to a format accepted by the safari datepicker.
  if (date) {
    return {
      HH: addZero(dayjs(date).hour()),
      mm: addZero(dayjs(date).minute())
    };
  } else {
    return {
      HH: addZero(
        dayjs()
          .startOf("day")
          .hour()
      ),
      mm: addZero(
        dayjs()
          .startOf("day")
          .minute()
      )
    };
  }
};

const getYears = (): number[] => {
  const years: number[] = [];
  let i = MAX_YEARS;
  while (i > MIN_YEARS) {
    years.push(i);
    i--;
  }
  return years;
};

const getMonths = (): string[] => {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
};

const getMonthNumber = (month: string): number => {
  // returns month number as string with a zero in front if below 10
  return getMonths().indexOf(month) + 1;
};

const addZero = (num: number | string): string => {
  // Add zero before a number below 10 (ie. 4 => '04') as string.
  const zeroedNum = num < 10 && num[0] !== "0" ? `0${num}` : num;
  return zeroedNum.toString();
};

const getDaysInMonth = (year: number, month: number): string[] => {
  // apply addzeros() to month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: string[] = [];
  let i = 1;
  while (i <= daysInMonth) {
    days.push(addZero(i));
    i++;
  }
  return days;
};

const getCurrentDay = () => {
  return new Date().getDate();
};

// Safari with timepicker polyfill outputs time input value with AM/PM (ie. 12:30 PM),
// Chrome and Firefox will output the time input format in 24 hour time (ie. 00:30).
// So let's use the polyfill's supportsTime boolean to detect safari then convert
// the time to 24 hour time so we can reliably create a new date string.
const conv12to24 = (time12h, polyfilled: boolean): string => {
  if (!polyfilled) {
    const [time, modifier] = time12h.split(" ");
    // eslint-disable-next-line
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  } else {
    return time12h;
  }
};

const isLeapYear = year => {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
};

const formDateString = (
  day: string,
  month: number,
  year: number,
  time: string
): Date => {
  const validDate = {
    day: day,
    month: month,
    year: year,
    time: time === "" ? "00:00" : time // prevent empty string on cleared time field
  };
  const dateStr = `${validDate.year}-${addZero(validDate.month + 1)}-${addZero(
    validDate.day
  )}T${conv12to24(validDate.time, false)}`;
  const selectedDate = new Date(dayjs(dateStr).unix() * 1000);
  return selectedDate;
};

// format Time (Default will be displaying time if the displayTime parameter is not given)
const formatDate = (date: Date, withTime: boolean): string => {
  // the docs say that when you pass undefined to "toLocaleDateString" it should use the default language. However mine (Daniel's) Firefox and Chrome do not do that, therefore I pass the language
  const rawDate = new Date(date);
  const localizedDate = rawDate.toLocaleDateString(userLang, {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  const localizedTime = withTime
    ? rawDate.toLocaleTimeString(userLang, {
        hour: "2-digit",
        minute: "2-digit"
      })
    : null;
  return withTime ? localizedDate + ", " + localizedTime : localizedDate;
};

const fixDateIfInvalid = (date: ICurrentDate): ICurrentDate => {
  // Resolves nonexistant dates like 31/04/2020 to nearest valid like 30/04/2020
  const monthTotalDays = getDaysInMonth(date.year, date.month).length;
  if (parseInt(date.day) > monthTotalDays) {
    date.day = monthTotalDays.toString();
  } else if (date.day == "29" && date.month == 1 && !isLeapYear(date.year)) {
    // Prevent feb leap year invalid date
    date.day = "28";
  }
  return date;
};

export {
  getYears,
  getMonths,
  getDaysInMonth,
  getCurrentDay,
  dateToDatePickerDate,
  getMonthNumber,
  fixDateIfInvalid,
  formDateString,
  formatDate,
  safariDatePickerData
};
