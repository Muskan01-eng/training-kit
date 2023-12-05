<?php

include_once '../dist/utils/ut_gs_connect.php';  

class Catalog{
 
  //local variables 
  private $conn;

  //class property variables
  
  public $role_code;
  public $role_name;

  //create PDO instance for a database connection 
  public function __construct($db){
    $this->conn = $db;
}

//database routine handler for query operation (read/write)
function write(){

  //calling database routine (stored procedure/function)
  $query = "CALL pr_fw_role
              ( :pi_role_code
              , :pi_role_name
              )";

              //prepare for exeuction of database routine
    $stmt = $this->conn->prepare( $query );

    //bind input/output parameters for database routine
    
    $stmt->bindParam(':pi_role_code', $this->role_code, PDO::PARAM_STR, 1);    
    $stmt->bindParam(':pi_role_name', $this->role_name, PDO::PARAM_STR, 64);

    //execute database routine
    $stmt->execute();

    //return execution status (true/false) to caller 
    return $stmt;

  }

}  