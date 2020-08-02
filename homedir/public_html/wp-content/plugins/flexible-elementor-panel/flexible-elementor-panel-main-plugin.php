<?php
namespace FEP;

use Elementor\Core\Settings\Manager as SettingsManager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Main Plugin Class
 *
 *
 * @since 1.0.0
 */
class Flexible_Elementor_Panel_Plugin {

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function __construct() {

		$this->includes();

    $this->add_actions();

		$this->init_panel();

	}

	public function elementor_accordion_off() { ?>
		<script>
            window.onload = function () {
                jQuery( '.elementor-accordion .elementor-tab-title' ).removeClass( 'elementor-active' );
                jQuery( '.elementor-accordion .elementor-tab-content' ).css( 'display', 'none' );
            };
		</script>
		<?php
	}

	/**
	 * Add Actions
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function add_actions() {

		$settings = \FEP\Core\Settings\General\Manager::get_settings();

		if ($settings['accordion_options'] == 'yes') {
			add_action( 'wp_footer', [ $this, 'elementor_accordion_off' ], 99 );
		}

		add_action( 'elementor/editor/after_enqueue_styles', function() {

			wp_enqueue_style( 'flexible-elementor-panel', plugins_url( '/assets/css/flexible-elementor-panel.css', __FILE__ ), array(), constant( 'FEP_VERSION' ), 'all' );

			wp_enqueue_style( 'flexible-elementor-panel-night-skin', plugins_url( '/assets/css/flexible-elementor-panel-night-skin.css', __FILE__ ), array(), constant( 'FEP_VERSION' ), 'all' );


		}, 8); // load if before FEP Pro version


		add_action( 'elementor/editor/before_enqueue_scripts', function() {

			$settings = \FEP\Core\Settings\General\Manager::get_settings();

			wp_enqueue_script( 'onmutate-js', plugins_url( '/assets/js/jquery.onmutate.min.js', __FILE__ ), [ 'jquery' ], '1.4.2' );

			wp_register_script( 'flexible-elementor-panel-js', plugins_url( '/assets/js/flexible-elementor-panel.js', __FILE__ ), [ 'jquery' ], constant( 'FEP_VERSION' ) );

      		wp_localize_script( 'flexible-elementor-panel-js', 'fepConfig', $settings );
			wp_localize_script( 'flexible-elementor-panel-js', 'PageFront', array( 'Permalink' => get_permalink(), ) );

			wp_enqueue_script( 'flexible-elementor-panel-js' );

		}, 8); // load if before FEP Pro version
	}

  /**
   *
   * Include Required Module Files
   *
   * @access private
   */
	private function includes(){
			// Panel Settings
	    require_once FEP_PATH.'inc/settings/manager.php';
	    require_once FEP_PATH.'inc/settings/model.php';
  }

  private function init_panel(){
    SettingsManager::add_settings_manager( new \FEP\Core\Settings\General\Manager() );
  }

}

new Flexible_Elementor_Panel_Plugin(); // load class
