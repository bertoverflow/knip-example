import dayjs from "dayjs";

export const getNowAsIso8601String = () => {
  // return moment().format();
  return formatDateAsIso8601String(new Date());
};

export const formatDateAsIso8601String = (date: Date) => {
  return dayjs(date).toISOString();
};

export const isNightTime = () => {
  const hour = dayjs().hour();
  return hour >= 22 || hour < 6;
};

export const getYearOfDate = (date: Date) => {
  return dayjs(date).year();
};

export const getMonthOfDate = (date: Date) => {
  return dayjs(date).month();
};

export const getDayOfDate = (date: Date) => {
  return dayjs(date).day();
};
