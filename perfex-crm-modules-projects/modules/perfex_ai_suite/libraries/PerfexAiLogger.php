<?php
defined('BASEPATH') or exit('No direct script access allowed');

class PerfexAiLogger
{
    protected $CI;

    public function __construct()
    {
        $this->CI = &get_instance();
    }

    public function log($level, $message, array $context = [])
    {
        $this->CI->db->insert('perfex_ai_logs', [
            'level' => $level,
            'message' => $message,
            'context' => json_encode($context),
            'created_at' => date('Y-m-d H:i:s')
        ]);
    }

    public function error($message, array $context = [])
    {
        $this->log('error', $message, $context);
    }

    public function info($message, array $context = [])
    {
        $this->log('info', $message, $context);
    }
}
