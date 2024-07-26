import {
  getAndShowCategoryCourses,
  insertCourseBoxHtmlTemplate,
  coursesSorting,
} from "./funcs/shared.js";

import { searchInArray, paginateItems, getUrlParam, addParamToUrl } from "./funcs/utils.js";

window.addParamToUrl = addParamToUrl

window.addEventListener("load", () => {
  getAndShowCategoryCourses().then((responseCourses) => {
    let courses = [...responseCourses];
    let coursesShowType = "row";
    const coursesShowTypeIcons = document.querySelectorAll(
      ".courses-top-bar__icon-parent"
    );
    const categoryCoursesWrapper = document.querySelector(
      "#category-courses-wrapper"
    );
    const coursesFilteringSelections = document.querySelectorAll(
      ".courses-top-bar__selection-item"
    );
    const selectionTitleElem = document.querySelector(
      ".courses-top-bar__selection-title"
    );
    const coursesSearchInput = document.querySelector(
      ".courses-top-bar__input"
    );

    // Show Category Courses By row showType
    if (courses.length) {
      insertCourseBoxHtmlTemplate(
        courses,
        coursesShowType,
        categoryCoursesWrapper
      );
    } else {
      categoryCoursesWrapper.insertAdjacentHTML(
        "beforeend",
        `
              <div class="alert alert-danger">هیچ دوره‌ای برای این دسته بندی وجود ندارد :/</div>
            `
      );
    }

    // Show Category Courses By row showType (User Selection)
    coursesShowTypeIcons.forEach((coursesShowTypeIcon) => {
      coursesShowTypeIcon.addEventListener("click", (event) => {
        coursesShowTypeIcons.forEach((icon) =>
          icon.classList.remove("courses-top-bar__icon--active")
        );
        event.target.classList.add("courses-top-bar__icon--active");

        if (String(event.target.className).includes("row")) {
          coursesShowType = "row";
          insertCourseBoxHtmlTemplate(
            courses,
            coursesShowType,
            categoryCoursesWrapper
          );
        } else {
          coursesShowType = "column";
          insertCourseBoxHtmlTemplate(
            courses,
            coursesShowType,
            categoryCoursesWrapper
          );
        }
      });
    });

    // Show Category Courses By user filtering method
    coursesFilteringSelections.forEach((coursesFilteringSelection) => {
      coursesFilteringSelection.addEventListener("click", (event) => {
        coursesFilteringSelections.forEach((selectionElem) =>
          selectionElem.classList.remove(
            "courses-top-bar__selection-item--active"
          )
        );

        event.target.classList.add("courses-top-bar__selection-item--active");

        selectionTitleElem.innerHTML = "";
        selectionTitleElem.insertAdjacentHTML(
          "beforeend",
          `
            ${event.target.innerHTML}
            <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
        `
        );

        let userFilteringSelection = event.target.dataset.key;
        let shownCourses = coursesSorting([...courses], userFilteringSelection);
        insertCourseBoxHtmlTemplate(
          shownCourses,
          coursesShowType,
          categoryCoursesWrapper
        );
      });
    });

    // Handle search in courses
    coursesSearchInput.addEventListener("input", (event) => {
      console.log(event.target.value);
      const shownCourses = searchInArray(
        [...responseCourses],
        "name",
        event.target.value
      );

      console.log(Boolean(shownCourses.length));

      if (shownCourses.length) {
        insertCourseBoxHtmlTemplate(
          shownCourses,
          coursesShowType,
          categoryCoursesWrapper
        );
      } else {
        categoryCoursesWrapper.innerHTML = "";
        categoryCoursesWrapper.insertAdjacentHTML(
          "beforeend",
          `
              <div class="alert alert-danger">هیچ دوره‌ای برای جستجوی شما وجود ندارد :/</div>
            `
        );
      }
    });

    // Handle Pagination
    const coursesPaginationWrapper = document.querySelector(
      ".courses__pagination-list"
    );
    const currentPage = getUrlParam("page");
    
    const shownCourses = paginateItems(
      [...responseCourses],
      3,
      coursesPaginationWrapper,
      currentPage
    );

    insertCourseBoxHtmlTemplate(
      [...shownCourses],
      coursesShowType,
      categoryCoursesWrapper
    );
  });
});
