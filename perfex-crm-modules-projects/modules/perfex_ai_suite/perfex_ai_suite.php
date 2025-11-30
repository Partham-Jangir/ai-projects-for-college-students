<?php
defined('BASEPATH') or exit('No direct script access allowed');

define('PERFEX_AI_SUITE_MODULE_NAME', 'perfex_ai_suite');

hooks()->add_action('admin_init', 'perfex_ai_suite_init_permissions');
hooks()->add_action('admin_init', 'perfex_ai_suite_init_menu');
hooks()->add_action('app_init', 'perfex_ai_suite_load_language');

register_activation_hook(PERFEX_AI_SUITE_MODULE_NAME, 'perfex_ai_suite_activate');
register_deactivation_hook(PERFEX_AI_SUITE_MODULE_NAME, 'perfex_ai_suite_deactivate');
register_uninstall_hook(PERFEX_AI_SUITE_MODULE_NAME, 'perfex_ai_suite_uninstall');

function perfex_ai_suite_activate()
{
    $CI = &get_instance();
    require_once(__DIR__ . '/install.php');
}

function perfex_ai_suite_deactivate()
{
}

function perfex_ai_suite_uninstall()
{
    $CI = &get_instance();
    if ($CI->db->table_exists('perfex_ai_logs')) {
        $CI->db->query('DROP TABLE perfex_ai_logs');
    }
}

function perfex_ai_suite_init_permissions()
{
    $CI = &get_instance();
    $permissions = [
        'perfex_ai_view',
        'perfex_ai_manage',
        'perfex_ai_settings',
        'perfex_ai_api_access'
    ];
    foreach ($permissions as $permission) {
        $CI->app_modules->register_custom_permission(PERFEX_AI_SUITE_MODULE_NAME, $permission);
    }
}

function perfex_ai_suite_init_menu()
{
    $CI = &get_instance();
    if (has_permission('perfex_ai_view', '', true)) {
        $CI->app_menu->add_sidebar_menu_item(PERFEX_AI_SUITE_MODULE_NAME, [
            'name'     => _l('perfex_ai_suite_menu'),
            'href'     => admin_url('perfex_ai_admin'),
            'icon'     => 'fa fa-robot',
            'position' => 20,
        ]);
        $CI->app_menu->add_sidebar_children_item(PERFEX_AI_SUITE_MODULE_NAME, [
            'slug'     => 'perfex_ai_suite_settings',
            'name'     => _l('perfex_ai_suite_settings'),
            'href'     => admin_url('perfex_ai_admin/settings'),
            'icon'     => 'fa fa-cog',
        ]);
        $CI->app_menu->add_sidebar_children_item(PERFEX_AI_SUITE_MODULE_NAME, [
            'slug'     => 'perfex_ai_suite_marketplace',
            'name'     => _l('perfex_ai_suite_marketplace'),
            'href'     => admin_url('perfex_ai_admin/marketplace'),
            'icon'     => 'fa fa-shopping-cart',
        ]);
    }
}

function perfex_ai_suite_load_language()
{
    register_language_files(PERFEX_AI_SUITE_MODULE_NAME, ['perfex_ai_suite']);
}
