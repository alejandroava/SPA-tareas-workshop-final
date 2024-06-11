
import { NavigateTo } from "../../../Router";
import { FetchApi } from "../../../helpers/Fetchapi";
import { EmailValidator } from "../../../helpers/emailvalidator";
import { encryptData } from "../../../helpers/encrypt";
import { GetElementById } from "../../../helpers/getelement";
import { root } from "../../../helpers/root";
import styles from './register.style.css'

export function RegisterScene() {
    root;
    const registerForm = `
    <div class='${styles.register_container}'>
        <form class='${styles.register_form}' id='registerForm'>
            <h1 class='${styles.register_title}'>Formulario de Registro</h1>
            <p class='${styles.register_p}'>Ingrese los siguientes datos para hacer uso del sitio</p>
            <label for="name" class='${styles.register_label}'>Nombre</label>
            <input type="text" id="name" class='${styles.register_input}' placeholder='Nombre'>
            <label for="email" class='${styles.register_label}'>Correo electronico</label>
            <input type="email" id="email" placeholder="email@example.com" autocomplete="email" class='${styles.register_input}'>
            <label for="password" class='${styles.register_label}'>Contraseña</label>
            <input type="password" id="password" placeholder="Contraseña" autocomplete="current-password" class='${styles.register_input}'>
            <button class='${styles.register_button}' type="submit">Registrarme</button>
            <div>
                <p class='${styles.register_footer}'>¿Ya esta registrado?<span id='registerLogin' class='${styles.button_login}'>Iniciar sesion</span></p>
            </div>
        </form>
    </div>
    
    ` 
    root.innerHTML = registerForm
    GetElementById('registerLogin').addEventListener('click', () => {
        console.log('click')
        NavigateTo('/login')
    })

    const form = document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault()
        const name = GetElementById('name').value
        const email = GetElementById('email').value
        const password = GetElementById('password').value

        if (!name) {
            alert('Ingrese un nombre')
            GetElementById('name').focus()
            return
        }
        if (!email) {
            alert('Ingrese un correo electronico')
            GetElementById('email').focus()
            return
        }
        if (!EmailValidator(email)) {
            alert('Correo electronico invalido')
            return
        }
        if (!password) {
            alert('Ingrese una contraseña')
            GetElementById('password').focus()
            return
        }

        await FetchApi('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password: encryptData(password)
            })
        })
        alert('Registro exitoso')
        NavigateTo('/login')
    })
}