<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Headers: Origin, X-Requested-With,Content-Type, Accept');

include 'db_config.php'; // เชื่อมต่อกับฐานข้อมูล

// รับข้อมูล JSON จากการร้องขอ
$data = json_decode(file_get_contents("php://input"));

// ตรวจสอบว่าข้อมูลถูกส่งมาและไม่ว่างเปล่า
if (isset($data->email) && isset($data->password)) {
    $email = mysqli_real_escape_string($db, $data->email);
    $password = $data->password;

    // Query เพื่อดึงข้อมูลของผู้ใช้จากฐานข้อมูล
    $result = mysqli_query($db, "SELECT * FROM user WHERE email='$email'");

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $hashedPassword = $row['password'];

            // ตรวจสอบความถูกต้องของรหัสผ่าน
            if (password_verify($password, $hashedPassword)) {
                echo json_encode(["success" => 1, "Email" => $email]);
            } else {
                echo json_encode(["success" => 0, "message" => "Invalid credentials."]);
            }
        } else {
            echo json_encode(["success" => 0, "message" => "Invalid credentials."]);
        }
    } else {
        echo json_encode(["success" => 0, "message" => "Login failed."]);
    }
} else {
    echo json_encode(["success" => 0, "message" => "Missing email or password."]);
}
?>
