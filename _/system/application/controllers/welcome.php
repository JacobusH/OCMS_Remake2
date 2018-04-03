<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends Controller {

	var $control = '';
	
	function Welcome()
	{
		parent::Controller();
		$this->control = $this;
		$this->load->model('Mod_content');
		$this->load->model('Mod_common');
	}
	
	function index()
	{		
		if(($this->uri->segment(1) == '') || ($this->uri->segment(1) == 'home'))
		{
			$row = $this->Mod_content->get_menu('home');
			$page = 'index';
		}
		else if($this->uri->segment(1) <> '')
		{
			$row = $this->Mod_content->get_menu($this->uri->segment(1));

			if(!file_exists(APPPATH.'views/'.$this->uri->segment(1).EXT))
			{				
				$page = 'cms';
			}
			else
			{
				$page = $this->uri->segment(1);
			}
		}

		$content = $this->Mod_content->get_content($row['id']);

		$id = ($row['parent_id'] == 0) ? $row['id'] : $row['parent_id'];

		$title = (($row['title'] <> '') && ($page <> 'index')) ? $row['title'] : 'EQUITY WEST CAPITAL PARTNERS';

		$data = array(
					'page' => $page,
					'title' => $title,
					'alias' => $row['alias'],					
					'bgimage' => $row['image'],
					'meta_title' => strip_slashes($row['meta_title']),
					'meta_keywords' => strip_slashes($row['meta_keywords']),
					'meta_desc' => strip_slashes($row['meta_desc']),
					'parent_id' => $row['parent_id'],
					'heading' => $content['title'],
					'description' => strip_slashes($content['description']),
					'display_login' => $content['display_login'],
					'sublinks' => $this->_sub_links($id, $row['id']),					
					'footer_navigation' => $this->navigation->footer_navigation()
				);

		$this->load->view($page, $data);
		
	}

	function _sub_links($pid, $id)
	{
		$rows = $this->Mod_common->get_sub_menu_items($pid);

		if($rows > 0)
		{
			$i = 0;
			$str = '<ul>';
				
			foreach($rows as $row)
			{
				$class = ($id == $row->id) ? 'class="current"' : '';
				$nbclass = ($i == 0) ? 'class="nb"' : '';
				$str .= '<li '.$nbclass.'><a href="'.site_url($row->alias).'" '.$class.'>'.$row->title.'</a></li>';
				$i++;
			}

			$str .= '</ul>';

			return $str;
		}
		else
		{
			return FALSE;
		}
	}

	function _news()
	{
		$rows = $this->Mod_content->get_all_news();
		if($rows > 0)
		{
			$str = '';
			foreach($rows as $row)
			{	
				$str .= '<p><span>'.$row->ndate.'</span><br /> <strong>'.strip_slashes($row->news_title).'</strong></p>'.strip_slashes($row->news_desc).'<br>';
			}

			return $str;
		}
		else
		{
			return '<p style="text-align: center;color: red;height: 50px;padding-top: 40px;font-weight: bold;">No news available to display</p>';
		}	
	}

	function _team()
	{
		$rows = $this->Mod_content->get_team();
		if($rows > 0)
		{
			$str = '';
			foreach($rows as $row)
			{	
				$str .= '<div style="float: left;width: 770px;"><p><a href="'.site_url(array('team_desc',$row->team_id)).'"><span>'.$row->name.'</span></a> - <strong>'.$row->designation.'</strong></p><p></div><div class="clear">&nbsp;</div>';
			}

			return $str;
		}
		else
		{
			return '<p style="text-align: center;color: red;height: 50px;padding-top: 40px;font-weight: bold;">No team members available to display</p>';
		}	
	}

	function team_desc($team_id = '')
	{
		$row = $this->Mod_content->get_team_desc($team_id);
		$str = '';
		$str .= '<div style="float: left;padding-bottom: 10px;width: 770px;"><p><img src="'.base_url().'uploads/'.$row->image.'" alt="'.$row->name.'" style="width: 143px;height: 139px;"></p> <p><a href="'.site_url(array('team_desc',$row->team_id)).'"><span>'.$row->name.'</span></a> - <strong>'.$row->designation.'</strong></p><p>'.strip_tags(strip_slashes($row->description)).'</p></div><div class="clear">&nbsp;</div>';

		//$str .= '<div style="border-bottom: 1px solid #d7d7d7;float: left;padding-bottom: 10px;width: 770px;"><p><img src="'.base_url().'uploads/'.$row->image.'" alt="EWCP"></p> <p><a href="'.site_url(array('team_desc',$row->team_id)).'"><span>'.$row->name.'</span></a> - <strong>'.$row->designation.'</strong></p><p>'.strip_tags(strip_slashes($row->description)).'</p></div><div class="clear">&nbsp;</div>';
		return $str;
		
	}

	function _press()
	{
		$rows = $this->Mod_content->get_press();
		$str = '<ul>';
		foreach ($rows as $row)
		{
			//$str .= '<li><p>'.$row->press_title.'</p></li>';
                        $str .= '<li><a href="'.$row->press_link.'">'.$row->press_title.'</a></li>';
		}
		$str .= '</ul>';
		return $str;			
	}

	function _flash()
	{
		$rows = $this->Mod_content->get_flash_imgs();
		$str = '';
		foreach ($rows as $row)
		{
			$str .= '<div class="contentdiv"><a href="#"><img src="'.base_url().'images/'.$row->file_name.'" alt=" " border="0" /></a></div>';
		}
		return $str;		
	}

	function _home_news()
	{
		$rows = $this->Mod_content->get_home_news($this->uri->segment(2), 2);
		if($rows > 0)
		{
			$str = '';
			foreach($rows as $row)
			{				
				$str .= '<p>'.$row->ndate.'<br>';
				$str .= '<a href="'.$row->link1.'">'.strip_slashes($row->news_title).'...</a></p>';				
			}
			$str .= '<p><a href="'.site_url('news').'">more..</a></p>';  

			return $str;
		}
		else
		{
			return '<p style="text-align: center;color: red;height: 50px;padding-top: 40px;font-weight: bold;">No news available to display</p>';
		}	
	}

	function submit_contact()
	{
		$config['mailtype'] = 'html';
		$this->load->library('email');
		$this->email->initialize($config);		
		$this->email->to('info@equitywestcapital.com'); 

		$strBody = "<table border='1' align='center' cellpadding='1' cellspacing='1' width='41%'><tr style='font-family: Verdana; font-size: 11px; font-style: normal; line-height: 16px; font-weight: normal; font-variant: normal; text-transform: none; color: #000000; text-decoration: none;'><tr style='font-family: Verdana; font-size: 11px; font-style: normal; line-height: 16px; font-weight: normal; font-variant: normal; text-transform: none; color: #000000; text-decoration: none;'><td align='center'><div align='left'><strong>Email:</strong></div></td><td align='center'>".$this->input->post('comments')."</td></tr></table>";

		$this->email->subject('Contact Information');			
		$this->email->message($strBody);
		@$this->email->send();
		setcookie("err", 'Your information has been sent successfully', time()+5, '/');
		redirect('contact-us');
	}

function get_bgimage($page)
	{
		return $this->Mod_content->get_image($page);
	}

}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */