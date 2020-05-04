<?php /* Template Name: VuePage */ ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
   <?php wp_head(); ?>
   <!-- Required meta tags -->
   <meta charset="utf-8">   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>

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
          @itememit="updateBasket">
        </item-data>
      </div>
    </div>
  </div>
  <?php wp_footer(); ?>
</body>
</html>
