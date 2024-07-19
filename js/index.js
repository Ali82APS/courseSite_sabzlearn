import { getAndShowAllCourses, getAndShowPopularCourses, getAndShowPresellCourses, getAndShowArticles } from "./funcs/shared.js";

const $ = document;
const landingTitle = $.querySelector(".landing_title");
const landingCoursesCount = $.querySelector("#courses-counter");
const landingMinutesCount = $.querySelector("#minutes-counter");
const landingUsersCount = $.querySelector("#users-counter");

window.addEventListener("load", () => {
  let landingText = "ما به هر قیمتی دوره آموزشی تولید نمی کنیم !";
  let typeIndex = 0;

  typeWriter(landingText, typeIndex);
  makeCounter(40, landingCoursesCount);
  makeCounter(3_320, landingMinutesCount);
  makeCounter(3_371, landingUsersCount);

  getAndShowAllCourses()
  getAndShowPopularCourses()
  getAndShowPresellCourses()
  getAndShowArticles().then(data => {
    console.log(data);
  })
});

function typeWriter(text, index) {
  if (index < text.length) {
    landingTitle.innerHTML += text[index];
    index++;
  }

  setTimeout(() => {
    typeWriter(text, index);
  }, 100);
}

function makeCounter(max, elem) {
  let counter = 0;
  const interval = setInterval(() => {
    if (counter === max) {
      clearInterval(interval);
    }
    elem.innerHTML = counter;
    counter++;
  }, 0.5);
}

console.log(landingTitle);
