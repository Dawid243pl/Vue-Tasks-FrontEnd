<template>
  <div>
    <TaskTable
      @editTask="editTask"
      @addTask="addTask"
      @filterTasks="filterTasks"
    />
    <TaskModal
      :show="showModal"
      :task="selectedTask"
      :modalType="modalType"
      @closeModal="closeModal"
      @fetchTaskData="fetchTaskData"
    />
  </div>
</template>

<script>
import TaskTable from '@/components/TaskTable.vue'
import TaskModal from '@/components/TaskModal.vue'

export default {
  name: 'TaskView',
  data () {
    return {
      showModal: false,
      selectedTask: {},
      modalType: null,
      filters: []
    }
  },
  components: {
    TaskTable,
    TaskModal
  },
  computed: {
    createUrl () {
      let baseUrl = 'http://localhost:3000/tasks'
      if (this.filters) {
        baseUrl += '?'
        for (let index = 0; index < this.filters.length; index++) {
          baseUrl += this.filters[index]
          if (this.filters[index + 1]) {
            baseUrl += '&'
          }
        }
      }
      return baseUrl
    }
  },
  mounted () {
    this.$store.dispatch('getTasks', this.createUrl)
  },
  methods: {
    fetchTaskData () {
      this.$store.dispatch('getTasks', this.createUrl)
    },
    editTask (task) {
      if (task.completed_at) {
        this.$store.commit('completeTask', true)
      } else {
        this.$store.commit('completeTask', false)
      }

      this.selectedTask = task
      this.showModal = true
      this.modalType = 'edit'
    },
    addTask () {
      this.showModal = true
      this.modalType = 'add'
      this.selectedTask = {}
    },
    closeModal () {
      this.showModal = false
      this.selectedTask = {}
      this.modalType = null
    },
    filterTasks (filters) {
      this.filters = filters
      this.fetchTaskData()
    }
  }
}
</script>
