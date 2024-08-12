import { createCategory, getAndShowAllCategories, removeCategory } from "./funcs/categories.js"

window.removeCategory = removeCategory

window.addEventListener('load', () => {

    const createNewCategoryBtn = document.querySelector('#create-category')

    getAndShowAllCategories()

    createNewCategoryBtn.addEventListener('click', event => {
        event.preventDefault()
        createCategory()
    })

})