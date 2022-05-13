import { createRouter, createWebHistory } from 'vue-router'
import TaskView from '../views/TaskView.vue'

const routes = [
  {
    path: '/',
    name: 'tasks',
    component: TaskView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
