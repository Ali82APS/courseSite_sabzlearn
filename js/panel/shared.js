import { getAdminInfos } from "./funcs/utils.js";
import { insertNotificationHtmlTemplate, seenNotification } from "./funcs/notifications.js";

window.seenNotification = seenNotification

const $ = document;

window.addEventListener("load", () => {
  const adminWelcomeNameElem = $.querySelector("#admin-welcome-name");
  const adminNameElem = $.querySelector("#admin-name");
  const notificationsIconElem = $.querySelector('#notifications-icon')
  const notificationsBoxElem = $.querySelector('.home-notification-modal')

  getAdminInfos().then((admin) => {
    console.log(admin);
    // Protect Cms Routes
    if (admin.role === "ADMIN") {
      // Show Admin Name In Cms Homepage
      adminNameElem.innerHTML = admin.name;
      // adminWelcomeNameElem.innerHTML = admin.name;
    } else {
      location.replace("../../login.html");
    }

    console.log(notificationsIconElem);

    notificationsIconElem.addEventListener('mouseenter', () => {
      notificationsBoxElem.classList.add('active-modal-notfication')
    })

    notificationsBoxElem.addEventListener('mouseleave', () => {
      notificationsBoxElem.classList.remove('active-modal-notfication')
    })
    insertNotificationHtmlTemplate(admin.notifications)

  });


});
