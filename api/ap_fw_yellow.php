<?php

//application initialization files inclusion
include_once "../dist/utils/ut_gs_init.php";
include_once '../objects/ob_fw_yellow.php';

//initialize class object
$yellow = new Yellow($db);

//read parameter value from url

//set public class variables 

//call database routine
$stmt = $yellow->read();
//total number of records returing by query 
$num = $stmt->rowCount();  

//if query has record set, read and store into php array to read by jquery.
if($num>0){
  $yellow_arr=array();                                    // 1-D array created
  $yellow_arr['records']=array();                         // 2-D array created
  // retrieve our table contents
  // fetch() is faster than fetchAll()
  // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // extract row
    extract($row);
    $yellow_item=array(
        'employee_id' => $employee_id,
        'name' => $name,
        'reason' => $reason,
        'date' => $date,
        'status' => $status,

      );
    array_push($status_arr['records'], $status_item);
  }
  //closing records fetching query  
  $stmt->closeCursor();
}

//Return status message to caller
message_read($num, $status_arr);  
  



