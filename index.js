Vue.component('cat-data', {
  props: ['category'],
  template: `
  <label class="btn btn-outline-dark" v-on:click="emitCat(category.id)">
    <input type="radio" v-bind:value="category.id">{{category.name}}
  </label>`,
  methods: {
    emitCat(cat) {
      this.$emit('catemit', cat);
    }
  }
})

Vue.component('item-data', {
  props: ['item'],
  template: `
  <div class="card bg-light h-100 customcard" style="max-width: 540px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="images_filepath + item.image_path" class="card-img img-thumbnail img-fluid" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{item.name}}</h5>
          <p class="card-text">{{item.description}}</p>
          <h5 class="card-title">{{item.std_price}}</h5>
          <a href="#" class="btn btn-primary" v-bind:value="item.id" v-on:click="emitItem(item.id)">Add to order</a>
        </div>
      </div>
    </div>
  </div>
  `,
  data () {
    return {
      images_filepath: '/wp/wp-content/uploads/2020/05/'
    }
  },

  methods: {
      emitItem(item_id) {
        this.$emit('itememit', item_id);
      }
  }
})

var app = new Vue({
    el: '#app',
    data () {
      return {
        categories: [],
        items: [],
        cat: 1,
        basket: ''
      }
    },

    methods: {
      retrieveCategories() {
      axios.get(`https://payoo.herokuapp.com/locations/1/categories`)
        .then(response => {
         // JSON responses are automatically parsed.
         this.categories = response.data.categories
        })
        .catch(e => {
         this.errors.push(e)
         console.log(this.errors)
        })
      },

      retrieveItems(category) {
        axios.get('https://payoo.herokuapp.com/categories/'+category+'/items')
        .then(response => {
          // JSON responses are automatically parsed.
          this.items = response.data.items
        })
        .catch(e => {
          this.errors.push(e)
          console.log(this.errors)
        })
      },

      updateBasket(item_id) {
        localStorage.basket = item_id;
      }

    },

    // Fetches posts when the component is created.
    mounted() {
      this.retrieveCategories();
      this.retrieveItems(this.cat);
      if (localStorage.basket) {
        this.basket = localStorage.basket;
      }
    },

})
