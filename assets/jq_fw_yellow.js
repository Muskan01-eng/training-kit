
function showYellowCard() {

  var yellow_html=`<!-- Yellow card List -->`;

  yellow_html += getYellowTitle();

  yellow_html += `
				<!-- Row -->
				<div class="row">
					<div class="col-lg-12">
						<div class="panel panel-default card-view panel-refresh">
							<div class="refresh-container">
								<div class="la-anim-1"></div>
							</div>
							<div class="panel-heading">
								<div class="pull-left">
									<h6 class="panel-title txt-dark">yellow card</h6>
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
                                            <div id='yellow-data'></div>
										</div>
									</div>	
								</div>	
							</div>
						</div>
					</div>
					</div>
				<!-- Row -->
			 
  `;
 

  $("#page-content").html(yellow_html);  
 
  getYellowData();
  
}

function getYellowTitle() {
  
  var title_html = `
				<!-- Title -->
				<div class="row heading-bg">
					<div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
					  <h5 class="txt-dark">Yellow Card</h5>
					</div>
					<!-- Breadcrumb -->
					<div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
					  <ol class="breadcrumb">
						<li><a href="../index.php">Yellow</a></li>
						<li><a href="#"><span>Card</span></a></li>
						<li class="active"><span>List</span></li>
					  </ol>
					</div>
					<!-- /Breadcrumb -->
				</div>
				<!-- /Title -->`;
  
  return title_html;

}

function getYellowData() {
  var json_url = 'api/ap_fw_Yellow.php';
  var yel_data_html=`<!-- Yellow Card Data -->`;

  yel_data_html += `
      <table class="table table-hover mb-0">
        <thead>
          <tr>
            <th>Employee_Id</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Status</th>
			
          </tr>
        </thead>
        <tbody>`;
                        
  $.getJSON(json_url, function(data){ 
    $.each(data.records, function(key, val) {
      
        
        var status_color = val.status == 'Done' ? 'primary' : 'danger';
        yel_data_html += `
          <tr>
            <td><span class="txt-dark weight-500">`+val.employee_id+`</span></td>
            <td><span class="txt-dark weight-500">`+val.name+`</span></td>
           
            <td>
              <span class="txt-dark weight-500">`+val.reason+`</span>
            </td>
            <td>
              <span class="txt-dark weight-500">`+val.date+`</span>
            </td>
            <td>
              <span class="label label-`+status_color+`">`+val.status+`</span>
            </td>
			
          </tr>
          `;

    }); 

  yel_data_html += `
                </tbody>
              </table>
  `;
  
  $("#yellow-data").html(yel_data_html); 

  });
  
}