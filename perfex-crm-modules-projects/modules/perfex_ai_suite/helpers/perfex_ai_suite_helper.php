<?php
defined('BASEPATH') or exit('No direct script access allowed');

function perfex_ai_setting($name, $default = null)
{
    $CI = &get_instance();
    $row = $CI->db->get_where('perfex_ai_settings', ['name' => $name])->row_array();
    return $row ? $row['value'] : $default;
}
