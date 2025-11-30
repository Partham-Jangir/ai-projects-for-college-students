<?php
defined('BASEPATH') or exit('No direct script access allowed');

$CI = &get_instance();

if (!$CI->db->table_exists('perfex_ai_settings')) {
    $CI->db->query('CREATE TABLE perfex_ai_settings (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(191) UNIQUE, value TEXT, updated_at DATETIME)');
}

if (!$CI->db->table_exists('perfex_ai_logs')) {
    $CI->db->query('CREATE TABLE perfex_ai_logs (id BIGINT AUTO_INCREMENT PRIMARY KEY, level VARCHAR(20), message TEXT, context JSON, created_at DATETIME)');
}

if (!$CI->db->table_exists('perfex_ai_features')) {
    $CI->db->query('CREATE TABLE perfex_ai_features (
        id INT AUTO_INCREMENT PRIMARY KEY,
        key_name VARCHAR(100) UNIQUE,
        title VARCHAR(191),
        short_desc VARCHAR(191),
        category VARCHAR(50),
        is_paid TINYINT(1) DEFAULT 0,
        price DECIMAL(10,2) DEFAULT 0,
        requires_license TINYINT(1) DEFAULT 0,
        enabled TINYINT(1) DEFAULT 1,
        config JSON,
        created_at DATETIME,
        updated_at DATETIME
    )');
}

if (!$CI->db->table_exists('perfex_ai_templates')) {
    $CI->db->query('CREATE TABLE perfex_ai_templates (id INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(50), name VARCHAR(191), body TEXT, lang VARCHAR(10), created_at DATETIME, updated_at DATETIME)');
}

if (!$CI->db->table_exists('perfex_ai_messages')) {
    $CI->db->query('CREATE TABLE perfex_ai_messages (id BIGINT AUTO_INCREMENT PRIMARY KEY, channel VARCHAR(50), account_id INT, to_number VARCHAR(50), from_number VARCHAR(50), body TEXT, status VARCHAR(50), meta JSON, created_at DATETIME)');
}

if (!$CI->db->table_exists('perfex_ai_calls')) {
    $CI->db->query('CREATE TABLE perfex_ai_calls (id BIGINT AUTO_INCREMENT PRIMARY KEY, direction VARCHAR(20), phone VARCHAR(50), transcript TEXT, outcome VARCHAR(50), meta JSON, created_at DATETIME)');
}

if (!$CI->db->table_exists('perfex_ai_accounts')) {
    $CI->db->query('CREATE TABLE perfex_ai_accounts (id INT AUTO_INCREMENT PRIMARY KEY, provider VARCHAR(50), label VARCHAR(191), credentials JSON, active TINYINT(1) DEFAULT 1, created_at DATETIME, updated_at DATETIME)');
}

if (!$CI->db->table_exists('perfex_ai_flows')) {
    $CI->db->query('CREATE TABLE perfex_ai_flows (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(191), channel VARCHAR(50), definition JSON, active TINYINT(1) DEFAULT 1, created_at DATETIME, updated_at DATETIME)');
}

if (!$CI->db->table_exists('perfex_ai_licenses')) {
    $CI->db->query('CREATE TABLE perfex_ai_licenses (id INT AUTO_INCREMENT PRIMARY KEY, feature_key VARCHAR(100), license_key VARCHAR(191), status VARCHAR(50), meta JSON, created_at DATETIME, updated_at DATETIME)');
}

$CI->db->insert('perfex_ai_features', ['key_name' => 'ai_tele_calling', 'title' => 'AI Tele Calling', 'short_desc' => 'Outbound AI calls', 'category' => 'Calls & Sales', 'is_paid' => 1, 'price' => 49.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'whatsapp_chatbot', 'title' => 'AI WhatsApp Chatbot with ChatGPT', 'short_desc' => 'ChatGPT bot on WhatsApp', 'category' => 'Messaging & Chatbots', 'is_paid' => 1, 'price' => 39.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'whatsapp_auto_followup', 'title' => 'AI WhatsApp Auto Follow-Up', 'short_desc' => 'Automated sequences', 'category' => 'Messaging & Chatbots', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'facebook_chatbot', 'title' => 'Facebook Chatbot', 'short_desc' => 'FB Messenger automation', 'category' => 'Messaging & Chatbots', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'instagram_chatbot', 'title' => 'Instagram Chatbot', 'short_desc' => 'Instagram DM automation', 'category' => 'Messaging & Chatbots', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'official_whatsapp_api', 'title' => 'Official WhatsApp API', 'short_desc' => 'Meta Cloud API setup', 'category' => 'Messaging & Chatbots', 'is_paid' => 1, 'price' => 59.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'cloud_crm', 'title' => 'Cloud CRM', 'short_desc' => 'Hosted CRM suite', 'category' => 'CRM & Automation', 'is_paid' => 1, 'price' => 99.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'ai_sales_manager', 'title' => 'AI Sales Manager', 'short_desc' => 'Pipeline insights & scoring', 'category' => 'Calls & Sales', 'is_paid' => 1, 'price' => 79.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'social_auto_posting', 'title' => 'Social Media Auto Posting', 'short_desc' => 'Scheduler and auto-post', 'category' => 'CRM & Automation', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'web_push_notification', 'title' => 'Web Push Notification', 'short_desc' => 'Browser push campaigns', 'category' => 'CRM & Automation', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'ai_video_chatbot', 'title' => 'AI Video Chatbot', 'short_desc' => 'Video branching logic', 'category' => 'Messaging & Chatbots', 'is_paid' => 1, 'price' => 69.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'ai_voice_chatbot', 'title' => 'AI Voice Chatbot', 'short_desc' => 'ASR/TTS voice bot', 'category' => 'Messaging & Chatbots', 'is_paid' => 1, 'price' => 69.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'ai_website_chatbot', 'title' => 'AI Website Chatbot', 'short_desc' => 'Site embedded bot', 'category' => 'Messaging & Chatbots', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'google_sheet_automation', 'title' => 'Google Sheet Automation', 'short_desc' => 'Sheets workflows', 'category' => 'CRM & Automation', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'whatsapp_chatbot_buttons', 'title' => 'WhatsApp Chatbot With Button', 'short_desc' => 'Interactive buttons', 'category' => 'Messaging & Chatbots', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'wa_multi_account_manager', 'title' => 'WA 50 Account Manager On Single Window', 'short_desc' => 'Multi-account panel', 'category' => 'Messaging & Chatbots', 'is_paid' => 1, 'price' => 89.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'auto_email_followup', 'title' => 'Auto Email Follow Up', 'short_desc' => 'Drip campaigns', 'category' => 'CRM & Automation', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'auto_sms_followup', 'title' => 'Auto SMS Follow Up', 'short_desc' => 'SMS sequences', 'category' => 'CRM & Automation', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'social_comment_automation', 'title' => 'Social Media Comment Automation', 'short_desc' => 'Auto replies and funnels', 'category' => 'CRM & Automation', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'auto_subscriber_management', 'title' => 'Auto Subscriber Management', 'short_desc' => 'Lists & segmentation', 'category' => 'CRM & Automation', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'digital_marketing_ai', 'title' => 'Digital Marketing AI', 'short_desc' => 'Copy & targeting', 'category' => 'Calls & Sales', 'is_paid' => 1, 'price' => 59.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'ppc_ads_ai', 'title' => 'Pay-Per-Click ads AI', 'short_desc' => 'Bidding & keywords', 'category' => 'Calls & Sales', 'is_paid' => 1, 'price' => 59.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'ai_outbound_call', 'title' => 'AI Outbound Call', 'short_desc' => 'Auto dialing', 'category' => 'Calls & Sales', 'is_paid' => 1, 'price' => 49.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'ai_inbound_call', 'title' => 'AI Inbound Call', 'short_desc' => 'Smart routing', 'category' => 'Calls & Sales', 'is_paid' => 1, 'price' => 49.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'ai_followup_call', 'title' => 'AI Follow-Up Call', 'short_desc' => 'Scheduled calls', 'category' => 'Calls & Sales', 'is_paid' => 0, 'price' => 0.00, 'requires_license' => 0, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'custom_ai_development', 'title' => 'Customize Artificial Intelligence Development', 'short_desc' => 'Bespoke AI solutions', 'category' => 'CRM & Automation', 'is_paid' => 1, 'price' => 199.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'ai_business_automation', 'title' => 'AI Business Automation', 'short_desc' => 'Workflow orchestration', 'category' => 'CRM & Automation', 'is_paid' => 1, 'price' => 129.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'ai_business_consultant', 'title' => 'AI Business Consultant', 'short_desc' => 'Strategy advisory', 'category' => 'Calls & Sales', 'is_paid' => 1, 'price' => 149.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'dedicated_account_manager', 'title' => 'Dedicated Account Manager to Manage Software', 'short_desc' => 'Managed services', 'category' => 'Calls & Sales', 'is_paid' => 1, 'price' => 99.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
$CI->db->insert('perfex_ai_features', ['key_name' => 'ai_white_label_resellership', 'title' => 'AI White Label Resellership', 'short_desc' => 'White-label dashboards', 'category' => 'Calls & Sales', 'is_paid' => 1, 'price' => 299.00, 'requires_license' => 1, 'enabled' => 1, 'created_at' => date('Y-m-d H:i:s')]);
