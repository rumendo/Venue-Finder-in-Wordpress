<? get_header() ?>

<div>
  <? while (have_posts()): the_post(); ?>
    <h2><? the_title() ?></h2>
    <? the_content(__('Continue Reading')); ?>
  <? endwhile; ?>
</div>

<? get_footer() ?>
<? get_sidebar() ?>
