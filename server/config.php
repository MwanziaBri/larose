<?php
declare(strict_types=1);

/**
 * PDO Database Configuration
 * Update credentials before deploying
 */

$DB_HOST = "localhost";
$DB_NAME = "larozanature_laRoza";
$DB_USER = "larozanature_laRoza";
$DB_PASS = "63PtaqPR5ArtZccwnP2s";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO(
        "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        $options
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}
