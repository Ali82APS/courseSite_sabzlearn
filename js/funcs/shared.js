import { getMe } from "./auth.js";
import { isLogin } from "./utils.js";

const showUserNameInNavbar = () => {
  const navbarProfileBox = document.querySelector(".main-header__profile");

  const isUserLogin = isLogin();
  if (isUserLogin) {
    const userInfos = getMe().then((data) => {
      navbarProfileBox.setAttribute("href", "index.html");
      navbarProfileBox.innerHTML = `<span class="main-header__profile--text">${data.name}</span>`;
    });
  } else {
    navbarProfileBox.setAttribute("href", "login.html");
    navbarProfileBox.innerHTML = '<span class="main-header__profile--text">ورود/ثبت نام</span> ';
  }
};

export { showUserNameInNavbar };
