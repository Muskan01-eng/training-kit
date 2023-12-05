//grid
// function showEmployee2() {
//   var json_url = 'api/ap_fw_employee.php';
//   var emp_html1=`<!-- Employee List -->`;

//   emp_html1 += getTitle();

//   emp_html1 += `
// 				<div class="row">
// 					<div class="col-lg-12">
// 						<div class="panel panel-default card-view pa-0">
// 							<div class="panel-wrapper collapse in">
// 								<div class="panel-body pa-0">
// 									<div class="contact-list">
// 										<div class="row">`;

//   emp_html1 += getPanel();

//   emp_html1 += `<div id="emp_data1"></div>`;
      
//   emp_html1 += `
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <!-- /Row -->`;  

//   $("#page-content").html(emp_html1);  
  
//   showEmpData2('X');
  
// }

//list
function showEmployee(op) {
  var json_url = 'api/ap_fw_employee.php';
  var emp_html=`<!-- Employee List -->`;

  emp_html += getTitle(op);

  emp_html += `
				<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default card-view pa-0">
							<div class="panel-wrapper collapse in">
								<div class="panel-body pa-0">
									<div class="contact-list">
										<div class="row">`;

  emp_html += getPanel();

  emp_html += `<div id="emp_data"></div>`;
      
  emp_html += `
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Row -->`;  

  $("#page-content").html(emp_html);  
  if(op=='1')
  {
    showEmpData('X');
  }
  else{
    showEmpData2('X');
  }
  
}

function getTitle(num) {
  
  var nu= num;
  if(nu=='1')
    nu='list';
  else
  nu='grid';
  var title_html = `
				<!-- Title -->
				<div class="row heading-bg">
					<div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
					  <h5 class="txt-dark">contact</h5>
					</div>
					<!-- Breadcrumb -->
					<div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
					  <ol class="breadcrumb">
						<li><a href="../index.php">employee</a></li>
						<li><a href="#"><span>`+nu+`</span> </a></li>
						<li class="active"><span>contact `+nu+`</span></li>
					  </ol>
					</div>
					<!-- /Breadcrumb -->
				</div>
				<!-- /Title -->`;
  
  return title_html;

}

function getPanel() {

  var panel_html = `
        <aside class="col-lg-2 col-md-4 pr-0">
          <div class="mt-20 mb-20 ml-15 mr-15">
            <a class="btn btn-success btn-block btn-add-contact">
            Add new contact
            </a>
          </div>`;
          
    panel_html += `
      <ul class="inbox-nav mb-30">
        <div id="roleLabel"></div>
      </ul>`;
      

  
      
     panel_html += `          
          <a class="txt-success create-label pa-15" href="javascript:void(0)"  data-toggle="modal" data-target="#myModal_1">+ Create New Role</a>
          <div id="myModal_1" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                  <h5 class="modal-title" id="myModalLabel">Add Role</h5>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label class="control-label mb-10">Role Code</label>
                      <input name="role-code" type="text" class="form-control" placeholder="Role Code">
                    </div>
                    <div class="form-group">
                      <label class="control-label mb-10">Role Name</label>
                      <input name="role-name" type="text" class="form-control" placeholder="Role Name">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-success waves-effect" id="save-role" data-dismiss="modal">Save</button>
                  <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Cancel</button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>
        </aside>
        `;
    showRoleLabel();
    
    return panel_html;

      
}




function showEmpData(rcode) {
  var json_url = 'api/ap_fw_employee.php?rcode='+rcode;
  var emp_no = 1;
  var emp_data;

  emp_data = `
    <aside class="col-lg-10 col-md-8 pl-0">
      <div class="panel pa-0">
      <div class="panel-wrapper collapse in">
      <div class="panel-body  pa-0">  
        <div class="table-responsive mb-30">
          <table id="datable_1" class="table  display table-hover mb-30" data-page-size="10">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joining date</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>  
            <tbody>`;
            
  $.getJSON(json_url, function(data){ 
    $.each(data.records, function(key, val) {

      var role_color = val.role == 'Chairman' ? 'danger' : val.role == 'Manager' ? 'primary' : val.role == 'Designer' ? 'warning' : val.role == 'Developer' ? 'info' : val.role == 'Hr' ? 'success' :'default';
      emp_data += `
            <tr>
              <td>`+emp_no+`</td>
              <td><a href="#">`+val.emp_name+`</a></td>
              <td>`+val.email+`</td>
              <td><span>`+val.phone+`</span></td>
              
              <td><span class="label label-`+role_color+`">`+val.role+`</span> </td>
              <td>`+val.doj+`</td>
              <td>`+val.salary+`</td>
              <td><a class="btn-update text-inverse pr-10" title="Edit" data-toggle="tooltip" id=`+val.emp_id+`><i class="zmdi zmdi-edit txt-warning"></i></a>
                  <a class="btn-delete text-inverse" title="Delete" data-toggle="tooltip" id=`+val.emp_id+`><i class="zmdi zmdi-delete txt-danger"></i></a>
              </td>
            </tr>`;
      
      emp_no = emp_no + 1;      

    });

    emp_data += `
                        </tbody>  
                      </table>    
                    </div>
                     </div>
                    </div>
                    </div>
                  </aside>`; 
    
    $("#emp_data").html(emp_data);

  });

}


//for grid view
function showEmpData2(rcode){
  var json_url = 'api/ap_fw_employee.php?rcode='+rcode;
  var emp_no = 1;
  var emp_data1;
  emp_data1 = `
        <aside class="col-lg-10 col-md-8 pl-0 mt-15">
        <div class="panel pa-0">
        <div class="panel-wrapper collapse in">
        <div class="panel-body  pa-0 ">`

        $.getJSON(json_url, function(data){ 
          $.each(data.records, function(key, val) {
      
            var role_color = val.role == 'Chairman' ? 'danger' : val.role == 'Manager' ? 'primary' : val.role == 'Designer' ? 'warning' : val.role == 'Developer' ? 'info' : val.role == 'Hr' ? 'success' :'primary';
            emp_data1 += `
						<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
							<div class="panel panel-`+role_color+` contact-card card-view mb-20 ">
								<div class="panel-heading">
									<div class="pull-left">
										<div class="pull-left  mr-15">
                     <span class="txt-light">`+emp_no+`</span>
										</div>
										<div class="pull-left user-detail-wrap">	
											<span class="block card-user-name txt-light">
                      `+val.emp_name+`
											</span>
											<span class="block card-user-desn">
                      `+val.role+`
											</span>
										</div>
									</div>
									<div class="pull-right">
										<a class="pull-left inline-block mr-15" href="#" title="Edit" id=`+val.emp_id+`>
											<i class="zmdi zmdi-edit txt-light"></i>
										</a>
										<a class="pull-left inline-block mr-15" href="#" title="Delete" id=`+val.emp_id+`>
											<i class="zmdi zmdi-delete txt-light"></i>
										</a>
									</div>
									<div class="clearfix"></div>
								</div>
								<div class="panel-wrapper collapse in">
									<div class="panel-body row">
										<div class="user-others-details pl-15 pr-15">
											<div class="mb-15">
												<i class="zmdi zmdi-email-open inline-block mr-10"></i>
												<span class="inline-block txt-dark">`+val.email+`</span>
											</div>
											<div class="mb-15">
												<i class="zmdi zmdi-smartphone inline-block mr-10"></i>
												<span class="inline-block txt-dark">`+val.phone+`</span>
											</div>
										</div>
										<div class="emp-detail pl-15 pr-15">
											<div class="mb-5">
												<span class="inline-block capitalize-font mr-5">joininig date:</span>
												<span class="txt-dark">`+val.doj+`</span>
											</div>
											<div>
												<span class="inline-block capitalize-font mr-5">salary:</span>
												<span class="txt-dark">`+val.salary+`</span>
											</div>
										</div>
									</div>
								</div>
                <hr  class="light-grey-hr  mb-20">
							</div>
						</div>`	;

            emp_no = emp_no + 1;      

          });

          emp_data1 += `
            </div>
            </div>	
            </div>
          </aside>`

$("#emp_data").html(emp_data1);
});
}
//grid view

//for rolelabel
function showRoleLabel() {
  var json_url = 'api/ap_fw_role_label.php';
  var role_html = `<!-- Role Lable List -->`;
  var active = 'active';
 
  
  $.getJSON(json_url, function(data){ 
    $.each(data.records, function(key, val) {
      
      var role_color = val.role_name == 'Chairman' ? 'danger' : val.role_name == 'Manager' ? 'primary' : val.role_name == 'Designer' ? 'warning' : val.role_name == 'Developer' ? 'info' : val.role_name == 'Hr' ? 'success' :'default';
    
      role_html += `
            <li class="`+active+`">
              <a class="role-list" rcode="`+val.role_code+`">`+val.role_name+`<span class="label label-`+role_color+` ml-10">`+val.role_count+`</span></a>
            </li>
            `;
      active = '';      
     });
    $("#roleLabel").html(role_html);
  });    

}

function manageRole() {

  var role_code = getFieldValue('role-code', 'myModal_1'); 
  var role_name = getFieldValue('role-name', 'myModal_1');
  
  
  $.ajax({
      url: 'api/ap_fw_role.php',
      type : "POST",
      contentType : 'application/json',
      dataType : 'json',
      data : JSON.stringify( { role_code: role_code
                             , role_name: role_name
                            
                             }
                           ),
      success : function(result) {
        $('#myModal_1').modal('hide'); 
        showEmployee();
      },
      error: function(xhr, status, error) {
        alert('Error');
      }
  });
  
}

