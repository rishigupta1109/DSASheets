import icon from "../Images/sheetcode_light.png";
const askForPermissionToReceiveNotifications = async () => {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      localStorage.setItem("notification", true);
    }
  });
};
const showLocalNotification = (title, body) => {
  return new Notification(title, { body, icon });
};
export { askForPermissionToReceiveNotifications, showLocalNotification };
