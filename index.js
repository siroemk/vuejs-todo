
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
    currentIndex: null
  },
  methods: {
    addText: function() {
      this.todoLists.push({
        index: new Date().getTime().toString(),
        text: this.text,
        finished: false
      })
      this.save(this.todoLists)
      this.text = ''
    },
    deleteText: function(todo) {
      const index = this.todoLists.indexOf(todo)
      this.todoLists.splice(index, 1)
      this.save(this.todoLists)
    },
    editText: function(todo) {
      this.currentIndex = todo.index
    },
    updateText: function(todo) {
      const index = this.todoLists.indexOf(todo)
      const editTodo = this.todoLists[index]
      editTodo['text'] = todo.text
      localStorage.setItem('todoLists', JSON.stringify(this.todoLists))
      this.currentIndex = ''
    },
    cancelText: function() {
      this.currentIndex = ''
    },
    check: function(todo) {
      const index = this.todoLists.indexOf(todo)
      const Todo = this.todoLists[index]
      Todo.finished = !Todo.finished
      this.save(this.todoLists)
    },
    save: function(todoLists) {
      localStorage.setItem('todoLists', JSON.stringify(todoLists))
    }
  }
})
