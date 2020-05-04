Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

Vue.component('item-data', {
  props: ['item'],
  template: '<li><p><strong>{{item.name}}</strong></p><p>{{item.description}}</p><p>{{item.std_price}}</p></li>'
})

var app = new Vue({
    el: '#app',
    data () {
      return {
        groceryList: [
          { id: 0, text: 'Vegetables' },
          { id: 1, text: 'Cheese' },
          { id: 2, text: 'Whatever else humans are supposed to eat' }
        ],
        items: [],
        errors: []
      }
    },

    // Fetches posts when the component is created.
    mounted () {
      console.log('TEST');
       axios.get(`https://payoo.herokuapp.com/locations/1/items`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.items = response.data.items
      })
      .catch(e => {
        this.errors.push(e)
      })
    }

})
