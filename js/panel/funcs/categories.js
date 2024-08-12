import { getToken, showSwal } from '../../funcs/utils.js'

const getAndShowAllCategories = async () => {
  const categoriesListElem = document.querySelector(".table tbody");
  categoriesListElem.innerHTML = "";

  const res = await fetch(`http://localhost:4000/v1/category`);
  const categories = await res.json();

  categories.forEach((category, index) => {
    categoriesListElem.insertAdjacentHTML(
      "beforeend",
      `
            <tr>
                <td>${index + 1}</td>
                <td>${category.title}</td>
                <td>${category.name}</td>
                <td>
                    <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                </td>
                <td>
                    <button type='button' onclick="removeCategory('${
                      category._id
                    }')" class='btn btn-danger delete-btn'>حذف</button>
                </td>
            </tr>
        `
    );
  });
};

const removeCategory = async (categoryID) => {

  showSwal(
    "آیا از حذف دسته بندی اطمینان دارید؟",
    "warning",
    ["نه", "آره"],
    async (result) => {
      if (result) {
        const res = await fetch(`http://localhost:4000/v1/category/${categoryID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        })

        if (res.ok) {
          showSwal(
            "دسته بندی مورد نظر با موفقیت حذف شد",
            "success",
            "خیلی هم عالی",
            () => {
              getAndShowAllCategories()
            }
          )
        }
      }
    }
  )

};

const createCategory = async () => {
  const titleInputElem = document.querySelector("#title");
  const nameInputElem = document.querySelector("#name");

  const newCategoryInfos = {
    title: titleInputElem.value.trim(),
    name: nameInputElem.value.trim(),
  };

  const res = await fetch('http://localhost:4000/v1/category', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCategoryInfos)
  })

  if (res.ok) {
    showSwal(
      "دسته بندی جدید با موفقیت ساخته شد",
      "success",
      "خیلی هم عالی",
      () => {
        getAndShowAllCategories()
      }
    )
  }

  console.log(res);

};

export { getAndShowAllCategories, removeCategory, createCategory };
