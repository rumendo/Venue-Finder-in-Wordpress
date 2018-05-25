<? get_header() ?>

<div>
  <? while (have_posts()): ?>
    <h2><? the_title() ?></h2>
    <? the_content(); ?>
  <? endwhile; ?>
  <? comments_template('', true); ?>
</div>

<? get_footer() ?>
<? get_sidebar() ?>
