<?php
/*
* 该php页面用于detail.html
* 根据菜品编号向客户端返回某一道菜品详情，以JSON格式
*/
$output = [];
@$did = $_REQUEST['did'];
if(!$did){  //若客户端未提交菜品编号或编号为空
    echo '[]';
    return;
}

$conn = mysqli_connect('127.0.0.1', 'root', '', 'kaifanla');
$sql = 'SET  NAMES  UTF8';
mysqli_query($conn, $sql);
$sql = "SELECT did,name,price,img_lg,material,detail FROM kf_dish WHERE did=$did";
$result = mysqli_query($conn, $sql);
if( ($row=mysqli_fetch_assoc($result))!== NULL ){  //一行一行的读取数据
   $output[] = $row;
}

echo json_encode($output);
?>