<?php
/*
* 该php页面用于myorder.html
* 获取客户端提交的电话号码，返回该号码对应的所有订单，
* 以JSON格式
*/
$output = [];
@$phone = $_REQUEST['phone'];
if(!$phone){
    echo '[]';
    return;
}

$conn = mysqli_connect('127.0.0.1', 'root', '', 'kaifanla');
$sql = 'SET  NAMES  UTF8';
mysqli_query($conn, $sql);
$sql = "SELECT oid,user_name,order_time,img_sm,kf_order.did FROM kf_order,kf_dish WHERE phone='$phone' AND kf_order.did=kf_dish.did  ORDER BY order_time DESC";
$result = mysqli_query($conn, $sql);
while( ($row=mysqli_fetch_assoc($result))!== NULL ){  //一行一行的读取数据
   $output[] = $row;
}

echo json_encode($output);
?>