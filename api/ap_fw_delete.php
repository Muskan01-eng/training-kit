<?php
include_once "../dist/utils/ut_gs_init.php";
include_once '../objects/ob_fw_contact.php';

$id = mysqli_real_escape_string($conn,$_GET['id']);
mysqli_query($conn,"DELETE FROM fw_employee WHERE id='$id'")or die(mysql_error());
echo "<script type='text/javascript'>alert('Deleted details!');document.location='ap_fw_employee.php'</script>";
?>