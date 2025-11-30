<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<div class="panel_s">
  <div class="panel-body">
    <h4><?php echo _l('perfex_ai_suite_settings'); ?></h4>
    <form method="post">
      <div class="form-group">
        <label>OpenAI API Key</label>
        <input type="text" name="openai_api_key" class="form-control" />
      </div>
      <div class="form-group">
        <label>WhatsApp Token</label>
        <input type="text" name="whatsapp_token" class="form-control" />
      </div>
      <div class="form-group">
        <label>Default Language</label>
        <input type="text" name="default_lang" class="form-control" value="english" />
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
}</div>
