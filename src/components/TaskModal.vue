<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot
    as="template"
    :show="open"
  >
    <Dialog
      as="div"
      class="overflow-y-auto fixed inset-0 z-10"
    >
      <div class="flex justify-center items-end px-4 pt-4 pb-20 min-h-screen text-center sm:block sm:p-0">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-primary-medium opacity-50 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >&#8203;</span>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div class="inline-block bg-primary-medium relative px-4 pt-5 pb-4 text-left align-bottom rounded-lg shadow-2xl transition-all sm:p-6 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle bg-zinc-300">
            <div>
              <div
                class="space-y-6"
              >
                <div
                  class=""
                >
                  <h3
                    class="text-lg font-medium leading-6"
                    v-if="modalType == 'edit'"
                  >
                    {{ task.title }} {{ task.unique_id }}
                  </h3>
                  <div class="absolute right-2 top-2" @click="$emit('closeModal')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div
                  class="grid grid-cols-6 gap-6"
                >
                  <div class="col-span-6">
                    <label
                      for="first-name"
                      class="block text-sm font-medium "
                    >
                      Task Name
                    </label>
                    <input
                      id="name"
                      v-model="taskName"
                      :placeholder="getPlaceholder(modalType)"
                      type="text"
                      name="name"
                      class="block py-2 px-3 mt-1 w-full rounded-md border focus:outline-none shadow-sm sm:text-sm border-gray-300"
                    />
                    <div class="relative flex items-start pt-4">
                      <div class="flex items-center h-5">
                        <input
                          id="task-complete"
                          name="task-complete"
                          type="checkbox"
                          v-model="taskCompleted"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="task-complete" class="font-medium text-gray-700">Task Complete</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:grid sm:grid-cols-2 sm:grid-flow-row-dense sm:gap-3 sm:mt-12">
              <button
                v-if="modalType == 'add'"
                type="button"
                class="text-white inline-flex justify-center py-2 px-4 w-full text-base font-medium rounded-md border shadow-sm sm:col-start-2 sm:text-sm bg-indigo-600 hover:bg-indigo-700 border-transparent"
                @click="addTask()"
              >
                Add Task
              </button>
              <button
                v-if="modalType == 'edit'"
                type="button"
                class="text-white inline-flex justify-center py-2 px-4 w-full text-base font-medium rounded-md border shadow-sm sm:col-start-2 sm:text-sm bg-indigo-600 hover:bg-indigo-700 border-transparent"
                @click="updateTask()"
              >
                Update Task
              </button>
              <button
                v-if="modalType == 'edit'"
                type="button"
                class="bg-red-600 text-white inline-flex justify-center py-2 px-4 mt-3 w-full text-base font-medium hover:bg-primary-medium rounded-md border shadow-sm sm:col-start-1 sm:mt-0 sm:text-sm border-gray-300"
                @click="deleteTask"
              >
                Delete Task
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
// import pick from 'lodash/pick'

import { ref } from 'vue'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import axios from 'axios'

export default {
  name: 'TaskModal',
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot
  },
  computed: {
    taskCompleted: {
      get () {
        return this.$store.state.taskCompleted
      },
      set (value) {
        this.$store.commit('completeTask', value)
      }
    }
  },
  props: {
    task: {
      type: Object,
      defualt: null
    },
    modalType: {
      type: String,
      defualt: null
    }
  },
  setup () {
    const open = ref(true)

    return {
      open
    }
  },
  data () {
    return {
      taskName: null
    }
  },
  methods: {
    changeTaskCompleted (event) {
      this.taskCompleted = event.target.checked
    },
    getPlaceholder (modalType) {
      if (modalType === 'add') {
        return null
      } else if (modalType === 'edit') {
        return this.task.title
      }
    },
    addTask () {
      if (this.taskName) {
        const self = this
        axios.post('http://localhost:3000/tasks', {
          title: this.taskName,
          completed_at: self.taskCompleted
        })
          .then(function (response) {
            self.$emit('closeModal')
            self.$emit('fetchTaskData')
            self.taskCompleted = null
            self.taskName = null
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    deleteTask () {
      const self = this
      axios.delete('http://localhost:3000/tasks/' + self.task.unique_id)
        .then(function (response) {
          self.$emit('closeModal')
          self.$emit('fetchTaskData')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    updateTask () {
      const self = this
      if (!self.taskName) {
        self.taskName = self.task.title
      }
      axios.put('http://localhost:3000/tasks/' + self.task.unique_id, {
        title: self.taskName,
        completed_at: self.taskCompleted
      })
        .then(function (response) {
          self.taskName = null
          self.taskCompleted = null
          self.$emit('closeModal')
          self.$emit('fetchTaskData')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
