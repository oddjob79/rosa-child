<?php /* Template Name: VuePage */ ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
   <?php wp_head(); ?>
</head>

<body>
  <div id="app">
      <ol>
          <todo-item
              v-for="item in groceryList"
              v-bind:todo="item"
              v-bind:key="item.id">
         </todo-item>
      </ol>
      <ul>
        <item-data
          v-for="item of items"
          v-bind:item="item"
          v-bind:key="item.id">
        </item-data>
      </ul>

  </div>
  <?php wp_footer(); ?>
</body>
</html>
