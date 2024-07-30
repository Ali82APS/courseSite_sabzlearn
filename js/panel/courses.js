import { createNewCourses, getAllCourses } from "./funcs/courses.js";

window.addEventListener('load', () => {
    getAllCourses()
    createNewCourses()
})