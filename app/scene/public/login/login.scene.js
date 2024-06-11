import { NavigateTo } from "../../../Router";
import { FetchApi } from "../../../helpers/Fetchapi";
import { EmailValidator } from "../../../helpers/emailvalidator";
import { decryptData } from "../../../helpers/encrypt";
import { GetElementById } from "../../../helpers/getelement";
import { root } from "../../../helpers/root";
import styles from './login.styles.css'

export function LoginScene() {
    root;
    const loginForm = `
    <div class='${styles.login_container}'>
        <form class='${styles.login_form}' id='loginForm'>
            <h1 class='${styles.login_title}'>Login</h1>
            <label for="email" class='${styles.login_label}'>Correo electronico</label>
            <input type="email" id="email" placeholder="email@example.com" autocomplete="email" class='${styles.login_input}'>
            <label for="password" class='${styles.login_label}'>Contraseña</label>
            <input type="password" id="password" placeholder="Contraseña" autocomplete="current-password" class='${styles.login_input}'>
            <button class='${styles.login_button}' type="submit">Entrar</button>
            <div>
                <p class='${styles.login_footer}'>¿Ya esta registrado?<span id='loginRegister' class='${styles.button_register}'>Registrame</span></p>
            </div>
        </form>
    </div>
    
    `
    root.innerHTML = loginForm
    GetElementById('loginRegister').addEventListener('click', (e) => {
        console.log('submit')
        NavigateTo('/register')
    })
    const form = GetElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const email = GetElementById('email').value
        const password = GetElementById('password').value

        if (!email) {
            alert('Ingresa un correo electronico')
            GetElementById('email').focus()
            return
        }
        if (!EmailValidator(email)) {
            alert('Ingresa un correo electronico valido')
            GetElementById('email').focus()
            return
        }
        if (!password) {
            alert('Ingresa una contraseña')
            GetElementById('password').focus()
            return
        }

        const users = await FetchApi('http://localhost:3000/users')
        const user = users.find((user) => user.email === email && decryptData(user.password) === password)
        if (user) {
            const name = user.name
            console.log('soy el nombre',name)
            console.log(user)
            const token = Math.random().toString(36).substring(2)
            localStorage.setItem('token', token)
            localStorage.setItem('name',name)
            NavigateTo('/home')

        }
    })
   
}