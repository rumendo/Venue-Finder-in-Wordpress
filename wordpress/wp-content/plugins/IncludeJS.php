<?php
/**
 * @package JS
 * @version 1
 */
/*
Plugin Name: IncludeJS
*/
function add_async_attribute($tag, $handle) {
    if ( 'custom-script' !== $handle )
        return $tag;
    return str_replace( ' src', ' async="async" src', $tag );
}

function add_defer_attribute($tag, $handle) {
    if ( 'custom-script' !== $handle )
        return $tag;
    return str_replace( ' src', ' defer=”defer” src', $tag );
}

function include_script()
{

    wp_deregister_script('jquery');
    wp_register_script('loadMap', plugins_url('loadMap.js', __FILE__ ), array(), false, true);
    wp_register_script('custom-script', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBiTBKcAUdG9VYCS4wo7Og4DGHIMGnmojc&callback=initMap', array(), false, true);
    wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', array(), null, true);
    wp_enqueue_script('loadMap', plugins_url('loadMap.js', __FILE__ ), array(), false, true);
    wp_enqueue_script('custom-script', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBiTBKcAUdG9VYCS4wo7Og4DGHIMGnmojc&callback=initMap', array(), false, true);

}

add_filter('script_loader_tag', 'add_defer_attribute', 10, 2);
add_filter('script_loader_tag', 'add_async_attribute', 10, 2);
add_action( 'wp_enqueue_scripts', 'include_script');

?>
