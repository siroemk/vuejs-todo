const Storage = {
  key: 'todoLists',
  fetch() {
    return JSON.parse(localStorage.getItem(this.key)) || []
  },
  save(todoLists) {
    localStorage.setItem(this.key, JSON.stringify(todoLists))
  }
}

const app = new Vue({
  el: '#app',
  data: {
    todoLists: Storage.fetch(),
    text: '',
    editingId: ''
  },
  methods: {
    addTodo() {
      if(this.text === '') {
        alert("ToDoを入力してください")
        return
      }
      this.todoLists.push({
        id: new Date().getTime().toString(),
        text: this.text,
        isDone: false
      })
      Storage.save(this.todoLists)
      this.text = ''
    },
    editTodo(todo) {
      this.editingId = todo.id
    },
    updateTodo(todo) {
      if(todo.text === '') {
        alert("ToDoを入力してください")
        return
      }
      const index = this.todoLists.indexOf(todo)
      const todoToEdit = this.todoLists[index]
      todoToEdit['text'] = todo.text
      Storage.save(this.todoLists)
      this.editingId = ''
    },
    cancelEditing() {
      this.editingId = ''
    },
    toggleStatus(todo) {
      const index = this.todoLists.indexOf(todo)
      const todoToToggle = this.todoLists[index]
      todoToToggle.isDone = !todoToToggle.isDone
      Storage.save(this.todoLists)
    },
    deleteTodo(todo) {
      const index = this.todoLists.indexOf(todo)
      this.todoLists.splice(index, 1)
      Storage.save(this.todoLists)
    }
  }
})
