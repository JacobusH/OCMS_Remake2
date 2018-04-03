<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mod_general_settings extends Model {

    function Mod_general_settings()
    {
        parent::Model();
    }

	function get_entries($page)
	{
		switch ($page)
		{
			case 'administrators':
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('administrators', array('admin_id > ' => 0), $this->config->item('page_limit'), $this->limit)->result();
			break;

			case 'states':
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('states', array('state_id <> ' => '0'), $this->config->item('page_limit'), $this->limit)->result();
			break;
		}
	}

	function get_entry($page, $ID)
	{
		switch ($page)
		{
			case 'administrators':
				return $this->db->get_where('administrators', array('admin_id' => $ID))->row_array();
			break;

			case 'states':
				return $this->db->get_where('states', array('state_id' => $ID))->row_array();
			break;
		}
	}

	function Add($page)
	{
		switch ($page)
		{
			case 'administrators':
				$this->randno = $this->common->randno();

				$datestring = "%Y-%m-%d %h:%i:00";
				$timestamp = time();
				$timezone = 'UP45';
				$daylight_saving = TRUE;

				$data = array('admin_id' => $this->randno,						  
							  'fname' => $this->db->escape_str($this->input->post('fname')),
							  'lname' => $this->db->escape_str($this->input->post('lname')),
							  'phone' => $this->db->escape_str($this->input->post('phone')), 
							  'email' => $this->db->escape_str($this->input->post('email')),
							  'uname' => $this->db->escape_str($this->input->post('uname')), 
							  'pswd' => $this->db->escape_str($this->encrypt->sha1($this->input->post('pswd'))),
							  'pswd_key' => $this->db->escape_str($this->encrypt->encode($this->input->post('pswd'))),
							  'register_date' => $this->db->escape_str(date('Y-m-d')),
							  'present_visit_date' =>  $this->db->escape_str(mdate($datestring, gmt_to_local($timestamp, $timezone, $daylight_saving)))
							);
				
				$this->db->insert('administrators', $data); 

				$dir_list = array();

				$result = $this->administrator_permissions();

				foreach($result as $aprow)
				{
					$dir_list[$aprow->module_name][] = $aprow->file_name;
				}

				$arrmain = explode('@@@',$this->input->post('mainsections'));

				foreach($dir_list as $dir => $files)
				{
					if(in_array($dir, $arrmain))
					{
						foreach($files as $k => $file)
						{									
							if($this->input->post('View_'.$dir.'/'.$file) == 'Y')
							{
								$all = (($this->input->post('All_'.$dir.'/'.$file) == '') || (!in_array($dir, $arrmain))) ? 'N' : $this->input->post('All_'.$dir.'/'.$file);	
							
								$view = (($this->input->post('View_'.$dir.'/'.$file) == '') || (!in_array($dir, $arrmain))) ? 'N' : $this->input->post('View_'.$dir.'/'.$file);

								$publish = (($this->input->post('Publish_'.$dir.'/'.$file) == '') || (!in_array($dir, $arrmain))) ? 'N' : $this->input->post('Publish_'.$dir.'/'.$file);

								$add = (($this->input->post('Add_'.$dir.'/'.$file) == '') || (!in_array($dir, $arrmain))) ? 'N' : $this->input->post('Add_'.$dir.'/'.$file);

								$edit = (($this->input->post('Edit_'.$dir.'/'.$file) == '') || (!in_array($dir, $arrmain))) ? 'N' : $this->input->post('Edit_'.$dir.'/'.$file);

								$trash = (($this->input->post('Del_'.$dir.'/'.$file) == '') || (!in_array($dir, $arrmain))) ? 'N' : $this->input->post('Del_'.$dir.'/'.$file);		

								$data1 = array( 'admin_id' => $this->randno,
												'module_name' => $dir,
												'file_name' => $file,
												'all' => $all,
												'view' => $view,
												'publish' => $publish,
												'add' => $add,
												'edit' => $edit,
												'trash' => $trash,
												'sortorder' => $this->input->post('Sort_'.$dir.'/'.$file)
											  );

								$this->db->insert('administrator_roles', $data1);
							}									
						}						
					}						
				}

				setcookie("err", 'New administrator created successfully', time()+2, '/');
			break;

			case 'states':
				$data = array( 'state_name' => $this->input->post('state_name'),
								'state_code' => $this->input->post('state_code')
							  );
				$this->db->insert('states', $data);
				setcookie("err", 'New state created successfully', time()+2, '/');
			break;
		}		
	}

	function Edit($page)
	{
		switch ($page)
		{
			case 'administrators':				

				$data = array('fname'     => $this->input->post('fname'), 
							  'lname'     => $this->input->post('lname'), 
							  'phone'     => $this->input->post('phone'), 
							  'email'     => $this->input->post('email'),
							  'pswd'      => $this->encrypt->sha1($this->input->post('pswd')),
							  'pswd_key'  => $this->encrypt->encode($this->input->post('pswd'))
							);

				$this->db->update('administrators', $data, array('admin_id' => $this->input->post('UID')));

				if($this->input->post('UID') <> $this->session->userdata('gblAdminId'))
				{
					$this->db->where('admin_id = '.$this->input->post('UID'));
					$this->db->delete('administrator_roles'); 

					$dir_list = array();
					
					$result = $this->administrator_permissions();

					foreach($result as $aprow)
					{
						$dir_list[$aprow->module_name][] = $aprow->file_name;
					}

					$arrmain = explode('@@@',$this->input->post('mainsections'));

					foreach($dir_list as $dir => $files)
					{
						if(in_array($dir, $arrmain))
						{
							foreach($files as $k => $file)
							{										
								if($this->input->post('View_'.$dir.'/'.$file) == 'Y')
								{
									$all = (($this->input->post('All_'.$dir.'/'.$file) == '') || (!in_array($dir, $arrmain))) ? 'N' : $this->input->post('All_'.$dir.'/'.$file);	
								
									$view = (($this->input->post('View_'.$dir.'/'.$file) == '') || (!in_array($dir, $arrmain))) ? 'N' : $this->input->post('View_'.$dir.'/'.$file);

									$publish = (($this->input->post('Publish_'.$dir.'/'.$file) == '') || (!in_array($dir, $arrmain))) ? 'N' : $this->input->post('Publish_'.$dir.'/'.$file);

									$add = (($this->input->post('Add_'.$dir.'/'.$file) == '') || (!in_array($dir, $arrmain))) ? 'N' : $this->input->post('Add_'.$dir.'/'.$file);

									$edit = (($this->input->post('Edit_'.$dir.'/'.$file) == '') || (!in_array($dir, $arrmain))) ? 'N' : $this->input->post('Edit_'.$dir.'/'.$file);

									$trash = (($this->input->post('Del_'.$dir.'/'.$file) == '') || (!in_array($dir, $arrmain))) ? 'N' : $this->input->post('Del_'.$dir.'/'.$file);		

									$data1 = array(	'admin_id' => $this->input->post('UID'),
													'module_name' => $dir,
													'file_name' => $file,
													'all' => $all,
													'view' => $view,
													'publish' => $publish,
													'add' => $add,
													'edit' => $edit,
													'trash' => $trash,
													'sortorder' => $this->input->post('Sort_'.$dir.'/'.$file)
												  );

									$this->db->insert('administrator_roles', $data1);
								}										
							}							
						}							
					}
				}				

				setcookie("err", 'Selected administrator details updated successfully', time()+2, '/');
			break;

			case 'states':
				$data = array(	'state_name' => $this->input->post('state_name'),
								'state_code' => $this->input->post('state_code')
							  );
				$this->db->update('states', $data, array('state_id' => $this->input->post('UID')));
				setcookie("err", 'Selected state updated successfully', time()+2, '/');
			break;
		}		
	}

	function Del($page)
	{
		switch ($page)
		{
			case 'administrators':
				$arr = explode(',', $this->input->post('UID'));
				
				if(!in_array($this->session->userdata('gblAdminId'), $arr))
				{
					$this->db->where('admin_id IN ('.$this->input->post('UID').')');
					$this->db->delete('administrator_roles'); 
					$this->db->where('admin_id IN ('.$this->input->post('UID').')');
					$this->db->delete('administrators'); 

					setcookie("err", 'Selected administrator deleted successfully', time()+2, '/');
				}
				else
				{
					setcookie("err", 'You cannot delete your account', time()+2, '/');
				}				
			break;

			case 'states':
				$this->db->where('state_id IN ('.$this->input->post('UID').')');
				$this->db->delete('states'); 
				setcookie("err", 'Selected state deleted successfully', time()+2, '/');
			break;
		}		
	}

	function Publish($page)
	{
		switch ($page)
		{
			case 'administrators':				
				$arr = explode(',', $this->input->post('UID'));

				if(!in_array($this->session->userdata('gblAdminId'), $arr))
				{
					$data = array('status' => $this->input->post('status'));
					$this->db->where('admin_id IN ('.$this->input->post('UID').')');
					$this->db->update('administrators', $data); 
					setcookie("err", 'Selected administrator status changed successfully', time()+2, '/');
				}
				else
				{
					setcookie("err", 'You have no rights to activate or deactivate your account', time()+2, '/');
				}
			break;

			case 'states':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('state_id IN ('.$this->input->post('UID').')');
				$this->db->update('states', $data); 
				setcookie("err", 'Selected state status modified successfully', time()+2, '/');
			break;
		}		
	}	

	function administrator_permissions($uid = '-1')
	{
		$this->db->order_by("sortorder", "ASC");
		return $this->db->get_where('administrator_roles', array('admin_id' => $uid))->result();		
	}

	function validate_administrator($uname)
	{
		$this->db->where('uname', $uname);
		return $this->db->count_all_results('administrators');
	}

}