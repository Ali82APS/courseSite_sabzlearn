import { getToken, showSwal } from "./../../funcs/utils.js";

let categoryID = -1;
let status = "start";
let courseCover = null;

const getAllCourses = async () => {
  const coursesTableElem = document.querySelector(".table tbody");
  coursesTableElem.innerHTML = ''

  const res = await fetch("http://localhost:4000/v1/courses");
  const courses = await res.json();

  courses.forEach((course, index) => {
    coursesTableElem.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
            <td>
            ${index + 1}
            </td>
            <td id="id">${course.name}</td>
            <td id="name">${
              course.price === 0 ? "رایگان" : course.price.toLocaleString()
            }</td>
            <td id="number">${course.registers}</td>
            <td id="condition">${course.support}</td>
            <td id="price">${course.categoryID}</td>
            <td id="price">
            ${Array(5 - course.courseAverageScore)
              .fill(0)
              .map(
                (score) =>
                  '<img src="./../../images/svgs/star.svg" alt="rating" class="course-box__star">'
              )
              .join("")}
                        ${Array(course.courseAverageScore)
                          .fill(0)
                          .map(
                            (score) =>
                              '<img src="./../../images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                          )
                          .join("")}
                          </td>
            <td id="price">${
              course.isComplete === 0 ? "درحال برگزاری" : "تکمیل شده"
            }</td>
            <td>
                <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
            </td>
            <td>
                <button type="button" onclick="removeCourse('${course._id}')" class="btn btn-danger" id="delete-btn">حذف</button>
            </td>
            </tr>
            `
    );
  });

  return courses;
};

const prepareCreateCourseForm = async () => {
  const categoryListElem = document.querySelector(".category-list");

  const courseStatusePresellElem = document.querySelector("#presell");
  const courseStatuseStartElem = document.querySelector("#start");
  const courseCoverElem = document.querySelector("#course-cover");

  const res = await fetch(`http://localhost:4000/v1/category`);
  const categories = await res.json();

  console.log(categories);

  categories.forEach((category) => {
    categoryListElem.insertAdjacentHTML(
      `beforeend`,
      `
       <option value="${category._id}">${category.title}</option>
      `
    );
  });

  categoryListElem.addEventListener("change", (event) => {
    categoryID = event.target.value;
    console.log(categoryID);
  });
  courseStatusePresellElem.addEventListener(
    "change",
    (event) => (status = event.target.value)
  );
  courseStatuseStartElem.addEventListener(
    "change",
    (event) => (status = event.target.value)
  );

  courseCoverElem.addEventListener(
    "change",
    (event) => (courseCover = event.target.files[0])
  );
};

const createNewCourses = async () => {
  const courseNameElem = document.querySelector("#course-name");
  const coursePriceElem = document.querySelector("#course-price");
  const courseDescriptionElem = document.querySelector("#course-description");
  const courseShortNameElem = document.querySelector("#course-shortname");
  const courseSupportElem = document.querySelector("#course-support");

  const formData = new FormData();
  formData.append("name", courseNameElem.value.trim());
  formData.append("price", coursePriceElem.value.trim());
  formData.append("description", courseDescriptionElem.value.trim());
  formData.append("shortName", courseShortNameElem.value.trim());
  formData.append("support", courseSupportElem.value.trim());
  formData.append("categoryID", categoryID);
  formData.append("status", status);
  formData.append("cover", courseCover);

  const res = await fetch(`http://localhost:4000/v1/courses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData,
  });
  console.log(res);

  if (res.ok) {
    showSwal("", "success", "خیلی هم عالی!",
       () => {
        getAllCourses()
       });
  }
};

const removeCourse = async (courseID) => {

  console.log(courseID);

  showSwal(
    "آیا از حذف دوره  اطمینان دارید؟",
    "question",
    ["نه","آره"],
    async (result) => {
      const res = await fetch(`http://localhost:4000/v1/courses/${courseID}`, {
        method: 'DELETE',
        headers: {
        Authorization: `Bearer ${getToken()}`
        }

      })
      if (res.ok) {
        showSwal("دوره مدنظر با موفقیت حذف گردید! ", "success", "", () => {
          getAllCourses()
        })
      }
    }
  )

}

export { getAllCourses, createNewCourses, prepareCreateCourseForm, removeCourse };
