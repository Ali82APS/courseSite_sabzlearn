import { showUserNameInNavbar, renderTopbarMenus, getAndShowAllCourses } from "./funcs/shared.js";

window.addEventListener("load", () => {
  showUserNameInNavbar();
  renderTopbarMenus();
  getAndShowAllCourses()
});
