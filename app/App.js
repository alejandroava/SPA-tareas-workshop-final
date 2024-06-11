import { Router } from "./Router";
import { root } from "./helpers/root";


export function App() {
    root;
    if (!root) {
        throw new Error(`error con el root, no se encuentra en el DOM`)
    }
    Router()
}