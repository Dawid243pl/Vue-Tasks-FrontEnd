import { createStore } from 'vuex'
import axios from 'axios'
import sortBy from 'lodash/sortBy'

export default createStore({
  state: {
    tasks: null,
    taskCompleted: null
  },
  getters: {
  },
  mutations: {
    setTasks (state, tasks) {
      state.tasks = sortBy(tasks, [function (o) { return o.unique_id }])
    },
    completeTask (state, boolean) {
      state.taskCompleted = boolean
    }
  },
  actions: {
    async getTasks ({ commit }, url) {
      axios
        .get(url)
        .then(response => (commit('setTasks', response.data)))
    }
  },
  modules: {
  }
})
