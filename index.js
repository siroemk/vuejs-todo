
const Storage = {
  fetch() {
    return JSON.parse(localStorage.getItem('todoLists')) || []
  },
  save(todoLists) {
    localStorage.setItem('todoLists', JSON.stringify(todoLists))
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
      if(this.text === '') {
        alert("ToDoを入力してください")
        return
      }
      this.todoLists.push({
        index: new Date().getTime().toString(),
        text: this.text,
        finished: false
      })
      Storage.save(this.todoLists)
      this.text = ''
    },
    editText: function(todo) {
      this.currentIndex = todo.index
    },
    updateText: function(todo) {
      if(todo.text === '') {
        alert("ToDoを入力してください")
        return
      }
      const index = this.todoLists.indexOf(todo)
      const editTodo = this.todoLists[index]
      editTodo['text'] = todo.text
      Storage.save(this.todoLists)
      this.currentIndex = ''
    },
    cancelText: function() {
      this.currentIndex = ''
    },
    check: function(todo) {
      const index = this.todoLists.indexOf(todo)
      const Todo = this.todoLists[index]
      Todo.finished = !Todo.finished
      Storage.save(this.todoLists)
    },
    deleteText: function(todo) {
      const index = this.todoLists.indexOf(todo)
      this.todoLists.splice(index, 1)
      Storage.save(this.todoLists)
    }
  }
})
