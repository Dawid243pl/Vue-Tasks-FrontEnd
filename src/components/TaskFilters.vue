<template>
  <div class="flex items-center justify-between flex-wrap">
    <button
      type="button"
      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
      @click="resetFilters"
    >
      Reset Filters
    </button>
    <div class="flex items-center">
      <div class="mr-4">
        <fieldset class="">
          <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            <div v-for="task in showTasks" :key="task.id" class="flex items-center">
              <input
                :id="task.id"
                v-model="taskType"
                name="notification-method"
                :value="task.id"
                type="radio"
                :checked="task.id === 'all'"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label :for="task.id" class="ml-3 block text-sm font-medium text-gray-700">
                {{ task.title }}
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="px-4 font-bold">
        From:
        <input type="date" class="w-44 px-2" v-model="from"/>
      </div>
      <div class="px-4 font-bold">
        To:
        <input type="date" class="w-44 px-2" v-model="to"/>
      </div>
      <button
        type="button"
        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 ml-4"
        @click="filterTasks"
      >
        Filter
      </button>
    </div>
    <button
      type="button"
      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
      @click="addTask"
    >
      Add Task
    </button>
  </div>
</template>
<script>
export default ({
  data () {
    return {
      taskType: 'all',
      from: null,
      to: null,
      showTasks: [
        { id: 'all', title: 'All' },
        { id: 'complete', title: 'Completed' }
      ]
    }
  },
  mounted () {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd
    this.from = today
    this.filterTasks()
  },
  methods: {
    addTask () {
      this.$emit('addTask')
    },
    filterTasks () {
      const filterArray = []
      if (this.to) {
        filterArray.push('date_max=' + this.to.split('-').reverse().join(''))
      }
      if (this.from) {
        filterArray.push('date_min=' + this.from.split('-').reverse().join(''))
      }
      if (this.taskType !== null && this.taskType !== 'all') {
        filterArray.push('status=complete')
      }
      this.$emit('filterTasks', filterArray)
    },
    resetFilters () {
      this.taskType = 'all'
      this.from = null
      this.to = null
      this.$emit('filterTasks', [])
    }
  }
})
</script>
