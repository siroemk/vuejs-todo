
const Storage = {
  fetch() {
    return JSON.parse(localStorage.getItem('todoLists')) || []
  }
}

const app = new Vue({
  el: '#app',
  data: {
    todoLists: Storage.fetch(),
    text: '',
    editIndex: null
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
    },
    editText: function(todo) {
      this.editIndex = todo.index
    },
    updateText: function(todo) {
      const index = this.todoLists.indexOf(todo)
      const editTodo = this.todoLists[index]
      editTodo['text'] = todo.text
      localStorage.setItem('todoLists', JSON.stringify(this.todoLists))
      this.editIndex = ''
    },
    cancelText: function() {
      this.editIndex = null
    },
    check: function(todo) {
      const index = this.todoLists.indexOf(todo)
      const Todo = this.todoLists[index]
      Todo.finished = !Todo.finished
      localStorage.setItem('todoLists', JSON.stringify(this.todoLists))
    }
  }
})
