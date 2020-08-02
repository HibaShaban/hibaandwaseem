<?php

namespace FEP\Core\Settings\General;

use Elementor\Controls_Manager;
use Elementor\Core\Settings\Base\Model as BaseModel;
//use Elementor\Settings;
//use Elementor\Scheme_Color;

class Model extends BaseModel {
	public function get_name() {
		return 'fep-settings';
	}

	public function get_css_wrapper_selector() {
		// TODO: Implement get_css_wrapper_selector() method.
	}

	public function get_panel_page_settings()	{
		return [
			'title' => __( 'FEP Settings', 'fep' ),
			'menu' => [
				'icon' => 'fa fa-arrows-alt cws-logo-icon-settings',
				'beforeItem' => 'elementor-settings',
			],
		];
	}

	public static function get_controls_list() {

		$html_pro_version = '<p>Get the pro version</p><p><img src=""></p>';

		return [

			Controls_Manager::TAB_SETTINGS => [
				'settings'  => [
					'label'     => __('Settings', 'fep'),
					'controls'  => [
						'fep_ux_heading' =>	[
								'label' => __('Panel settings', 'fep'),
								'type'  => Controls_Manager::HEADING,
							],
						'draggable_panel' => [
                'label' => __('Draggable panel', 'fep'),
                'type'  => Controls_Manager::SWITCHER,
                'label_on' => __('On', 'fep'),
                'label_off' => __('Off', 'fep'),
                'return_value' => 'yes',
								'description' => __( 'hold down the left click on title of panel for move it (put it in the corner left and click on the title for back to origin style)', 'fep' ),
              ],
						'use_grid_ruler' => [
							'label' => __('Use FLEX GRID for widgets', 'fep'),
							'type'  => Controls_Manager::SWITCHER,
							'label_on' => __('On', 'fep'),
							'label_off' => __('Off', 'fep'),
							'return_value' => 'yes',
						],
						'minimize_category_space'  => [
							'label' => __('Minimize all categories with right click', 'fep'),
							'type'  => Controls_Manager::SWITCHER,
							'label_on' => __('On', 'fep'),
							'label_off' => __('Off', 'fep'),
							'return_value' => 'yes',
							'description' => __( 'click the right mouse button on the panel to collapse all categories of widgets', 'fep' ),
						],
						'editor_skin' => [
								'label' => __('Editor skins', 'fep'),
								'type'  => Controls_Manager::SELECT,
								'options'   => [
									'dark_pink'    =>     __('Dark Pink', 'fep'),
									'dark_orange'    =>     __('Dark Orange', 'fep'),
									'light'   =>     __('Light', 'fep')
								]
							],
						'dashboard_link_heading' =>
							[
								'label' => __('Exit button options', 'fep'),
								'type'  => Controls_Manager::HEADING
							],
						'dashboard_link_point' =>
							[
								'label' => __('Exit point', 'fep'),
								'type'  => Controls_Manager::SELECT,
								'options'   => [
									'page_front'        =>      __('Page front', 'fep'),
									'page_edit'         =>      __('Page edit', 'fep'),
									'page_list'         =>      __('Page list', 'fep'),
									'admin_dashboard'   =>      __('Admin dashboard', 'fep'),
									'elementor_library' =>      __('Elementor library', 'fep'),
								]
							],
						'dashboard_link_new_tab' =>	[
								'label' => __('Open in new tab', 'fep'),
								'type'  => Controls_Manager::SWITCHER,
								'label_on' => __('On', 'fep'),
								'label_off' => __('Off', 'fep'),
								'return_value' => 'yes',
							],
						'accordion_heading' => [
								'label' => __('Accordion widget options', 'fep'),
								'type'  => Controls_Manager::HEADING
							],
						'accordion_options' => [
								'label' => __('First tab closed', 'fep'),
								'type'  => Controls_Manager::SWITCHER,
								'label_on' => __('On', 'fep'),
								'label_off' => __('Off', 'fep'),
								'return_value' => 'yes',
							],
						//'fep_note_pro_version' => [
						//	'type' 				=> Controls_Manager::RAW_HTML,
						//	'raw' 				=> $html_pro_version,
						//	'content_classes' 	=> 'ee-raw-html ee-raw-html__warning',
						//]
					]
				]
			]
		];

	}

	protected function _register_controls() {

		$controls_list = self::get_controls_list();

		foreach ( $controls_list as $tab_name => $sections ) {

			foreach ( $sections as $section_name => $section_data ) {

				$this->start_controls_section(
					$section_name, [
						'label' => $section_data['label'],
						'tab' => $tab_name,
					]
				);

				foreach ( $section_data['controls'] as $control_name => $control_data ) {
					$this->add_control( $control_name, $control_data );
				}

				$this->end_controls_section();
			}
		}
	}
}
