<?php

//application initialization files inclusion
include_once "../dist/utils/ut_gs_init.php";
include_once '../objects/ob_fw_social.php';

//initialize class object
$social = new Social($db);

//read parameter value from url

//set public class variables 

//call database routine
$stmt = $social->read();
//total number of records returing by query 
$num = $stmt->rowCount();  

//if query has record set, read and store into php array to read by jquery.
if($num>0){
  $social_arr=array();
  $social_arr['records']=array();
  // retrieve our table contents
  // fetch() is faster than fetchAll()
  // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // extract row
    extract($row);
    $social_item=array(
        'campaign' => $campaign,
        'client' => $client,
        'changes' => $changes,
        'budget' => $budget,
        'status' => $status,
      );
    array_push($social_arr['records'], $social_item);
  }
  //closing records fetching query  
  $stmt->closeCursor();
}

//Return status message to caller
message_read($num, $social_arr);  
  



