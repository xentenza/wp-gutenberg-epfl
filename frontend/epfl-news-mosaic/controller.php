<?php

// Styleguide: to be defined

namespace EPFL\Plugins\Gutenberg\Mosaic;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


/**
 * Render a Mosaic panel block
 */
function epfl_mosaic_panel_block($attributes, $inner_content)
{
    $motcle = Utils::get_sanitized_attribute( $attributes, 'motcle' );
    $title = Utils::get_sanitized_attribute( $attributes, 'title' );
    $link = Utils::get_sanitized_url( $attributes, 'link' );
    $url = Utils::get_sanitized_attribute( $attributes, 'url' );
    $image_id  = Utils::get_sanitized_attribute( $attributes, 'imageId' );
    $image_url = Utils::get_sanitized_attribute( $attributes, 'imageUrl' );
    $content = Utils::get_sanitized_attribute( $attributes, 'content' );
    $description = Utils::get_sanitized_attribute( $attributes, 'description' );
    $button_label = Utils::get_sanitized_attribute( $attributes, 'buttonLabel' );
    $display_type = Utils::get_sanitized_attribute($attributes, 'displayType', 'news' );
    $display_size = Utils::get_sanitized_attribute($attributes, 'displaySize', 'small' );
    $distinction  = Utils::get_sanitized_attribute( $attributes, 'distinction', False);

    if(empty(trim($title))) return "";

    $image_post = empty($image_id)? null : get_post($image_id) ;

    $link = empty($link)? null : esc_url($link);

    $attachement = wp_get_attachment_image(
        $image_id,
        'thumbnail_16_9_large_80p', // see functions.php
        '',
        [
            'class' => 'img-fluid',
            'alt' => esc_attr($description)
        ]
    );

    ob_start();
?>



      <?php
/**
 * Différents types de Mosaic
 */

switch ($display_size) {
  case 'small':
    $largeur = "col-md-4";
    break;
  case 'medium':
    $largeur = "col-md-8";
    break;
  case 'large':
    $largeur = "col-md-12";
    break;
}
?>

  <?php

  switch ($display_type) { 
    /* Affichage selon le format de bloc */

    case "news": ?>
      <div class="<?php echo $largeur; ?>">
        <div class="card">
          Ceci est une news
        </div>
      </div>
      <?php
      break;

    case "breve": ?>
      <div class="<?php echo $largeur; ?>">
          <a class="card link-trapeze-horizontal <?php if($distinction): ?>card-distinction<?php endif; ?>" href="<?php echo $link; ?>" rel="noopener" target="_blank">
              <div class="card-body">
                  <h3 class="card-title" itemprop="name"><?php echo $title ?></h3>
                  <p itemprop="description"><?php echo $description; ?></p>
              </div>
          </a>
        </div>
<?php break;

    case "video": ?>
    <div class="<?php echo $largeur; ?>">
      <div class="card embed-responsive embed-responsive-16by9">
          <iframe src="<?php echo esc_url($url); ?>" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay; encrypted-media" frameborder="0" class="embed-responsive-item"></iframe>
      </div>
    </div>
    <?php break;

    case "dossier": ?>
    <div class="<?php echo $largeur; ?>">
      <a href="<?php echo $link; ?>" class="card card-overlay link-trapeze-horizontal">
          <picture class="card-img">
            <?php // get/slice image informations
            $image_src = wp_get_attachment_image_src($image_id, 'thumbnail_16_9_large')[0]; // see functions.php
            $image_caption = wp_get_attachment_caption($image_id);
            $image_alt = get_post_meta($image_id , '_wp_attachment_image_alt', true);
             ?>
              <?php echo $attachement; ?>
          </picture>
          <div class="card-img-overlay">
              <h3 class="h4 card-title">
                  <span class="text-padded"><?php echo $motcle; ?></span>
              </h3>
              <p class="h4">
                  <strong class="text-padded"><?php echo $title; ?></strong>
              </p>
          </div>
        </a>
          </div>

    <?php break;

    case "image": ?>
      <div class="<?php echo $largeur; ?>">
          <figure class="cover">
            <picture><?php echo $attachement; ?></picture>
            <?php if (!empty($description)) { ?>

        <figcaption>
            <button aria-hidden="true" type="button" class="btn-circle" data-toggle="popover" data-content="<?php echo esc_attr($description); ?>">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-info"></use></svg>
                <svg class="icon icon-rotate-90" aria-hidden="true"><use xlink:href="#icon-chevron-right"></use></svg>
            </button>
            <p class="sr-only"><?php echo esc_html($description); ?></p>
        </figcaption>
<?php } ?>
        </figure>
      </div>

    <?php break;
  }
  ?>

      <?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;

} /* fin de Render a Mosaic panel block */



/**
 * Render a Mosaic Block
 */
function epfl_mosaic_deck_block($data, $inner_content) {

  ob_start();

 ?>

  <div class="container-full p-3 p-md-4 p-lg-5">
      <div class="row" data-masonry='{"percentPosition": true }'>
        <div class="col-md-4"></div>
    
    <?php
    echo $inner_content;
    ?>

      </div>
  </div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;

}
