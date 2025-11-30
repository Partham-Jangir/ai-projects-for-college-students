<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<div class="panel_s">
  <div class="panel-body">
    <h4><?php echo _l('perfex_ai_suite_marketplace'); ?></h4>
    <div class="row">
      <?php foreach ($features as $f) { ?>
        <div class="col-md-4">
          <div class="panel panel-default">
            <div class="panel-heading">
              <strong><?php echo htmlspecialchars($f['title']); ?></strong>
            </div>
            <div class="panel-body">
              <p><?php echo htmlspecialchars($f['short_desc']); ?></p>
              <p>
                <span class="label label-<?php echo (int)$f['is_paid'] === 1 ? 'warning' : 'success'; ?>">
                  <?php echo (int)$f['is_paid'] === 1 ? _l('perfex_ai_suite_paid') : _l('perfex_ai_suite_free'); ?>
                </span>
                <?php if ((int)$f['is_paid'] === 1) { ?>
                  <span class="label label-info">$<?php echo number_format((float)$f['price'], 2); ?></span>
                <?php } ?>
              </p>
              <p><span class="label label-default"><?php echo htmlspecialchars($f['category']); ?></span></p>
              <div>
                <?php if ((int)$f['enabled'] === 1) { ?>
                  <a class="btn btn-default" href="#" disabled><?php echo _l('active'); ?></a>
                <?php } else { ?>
                  <a class="btn btn-primary" href="<?php echo admin_url('perfex_ai_admin/activate/' . $f['key_name']); ?>"><?php echo _l('perfex_ai_suite_activate'); ?></a>
                <?php } ?>
                <?php if ((int)$f['is_paid'] === 1 && (int)$f['requires_license'] === 1) { ?>
                  <a class="btn btn-info" href="<?php echo admin_url('perfex_ai_admin/license/' . $f['key_name']); ?>"><?php echo _l('perfex_ai_suite_license'); ?></a>
                <?php } ?>
              </div>
            </div>
          </div>
        </div>
      <?php } ?>
    </div>
  </div>
}</div>
