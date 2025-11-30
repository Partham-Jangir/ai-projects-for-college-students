<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<div class="panel_s">
  <div class="panel-body">
    <h4><?php echo _l('perfex_ai_suite_license_title'); ?>: <?php echo htmlspecialchars($feature_key); ?></h4>
    <form method="post">
      <div class="form-group">
        <label><?php echo _l('perfex_ai_suite_license_key'); ?></label>
        <input type="text" name="license_key" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary"><?php echo _l('perfex_ai_suite_save'); ?></button>
      <a href="<?php echo admin_url('perfex_ai_admin/marketplace'); ?>" class="btn btn-default"><?php echo _l('back'); ?></a>
    </form>
  </div>
}</div>
