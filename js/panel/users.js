import { getAndShowAllUsers, removeUser, banUser, createNewUser } from "./funcs/users.js";

window.removeUser = removeUser;
window.banUser = banUser;

window.addEventListener("load", () => {

  const createNewUserBtn = document.querySelector('#create-new-user')

  getAndShowAllUsers();

  createNewUserBtn.addEventListener('click', event => {
    event.preventDefault()
    createNewUser()
  })
});
