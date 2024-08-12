import { showSwal, getToken } from "../../funcs/utils.js";

const getAndShowAllContacts = async () => {
  const contactsListTableElem = document.querySelector(".table tbody");
  contactsListTableElem.innerHTML = "";

  const res = await fetch(`http://localhost:4000/v1/contact`);
  const contacts = await res.json();

  contacts.forEach((contact, index) => {
    contactsListTableElem.insertAdjacentHTML(
      "beforeend",
      `
            <tr>
                <td class="${
                  contact.answer === 1 ? "answer-contact" : "no-answer-contact"
                }">${index + 1}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.createdAt.slice(0, 10)}</td>
                <td>
                    <button type='button' onclick='showContactBody(${JSON.stringify(
                      contact.body
                    )})' class='btn btn-primary edit-btn'>مشاهده</button>
                </td>
                <td>
                    <button type='button' onclick='answerToContact(${JSON.stringify(
                      contact.email
                    )})' class='btn btn-primary edit-btn'>پاسخ</button>
                </td>
                <td>
                    <button type='button' onclick=removeContact('${
                      contact._id
                    }') class='btn btn-danger delete-btn'>حذف</button>
                </td>
            </tr>
        `
    );
  });

  console.log(contacts);
};

const showContactBody = (body) => {
  showSwal(body, undefined, "مشاهده کردم", () => {});
};

const answerToContact = async (userEmail) => {
  console.log(userEmail);

  swal({
    title: "متن پاسخ را تایپ کنید:",
    content: "input",
    button: "ثبت پاسخ",
  }).then(async (result) => {
    if (result) {
      const contactAnswerInfos = {
        email: userEmail,
        answer: result,
      };

      const res = await fetch(`http://localhost:4000/v1/contact/answer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactAnswerInfos),
      });

      if (res.ok) {
        showSwal(
          "پاسخ مورد نظر برای کاربر ایمیل شد",
          "success",
          "خیلی هم عالی",
          () => {
            getAndShowAllContacts();
          }
        );
      }
    }
  });
};

const removeContact = async (contactID) => {
  showSwal(
    "آیا از حذف پیغام اطمینان دارید؟",
    "warning",
    ["نه", "آره"],
    async (result) => {
      if (result) {
        const res = await fetch(
          `http://localhost:4000/v1/contact/${contactID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        console.log(res);
        if (res.ok) {
          showSwal(
            "پیغام مورد نظر با موفقیت حذف شد",
            "success",
            "خیلی هم عالی",
            () => {
              getAndShowAllContacts();
            }
          );
        }
      }
    }
  );
};

export {
  getAndShowAllContacts,
  showContactBody,
  answerToContact,
  removeContact,
};
