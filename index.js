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
    currentIndex: ''
  },
  methods: {
    addText() {
      if(this.text === '') {
        alert("ToDoを入力してください")
        return
      }
      this.todoLists.push({
        index: new Date().getTime().toString(),
        text: this.text,
        isDone: false
      })
      Storage.save(this.todoLists)
      this.text = ''
    },
    editText(todo) {
      this.currentIndex = todo.index
    },
    updateText(todo) {
      if(todo.text === '') {
        alert("ToDoを入力してください")
        return
      }
      const index = this.todoLists.indexOf(todo)
      const todoToEdit = this.todoLists[index]
      todoToEdit['text'] = todo.text
      Storage.save(this.todoLists)
      this.currentIndex = ''
    },
    cancelUpdating() {
      this.currentIndex = ''
    },
    changeStatus(todo) {
      const index = this.todoLists.indexOf(todo)
      const Todo = this.todoLists[index]
      Todo.isDone = !Todo.isDone
      Storage.save(this.todoLists)
    },
    deleteText(todo) {
      const index = this.todoLists.indexOf(todo)
      this.todoLists.splice(index, 1)
      Storage.save(this.todoLists)
    }
  }
})
