<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Ai_license_model extends CI_Model
{
    protected $table = 'perfex_ai_licenses';

    public function get_by_feature($feature_key)
    {
        return $this->db->get_where($this->table, ['feature_key' => $feature_key])->row_array();
    }

    public function set($feature_key, $license_key, $status = 'active', $meta = [])
    {
        $row = $this->get_by_feature($feature_key);
        $payload = [
            'feature_key' => $feature_key,
            'license_key' => $license_key,
            'status' => $status,
            'meta' => json_encode($meta),
            'updated_at' => date('Y-m-d H:i:s')
        ];
        if ($row) {
            $this->db->where('id', $row['id'])->update($this->table, $payload);
        } else {
            $payload['created_at'] = date('Y-m-d H:i:s');
            $this->db->insert($this->table, $payload);
        }
    }

    public function verify($feature_key, $license_key)
    {
        if (!$license_key) return false;
        return strlen($license_key) >= 16;
    }
}
