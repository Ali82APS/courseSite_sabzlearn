import { getToken } from '../../funcs/utils.js'


const getAndShowAllUsers = async () => {
    const usersListTableElem = document.querySelector('.table tbody')
    usersListTableElem.innerHTML = ''

    fetch(`http://localhost:4000/v1/users`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}