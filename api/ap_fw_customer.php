<?php

//application initialization files inclusion
include_once "../dist/utils/ut_gs_init.php";
include_once '../objects/ob_fw_customer.php';

//initialize class object
$customer = new Customer($db);

//read parameter value from url

//set public class variables 

//call database routine
$stmt = $customer->read();
//total number of records returing by query 
$num = $stmt->rowCount();  

//if query has record set, read and store into php array to read by jquery.
if($num>0){
  $customer_arr=array();                                    // 1-D array created
  $customer_arr['records']=array();                         // 2-D array created
  // retrieve our table contents
  // fetch() is faster than fetchAll()
  // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // extract row
    extract($row);
    $customer_item=array(
        'ticket_id' => $ticket_id,
        'customer' => $customer,
        'issue' => $issue,
        'issue_date' => $issue_date,
        'active' => $active,

      );
    array_push($customer_arr['records'], $customer_item);
  }
  //closing records fetching query  
  $stmt->closeCursor();
}

//Return status message to caller
message_read($num, $customer_arr);  
  



