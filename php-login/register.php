<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

include 'db_config.php'; // เชื่อมต่อกับฐานข้อมูล

// รับข้อมูล JSON จากการร้องขอ
$data = json_decode(file_get_contents("php://input"));

// ตรวจสอบว่าข้อมูล JSON ถูกส่งเข้ามาและไม่ว่างเปล่า
if (isset($data->name) && isset($data->email) && isset($data->password)) {
    $name = mysqli_real_escape_string($db, $data->name);
    $email = mysqli_real_escape_string($db, $data->email);
    $password = password_hash($data->password, PASSWORD_DEFAULT);

    // Query เพื่อเพิ่มผู้ใช้ใหม่ในฐานข้อมูล
    $result = mysqli_query($db, "INSERT INTO user (name, email, password) VALUES ('$name', '$email', '$password')");

    if ($result) {
        echo json_encode(["success" => 1]);
    } else {
        echo json_encode(["success" => 0, "message" => "Registration failed."]);
    }
} else {
    // ส่งข้อความแจ้งข้อผิดพลาดหากไม่มีข้อมูล
    echo json_encode(["success" => 0, "message" => "Missing name, email, or password."]);
}
?>
