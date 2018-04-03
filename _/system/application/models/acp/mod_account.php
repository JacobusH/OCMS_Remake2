<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mod_account extends Model {

    function Mod_account()
    {
        parent::Model();
    }

	function dologin()
	{
		if(($this->input->post('uname') <> '') && ($this->input->post('pswd') <> ''))
		{
			$data = array(
						'uname' => $this->input->post('uname'),
						'pswd' => $this->encrypt->sha1($this->input->post('pswd')),
						'status' => '1'
					);
					
			//check db for valid user/pass pair

			$this->db->select('admin_id,fname,lname,present_visit_date');
			$query = $this->db->get_where('administrators', $data);

			if ($query->num_rows() > 0)
			{
				$row = $query->row();

				$datestring = "%Y-%m-%d %h:%i:00";
				$timestamp = time();
				$timezone = 'UP45';
				$daylight_saving = TRUE;

				$udata = array( 'present_visit_date' => mdate($datestring, gmt_to_local($timestamp, $timezone, $daylight_saving)),
								'last_visit_date' => $row->present_visit_date
							  );

				$this->db->update('administrators', $udata, array('admin_id' => $row->admin_id));
				
				$this->db->order_by("sortorder", "ASC");
				$qry = $this->db->get_where('administrator_roles', array('admin_id' => $row->admin_id));

				if ($qry->num_rows() > 0)
				{					
					$gblDirList      = array();
					$gblSList        = array();
					$gblAll          = array('//' => 'Y');
					$gblView         = array('//' => 'Y');
					$gblPublish      = array('//' => 'N');
					$gblAdd          = array('//' => 'N');
					$gblEdit         = array('//' => 'N');
					$gblTrash        = array('//' => 'N');

					foreach ($qry->result() as $roles_row)
					{
						if($roles_row->view == 'Y')
						{
							$gblDirList[$roles_row->module_name][] = $roles_row->file_name;
							$gblSList[$roles_row->module_name][] = $roles_row->file_name;
						}
						else
						{
							$gblSList[$roles_row->module_name][] = '';
						}						

						$gblAll[$roles_row->module_name.'/'.$roles_row->file_name] = $roles_row->all;
						$gblView[$roles_row->module_name.'/'.$roles_row->file_name] = $roles_row->view;
						$gblPublish[$roles_row->module_name.'/'.$roles_row->file_name] = $roles_row->publish;
						$gblAdd[$roles_row->module_name.'/'.$roles_row->file_name] = $roles_row->add;
						$gblEdit[$roles_row->module_name.'/'.$roles_row->file_name] = $roles_row->edit;
						$gblTrash[$roles_row->module_name.'/'.$roles_row->file_name] = $roles_row->trash;
					}
				}
				
				$sesdata = array(
					'gblAdminId'      => $row->admin_id,
					'gblDirList'      => $gblDirList,
					'gblSList'        => $gblSList,
					'gblAll'          => $gblAll,
					'gblView'         => $gblView,
					'gblPublish'      => $gblPublish,
					'gblAdd'          => $gblAdd,
					'gblEdit'         => $gblEdit,
					'gblTrash'        => $gblTrash,
                    'logged_in'       => TRUE
                );

				$this->session->set_userdata($sesdata);
				return TRUE;
			}
			else
			{
				setcookie("err", "Invalid username or password.", time()+2, '/');
				return FALSE;
			}
		}
		else
		{
			setcookie("err", "Invalid username or password.", time()+2, '/');
			return FALSE;
		}		
	}
	
	function changepassword()
	{
		if(($this->input->post('currpswd') <> '') && ($this->input->post('newpswd') <> '') && ($this->input->post('conpswd') <> '') && ($this->input->post('conpswd') == $this->input->post('newpswd')))
		{
			$this->db->where('pswd', $this->encrypt->sha1($this->input->post('currpswd')));
			$this->db->where('admin_id', $this->session->userdata('gblAdminId'));
			$cnt = $this->db->count_all_results('administrators');
			if($cnt > 0)
			{
				$data = array(
							'pswd'    => $this->encrypt->sha1($this->input->post('newpswd')), 
							'pswd_key' => $this->encrypt->encode($this->input->post('newpswd'))
						);

				$this->db->update('administrators', $data, array('admin_id' => $this->session->userdata('gblAdminId')));
				setcookie("err", 'Password changed successfully', time()+2, '/');
			}
			else
			{
				setcookie("err", 'Please enter valid details', time()+2, '/');
				return FALSE;
			}
		}
		else
		{
			setcookie("err", 'Please enter valid details', time()+2, '/');
			return FALSE;
		}
	}

}