<?php

namespace FEP\Core\Settings\General;

use Elementor\Controls_Manager;
use Elementor\Core\Settings\General\Manager as BaseManager;
use Elementor\Core\Settings\Base\Model;
use Elementor\CSS_File;

class Manager extends BaseManager {

	const OPTIONS_KEY = '_elementor_fep_settings';

	public function __construct() {
		parent::__construct();

		$this->add_panel_tabs();
	}

	public function get_model_for_config() {
		return $this->get_model();
	}

	public function get_name() {
		return 'fep';
	}

	protected function get_saved_settings($id)
	{
		$defaults = [
			'draggable_panel'           => 'no',
			'use_grid_ruler'            => 'no',
			'minimize_category_space'   => 'no',
			'editor_skin'               => 'light',
			'dashboard_link_point'      => 'page_edit',
			'dashboard_link_new_tab'    => 'no',
			'accordion_options'         => 'no',
		];
		$model_controls = \FEP\Core\Settings\General\Model::get_controls_list();

		$settings = [];

		foreach ( $model_controls as $tab_name => $sections ) {

			foreach ( $sections as $section_name => $section_data ) {

				foreach ( $section_data['controls'] as $control_name => $control_data ) {
					$saved_setting = get_option( $control_name, null );

					if ( null !== $saved_setting ) {
						$settings[ $control_name ] = get_option( $control_name );
					}
				}
			}
		}

		$settings = wp_parse_args($settings, $defaults);

		return $settings;
	}

	protected function get_css_file_name() {
		// TODO: Implement get_css_file_name() method.
	}

	protected function save_settings_to_db(array $settings, $id)
	{
		$model_controls = \FEP\Core\Settings\General\Model::get_controls_list();

		$one_list_settings = [];

		foreach ( $model_controls as $tab_name => $sections ) {

			foreach ( $sections as $section_name => $section_data ) {

				foreach ( $section_data['controls'] as $control_name => $control_data ) {
					if ( isset( $settings[ $control_name ] ) ) {
						$one_list_control_name = str_replace( 'elementor_', '', $control_name );

						$one_list_settings[ $one_list_control_name ] = $settings[ $control_name ];

						update_option( $control_name, $settings[ $control_name ] );
					} else {
						delete_option( $control_name );
					}
				}
			}
		}

		// Save all settings in one list for future usage
		if ( ! empty( $one_list_settings ) ) {
			update_option( self::OPTIONS_KEY, $one_list_settings );
		} else {
			delete_option( self::OPTIONS_KEY );
		}
	}

	protected function get_model_for_css_file(CSS_File $css_file) {
		// TODO: Implement get_model_for_css_file() method.
	}

	protected function get_css_file_for_update($id)	{
		// TODO: Implement get_css_file_for_update() method.
	}

	private function add_panel_tabs() {
		Controls_Manager::add_tab( 'settings', __( 'Settings', 'fep' ) );
	}

	public static function get_settings(){

		// TODO:: Make it centralized
		$defaults = [
			'draggable_panel'           => 'no',
			'use_grid_ruler'            => 'no',
			'minimize_category_space'   => 'no',
			'editor_skin'               => 'light',
			'dashboard_link_point'      => 'page_edit',
			'dashboard_link_new_tab'    => 'no',
			'accordion_options'         => 'no',
		];
		$model_controls = \FEP\Core\Settings\General\Model::get_controls_list();

		$settings = [];

		foreach ( $model_controls as $tab_name => $sections ) {

			foreach ( $sections as $section_name => $section_data ) {

				foreach ( $section_data['controls'] as $control_name => $control_data ) {
					$saved_setting = get_option( $control_name, null );

					if ( null !== $saved_setting ) {
						$settings[ $control_name ] = get_option( $control_name );
					}
				}
			}
		}

		$settings = wp_parse_args($settings, $defaults);

		return $settings;
	}
}
