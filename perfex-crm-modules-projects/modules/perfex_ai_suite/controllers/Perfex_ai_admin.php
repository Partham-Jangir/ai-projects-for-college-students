<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Perfex_ai_admin extends AdminController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('perfex_ai_suite/Ai_settings_model');
        $this->load->model('perfex_ai_suite/Ai_feature_model');
        $this->load->library('perfex_ai_suite/PerfexAiLogger');
        $this->load->library('perfex_ai_suite/PerfexAiSuite');
    }

    public function index()
    {
        $data['title'] = _l('perfex_ai_suite_menu');
        $data['features'] = $this->Ai_feature_model->get_all();
        $this->load->view('perfex_ai_suite/admin/dashboard', $data);
    }

    public function settings()
    {
        if ($this->input->post()) {
            $pairs = $this->input->post();
            foreach ($pairs as $name => $value) {
                $this->Ai_settings_model->set($name, $value);
            }
            set_alert('success', _l('updated_successfully'));
            redirect(admin_url('perfex_ai_admin/settings'));
        }
        $data['title'] = _l('perfex_ai_suite_settings');
        $data['settings'] = $this->Ai_settings_model->get_all();
        $this->load->view('perfex_ai_suite/admin/settings', $data);
    }

    public function toggle_feature($key)
    {
        $enabled = (int)$this->input->get('enabled');
        $this->Ai_feature_model->toggle($key, $enabled);
        set_alert('success', _l('updated_successfully'));
        redirect(admin_url('perfex_ai_admin'));
    }

    public function marketplace()
    {
        $data['title'] = _l('perfex_ai_suite_marketplace');
        $data['features'] = $this->Ai_feature_model->get_all();
        $this->load->view('perfex_ai_suite/admin/marketplace', $data);
    }

    public function activate($key)
    {
        $feature = $this->db->get_where('perfex_ai_features', ['key_name' => $key])->row_array();
        if (!$feature) {
            set_alert('danger', _l('perfex_ai_suite_not_found'));
            redirect(admin_url('perfex_ai_admin/marketplace'));
        }
        if ((int)$feature['is_paid'] === 1 && (int)$feature['requires_license'] === 1) {
            $this->load->model('perfex_ai_suite/Ai_license_model');
            $license = $this->Ai_license_model->get_by_feature($key);
            if (!$license || $license['status'] !== 'active') {
                set_alert('warning', _l('perfex_ai_suite_license_required'));
                redirect(admin_url('perfex_ai_admin/license/' . $key));
                return;
            }
        }
        $this->Ai_feature_model->toggle($key, 1);
        set_alert('success', _l('updated_successfully'));
        redirect(admin_url('perfex_ai_admin/marketplace'));
    }

    public function license($key)
    {
        $this->load->model('perfex_ai_suite/Ai_license_model');
        if ($this->input->post()) {
            $license_key = $this->input->post('license_key');
            if ($this->Ai_license_model->verify($key, $license_key)) {
                $this->Ai_license_model->set($key, $license_key, 'active');
                set_alert('success', _l('perfex_ai_suite_license_saved'));
                redirect(admin_url('perfex_ai_admin/marketplace'));
            } else {
                set_alert('danger', _l('perfex_ai_suite_license_invalid'));
                redirect(admin_url('perfex_ai_admin/license/' . $key));
            }
            return;
        }
        $data['title'] = _l('perfex_ai_suite_license_title');
        $data['feature_key'] = $key;
        $this->load->view('perfex_ai_suite/admin/license', $data);
    }
}
