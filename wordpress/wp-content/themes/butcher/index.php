<?
if(have_posts()):

 while (have_posts()): the_post(); ?>
    <h2><? the_title() ?></h2>
  <? endwhile;


else:
  echo'<p>No content</p>';
endif;
  ?>
