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

const renderTopbarMenus = () => {
  const topBarList = document.querySelector('.top-bar__menu')

  const res = await fetch(`http://localhost:4000/v1/menus/topbar`)
  const topbarMenus = await res.json()

  
  topBarList.innerHTML = ""

  const shuffledArray = topbarMenus.sort((a,b) => 0.5 - Math.random())
  
  console.log(topbarMenus);
  shuffledArray.splice(0, 6).map(menu => {
    topBarList.innerHTML += `<li class="top-bar__item">
                        <a href="" class="top-bar__link">${menu.title}</a>
                      </li>`
  })
}

const getAndShowAllCourses = () => {
  const coursesContainer = document.querySelector('#courses-container')

  const res = await fetch(`http://localhost:4000/v1/courses`)
  const courses = await res.json()

  courses.slice(0, 6).map(course => {
    coursesContainer.insertAdjacentHTML('beforeend',`
      <div class="col-4">
                            <div class="course-box">
                                <a href="#">
                                    <img src="images/courses/fareelancer.png" alt="course img" class="course-box__img">
                                </a>
                                <div class="course-box__main">
                                  <a href="#" class="course-box__title">${course.name}</a>
                                  <div class="course-box__rating-teacher">
                                    <div class="course-box__teacher">
                                        <i class="fas fa-chalkboard-teacher eacher course-box__teacher-icon"></i>
                                        <a href="#" class="course-box__teacher-link">${course.creator}</a>
                                    </div>
                                    <div class="course-box__rating">
                                    ${Array(5 - course.courseAverageScore).fill(0).map(score => '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__stars">').join(' ')}
                                    ${Array(course.courseAverageScore).fill(0).map(score => '<img src="images/svgs/star.svg" alt="rating" class="course-box__stars">').join(' ')}
                                        
                                    </div>
                                  </div>
                                  <div class="course-box__status">
                                    <div class="course-box__users">
                                        <i class="fas fa-users course-box__users-icon"></i>
                                        <span class="course-box__users-text">${course.registers}</span>
                                    </div>
                                    <span class="course-box__price">${course.price === 0 ? "رایگان" : course.price.toLocalString()}</span>
                                  </div>
                                </div>

                                <div class="course-box__footer">
                                    <a href="#" class="course-box__footer-link">
                                        مشاهده اطلاعات
                                        <i class="fas fa-arrow-left course-box__footer-icon"></i>
                                    </a>
                                </div>

                            </div>
                        </div>
      `)
  })
}

export { showUserNameInNavbar, renderTopbarMenus, getAndShowAllCourses };
