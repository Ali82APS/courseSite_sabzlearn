import { getAllCourses } from "./funcs/courses.js";

window.addEventListener('load', () => {
    getAllCourses().then(data => {
        console.log(data);
    })
})