<?php
header('Content-Type: application/json');

$jsonFile = '../data/gallery.json';

if (file_exists($jsonFile)) {
    $content = file_get_contents($jsonFile);
    // If empty, return empty array
    if (empty($content)) {
        echo json_encode([]);
    } else {
        echo $content;
    }
} else {
    echo json_encode([]);
}
