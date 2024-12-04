import dayjs from "dayjs";

export const getNow = () => {
  return dayjs().format();
};
