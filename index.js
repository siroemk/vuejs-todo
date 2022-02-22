
const Storage = {
  fetch() {
    return JSON.parse(localStorage.getItem('todoLists')) || []
  }
}

const app = new Vue({
  el: '#app',
  data: {
    todoLists: Storage.fetch(),
    text: ''
  },
  methods: {
    addText: function() {
      this.todoLists.push({
        index: new Date().getTime().toString(),
        text: this.text,
        finished: false
      })
      localStorage.setItem('todoLists', JSON.stringify(this.todoLists))
    },
    deleteText: function(todo) {
      const index = this.todoLists.indexOf(todo)
      this.todoLists.splice(index, 1)
      localStorage.setItem('todoLists', JSON.stringify(this.todoLists))
    }
  }
})
