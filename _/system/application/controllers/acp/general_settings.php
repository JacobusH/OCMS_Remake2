<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class General_settings extends Controller {
	
	var $url       = ''; 
	var $qs        = '';
	var $pg        = 1;
	var $sortby    = '';
	var $disType   = 'ASC';
	var $limit     = 0;
	var $sType     = '';
	var $mod       = '';
	var $result    = '';
	var $t_cnt     = '';
	var $pg_cnt    = '';
	var $control   = '';

	function General_settings()
	{
		parent::Controller();
		$this->control = $this;
		$this->load->model($this->uri->slash_segment(1).'Mod_'.$this->uri->rsegment(1));
	}

	function _intialize()
	{
		$gblSList = $this->session->userdata('gblSList');

		if(($this->session->userdata('gblAdminId') == '') || (!in_array($this->uri->rsegment(2), @$gblSList[$this->uri->rsegment(1)])))
		{
			redirect(site_url($this->uri->slash_segment(1).'account/dologout'));
		}

		$this->url = $this->uri->rsegment(1).'/'.$this->uri->rsegment(2);		
		$this->qs  = $this->uri->ruri_to_assoc(1);

		foreach($this->qs as $key => $val)
		{
			$this->$key = $val;
		}

		$this->limit  = ($this->pg - 1) * $this->config->item('page_limit');
		$mod = 'Mod_'.$this->uri->rsegment(1);
		$this->mod = $mod;
		$this->sType = $this->input->post('sType');

		if($this->sType <> '')
		{
			$sType = $this->sType;
			$this->$mod->$sType($this->uri->rsegment(2));
			redirect(site_url($this->uri->segment_array()));
		}
	}

	
	function administrators()
	{
		$this->sortby  ='fname';

		$this->_intialize();

		$mod = $this->mod;

		$row = array('fname' => '', 'lname' => '', 'phone' => '', 'email' => '', 'uname' => '', 'pswd' => '', 'pswd_key' => '');

		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			$this->db->where('admin_id > ', 0);
			$this->t_cnt = $this->db->count_all_results('administrators');

			$this->pg_cnt = ($this->t_cnt  <> 0) ? ceil( $this->t_cnt / $this->config->item('page_limit') ) : 1;

			$this->result = $this->$mod->get_entries($this->uri->rsegment(2));
		}

		$data = array(
					'title'           => $this->uri->rsegment(2),
					'error'           => get_cookie('err'),	
					'actions'         => $this->navigation->actions(),
					'number_limit'    => $this->navigation->number_limit(1,$this->pg_cnt,1,$this->pg),		
					'left_navigation' => $this->navigation->left_navigation(),
					'paging'          => $this->navigation->paging($this->url, $this->pg_cnt, $this->pg, $this->sortby, $this->disType),		
					'result'          => $this->result,
					'row'             => $row
				);

		$this->load->view($this->uri->slash_segment(1).$this->url, $data);
	}

	function states()
	{
		$this->sortby  = 'state_name';
		$this->_intialize();
		$mod = $this->mod;

		$row = array('state_name' => '', 'state_code' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			$this->t_cnt = $this->db->count_all('states');

			$this->pg_cnt = ($this->t_cnt  <> 0) ? ceil( $this->t_cnt / $this->config->item('page_limit') ) : 1;

			$this->result = $this->$mod->get_entries($this->uri->rsegment(2));
		}

		$data = array(
					'title'           => $this->uri->rsegment(2),
					'error'           => get_cookie('err'),
					'actions'         => $this->navigation->actions(),
					'number_limit'    => $this->navigation->number_limit(1,$this->pg_cnt,1,$this->pg),
					'left_navigation' => $this->navigation->left_navigation(),
					'paging'          => $this->navigation->paging($this->url, $this->pg_cnt, $this->pg, $this->sortby, $this->disType),		
					'result'          => $this->result,
					'row'             => $row
				);

		$this->load->view($this->uri->slash_segment(1).$this->url, $data);
	}

	function _permissions($uid = '')
	{
		$mod = 'Mod_'.$this->uri->rsegment(1);
		
		$ares = $this->$mod->administrator_permissions();
		
		$dir_list = array();$str = '';$aall = array();$aview = array();$apublish = array();$aadd = array();$aedit = array();$atrash = array();$asort = array();$umodule = array();$uall = array();$uview = array();$upublish = array();$uadd = array();$uedit = array();$utrash = array();$tmpmod = '';

		foreach($ares as $aprow)
		{
			$dir_list[$aprow->module_name][] = $aprow->file_name;
			$aall[$aprow->module_name.'/'.$aprow->file_name]     = $aprow->all;
			$aview[$aprow->module_name.'/'.$aprow->file_name]    = $aprow->view;			
			$apublish[$aprow->module_name.'/'.$aprow->file_name] = $aprow->publish;
			$aadd[$aprow->module_name.'/'.$aprow->file_name]     = $aprow->add;
			$aedit[$aprow->module_name.'/'.$aprow->file_name]    = $aprow->edit;
			$atrash[$aprow->module_name.'/'.$aprow->file_name]   = $aprow->trash;
			$asort[$aprow->module_name.'/'.$aprow->file_name]    = $aprow->sortorder;

			$uall[$aprow->module_name.'/'.$aprow->file_name] = ($aprow->all == 'N') ? 'disabled' : '';
			$uview[$aprow->module_name.'/'.$aprow->file_name] = ($aprow->view == 'N') ? 'disabled' : '';
			$upublish[$aprow->module_name.'/'.$aprow->file_name] = 'disabled';
			$uadd[$aprow->module_name.'/'.$aprow->file_name]     = 'disabled';
			$uedit[$aprow->module_name.'/'.$aprow->file_name]    = 'disabled';
			$utrash[$aprow->module_name.'/'.$aprow->file_name]   = 'disabled';
		}

		$ures = $ares = $this->$mod->administrator_permissions($uid);

		foreach($ures as $uprow)
		{
			if((!in_array($uprow->module_name, $umodule)) && ($uprow->view == 'Y'))
			{
				$umodule[] = $uprow->module_name;
			}
			
			if($uprow->all == 'Y')
			{
				$uall[$uprow->module_name.'/'.$uprow->file_name] = 'checked';
			}

			if($uprow->view == 'Y')
			{
				$uview[$uprow->module_name.'/'.$uprow->file_name] = 'checked';
			}

			if($uprow->publish == 'Y')
			{
				$upublish[$uprow->module_name.'/'.$uprow->file_name] = 'checked';
			}
			else if(($uprow->publish == 'N') || ($uprow->publish == ''))
			{
				$upublish[$uprow->module_name.'/'.$uprow->file_name] = 'disabled';
			}

			if($uprow->add == 'Y')
			{
				$uadd[$uprow->module_name.'/'.$uprow->file_name] = 'checked';
			}
			else if(($uprow->add == 'N') || ($uprow->add == ''))
			{
				$uadd[$uprow->module_name.'/'.$uprow->file_name] = 'disabled';
			}

			if($uprow->edit == 'Y')
			{
				$uedit[$uprow->module_name.'/'.$uprow->file_name] = 'checked';
			}
			else if(($uprow->edit == 'N') || ($uprow->edit == ''))
			{
				$uedit[$uprow->module_name.'/'.$uprow->file_name] = 'disabled';
			}

			if($uprow->trash == 'Y')
			{
				$utrash[$uprow->module_name.'/'.$uprow->file_name] = 'checked';
			}
			else if(($uprow->trash == 'N') || ($uprow->trash == ''))
			{
				$utrash[$uprow->module_name.'/'.$uprow->file_name] = 'disabled';
			}
		}

		$str = '<table width="100%" border="0" cellspacing="5" cellpadding="0" class="even" style="border: #dfdfdf solid 1px;">';
			
			foreach($dir_list as $dir => $files)
			{
				if(@in_array($dir, @array_unique(@$umodule)))
				{
					$checked = 'checked';
					$tmpmod .= '@@@'.$dir;
				}
				else
				{
					$checked = '';						
				}

				$display = (@!in_array($dir, @array_unique(@$umodule))) ? "style='display: none;'" : '';
				
				$str .= '<tr>';
					$str .= '<td width="100%"><input type="checkbox" name="sections" id="sections" value="'.$dir.'" onclick="javascript: fnSections();" '.$checked.'><b>&nbsp;&nbsp;'.humanize($dir).'</b></td>';
				$str .= '</tr>';

				$str .= '<tr id="SUB_'.$dir.'" '.$display.'>';
					$str .= '<td width="100%" style="padding-left: 9px;"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="middle">';

						$str .= '<tr>';
							$str .= '<td width="30%" align="left">Section Name</td>';
							$str .= '<td width="20%" align="center">Allow/Deny All</td>';
							$str .= '<td width="10%" align="center">View</td>';
							$str .= '<td width="10%" align="center">Publish</td>';
							$str .= '<td width="10%" align="center">Add</td>';
							$str .= '<td width="10%" align="center">Edit</td>';
							$str .= '<td width="10%" align="center">Delete</td>';
						$str .= '</tr>';
					
						foreach($files as $file)
						{
							$str .= '<tr>';

								$str .= '<td align="left" height="22">'.humanize($file).'</td>';
						
								$str .= '<td align="center" height="22"><input type="checkbox" name="All_'.$dir.'/'.$file.'" id="All_'.$dir.'/'.$file.'" value="'.$aall[$dir.'/'.$file].'" onclick="javascript: fnCheckAllPermissions(\''.$dir.'/'.$file.'\');" '.$uall[$dir.'/'.$file].'></td>';

								$str .= '<td align="center" height="22"><input type="checkbox" name="View_'.$dir.'/'.$file.'" id="View_'.$dir.'/'.$file.'" value="'.$aview[$dir.'/'.$file].'" onclick="javascript: fnViewPermissions(\''.$dir.'/'.$file.'\');" '.$uview[$dir.'/'.$file].'></td>';

								$str .= '<td align="center" height="22"><input type="checkbox" name="Publish_'.$dir.'/'.$file.'" id="Publish_'.$dir.'/'.$file.'" value="'.$apublish[$dir.'/'.$file].'" onclick="javascript: fnPublishPermissions(\''.$dir.'/'.$file.'\');" '.$upublish[$dir.'/'.$file].'></td>';

								$str .= '<td align="center" height="22"><input type="checkbox" name="Add_'.$dir.'/'.$file.'" id="Add_'.$dir.'/'.$file.'" value="'.$aadd[$dir.'/'.$file].'" onclick="javascript: fnAddPermissions(\''.$dir.'/'.$file.'\');" '.$uadd[$dir.'/'.$file].'></td>';

								$str .= '<td align="center" height="22"><input type="checkbox" name="Edit_'.$dir.'/'.$file.'" id="Edit_'.$dir.'/'.$file.'" value="'.$aedit[$dir.'/'.$file].'" onclick="javascript: fnEditPermissions(\''.$dir.'/'.$file.'\');" '.$uedit[$dir.'/'.$file].'></td>';
						
								$str .= '<td align="center" height="22"><input type="checkbox" name="Del_'.$dir.'/'.$file.'" id="Del_'.$dir.'/'.$file.'" value="'.$atrash[$dir.'/'.$file].'" onclick="javascript: fnDelPermissions(\''.$dir.'/'.$file.'\');" '.$utrash[$dir.'/'.$file].'>&nbsp;<input type="hidden" name="Sort_'.$dir.'/'.$file.'" id="Sort_'.$dir.'/'.$file.'" value="'.$asort[$dir.'/'.$file].'"></td>';

							$str .= '</tr>';
						}

					$str .= '</table></td>';

				$str .= '</tr>';
			}
			
		$str .= '</table><br />';
		
		$str .= '<input type="hidden" name="mainsections" id="mainsections" value="'.substr($tmpmod, 3).'">';

		return $str;
	}

	function validate_administrator()
	{
		$cnt = $this->Mod_general_settings->validate_administrator(get_cookie('uname'));
		echo ($cnt == 0) ? 'Y' : 'N';
	}

}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */