<?php

//application initialization files inclusion
include_once "../dist/utils/ut_gs_init.php";
include_once '../objects/ob_fw_role.php';

//initialize class object
$catalog = new Catalog($db);

//set public class variables 

//read json data posted by ajax call
$data = json_decode(file_get_contents("php://input"));

//set public class variables 

$catalog->role_code = $data->role_code;
$catalog->role_name = $data->role_name;

//call database routine
$stmt = $catalog->write();
message_write($stmt, 1);  
  
?>