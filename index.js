
const Storage = {
  fetch() {
    return JSON.parse(localStorage.getItem('todoLists'))
  }
}

const app = new Vue({
  el: '#app',
  data: {
    todoLists: Storage.fetch()
  },
  methods: {
    addText: function() {
      this.todoLists.push({
        text: this.text,
        finished: false
      })
      localStorage.setItem('todoLists', JSON.stringify(this.todoLists))
    }
  }
})
