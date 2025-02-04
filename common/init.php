<?php
// セッションを開始
session_start();

// セッションの有効期限を設定（例：2時間）
ini_set('session.gc_maxlifetime', 10800);
ini_set('session.cookie_lifetime', 10800);
