<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Content_management extends Controller {
	
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
	var $pid       = '';
	var $cond      = '';

	function Content_management()
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

	function menu()
	{
		$this->sortby  = 'sort_order';
		$this->pid = 0;

		$this->_intialize();

		$mod = $this->mod;

		if($this->pid > 0)
		{
			$this->db->where('id', $this->pid);
			$cnt = $this->db->count_all_results('menu');
			if($cnt == 0)
			{
				redirect(site_url($this->uri->slash_segment(1).$this->url));
			}				
		}

		$row = array('title' => '', 'alias' => '', 'image' => '', 'meta_title' => '','meta_keywords' => '','meta_desc' => '','parent_id' => '','is_default' => '','display_in' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			if($this->pid == 0)
			{
				$this->cond = array('parent_id' => 0);
			}
			else
			{
				$this->cond = array('parent_id' => $this->pid);
			}

			$this->db->where($this->cond);
			$this->t_cnt = $this->db->count_all_results('menu');

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

	function content_pages()
	{
		$this->sortby  = 'title';

		$this->_intialize();

		$mod = $this->mod;

		$row = array('title' => '', 'description' => '','menu_id' => '', 'display_login' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{	
			$this->t_cnt = $this->db->count_all('content');

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

	function news()
	{
		$this->sortby  = 'news_date';
		$this->disType = 'DESC';

		$this->_intialize();

		$mod = $this->mod;


		$row = array('news_title' => '', 'news_desc' => '','link' => '','news_date' => '--','is_featured' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			$this->t_cnt = $this->db->count_all('news');

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

	function team()
	{
		$this->sortby  = 'team_id';
		$this->disType = 'ASC';

		$this->_intialize();

		$mod = $this->mod;


		$row = array('name' => '', 'designation' => '','image' => '','description' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			$this->t_cnt = $this->db->count_all('team');

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

	function press()
	{
		$this->sortby  = 'press_id';
		//$this->disType = 'DESC';

		$this->_intialize();

		$mod = $this->mod;


		$row = array('press_title' => '','press_link' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			$this->t_cnt = $this->db->count_all('press');

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

	function home_flash_images()
	{
		$this->sortby  = 'file_name';
		$this->_intialize();
		$mod = $this->mod;

		$row = array('img_id' => '', 'file_name' => '');
		
		if($this->input->post('pType') == 'Edit')
		{
			$row = $this->$mod->get_entry($this->uri->rsegment(2), $this->input->post('UID'));
		}
		else
		{
			$this->t_cnt = $this->db->count_all('home_flash_images');

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