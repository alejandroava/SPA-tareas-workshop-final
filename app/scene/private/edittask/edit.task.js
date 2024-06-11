import { NavigateTo } from "../../../Router"
import { FetchApi } from "../../../helpers/Fetchapi"
import { GetElementById } from "../../../helpers/getelement"
import styles from './edit.task.styles.css'

export function EditTask() {
    const params = window.location.search
    const taskId = new URLSearchParams(params).get('taskId')
    const pageContent = `
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
        const nametask = GetElementById('nametask')
        const description = GetElementById('description')
        const priority = GetElementById('priority')
        const date = GetElementById('date')

        const dataForm = await FetchApi(`http://localhost:3000/tasks/${taskId}`)
        nametask.value = dataForm.nametask
        description.value = dataForm.description
        priority.value = dataForm.priority
        date.value = dataForm.date
        
        const form = GetElementById('form').addEventListener('submit', async (e) => {
            e.preventDefault()
            FetchApi(`http://localhost:3000/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nametask: nametask.value,
                    description: description.value,
                    priority: priority.value,
                    date: date.value
                })


            })
            NavigateTo('/home')
            
        })
        
    }
    return {
        pageContent,
        logic
    }
}