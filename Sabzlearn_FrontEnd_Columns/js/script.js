let menuBtn = document.querySelector(".main-header__menu-mobile-btn");
let mobileMenu = document.querySelector(".mobile-menu");
let headerOverlay = document.querySelector(".header-overlay");
// let mobileMenuIcon = document.querySelectorAll(".mobile-menu__icon");
menuBtn.addEventListener("click", openMenu);
headerOverlay.addEventListener("click", closeMenu);

function openMenu() {
  mobileMenu.classList.toggle("mobile-menu--active");
  headerOverlay.style.display = "block";
}

function closeMenu() {
  mobileMenu.classList.remove("mobile-menu--active");
  headerOverlay.style.display = "none";
}

// mobileMenuIcon.forEach(function (item) {
//   item.addEventListener("click", openDropDownMobile);
// });

// function openDropDownMobile(event) {
//   console.log(event.currentTarget.nextSibling);
// }
