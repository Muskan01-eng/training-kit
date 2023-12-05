
$(document).ready(function(){

  init(1);

  // show employee details 
  $(document).on('click', '.role-list', function(){
    var rcode = $(this).attr('rcode');
    showEmpData(rcode);
    setDataTable('#datable_1');
  });

  // show contact modal window 
  $(document).on('click', '.btn-add-contact, .btn-update', function(){
    var id = 0;
    var oper = 'I';

    if ($(this).is('.btn-update')) {
      id = $(this).attr('id');
      oper = 'U';
    }  

    var json_url = 'api/ap_fw_employee.php?id='+id;
    $.getJSON(json_url, function(data){
      modalAddContact(id, oper, data);
      $("#md-contact").modal({backdrop: 'static', keyboard: false});
    });  

  });

  $(document).on('click', '.btn-save-contact', function(){
    id = $(this).attr('id');
    oper = $(this).attr('oper');
    manageContact(id, oper);
  });


  //add role functionality
 $(document).on('click', '#save-role', function(){
  
  manageRole();
 });

             // email validation
 $(document).on('focusout', '#id-email', function(){
  var user = $(this).val();
  var pa = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!pa.test(user)){
    $(this).css('border-color', 'red');
    $('#error-block').css('color', 'red');
    $('#error-block').html('Please enter valid email.');
  }
  else{
    $(this).css('border-color', 'blue');
 
    $('#error-block').html.empty();
  }
 });


 //delete functionality of employee
 $(document).on('click', '.btn-delete', function(){
  alert("Are you sure?");
 
 });


 // Left menu action
  $(document).on('click', '.menu', function(){
    option = $(this).attr('option');
    if (option=='emp-list')
      init('1');
    else if (option=='emp-grid')
       init('2');
    else if (option=='social-campaign') 
      showSocialCampaigns(); 
    else if (option=='customer-support') 
      showCustomerSupport();
    else if (option=='yellow-card')
       showYellowCard();
  
  });
  
});  


function init(op) {
    if (op=='1')
    {
      showEmployee(op);
      setDataTable('#datable_1');
    }
  else
  {
    showEmployee(op);
  }
}


function setDataTable(table_id) {
    setTimeout(function() {
          $(table_id).DataTable()}, 500);  
}


function getFieldValue(field_name, modal_id) {
  field_val = $.trim($('#'+modal_id+' [name='+field_name+']').val());
  if(field_val == '')
    field_val =  $.trim($('[name='+field_name+']').val());
  return field_val;
}

function getSalaryFun(amount){
  
  return Intl.NumberFormat('en-IN', {
    style: 'currency',
     currency: 'INR', 
  }).format(amount);
}

