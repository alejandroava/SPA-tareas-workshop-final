import { root } from "../../helpers/root";
import styles from './navbar.layout.styles.css'

export function NavbarLayout(pageContent,logic) {
    root;
    root.innerHTML = `
     <nav class='${styles.navbar}'>
        <ul class='${styles.navbar_list}'>
            <li><a>Home</a></li>
            <li><a>Todo list</a></li>
            <li><a>logout</a></li>
        </ul>
    </nav>
    ${pageContent}
    `
    logic()
}