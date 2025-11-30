<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<div class="panel_s">
  <div class="panel-body">
    <h4><?php echo _l('perfex_ai_suite_menu'); ?></h4>
    <table class="table">
      <thead>
        <tr>
          <th><?php echo _l('id'); ?></th>
          <th><?php echo _l('name'); ?></th>
          <th><?php echo _l('status'); ?></th>
          <th><?php echo _l('options'); ?></th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($features as $f) { ?>
          <tr>
            <td><?php echo htmlspecialchars($f['id']); ?></td>
            <td><?php echo htmlspecialchars($f['title']); ?></td>
            <td><?php echo (int)$f['enabled'] === 1 ? _l('active') : _l('inactive'); ?></td>
            <td>
              <a href="<?php echo admin_url('perfex_ai_admin/toggle_feature/' . $f['key_name'] . '?enabled=' . ((int)$f['enabled'] === 1 ? 0 : 1)); ?>" class="btn btn-primary">
                <?php echo (int)$f['enabled'] === 1 ? _l('disable') : _l('enable'); ?>
              </a>
            </td>
          </tr>
        <?php } ?>
      </tbody>
    </table>
  </div>
}</div>
