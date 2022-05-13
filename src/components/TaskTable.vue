<template>
  <div class="flex justify-center items-center flex-wrap bg-gray-300 pb-6">
    <div class="w-11/12">
      <div
        class="text-3xl font-bold underline py-4"
      >
        Tasks
      </div>
      <div class="w-full">
        <TaskFilters @addTask="addTask" @filterTasks="filterTasks"/>
      </div>
      <div class="mt-8 flex flex-col w-full">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">UUID</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date Created</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date Completed</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 text-center">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-300 bg-white">
                  <tr v-for="task in tasks" :key="task.unique_id">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ task.unique_id }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ task.title }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ getDate(task.created_at) }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div v-if="task.completed_at">
                        {{ getDate(task.completed_at) }}
                      </div>
                      <div v-else>
                        Pending
                      </div>
                    </td>
                    <td
                      class="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-bold sm:pr-6"
                    >
                      <div
                        class="text-indigo-600 hover:text-indigo-900"
                        @click="editTask(task)"
                      >
                        Edit
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TaskFilters from '@/components/TaskFilters.vue'

export default ({
  name: 'TasksList',
  components: {
    TaskFilters
  },
  computed: {
    tasks () {
      if (this.$store.state.tasks) {
        return this.$store.state.tasks
      } else {
        return null
      }
    }
  },
  data () {
    return {
      filters: []
    }
  },
  mounted () {
  },
  methods: {
    getDate (date) {
      const stringifiedDate = String(date)
      const day = stringifiedDate.slice(0, 2)
      const month = stringifiedDate.slice(2, 4)
      const year = stringifiedDate.slice(4, 8)
      return day + '/' + month + '/' + year
    },
    editTask (task) {
      this.$emit('editTask', task)
    },
    addTask () {
      this.$emit('addTask')
    },
    filterTasks (filters) {
      this.$emit('filterTasks', filters)
    }
  }
})
</script>
