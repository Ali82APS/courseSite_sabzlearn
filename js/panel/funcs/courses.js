const getAllCourses = async () => {
  const coursesTableElem = document.querySelector(".table tbody");

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
            <td id="name">${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</td>
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
            <td id="price">${course.isComplete === 0 ? "درحال برگزاری" : "تکمیل شده"}</td>
            <td>
                <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" id="delete-btn">حذف</button>
            </td>
        </tr>
            `
    );
  });

  return courses;
};

export { getAllCourses };
