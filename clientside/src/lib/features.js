import moment from "moment";

export const FileFormat = (url) => {
  const fileExt = url?.split(".").pop();
  if (fileExt === "mp4" || fileExt === "web" || fileExt === "ogg")
    return "video";
  if (fileExt === "mp3" || fileExt === "wav") return "audio";
  if (
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "png" ||
    fileExt === "gif"
  )
    return "image";
};
export const TransformImage = (url = "", width = 100) => url;

export const getLast7DayLabels = () => {
  const currentDate = moment();

  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");
    last7Days.unshift(dayName);
  }
  return last7Days;
};
