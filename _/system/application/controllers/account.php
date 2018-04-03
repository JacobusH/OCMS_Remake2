<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Account extends Controller {

	var $control	= '';
	var $cnt		= '';
	var $pg_cnt		= '';
	var $qs			= '';
	var $skey		= '';
	var $skey_name	= '';

	function Account()
	{
		parent::Controller();
		$this->control = $this;
		$this->load->model('Mod_account');
		$this->load->model('Mod_content');

		$this->qs  = $this->uri->uri_to_assoc(1);
		foreach($this->qs as $key => $val)
		{
			$this->$key = $val;
		}
	}

	function index()
	{		
		redirect('login');
	}
		
	function invester_login()
	{	
		if(count($_POST) > 0 )
		{
			$result = $this->Mod_account->do_login();

			if($result > 0)
			{			
				redirect('account/myaccount');								
			}			
			else
			{
				$this->session->set_flashdata('send_msg','The username or password you entered is incorrect.');
				redirect($this->input->post('rpage'));
			}			
		}
		
	}

	function myaccount()
	{
		if($this->session->userdata('gblUserId') <> '')
		{
			$row = $this->Mod_content->get_menu($this->uri->segment(2));
			$content = $this->Mod_content->get_content($row['id']);
			
			$data = array(					
					'title' => $row['title'],
					'alias' => $row['alias'],					
					'bgimage' => $row['image'],
					'meta_title' => strip_slashes($row['meta_title']),
					'meta_keywords' => strip_slashes($row['meta_keywords']),
					'meta_desc' => strip_slashes($row['meta_desc']),
					'parent_id' => $row['parent_id'],
					'heading' => $content['title'],
					'description' => strip_slashes($content['description']),
					'display_login' => $content['display_login']
				);

			$this->load->view('myaccount', $data);	
		}
		else
		{
			redirect('login');
		}
	}

	function invester2()
	{
		if($this->session->userdata('gblUserId') <> '')
		{
			$row = $this->Mod_content->get_menu($this->uri->segment(2));
			$content = $this->Mod_content->get_content($row['id']);
			
			$data = array(					
					'title' => $row['title'],
					'alias' => $row['alias'],					
					'bgimage' => $row['image'],
					'meta_title' => strip_slashes($row['meta_title']),
					'meta_keywords' => strip_slashes($row['meta_keywords']),
					'meta_desc' => strip_slashes($row['meta_desc']),
					'parent_id' => $row['parent_id'],
					'heading' => $content['title'],
					'description' => strip_slashes($content['description']),
					'display_login' => $content['display_login']
				);

			$this->load->view('invester2', $data);	
		}
		else
		{
			redirect('login');
		}
	}

	function documents()
	{
		if($this->session->userdata('gblUserId') <> '')
		{
			$rows = $this->Mod_account->get_docs($this->uri->segment(3));
			$data['meta_keywords'] = 'documents';
			$data['meta_desc'] = 'documents';
			$data['meta_title'] = 'documents';
			if(count($rows) > 0)
			{
				$str = '';
				foreach($rows as $row)
				{
					$str .= '<li style="width: 440px;"><a href="'.site_url("account/download_file/$row->doc_id").'">'.$row->title.'</a></li>';
				}
				$data['documents'] = $str;
				$this->load->view('documents', $data);	
			}
			else
			{
				$data['documents'] = '<div style="text-align: center;color: red;height: 40px;padding: 20px;width: 400px;">No documents available to download</div>';
				$this->load->view('documents', $data);
			}			
		}
		else
		{
			$this->session->set_flashdata('send_msg','Your session has been expired. please login again.');
			redirect(base_url());
		}
	}

	function edit_profile()
	{
		if($this->session->userdata('gblUserId') <> '')
		{
			if(count($_POST) > 0)
			{
				$this->Mod_account->update_account_details();
				redirect('account/edit_profile');
			}

			$row = $this->Mod_content->get_content(humanize($this->uri->segment(1)));
			$details = $this->Mod_account->get_account_details();

			$data = array(
						'title'			=> $row['title'],
						'alias_name'	=> $row['alias_name'],
						'description'	=> $row['description'],
						'meta_title'	=> $row['meta_title'],
						'meta_keywords' => $row['meta_keywords'],
						'meta_desc'		=> $row['meta_desc'],
						'header_image'  => $row['header_image'],
						'parent_id'		=> $row['parent_id'],
						'content_id'	=> $row['content_id'],
						'details'       => $details
					);

			$this->load->view('edit_profile', $data);	
		}
		else
		{
			redirect(base_url());
		}
	}	

	function changepassword()
	{
		if($this->session->userdata('gblUserId') <> '')
		{
			if(count($_POST) > 0)
			{
				$this->Mod_account->update_login_details();
				redirect('account/changepassword');
			}

			$row = $this->Mod_content->get_content(humanize($this->uri->segment(1)));

			$data = array(
						'title'			=> $row['title'],
						'alias_name'	=> $row['alias_name'],
						'description'	=> $row['description'],
						'meta_title'	=> $row['meta_title'],
						'meta_keywords' => $row['meta_keywords'],
						'meta_desc'		=> $row['meta_desc'],
						'header_image'  => $row['header_image'],
						'parent_id'		=> $row['parent_id'],
						'content_id'	=> $row['content_id']
					);

			$this->load->view('changepassword', $data);	
		}
		else
		{
			redirect(base_url());
		}
	}
	
	function logout()
	{
		$sesdata = array(
						'gblUserId' => '',					
						'logged_in' => FALSE
					);

		$this->session->unset_userdata($sesdata);
		redirect('login');
	}

	function forgot_password()
	{
		$config['mailtype'] = 'html';
		$this->email->initialize($config);

		$email = $this->input->post('email');
		$row = $this->Mod_account->get_password($email);
		if(count($row) == 1){
			$this->email->from('info@liaas.com');				
			$this->email->to($email); 

			$strBody ="<p align='center'><b>Your Request for login details at Liaas</b></p>"; 
			$strBody .= "<table border='1' align='center' cellpadding='1' cellspacing='1' width='30%'><tr style='font-family: Verdana; font-size: 11px; font-style: normal; line-height: 16px; font-weight: normal; font-variant: normal; text-transform: none; color: #000000; text-decoration: none;'><td width='38%' align='center'> <div align='left'><strong>User Name:</strong></div></td><td width='62%' align='center'>".$row->uname."</td></tr>";

			$strBody .= "<tr style='font-family: Verdana; font-size: 11px; font-style: normal; line-height: 16px; font-weight: normal; font-variant: normal; text-transform: none; color: #000000; text-decoration: none;'><td align='center'><div align='left'><strong>Password:</strong></div></td><td align='center'>".$this->encrypt->decode($row->pswd_key)."</td></tr>";
			
			$this->email->subject('Liaas Login Details');
			$this->email->message($strBody);		
			@$this->email->send();

			$this->session->set_flashdata('send_msg','Your Password Has Been Sent To Your Email Address.');

			redirect('forgot_password');
		}
		else
		{
			$this->session->set_flashdata('send_msg','E-mail does not exist.');
			redirect('forgot_password');
		}		
	}

	function search()
	{		
		$row = $this->Mod_content->get_content(humanize($this->uri->segment(1)));		
		$data = array(
					'title'			=> $row['title'],
					'alias_name'	=> $row['alias_name'],
					'description'	=> $row['description'],
					'meta_title'	=> $row['meta_title'],
					'meta_keywords' => $row['meta_keywords'],
					'meta_desc'		=> $row['meta_desc'],
					'header_image'  => $row['header_image'],
					'parent_id'		=> $row['parent_id'],
					'content_id'	=> $row['content_id']
				);
		
		$res1 = $this->Mod_account->search_results($this->skey);
		
		//print_r($res1);
		//exit;
		$res3 = $this->Mod_account->search_by_name($this->skey_name);
		//print_r($res3);
		//exit;
		$res4 = array_merge($res1,$res3);
		$str = '';
		$res2 = array();
		$res2=array_unique($res4);
		//print_r($res2);
		//exit;
		if(count($res2) > 0)
		{
			foreach($res2 as $val)
			{
				
				$res = $this->Mod_account->search_by_id($val['member_id']);
				
				if(count($res) >0)
				{
					foreach($res as $value)
					{
						$str .= '<p><a href="'.site_url('account/member_details/'.$value['mem_id']).'">'.humanize($value['fname']).'&nbsp;&nbsp;'.$value['lname'].'</a></p>';
					}

					$data['search_results'] = $str;
				}
				else
				{
					$data['search_results'] = '<div style="text-align: center;color: red;height: 40px;padding-top: 20px;">No Results available to display</div>';
				}		
			}
		}
		else
		{
			$data['search_results'] = '<div style="text-align: center;color: red;height: 40px;padding-top: 20px;">No Results available to display</div>';
		}
		
		$this->load->view('search-results', $data);
	}

	function member_details()
	{
		$row = $this->Mod_content->get_content(humanize($this->uri->segment(1)));		
		
		$data = array(
					'title'			=> $row['title'],
					'alias_name'	=> $row['alias_name'],
					'description'	=> $row['description'],
					'meta_title'	=> $row['meta_title'],
					'meta_keywords' => $row['meta_keywords'],
					'meta_desc'		=> $row['meta_desc'],
					'header_image'  => $row['header_image'],
					'parent_id'		=> $row['parent_id'],
					'content_id'	=> $row['content_id']
				);

		$this->load->view('member_details', $data);	
		
	}
	
	function _member_details($m_id)
	{
		return $this->Mod_content->member_details($m_id);
	}	

	function upload_files()
	{		
		if($this->session->userdata('gblUserId') <> '')
		{
			$this->Mod_account->upload_file();
			redirect('account/upload_download_files');
		}
		else
		{
			redirect(base_url());
		}		
	}

	function download_file()
	{	if($this->session->userdata('gblUserId') <> '')
		{	
			$this->load->helper('download');
			$path='./uploads/';
			$row = $this->Mod_account->download_file($this->uri->segment(3));
			$data = file_get_contents($path.$row->file_name); // Read the file's contents
			force_download($row->file_name, $data); 
		}
		else
		{
			redirect(base_url());
		}
	}

	function download_files($name = '')
	{		
		$name= $this->uri->segment(4);
		$rows=$this->Mod_account->get_documents($name);
		if(count($rows) >0)
		{
		$str='';
		$str='<table class="menu-table3" cellspacing="2" cellpadding="0"><tbody><tr><td><h5>File Name</h5></td><td><h5>Download</h5></td><td><h5>File Name</h5></td><td><h5>Download</h5></td></tr><tr class="odd2">';
		$i=1;
		foreach ($rows as $row)
		{
			$str .= '<td style="text-align:left">'.$row->file_name.'</td><td><a href="'.site_url("account/download_file/$row->doc_id").'">Download</a></td>';
			$i++;
			if($i==3)
			{
				$str .='</tr><tr class="odd2">';
				$i=1; 
			}
		}
		$str .='</tbody></table>';
		$data['downloads'] = $str;
		
		}
		else
		{
			$data['downloads'] = '<div style="text-align: center;color: red;height: 40px;padding-top: 20px;">No documents available to download</div>';
			
		}
		$this->load->view('download_files', $data);
	}

	function upload_download_files()
	{
		if($this->session->userdata('gblUserId') <> '')
		{
			$row = $this->Mod_content->get_content(humanize($this->uri->segment(1)));

			$data = array(
						'title'			=> $row['title'],
						'alias_name'	=> $row['alias_name'],
						'description'	=> $row['description'],
						'meta_title'	=> $row['meta_title'],
						'meta_keywords' => $row['meta_keywords'],
						'meta_desc'		=> $row['meta_desc'],
						'header_image'  => $row['header_image'],
						'parent_id'		=> $row['parent_id'],
						'content_id'	=> $row['content_id']
					);

			$this->load->view('upload_download_files', $data);	
		}
		else
		{
			redirect(base_url());
		}
	}
	
	function paymembership_dues()
	{
		if($this->session->userdata('gblUserId') <> '')
		{
			$row = $this->Mod_content->get_content(humanize($this->uri->segment(1)));

			$row1 = $this->Mod_account->renewal_date();

			$data = array(
						'title'			=> $row['title'],
						'alias_name'	=> $row['alias_name'],
						'description'	=> $row['description'],
						'meta_title'	=> $row['meta_title'],
						'meta_keywords' => $row['meta_keywords'],
						'meta_desc'		=> $row['meta_desc'],
						'header_image'  => $row['header_image'],
						'parent_id'		=> $row['parent_id'],
						'content_id'	=> $row['content_id'],
						'renewal_date'  => $row1['date_diff'],
						'payment_status'=> $row1['payment_status']
					);

			$this->load->view('paymembership_dues', $data);	
		}
		else
		{
			redirect(base_url());
		}
	}

	function register_conference()
	{
		if($this->session->userdata('gblUserId') <> '')
		{
			$this->Mod_account->register_conference();
			redirect('account/register_for_conference');
		}
		else
		{
			redirect(base_url());
		}
	}

	function pay_dues()
	{
		if($this->session->userdata('gblUserId') <> '')
		{
			$this->Mod_account->pay_dues();

			redirect('account/paymembership_dues');
		}
		else
		{
			redirect(base_url());
		}

	}

	function get_practice_info($id = '')
	{
		return $this->Mod_account->get_practice_info($id);		
	}

	function remove_element()
	{
		$res=$this->Mod_account->remove_address($this->uri->segment(3));
		redirect('account/edit_profile');
	}

	function getGeo($val)
	{		
		$add=$this->Mod_account->get_address($val);

		echo '.';
		$venue = ($add['address'] <> '')? $add['address'] : $add['address2'];

		$address = urlencode($venue); 		$geocode=file_get_contents('http://maps.google.com/maps/api/geocode/json?address='.$address.'&sensor=false');
		$output= json_decode($geocode);	
		if($output->status <> 'ZERO_RESULTS'){
		$latitude = $output->results[0]->geometry->location->lat;
		$longitude = $output->results[0]->geometry->location->lng;
		$tot_add =  urldecode($address);

		
		
		echo "<div id='map' style='width:650px;height:545px;'></div>";?>
		
		<script src="http://maps.google.com/maps?file=api&v=1&key=ABQIAAAAECNm0dfnkM9hC2_q09I90hRwxHRPxoEXHIQ1DbfWLgUdAWKJ0RTlQjXnn-EU840AA0wS8Cm2oqvocg" type="text/javascript">		</script>
		
		<script type="text/javascript">
		var map = new GMap(document.getElementById('map'));	
		map.addControl(new GSmallMapControl());
		map.addControl(new GMapTypeControl());
		map.setCenter(new GLatLng(40, -100), 4);
		var point = new GPoint(<?=$longitude?>,<?=$latitude?>);
		var address = '<?=$tot_add?>';
		var mark = createInfoMarker(point, address);
		map.addOverlay(mark);
		function createInfoMarker(point, address) {
		var marker = new GMarker(point);
		map.centerAndZoom(point, 3);
		GEvent.addListener(marker, 'click', function() { marker.openInfoWindowHtml(address)});
		return marker;
		}
	</script>
	<?}else{ echo "<p align=center style=color:red;font-size:25px;>Address Not Found</p>";}
	}

	function cron()
	{
		$this->Mod_account->cron();
	}

}