<?php
require_once '../common/init.php';

// ログイン情報の保存例
$_SESSION['user_id'] = $user_id;
$_SESSION['user_name'] = $user_name;

// カート情報の保存例
$_SESSION['cart'] = [
    'items' => [],
    'total' => 0
];
