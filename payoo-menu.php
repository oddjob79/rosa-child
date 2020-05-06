<?php /* Template Name: Payoo-Menu */ ?>
<body>
  <div id="app">
    <div class="container-md">
      <div class="row col- justify-content-center">
        <div class="btn-group btn-group-lg btn-group-toggle flex-wrap" data-toggle="buttons">
            <cat-data
              v-for="category of categories"
              v-bind:category="category"
              v-bind:key="category.id"
              @catemit="retrieveItems">
            </cat-data>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-2">
        <item-data
          v-for="item of items"
          v-bind:item="item"
          v-bind:key="item.id"
          @itememit="addToBasket">
        </item-data>
      </div>

      <div class="fixed-badge">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#confirmModal" v-on:click="fetchOrderConfData()">
          Open Basket <span class="badge">{{ basketCount }}</span>
        </button>
      </br></br>
        <button type="button" class="btn btn-primary" v-on:click="emptyBasket()">Empty Basket</button>
      </div>

      <div class="toast toast-basket" role="alert" aria-live="assertive" aria-atomic="true" data-delay="10000">
        <div class="toast-header">
          <!-- <img src="/wp/wp-content/uploads/2020/05/knife_and_fork-e1588610769420.jpg" class="rounded mr-2" alt="..."> -->
          <strong class="mr-auto">Order Updated!</strong>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#confirmModal">Open basket</button>
        </div>
      </div>

      <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" data-backdrop="false" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg confirm-modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="orderConfirmTitle">Order Confirmation</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="form-group">
                  <label for="locat">Choose your location</label>
                  <select v-model="selectedLocation" class="form-control" id="locat">
                    <option v-for="location in locations" :value=location.id>{{location.name}}</option>
                  </select>
                  <hr>
                  <div class="form-row">
                    <label for="custname">Name</label>
                    <input v-model="cust_name" class="form-control" id="custname">
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="custphone">Phone</label>
                      <input v-model="cust_phone" class="form-control" id="custphone">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="custemail">Email</label>
                      <input v-model="cust_email" class="form-control" type="email" id="custemail">
                    </div>
                  </div>
                  <hr>
                  <ul>
                    <!-- <order-details
                      v-for="orderitem of basket"
                      v-bind:value="orderitem.value"
                      v-bind:key="orderitem.key">
                    </order-details> -->
                    <order-details :orderitem="basket"></order-details>
                  </ul>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            <!-- <ul>
              <order-details
                v-for="orderitem of basket"
                v-bind:item="orderitem.value"
                v-bind:key="orderitem.key">
              </order-details>
            </ul> -->
          </div>
        </div>
      </div>

    </div>
  </div>
</body>
