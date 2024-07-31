import { createNewCourses, getAllCourses, prepareCreateCourseForm } from "./funcs/courses.js";

window.addEventListener('load', () => {
    getAllCourses()
    prepareCreateCourseForm()

    const createCourseBtn = document.querySelector('#create-course-btn')

    createCourseBtn.addEventListener('click', event => {
        event.preventDefault()
        createNewCourses()
    })
})