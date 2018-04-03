<?php

class Account extends Controller {

	function Account()
	{
		parent::Controller();
		$this->load->model($this->uri->slash_segment(1).'Mod_'.$this->uri->rsegment(1));
	}	

	function dologin(){
		$this->Mod_account->dologin();
		redirect($this->uri->segment(1));
	}

	function dologout(){
		$this->session->sess_destroy();
		redirect($this->uri->segment(1));
	}

	function changepassword()
	{
		if($this->session->userdata('gblAdminId') <> '')
		{
			if(count($_POST) > 0)
			{
				$this->Mod_account->changepassword();
				redirect(site_url($this->uri->segment_array()));
			}

			$str = '<link href="'.base_url().'styles/acp/styles.css'.'" rel="stylesheet" type="text/css" /></link>';
			$str .= '<form name="frmChangePassword" method="post">';
			$str .= '<table width="100%" border="0" cellspacing="2" cellpadding="2" style="margin-top: 10px;">';
				$str .= '<tr>';
					$str .= '<td width="100%" height="25" align="center" colspan="2" class="bold_txt" valign="top" style="color: red;">&nbsp;'.get_cookie('err').'</td>';
				$str .= '</tr>';
				$str .= '<tr>';
					$str .= '<td width="45%" height="25" align="right" class="normal_txt">Current Password : </td>';
					$str .= '<td width="55%" height="25"><input name="currpswd" type="password" class="form1"></td>';
				$str .= '</tr>';
				$str .= '<tr>';
					$str .= '<td height="25" align="right" class="normal_txt">New Passowrd : </td>';
					$str .= '<td height="25"><input name="newpswd" type="password" class="form1"></td>';
				$str .= '</tr>';
				$str .= '<tr>';
					$str .= '<td height="25" align="right" class="normal_txt">Confirm Password : </td>';
					$str .= '<td height="25"><input name="conpswd" type="password" class="form1"></td>';
				$str .= '</tr>';                
				$str .= '<tr>';
					$str .= '<td>&nbsp;</td>';
					$str .= '<td><input type="submit" name="Submit" value="Submit" class="button"></td>';
				$str .= '</tr>';
			$str .= '</table>';
			
			echo $str;
		}
		else
		{
			show_error('No direct script access allowed');
		}
		
	}

}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */