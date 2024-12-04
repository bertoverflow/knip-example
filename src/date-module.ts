import dayjs from "dayjs";
// @ts-expect-error ignore missing types
import now from "lodash/now";

export const getNow = () => {
  // return moment().format();
  return formatDate(new Date(now()));
};

export const formatDate = (date: Date) => {
  return dayjs(date).toISOString();
};

export const getYearOfDate = (date: Date) => {
  return dayjs(date).year();
};
