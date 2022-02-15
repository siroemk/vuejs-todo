const ListRendering = {
  data() {
    return {
      todos: [
        { text: 'todo1' },
        { text: 'todo2' },
        { text: 'todo3' }
      ]
    }
  }
}

Vue.createApp(ListRendering).mount('.list-rendering')
