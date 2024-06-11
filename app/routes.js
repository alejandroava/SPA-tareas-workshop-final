import { RegisterScene } from "./scene/public/register"
import { LoginScene } from "./scene/public/login"
import { NotFound } from "./scene/public/not-found/notfound.scene"
import { HomeScene } from "./scene/private/home/home.scene"
import { EditTask } from "./scene/private/edittask/edit.task"
export const routes = {
    public: [
        { path: '/register', scene: RegisterScene },
        { path: '/login', scene: LoginScene },
        { path: '/not-found', scene: NotFound}
    ],
    private: [
        { path: '/home', scene: HomeScene },
        {path: '/task/edit',scene: EditTask}
    ]
}