<?php
header('Content-Type: application/json');

// Configuration
$uploadDirPhotos = '../uploads/photos/';
$uploadDirVideos = '../uploads/videos/';
$jsonFile = '../data/gallery.json';
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov'];
$maxSize = 20 * 1024 * 1024; // 20 MB

// Create directories if they don't exist
if (!is_dir($uploadDirPhotos)) mkdir($uploadDirPhotos, 0755, true);
if (!is_dir($uploadDirVideos)) mkdir($uploadDirVideos, 0755, true);

// Check request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Check if files were uploaded
if (!isset($_FILES['files'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No files uploaded']);
    exit;
}

$files = $_FILES['files'];
$count = count($files['name']);
$uploadedFiles = [];
$errors = [];

// Load existing data
$currentData = [];
if (file_exists($jsonFile)) {
    $jsonContent = file_get_contents($jsonFile);
    $currentData = json_decode($jsonContent, true) ?? [];
}

// Process each file
for ($i = 0; $i < $count; $i++) {
    $fileName = $files['name'][$i];
    $fileTmpName = $files['tmp_name'][$i];
    $fileSize = $files['size'][$i];
    $fileError = $files['error'][$i];

    if ($fileError !== UPLOAD_ERR_OK) {
        $errors[] = "Error uploading file $fileName: Code $fileError";
        continue;
    }

    if ($fileSize > $maxSize) {
        $errors[] = "File $fileName exceeds the maximum size of 20MB";
        continue;
    }

    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    if (!in_array($fileExt, $allowedExtensions)) {
        $errors[] = "File type .$fileExt not allowed for file $fileName";
        continue;
    }

    // Determine type and destination
    $type = in_array($fileExt, ['mp4', 'mov']) ? 'video' : 'photo';
    $targetDir = ($type === 'video') ? $uploadDirVideos : $uploadDirPhotos;

    // Generate unique name
    $newFileName = uniqid() . '.' . $fileExt;
    $targetPath = $targetDir . $newFileName;
    $publicPath = 'uploads/' . ($type === 'video' ? 'videos/' : 'photos/') . $newFileName;

    if (move_uploaded_file($fileTmpName, $targetPath)) {
        $newItem = [
            'id' => uniqid(),
            'type' => $type,
            'src' => $publicPath,
            'original_name' => $fileName,
            'date' => date('Y-m-d H:i:s')
        ];
        $currentData[] = $newItem;
        $uploadedFiles[] = $newItem;
    } else {
        $errors[] = "Failed to move uploaded file $fileName";
    }
}

// Save updated data
if (!empty($uploadedFiles)) {
    // Sort by date desc (optional, but good for gallery)
    usort($currentData, function($a, $b) {
        return strtotime($b['date']) - strtotime($a['date']);
    });

    file_put_contents($jsonFile, json_encode($currentData, JSON_PRETTY_PRINT));
}

echo json_encode([
    'success' => true,
    'uploaded' => $uploadedFiles,
    'errors' => $errors
]);
