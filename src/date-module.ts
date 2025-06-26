import dayjs from "dayjs";
// @ts-expect-error ignore missing types
import now from "lodash/now";

export const getNowAsIso8601String = () => {
  // return moment().format();
  return formatDateAsIso8601String(new Date(now()));
};

export const formatDateAsIso8601String = (date: Date) => {
  return dayjs(date).toISOString();
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
