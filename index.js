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

Vue.component('order-details', {
  props: ['orderitem'],
  template: `<li>{{orderitem}}</li>`
})

var app = new Vue({
    el: '#app',
    data () {
      return {
        categories: [],
        items: [],
        cat: 1,
        basket: [],
        basketCount: 0,
        orderlines: [],
        cust_name: '',
        cust_phone: '',
        cust_email: '',
        locations: [],
        selectedLocation: '',
        pickupTime: '',
        line_notes: [],
        order_notes: ''
      }
    },

    watch: {
      basket: function () {
        this.basketCount = JSON.parse(localStorage.basket).length;
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

// localStorage method of logging items
      addToBasket(item_id) {
        this.basket.push(item_id);
        this.saveBasket();
        // this.basketCount();
        this.callToast();
      },

      removeFromBasket(item_id) {
        this.basket.splice(item_id, 1);
        this.saveBasket();
      },

      saveBasket() {
        const parsed = JSON.stringify(this.basket);
        localStorage.setItem('basket', parsed);
      },

      emptyBasket() {
        this.basket = [];
        this.saveBasket();
      },

// end of localStorage

      callToast() {
        jQuery(function ($) {
          $('.toast').toast('show');
        });
      },

      fetchOrderConfData() {
        // fetch locations
        axios.get(`https://payoo.herokuapp.com/vendor/3/locations`)
        .then(response => {
         // JSON responses are automatically parsed.
         this.locations = response.data.locations
        })
        .catch(e => {
         this.errors.push(e)
         console.log(this.errors)
        })
      }

      // basketCount() {
      //   var basketcount = JSON.parse(localStorage.basket).length;
      //   document.getElementById("bascnt").innerHTML = basketcount;
      // }

      // openIndexedDB() {
      //   //check for support
      //   if (!window.indexedDB) {
      //     console.log('This browser doesn\'t support IndexedDB');
      //     return;
      //   }
      //
      //   var db;
      //   var request = indexedDB.open("basket_db");
      //   request.onerror = function(event) {
      //     console.log("Unable to open IndexedDB!");
      //   };
      //   request.onsuccess = function(event) {
      //     db = event.target.result;
      //   };
      // },
      //
      // addItemToDB(item) {
      //   dbPromise.then(function(db) {
      //     var tx = db.transaction('basket', 'readwrite');
      //     var store = tx.objectStore('basket');
      //     var itemadd = {
      //       name: item.name,
      //       price: item.std_price,
      //       description: item.description,
      //       image_path: item.image_path
      //     };
      //     store.add(itemadd);
      //     return tx.complete;
      //   }).then(function() {
      //     console.log('added item to the store os!');
      //   });
      // },

    // end of methods
    },

    // Fetches posts when the component is created.
    mounted() {
      this.retrieveCategories();
      this.retrieveItems(this.cat);
      // this.openIndexedDB();

      // localStorage method of logging items
      if (localStorage.getItem('basket')) {
        try {
          this.basket = JSON.parse(localStorage.getItem('basket'));
        } catch(e) {
          localStorage.removeItem('basket');
        }
      }
      // end
    },

})
