<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Members_management extends Controller {
	
	var $url        = ''; 
	var $qs         = '';
	var $pg         = 1;
	var $sortby     = '';
	var $disType    = 'ASC';
	var $limit      = 0;
	var $sType      = '';
	var $mod        = '';
	var $result     = '';
	var $t_cnt      = '';
	var $pg_cnt     = '';
	var $gblSList   = array();
	var $control    = '';
	var $pid       = '';
	var $mem_name	= '';
	var $cat		= 0;

	function Members_management()
	{
		parent::Controller();
		$this->control = $this;
		$this->load->model($this->uri->slash_segment(1).'Mod_'.$this->uri->rsegment(1));
	}

	/* 
		
	   This metnod is only for Admin Control Panel and it is used to Intialise the variables that were used through out your controller.

	   Do not modify this unless u need any changes. 
	   
	   If you create new controller please copy this method.
	   
	*/

	//STARTS

	function _intialize()
	{
		//$this->load->library('upload');

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

	// ENDS

    function members()
	{
		$this->sortby  = 'fname';
		$this->_intialize();
		$mod = $this->mod;

		$row = array('fname' => '', 'lname' => '','snapshot' => '','interest_areas' => '','certifications' => '','insure_plans' => '','mon' => '','tue' => '','wed' =>'','thu' => '','fri' => '','sat' => '','sun' =>'','address' => '','address2' => '', 'city' => '', 'state' => '', 'zip' => '', 'phone' => '', 'email' => '', 'uname' => '', 'pswd' => '','pswd_key'=> '', 'cat_id'=>'', 'register_date' => '', 'mem_type' => '');

		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
					
			$this->db->where('mem_id > ', 0);

			//$this->t_cnt = $this->db->count_all_results('members');
			$this->t_cnt = $this->db->count_all('members');
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
					'row'             => $row,
			        'model'			  => $this->$mod
				);

		$this->load->view($this->uri->slash_segment(1).$this->url, $data);
	}

	function monthly_updates()
	{
		$this->sortby  = 'sort_order';
		$this->pid = 0;
		$this->_intialize();
		$mod = $this->mod;

		$row = array('mem_id' => '', 'file_name' => '', 'title' => '', 'sort_order' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			$this->db->where('doc_type', 'monthly_updates');
		
			$this->t_cnt = $this->db->count_all_results('uploads');

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
	
	function current_properties()
	{
		$this->sortby  = 'sort_order';
		$this->pid = 0;
		$this->_intialize();
		$mod = $this->mod;

		$row = array('mem_id' => '', 'file_name' => '', 'title' => '', 'sort_order' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			$this->db->where('doc_type', 'current_properties');
		
			$this->t_cnt = $this->db->count_all_results('uploads');

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

	function sold_properties()
	{
		$this->sortby  = 'sort_order';
		$this->pid = 0;
		$this->_intialize();
		$mod = $this->mod;

		$row = array('doc_id' => '', 'file_name' => '', 'doc_type' => '', 'sold_type' => '', 'title' => '', 'sort_order' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			$this->db->where('doc_type', 'sold_properties');
		
			$this->t_cnt = $this->db->count_all_results('uploads');

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

	function financial_reports()
	{
		$this->sortby  = 'sort_order';
		$this->pid = 0;
		$this->_intialize();
		$mod = $this->mod;

		$row = array('mem_id' => '', 'file_name' => '', 'title' => '', 'sort_order' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			$this->db->where('doc_type', 'financial_reports');
		
			$this->t_cnt = $this->db->count_all_results('uploads');

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

	function current_notes_held()
	{
		$this->sortby  = 'sort_order';
		$this->pid = 0;
		$this->_intialize();
		$mod = $this->mod;

		$row = array('mem_id' => '', 'file_name' => '', 'title' => '', 'sort_order' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			
			$this->db->where('doc_type', 'current_notes_held');
		
			$this->t_cnt = $this->db->count_all_results('uploads');

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

	function disposed_notes()
	{
		$this->sortby  = 'sort_order';
		$this->pid = 0;
		$this->_intialize();
		$mod = $this->mod;

		$row = array('mem_id' => '', 'file_name' => '', 'title' => '', 'sort_order' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			
			$this->db->where('doc_type', 'disposed_notes');
		
			$this->t_cnt = $this->db->count_all_results('uploads');
			//$this->t_cnt = $this->db->count_all('uploads');

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

}


/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */