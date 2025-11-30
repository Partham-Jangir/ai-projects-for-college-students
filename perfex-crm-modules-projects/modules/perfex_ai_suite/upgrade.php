<?php
defined('BASEPATH') or exit('No direct script access allowed');

$CI = &get_instance();

if (!$CI->db->field_exists('priority', 'perfex_ai_features')) {
    $CI->db->query('ALTER TABLE perfex_ai_features ADD COLUMN priority INT DEFAULT 10');
}

if (!$CI->db->field_exists('severity', 'perfex_ai_logs')) {
    $CI->db->query('ALTER TABLE perfex_ai_logs ADD COLUMN severity VARCHAR(20)');
}

if (!$CI->db->field_exists('is_paid', 'perfex_ai_features')) {
    $CI->db->query('ALTER TABLE perfex_ai_features ADD COLUMN is_paid TINYINT(1) DEFAULT 0');
}
if (!$CI->db->field_exists('price', 'perfex_ai_features')) {
    $CI->db->query('ALTER TABLE perfex_ai_features ADD COLUMN price DECIMAL(10,2) DEFAULT 0');
}
if (!$CI->db->field_exists('requires_license', 'perfex_ai_features')) {
    $CI->db->query('ALTER TABLE perfex_ai_features ADD COLUMN requires_license TINYINT(1) DEFAULT 0');
}
if (!$CI->db->field_exists('short_desc', 'perfex_ai_features')) {
    $CI->db->query('ALTER TABLE perfex_ai_features ADD COLUMN short_desc VARCHAR(191)');
}
if (!$CI->db->field_exists('category', 'perfex_ai_features')) {
    $CI->db->query('ALTER TABLE perfex_ai_features ADD COLUMN category VARCHAR(50)');
}

if (!$CI->db->table_exists('perfex_ai_licenses')) {
    $CI->db->query('CREATE TABLE perfex_ai_licenses (id INT AUTO_INCREMENT PRIMARY KEY, feature_key VARCHAR(100), license_key VARCHAR(191), status VARCHAR(50), meta JSON, created_at DATETIME, updated_at DATETIME)');
}

$paid = [
    ['key' => 'ai_tele_calling', 'price' => 49.00],
    ['key' => 'whatsapp_chatbot', 'price' => 39.00],
    ['key' => 'official_whatsapp_api', 'price' => 59.00],
    ['key' => 'cloud_crm', 'price' => 99.00],
    ['key' => 'ai_sales_manager', 'price' => 79.00],
    ['key' => 'ai_video_chatbot', 'price' => 69.00],
    ['key' => 'ai_voice_chatbot', 'price' => 69.00],
    ['key' => 'wa_multi_account_manager', 'price' => 89.00],
    ['key' => 'digital_marketing_ai', 'price' => 59.00],
    ['key' => 'ppc_ads_ai', 'price' => 59.00],
    ['key' => 'ai_outbound_call', 'price' => 49.00],
    ['key' => 'ai_inbound_call', 'price' => 49.00],
    ['key' => 'custom_ai_development', 'price' => 199.00],
    ['key' => 'ai_business_automation', 'price' => 129.00],
    ['key' => 'ai_business_consultant', 'price' => 149.00],
    ['key' => 'dedicated_account_manager', 'price' => 99.00],
    ['key' => 'ai_white_label_resellership', 'price' => 299.00],
];
foreach ($paid as $p) {
    $CI->db->where('key_name', $p['key'])->update('perfex_ai_features', [
        'is_paid' => 1,
        'requires_license' => 1,
        'price' => $p['price'],
    ]);
}
