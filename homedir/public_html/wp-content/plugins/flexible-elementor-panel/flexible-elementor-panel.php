<?php
/**
Plugin Name: Flexible Elementor Panel
Plugin URI: https://wordpress.org/plugins/flexible-elementor-panel
Description: This is an add-on for popular page builder Elementor. Makes Elementor Widgets Panel flexible, draggable and folding that more space and opportunities.
Version: 1.8.1
Author: Creative Web Solution
Author URI: http://creativewebsolution.pl/
Text Domain: fep
Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

$plugin_data = get_file_data(__FILE__, array('Version' => 'Version'), false);
$plugin_version = $plugin_data['Version'];

define( 'FEP_VERSION', $plugin_version );

define( 'FLEXIBLE_ELEMENTOR_PANEL__FILE__', __FILE__ );

define( 'FEP_URL', plugins_url( '/', __FILE__ ) );
define( 'FEP_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Load Elementor Flexible Panel
 *
 * Load the plugin after Elementor (and other plugins) are loaded.
 *
 * @since 1.0.0
 */
function flexible_elementor_panel_load() {
	// Load localization file
	load_plugin_textdomain( 'fep', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

	// Notice if the Elementor is not active
	if ( ! did_action( 'elementor/loaded' ) ) {
		add_action( 'admin_notices', 'flexible_elementor_panel_fail_load' );
		return;
	}

	// Check required version
	$elementor_version_required = '1.4.0';
	if ( ! version_compare( ELEMENTOR_VERSION, $elementor_version_required, '>=' ) ) {
		add_action( 'admin_notices', 'flexible_elementor_panel_fail_load_out_of_date' );
		return;
	}

	// Require the main plugin file
	require( __DIR__ . '/flexible-elementor-panel-main-plugin.php' );
}
add_action( 'plugins_loaded', 'flexible_elementor_panel_load' );

function flexible_elementor_panel_fail_load() {

		if ( isset( $_GET['activate'] ) ) unset( $_GET['activate'] );

		$message = sprintf(
			/* translators: 1: Plugin name 2: Elementor */
			esc_html__( '"%1$s" requires "%2$s" to be installed and activated.', 'fep' ),
			'<strong>' . esc_html__( 'Flexible Elementor Panel', 'fep' ) . '</strong>',
			'<strong>' . esc_html__( 'Elementor', 'fep' ) . '</strong>'
		);

		printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );

}

function flexible_elementor_panel_fail_load_out_of_date() {
	if ( ! current_user_can( 'update_plugins' ) ) {
		return;
	}

	if ( isset( $_GET['activate'] ) ) unset( $_GET['activate'] );

	$file_path = 'elementor/elementor.php';

	$upgrade_link = wp_nonce_url( self_admin_url( 'update.php?action=upgrade-plugin&plugin=' ) . $file_path, 'upgrade-plugin_' . $file_path );
	$message = '<p>' . __( 'Flexible Elementor Panel is not working because you are using an old version of Elementor.', 'fep' ) . '</p>';
	$message .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', $upgrade_link, __( 'Update Elementor Now', 'fep' ) ) . '</p>';

	echo '<div class="error">' . $message . '</div>';
}
