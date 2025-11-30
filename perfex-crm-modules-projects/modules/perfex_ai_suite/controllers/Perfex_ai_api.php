<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Perfex_ai_api extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('perfex_ai_suite/Ai_feature_model');
        $this->load->model('perfex_ai_suite/Ai_settings_model');
        $this->load->library('perfex_ai_suite/PerfexAiSuite');
        $this->load->library('perfex_ai_suite/PerfexAiLogger');
        header('Content-Type: application/json');
    }

    public function features()
    {
        if (!is_staff_logged_in() && !$this->input->get('public')) {
            $this->output->set_status_header(403);
            echo json_encode(['error' => 'forbidden']);
            return;
        }
        echo json_encode($this->Ai_feature_model->get_all());
    }

    public function settings()
    {
        if (!is_staff_logged_in()) {
            $this->output->set_status_header(403);
            echo json_encode(['error' => 'forbidden']);
            return;
        }
        echo json_encode($this->Ai_settings_model->get_all());
    }

    public function execute($feature)
    {
        $payload = json_decode($this->input->raw_input_stream, true);
        try {
            $result = $this->perfexaisuite->execute($feature, $payload ?: []);
            echo json_encode(['status' => 'ok', 'result' => $result]);
        } catch (Throwable $e) {
            $this->perfexailogger->error($e->getMessage(), ['feature' => $feature]);
            $this->output->set_status_header(500);
            echo json_encode(['error' => 'internal']);
        }
    }

    public function marketplace()
    {
        echo json_encode($this->Ai_feature_model->get_all());
    }

    public function activate($feature)
    {
        $row = $this->db->get_where('perfex_ai_features', ['key_name' => $feature])->row_array();
        if (!$row) {
            $this->output->set_status_header(404);
            echo json_encode(['error' => 'not_found']);
            return;
        }
        if ((int)$row['is_paid'] === 1 && (int)$row['requires_license'] === 1) {
            $this->load->model('perfex_ai_suite/Ai_license_model');
            $license = $this->Ai_license_model->get_by_feature($feature);
            if (!$license || $license['status'] !== 'active') {
                $this->output->set_status_header(402);
                echo json_encode(['error' => 'license_required']);
                return;
            }
        }
        $this->Ai_feature_model->toggle($feature, 1);
        echo json_encode(['status' => 'ok']);
    }

    public function license($feature)
    {
        $payload = json_decode($this->input->raw_input_stream, true);
        $key = isset($payload['license_key']) ? $payload['license_key'] : '';
        $this->load->model('perfex_ai_suite/Ai_license_model');
        if ($this->Ai_license_model->verify($feature, $key)) {
            $this->Ai_license_model->set($feature, $key, 'active');
            echo json_encode(['status' => 'ok']);
        } else {
            $this->output->set_status_header(400);
            echo json_encode(['error' => 'invalid_license']);
        }
    }
}
