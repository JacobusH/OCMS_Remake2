<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends Controller {

	function Welcome()
	{
		parent::Controller();	
	}
	
	function index()
	{
		$data = array(
					'dologin' => site_url($this->uri->slash_segment(1).'account/dologin'),
					'error'   => get_cookie('err'),
					'actions'  => $this->navigation->actions(),
					'home_navigation' => $this->navigation->home_navigation()					
			    );		

		($this->session->userdata('gblAdminId') == '') ? $this->load->view($this->uri->slash_segment(1).'welcome', $data) : $this->load->view($this->uri->slash_segment(1).'home', $data);		
	}

}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */