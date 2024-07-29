import { getToken } from "../../funcs/utils.js";

const insertNotificationHtmlTemplate = (notifications) => {
  const notificationModalListElem = document.querySelector(
    ".home-notification-modal-list"
  );

  notificationModalListElem.innerHTML = ''

  if (notifications.length) {
    notifications.forEach((notification) => {
      notificationModalListElem.insertAdjacentHTML(
        "beforeend",
        `
          <li class="home-notification-modal-item">
              <span class="home-notification-modal-text">${notification.msg}</span>
              <a onclick='seenNotification(${JSON.stringify(notifications)}, ${JSON.stringify(notification._id)})'>دیدم</a>
          </li>
      `
      );
    });
  } else {
    notificationModalListElem.insertAdjacentHTML(
      "beforeend",
      `
      <li class="alert alert-danger text-center">
          هیچ نوتیفیکیشنی وجود ندارد
      </li>
    `
    );
  }
};

const seenNotification = async (notifications, notificationID) => {
  const res = await fetch(
    `http://localhost:4000/v1/notifications/see/${notificationID}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  removeNotification(notifications, notificationID)

  const result = await res.json();
};

const removeNotification = (notifications, notificationID) => {
  const filteredNotifications = notifications.filter(notification => notification._id !== notificationID)
  
  insertNotificationHtmlTemplate(filteredNotifications)
}

export { insertNotificationHtmlTemplate, seenNotification };
