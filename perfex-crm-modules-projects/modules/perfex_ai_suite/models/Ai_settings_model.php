<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Ai_settings_model extends CI_Model
{
    protected $table = 'perfex_ai_settings';

    public function get_all()
    {
        return $this->db->get($this->table)->result_array();
    }

    public function set($name, $value)
    {
        $exists = $this->db->get_where($this->table, ['name' => $name])->row();
        if ($exists) {
            $this->db->where('id', $exists->id)->update($this->table, ['value' => $value, 'updated_at' => date('Y-m-d H:i:s')]);
        } else {
            $this->db->insert($this->table, ['name' => $name, 'value' => $value, 'updated_at' => date('Y-m-d H:i:s')]);
        }
    }
}
