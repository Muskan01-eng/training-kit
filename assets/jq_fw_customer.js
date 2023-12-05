
function showCustomerSupport() {

  var customer_html=`<!-- Customer Support List -->`;

  customer_html += getCustomerTitle();

  customer_html += `
				<!-- Row -->
				<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default card-view panel-refresh">
							<div class="refresh-container">
								<div class="la-anim-1"></div>
							</div>
							<div class="panel-heading">
								<div class="pull-left">
									<h6 class="panel-title txt-dark">customer Support</h6>
								</div>
								<div class="pull-right">
									<a href="#" class="pull-left inline-block refresh mr-15">
										<i class="zmdi zmdi-replay"></i>
									</a>
									<a href="#" class="pull-left inline-block full-screen mr-15">
										<i class="zmdi zmdi-fullscreen"></i>
									</a>
									<div class="pull-left inline-block dropdown">
										<a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i class="zmdi zmdi-more-vert"></i></a>
										<ul class="dropdown-menu bullet dropdown-menu-right"  role="menu">
											<li role="presentation"><a href="javascript:void(0)" role="menuitem"><i class="icon wb-reply" aria-hidden="true"></i>Edit</a></li>
											<li role="presentation"><a href="javascript:void(0)" role="menuitem"><i class="icon wb-share" aria-hidden="true"></i>Delete</a></li>
											<li role="presentation"><a href="javascript:void(0)" role="menuitem"><i class="icon wb-trash" aria-hidden="true"></i>New</a></li>
										</ul>
									</div>
								</div>
								<div class="clearfix"></div>
							</div>
							<div class="panel-wrapper collapse in">
								<div class="panel-body row pa-0">
									<div class="table-wrap">
										<div class="table-responsive">
                                            <div id='customer-data'></div>
										</div>
									</div>	
								</div>	
							</div>
						</div>
					</div>
				</div>
				<!-- Row -->
			 
  `;
 

  $("#page-content").html(customer_html);  
 
  getCustomerData();
  
}

function getCustomerTitle() {
  
  var title_html = `
				<!-- Title -->
				<div class="row heading-bg">
					<div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
					  <h5 class="txt-dark">Customer Support</h5>
					</div>
					<!-- Breadcrumb -->
					<div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
					  <ol class="breadcrumb">
						<li><a href="../index.php">Customer</a></li>
						<li><a href="#"><span>Support</span></a></li>
						<li class="active"><span>List</span></li>
					  </ol>
					</div>
					<!-- /Breadcrumb -->
				</div>
				<!-- /Title -->`;
  
  return title_html;

}

function getCustomerData() {
  var json_url = 'api/ap_fw_Customer.php';
  var cus_data_html=`<!-- Customer Support Data -->`;

  cus_data_html += `
      <table class="table table-hover mb-0">
        <thead>
          <tr>
            <th>Ticket_Id</th>
            <th>Customer</th>
            <th>Issue</th>
            <th>Issue_Date</th>
            <th>Active</th>
			
          </tr>
        </thead>
        <tbody>`;
                        
  $.getJSON(json_url, function(data){ 
    $.each(data.records, function(key, val) {
      
        
        var active_color = val.active == 'Done' ? 'primary' : 'default';
        cus_data_html += `
          <tr>
            <td><span class="txt-dark weight-500">`+val.ticket_id+`</span></td>
            <td><span class="txt-dark weight-500">`+val.customer+`</span></td>
           
            <td>
              <span class="txt-dark weight-500">`+val.issue+`</span>
            </td>
            <td>
              <span class="txt-dark weight-500">`+val.issue_date+`</span>
            </td>
            <td>
              <span class="label label-`+active_color+`">`+val.active+`</span>
            </td>
			
          </tr>
          `;

    }); 

  cus_data_html += `
                </tbody>
              </table>
  `;
  
  $("#customer-data").html(cus_data_html); 

  });
  
}