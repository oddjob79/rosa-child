<?php
add_action( 'wp_enqueue_scripts', 'custom_script_load' );
function custom_script_load(){
  wp_enqueue_style('style', get_theme_root_uri().'/vuetheme/style.css', [], '1.0');
  wp_enqueue_script('vue', 'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js', [], '2.5.17', false);
  wp_enqueue_script('axios', 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', [], '0.19.2', false);
  wp_enqueue_script( 'index.js', get_theme_root_uri().'/vuetheme/index.js', [], '1.0', true );
  wp_enqueue_script('bootstrap-jquery', 'https://code.jquery.com/jquery-3.4.1.slim.min.js', [], '3.4.1', true);
  wp_enqueue_script('bootstrap-popper', 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', [], '1.16.0', true);
  wp_enqueue_script('bootstrap-js', 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js', [], '4.4.1', true);
  wp_enqueue_style('bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css', [], '4.4.1');
}
?>
