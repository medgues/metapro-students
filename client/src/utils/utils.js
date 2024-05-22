import moment from "moment/moment";

export const serializeDate = (date) => {
  const timestamp = date.seconds;
  const nanoseconds = date.nanoseconds;
  const serializedDate = moment
    .unix(timestamp)
    .add(nanoseconds / 1000000, "milliseconds")
    .format("YYYY-MM-DD HH:mm:ss.SSS");

  return serializedDate;
};
