import { NavigateTo } from "../../Router";
import { GetElementById } from "../../helpers/getelement";
import { root } from "../../helpers/root";
import styles from './navbar.layout.styles.css'

export function NavbarLayout(pageContent,logic) {
    root;
    root.innerHTML = `
     <nav class='${styles.navbar}'>
        <ul class='${styles.navbar_list}'>
            <li><a id='home' class='${styles.home}'>Home</a></li>
            <li><a>Todo list</a></li>
            <li><a id='logout' class='${styles.logout}'>logout</a></li>
        </ul>
    </nav>
    ${pageContent}
    `
    logic()
    const logout = GetElementById('logout').addEventListener('click', (e) => {
        localStorage.removeItem('token')
        NavigateTo('/login')
    })
      const home = GetElementById('home').addEventListener('click', (e) => {
       
        NavigateTo('/home')
    })
}