<?php
use PHPUnit\Framework\TestCase;

final class AiSuiteTest extends TestCase
{
    public function testUnknownFeature()
    {
        $lib = new PerfexAiSuite();
        $res = $lib->execute('invalid', []);
        $this->assertArrayHasKey('unknown', $res);
    }
}
