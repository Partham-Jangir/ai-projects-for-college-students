<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Ai_feature_model extends CI_Model
{
    protected $table = 'perfex_ai_features';

    public function get_all()
    {
        return $this->db->get($this->table)->result_array();
    }

    public function toggle($key, $enabled)
    {
        $this->db->where('key_name', $key)->update($this->table, ['enabled' => (int)$enabled, 'updated_at' => date('Y-m-d H:i:s')]);
    }
}
