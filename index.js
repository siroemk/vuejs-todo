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
      const todoToEdit = this.todoLists.find((todoList) => todoList.id === todo.id)
      todoToEdit['text'] = todo.text
      Storage.save(this.todoLists)
      this.editingId = ''
    },
    cancelEditing() {
      this.editingId = ''
    },
    toggleStatus(todo) {
      const todoToToggle = this.todoLists.find((todoList) => todoList.id === todo.id)
      todoToToggle.isDone = !todoToToggle.isDone
      Storage.save(this.todoLists)
    },
    deleteTodo(todo) {
      const index = this.todoLists.findIndex((todoList) => todoList.id === todo.id)
      this.todoLists.splice(index, 1)
      Storage.save(this.todoLists)
    }
  }
})
