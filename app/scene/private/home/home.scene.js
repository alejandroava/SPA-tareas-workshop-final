import { NavigateTo } from '../../../Router'
import { FetchApi } from '../../../helpers/Fetchapi'
import { GetElementById } from '../../../helpers/getelement'
import styles from './home.styles.css'
export function HomeScene() {
    const nameUser = localStorage.getItem('name')
    const dateToday = new Date()
    const date = dateToday.toLocaleString()
    const pageContent = `
    <div>
        <p>${date}</p>
        <h2>Bienvenido,<span>${nameUser}</span></h2>
   </div>
   <div class='${styles.form_container}'>
        <form class='${styles.form}' id='form'>
            <label for="nametask">Titulo de la tarea:</label>
            <input type="text" id="nametask">
            <label for="description">Descripcion de la tarea:</label>
            <input type="text" id="description">
            <label for='priority'>Prioridad</label>
            <select id='priority' >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
            </select>
            <label for="date">Fecha de entrega</label>
            <input type="date" name="date" id="date">
            <button type="submit" id="taskButton">Guardar tarea</button>
        </form>
        <div id='tasks' class='${styles.task_container}'></div>
   </div>
  
    
    `
    const logic = async () => {
        const loadedTask = await FetchApi('http://localhost:3000/tasks')
        let tasks = GetElementById('tasks')
        loadedTask.forEach(task => {
            tasks.innerHTML += `
                 <div>
                        <h1 id="title">Informacion de la tarea</h1>
                        <h2>${task.nametask}</h2>
                        <p id="description">${task.description}</p>
                        <div>
                            <button type='button' id="edit" data-id=${task.id}>Editar</button>
                            <button type='button' id="delete" data-id=${task.id}>Eliminar</button>
                        </div>
                    </div>
            `
        })
        const deleteButtons = document.querySelectorAll('#delete').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault()
                const deleteBtn = e.target.getAttribute('data-id')
                FetchApi(`http://localhost:3000/tasks/${deleteBtn}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            })
        })
        const editButtons = document.querySelectorAll('#edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const editBtn = e.target.getAttribute('data-id')
                NavigateTo(`/task/edit?taskId=${editBtn}`)
            })
            const form = GetElementById('form').addEventListener('submit', async (e) => {
                // e.preventDefault()
                const nametask = GetElementById('nametask').value
                const description = GetElementById('description').value
                const priority = GetElementById('priority').value
                const date = GetElementById('date').value

                await FetchApi('http://localhost:3000/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nametask,
                        description,
                        priority,
                        date
                    })

                })
                // let tasks = GetElementById('tasks')
                // const dataTasks = await FetchApi('http://localhost:3000/tasks')
                // dataTasks.forEach(task => {
                //     tasks.innerHTML += `
                //         <div>
                //             <h1 id="title">Informacion de la tarea</h1>
                //             <h2>${task.nametask}</h2>
                //             <p id="description">${task.description}</p>
                //             <div>
                //                 <button type='button' id="edit" data-id=${task.id}>Editar</button>
                //                 <button type='button' id="delete" data-id=${task.id}>Eliminar</button>
                //             </div>
                //         </div>
                //     `
                //     console.log(dataTasks)
            
                // });
            
        
            })
    
        })
       
    }
     return {
            pageContent,
            logic
        }
}