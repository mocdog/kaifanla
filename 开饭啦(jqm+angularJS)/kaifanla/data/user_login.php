<?php
/*
* 该php页面用于main.html
* 用于用户登录
*/
 $output = [];
$uname = $_REQUEST['uname'];
$upwd =  $_REQUEST['upwd'];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'kaifanla');
$sql = 'SET  NAMES  UTF8';
mysqli_query($conn, $sql);
$sql = "SELECT uname,uid,utel FROM kf_user where uname = '$uname' AND upwd = '$upwd'";
$result = mysqli_query($conn, $sql);

if($result){//如果有结果集 则登录成功 返回 用户名及成功状态
   while( ($row=mysqli_fetch_assoc($result))!== NULL ){
      $output[] = $row;
   }
}else{// 否则 则登录失败 返回 登录失败
    $output["status"] = "fail";
}
echo json_encode($output);
?>