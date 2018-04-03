<?php

class Mod_account extends Model {

    function Mod_account()
    {
        parent::Model();
    }

	function do_login()
	{	
		$this->db->select('mem_id,uname,pswd,mem_type');
		$qry = $this->db->get_where('members', array('uname' => $this->input->post('uname'), 'pswd' => $this->encrypt->sha1($this->input->post('pswd')),'status' => '1'));

		if($qry->num_rows() > 0)
		{
			$row = $qry->row();

			$sesdata = array(
								'gblUserId'      => $row->mem_id,
								'gblTypeId'      => $row->mem_type,
								'logged_in'       => TRUE
                            );

			$this->session->set_userdata($sesdata);
			return TRUE;
		}
		else
		{
			return FALSE;
		}				
	}

	function get_docs($doc_type = '')
	{
		
		/*if($doc_type == 'quarterly_sold')
		{
			$arr = array('doc_type' => 'sold_properties', 'sold_type' => $doc_type);
			$this->db->where($arr);
		}
		elseif($doc_type == 'all_sold')
		{
			$this->db->where(array('doc_type' => 'sold_properties'));
			$this->db->or_where(array('sold_type' => $doc_type));
		}
		else
		{
			$this->db->where(array('doc_type' => $doc_type));

		}*/
                $this->db->order_by('sort_order');
		$this->db->where(array('doc_type' => $doc_type));
		return $this->db->get('uploads')->result();
	}
	function get_account_details()
	{
		$qry = $this->db->get_where('members', array('mem_id' => $this->session->userdata('gblUserId')));
		
		if($qry->num_rows() > 0)
		{
			return $qry->row_array();
		}
		else
		{
			return FALSE;
		}
	}

	function update_account_details()
	{
		$data = array( 
					'fname' => $this->input->post('fname'),
					'lname' => $this->input->post('lname'),
					'snapshot' => $this->input->post('snapshot'),
					'interest_areas' => $this->input->post('interest_areas'),
					'certifications' => $this->input->post('certifications'),
					
					'email' => $this->input->post('email'),
				);
		//$this->db->update('members', $data, array('mem_id' => $this->session->userdata('gblUserId')));
		//echo $this->input->post('theValue');
		//echo $this->input->post('practice_id2');
		//echo $this->input->post('rows');
		//echo $this->input->post('theValue');
		//exit;
		for($i=1;$i<=$this->input->post('theValue');$i++){
		$data1 = array(
					'member_id' => $this->session->userdata('gblUserId'),
					'insure_plans' => $this->input->post('insure_plans'.$i),
					'mon' => $this->input->post('mon'.$i),
					'tue' => $this->input->post('tue'.$i),
					'wed' => $this->input->post('wed'.$i),
					'thu' => $this->input->post('thu'.$i),
					'fri' => $this->input->post('fri'.$i),
					'sat' => $this->input->post('sat'.$i),
					'sun' => $this->input->post('sun'.$i),
					'address' => $this->input->post('address'.$i),
					'address2' => $this->input->post('address2'.$i),
					'city' => $this->input->post('city'.$i),
					'state' => $this->input->post('state'.$i),
					'phone' => $this->input->post('phone'.$i),
					'zip' => $this->input->post('zip'.$i));

				if(($this->input->post('rows')>0) && ($i<=$this->input->post('rows')))
				{
					$this->db->update('practice_addresses', $data1, array('practice_id' => $this->input->post('practice_id'.$i),'member_id' =>$this->session->userdata('gblUserId')));
				}
				else
				{
					$this->db->insert('practice_addresses',$data1);
				}
		}
			
		$this->session->set_flashdata('send_msg','Your details has been updated successfully.');
	}

	function update_login_details()
	{
		$this->db->select('mem_id');
		$qry = $this->db->get_where('members', array('mem_id' => $this->session->userdata('gblUserId'), 'pswd' => $this->encrypt->sha1($this->input->post('pwd'))));
		
		if($qry->num_rows() > 0)
		{
			$data = array( 
						'pswd' => $this->encrypt->sha1($this->input->post('npwd')),
						'pswd_key' => $this->encrypt->sha1($this->input->post('npwd'))						
					);

			$this->db->update('members', $data, array('mem_id' => $this->session->userdata('gblUserId')));
			$this->session->set_flashdata('send_msg','Your login details has been updated successfully.');
		}
		else
		{
			$this->session->set_flashdata('send_msg','Please enter valid details.');
		}
	}

	function get_password($eid)
	{
		$this->db->select('email,uname,pswd,pswd_key');
		$qry = $this->db->get_where('members',array('email' => $eid));
		
		if( $qry->num_rows() > 0 )
		{
			return $qry->row();
		}		
	}	

	function search_results($key ='')
	{

		$zipcodes = array();
		$row = $this->db->get_where('zip_codes',array('zipcode' => $key))->row_array();
		if(count($row) > 0)
		{
		$lat1 = $row['latitude'];
		$lon1 = $row['longitude'];
		$d = 25;				
		//earth's radius in miles
		$r = 3959;	

		$latN = rad2deg(asin(sin(deg2rad($lat1)) * cos($d / $r) + cos(deg2rad($lat1)) * sin($d / $r) * cos(deg2rad(0))));
		$latS = rad2deg(asin(sin(deg2rad($lat1)) * cos($d / $r) + cos(deg2rad($lat1)) * sin($d / $r) * cos(deg2rad(180))));
		$lonE = rad2deg(deg2rad($lon1) + atan2(sin(deg2rad(90)) * sin($d / $r) * cos(deg2rad($lat1)), cos($d / $r) - sin(deg2rad($lat1)) * sin(deg2rad($latN))));
		$lonW = rad2deg(deg2rad($lon1) + atan2(sin(deg2rad(270)) * sin($d / $r) * cos(deg2rad($lat1)), cos($d / $r) - sin(deg2rad($lat1)) * sin(deg2rad($latN))));

		$query = "SELECT zipcode FROM ".$this->db->dbprefix."zip_codes WHERE (latitude <= $latN AND latitude >= $latS AND longitude <= $lonE AND longitude >= $lonW) OR (latitude = $lat1 AND longitude = $lon1) AND city != '' ORDER BY state, city, latitude, longitude";

		$rows=$this->db->query($query)->result();
		foreach($rows as $row)
		{
			$zipcodes[] = $row->zipcode;
		}
		$this->db->select('member_id');
		$this->db->where_in($zipcodes);
		$array = array();
		$array = $this->db->get('practice_addresses')->result();
		foreach($array as $res)
		{
			$array1[] = $res->member_id;
		}
		return $array1;

		}
		else
		{
			return array();
		}
	}

	function search_by_id($key)
	{
		if($key <> '')
		{
			$this->db->where('mem_id', $key);
			$this->db->select('mem_id,fname,lname,address');
			return $this->db->get('members')->result_array();
		}
		else
		{
			return array();
		}

	}

	function search_by_name($name='')
	{
		if($name <> '')
		{
			
			$this->db->select('mem_id as member_id');
			$this->db->where('fname', $name);
			$array = $this->db->get('members')->result();
			$array1=array();
			foreach($array as $res)
			{
				$array1[] = $res->member_id;
			}
			return $array1;

		}
		else
		{
			return array();
		}
	}

	function upload_file()
	{
			$config['upload_path'] = './uploads/';
			$config['allowed_types'] = 'doc|docx|pdf|rtf';
			$config['max_size']	= '0';
			$config['max_width']  = '0';
			$config['max_height']  = '0';
			$this->load->library('upload', $config);
			$this->upload->initialize($config);
			if($this->upload->do_upload('file1'))
			{
				$data1=$this->upload->data();
				$data = array(
						'mem_id' => $this->session->userdata('gblUserId'),
						'file_name' => $data1['file_name']
				);

				$this->db->insert('uploads', $data); 
				$this->session->set_flashdata('send_msg','file uploaded successfully.');
			}
			else
			{
				$this->session->set_flashdata('send_msg',$this->upload->display_errors());
			}
	}

	function download_file($id)
	{
		return $this->db->get_where('uploads', array('doc_id' => $id))->row();
	}

	function get_vendors()
	{
		return $this->db->get('vendors')->result();
	}

	function get_documents($name = '')
	{
		if($name <> '')
		{
			$this->db->like('file_name', $name, 'both');
		}
		return $this->db->get('uploads')->result();

	}

	function register_for_conference()
	{
		$data = array( 
					'selected_con_id' => $this->input->post('selected_con_id'),
					'reg_type'	=> 2,
					'fname'		=> $this->input->post('fname'),
					'lname'		=> $this->input->post('lname'),
					'address'	=> $this->input->post('address'),
					'city'		=> $this->input->post('city'),
					'state'		=> $this->input->post('state'),
					'zip'		=> $this->input->post('zip'),
					'email'		=> $this->input->post('email'),
					'phone'		=> $this->input->post('phone'),
					'reg_date'	=>  Date('Y-m-d')

				);

		$this->db->insert('conf_registrations', $data);			$this->session->set_flashdata('send_msg','Your Conference Registration has successfully Submitted. Email confirmation will be sent to you shortly.');

		setcookie("err", '.', time()+10, '/');
	}

	function pay_dues()
	{
		$this->db->select('renuwal_date');
		$rdate = $this->db->get_where('membership_renewal_dates',array('mem_id' => $this->session->userdata('gblUserId')))->row_array();
		$next_rdate = strtotime(date("Y-m-d", strtotime($rdate['renuwal_date'])) . " +1 year");
		$renuwal_date= date('Y-m-d', $next_rdate);
		$data1= array('payment_status'	=>	'Paid',
					'paid_date'			=>	Date('Y-m-d'),
					'renuwal_date'		=>	$renuwal_date);
			$this->db->update('membership_renewal_dates', $data1, array('mem_id' => $this->session->userdata('gblUserId')));
		
		$row = $this->get_mail($this->session->userdata('gblUserId'));
		$name = humanize($row->fname).' '.humanize($row->lname);
		$XVAL ='';
		$CN = strlen($this->input->post("ccnum"));
		$SC = strlen($this->input->post("ccvcode"));
		for($i=1;$i<=($CN-4);$i++){$XVAL=$XVAL."X";}
		
		$CARDNUMBER = $XVAL.substr($this->input->post("ccnum"),($CN-4));

		$data = array( 
					'mem_id' => $this->session->userdata('gblUserId'),
					'mem_name' => $name,
					'card_type' => $this->input->post('cctype'),
					'name_on_card' => $this->input->post('ccname'),
					'card_no' => $CARDNUMBER,
					'cvv' => $this->input->post('ccv'),
					'exp_date' => $this->input->post('ccmonth'),
					'exp_year' => $this->input->post('ccyear'),
					'pay_amount' => $this->input->post('pay_amount'),
					'payment_date'		=> Date('Y-m-d')
					
				);
			
		$this->db->insert('membership_dues', $data);

		if($this->db->insert_id() <> '')
		{
			$to=$this->common->get_admin_email();
			$to_array = array();
			foreach($to as $val)
			{
				array_push($to_array,$val['email']);
			}
			$to1=array_unique($to_array);
			
			$this->load->library('email');
			$config['mailtype'] = 'html';
			$this->email->initialize($config);
			$this->email->from(strtolower($row->email));				
			$this->email->to(array_unique($to1)); 

			$strBody = "<table border='1' align='center' cellpadding='1' cellspacing='1' width='41%'><tr style='font-family: Verdana; font-size: 11px; font-style: normal; line-height: 16px; font-weight: normal; font-variant: normal; text-transform: none; color: #000000; text-decoration: none;'><td width='38%' align='center'> <div align='left'><strong>Name:</strong></div></td><td width='62%' align='center'>".$this->input->post("ccname")."</td></tr>";

			$strBody .= "<tr style='font-family: Verdana; font-size: 11px; font-style: normal; line-height: 16px; font-weight: normal; font-variant: normal; text-transform: none; color: #000000; text-decoration: none;'><td align='center'><div align='left'><strong>Amount:</strong></div></td><td align='center'>".$this->input->post("pay_amount")."</td></tr>";
			
			$strBody .= "<tr style='font-family: Verdana; font-size: 11px; font-style: normal; line-height: 16px; font-weight: normal; font-variant: normal; text-transform: none; color: #000000; text-decoration: none;'><td align='center'><div align='left'><strong>Paid on :</strong></div></td><td align='center'>".Date('Y-m-d')."</td></tr>";
			

			$this->email->subject($this->input->post("subject"));
			$this->email->message($strBody);
			@$this->email->send();

			$this->session->set_flashdata('send_msg','Your payment has been successfully submitted.');
			
		}

		
	}

	function get_mail($uid)
	{
		$this->db->select('fname,lname,email');
		return $this->db->get_where('members',array('mem_id' =>$uid ))->row();
	}
	
	function get_practice_info($id)
	{
		return $this->db->get_where('practice_addresses',array('member_id' => $id))->result();
	}

	function remove_address($pid)
	{
		$this->db->where('practice_id IN ('.$pid.')');
		$res=$this->db->delete('practice_addresses');
		$this->session->set_flashdata('send_msg','Address deleted successfully');
	}

	function get_address($id)
	{
		return $this->db->get_where('practice_addresses',array('practice_id' => $id))->row_array();
	}

	function renewal_date()
	{
		$row = $this->db->query("SELECT DATEDIFF(renuwal_date, CURRENT_DATE) AS date_diff, payment_status FROM ".$this->db->dbprefix."membership_renewal_dates WHERE mem_id = '".$this->session->userdata('gblUserId')."' ORDER BY renuwal_date DESC")->row_array();

		return $row;
	}

	function cron()
	{
		$mids = array();
		$qry = $this->db->query("SELECT mem_id FROM ".$this->db->dbprefix."membership_renewal_dates WHERE DATEDIFF(renuwal_date, CURRENT_DATE) <= 0 ");
		if($qry->num_rows() > 0)
		{
			foreach($qry->result() as $row)
			{
				$mids[] = $row->mem_id;
			}
			
			$this->db->where('mem_id IN ('.implode(',', $mids).')');
			$this->db->update('membership_renewal_dates', array('payment_status' => 'Not Paid'));
		}

	}
}