import { getAdminInfos } from "./funcs/utils.js";

const $ = document

window.addEventListener('load', () => {
    const adminWelcomeNameElem = $.querySelector('#admin-welcome-name')
    const adminNameElem = $.querySelector('#admin-name')
    getAdminInfos().then(admin => {
        
        // protect Cms routes
        if (admin.role === 'ADMIN') {
            // Show Admin Name In Cms Homepage
            adminNameElem.innerHTML = admin.name
            adminWelcomeNameElem.innerHTML = admin.name
        }else {
            location.replace('../../login.html')
        }
    })
})