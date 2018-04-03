<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class MY_Common {

	var $CI = '';
	var $sub_menus_list = '';
	var $m_list = array();
	var $level = 0;

    function MY_Common()
    {
		// Instantiate the class		
		$this->CI =& get_instance();
		$this->CI->load->model('Mod_common');
    }

	function year($year = '', $sort = 'ASC')
	{
		$years = '';$selected = array($year => 'selected');

		if($sort == 'ASC')
		{
			for($i=1900;$i<=(date('Y'));$i++)
			{
				$years = $years."<option value='".$i."' ".@$selected[$i].">".$i."</option>";
			}
		}
		else if($sort == 'DESC')
		{
			for($i=(date('Y'));$i<(date('Y'))+20;$i++)
			{
				$years = $years."<option value='".$i."' ".@$selected[$i].">".$i."</option>";
			}
		}

		return $years;
	}

	function randno()
	{
		return str_shuffle(strtotime("NOW"));
	}

	function get_country_list()
	{
		$country_list = array('' => 'Select');
		$rows = $this->CI->Mod_common->get_countries();
		foreach($rows as $row)
		{
			$country_list[$row->country_id] = $row->country_name;
		}

		return $country_list;
	}

	function get_country_name($param)
	{
		$row = $this->CI->Mod_common->get_country($param);
		return $row->country_name;
	}

	function get_state_list()
	{
		$state_list = array('' => 'Select');
		$rows = $this->CI->Mod_common->get_states();
		foreach($rows as $row)
		{
			$state_list[$row->state_id] = $row->state_name;
		}

		return $state_list;
	}

	function get_state_name($param)
	{
		$row = $this->CI->Mod_common->get_state($param);
		return $row->state_name;
	}

	function get_cc_type_list()
	{
		$cc_type_list = array('' => 'Select');
		$rows = $this->CI->Mod_common->get_cc_types();
		foreach($rows as $row)
		{
			$cc_type_list[$row->cc_type] = $row->cc_type;
		}

		return $cc_type_list;
	}

	function menu_list($pid = 0)
	{
		$menu_list = array('0' => 'Parent');
		$rows = $this->CI->Mod_common->get_menu_list($pid);
		$tmp_array = array('0' => 'Parent');
		foreach($rows as $row)
		{
			$tmp = '';

			$s_cnt = $this->CI->Mod_common->sub_menu_count($row->id);

			$level = $this->option_level($row->parent_id);

			$this->level = 0;

			for($i=0;$i<$level;$i++)
			{
				$tmp .= '&#160;&#160;';
			}

			if($tmp <> '')
			{
				$tmp .= '->';
			}
			else
			{
				$tmp = '';
			}

			$this->m_list[$row->id] = $tmp.$row->title;	
			
			if($s_cnt > 0)
			{
				$tmp_array[$row->id] = $this->menu_list($row->id);
			}
		}

		return array_merge($menu_list, $this->m_list);
	}

	function menu_list_1($pid = 0)
	{
		$rows = $this->CI->Mod_common->get_menu_list($pid);
		$tmp_array = array();
		foreach($rows as $row)
		{
			$tmp = '';

			$s_cnt = $this->CI->Mod_common->sub_menu_count($row->id);

			$level = $this->option_level($row->parent_id);

			$this->level = 0;

			for($i=0;$i<$level;$i++)
			{
				$tmp .= '&#160;&#160;';
			}

			if($tmp <> '')
			{
				$tmp .= '->';
			}
			else
			{
				$tmp = '';
			}

			$this->m_list[$row->id] = $tmp.$row->title;	
			
			if($s_cnt > 0)
			{
				$tmp_array[$row->id] = $this->menu_list_1($row->id);
			}
		}

		return $this->m_list;
	}

	function option_level($pid)
	{
		if($pid > 0)
		{
			$parent = $this->CI->Mod_common->get_parent($pid);

			$this->level++;

			$this->option_level($parent);			
		}

		return $this->level;
	}

	function menu_title($param = '')
	{
		return $this->CI->Mod_common->get_menu_title($param);
	}

	function testimonials()
	{
		$this->CI->db->where('status', 1);
		$cnt = $this->CI->db->count_all_results('testimonials');		

		if($cnt > 0)
		{
			$row = $this->CI->Mod_common->get_testimonial();
			$str = '';
			
			if(($this->CI->uri->segment(1) == '') || ($this->CI->uri->segment(1) == 'home'))
			{
				$str .= '<p><img src="'.base_url().'uploads/testimonials/'.$row->image.'" alt="img1" width="100" height="62" />'.strip_slashes($row->description).'</p>';
				$str .= '<p><span>'.$row->client_name.'</span><br/><a href="http://'.$row->url.'" target="_blank">'.$row->url.'</a></p>';
			}
			else
			{
				$str .= '<div class="testi">';
					$str .= '<img src="'.base_url().'uploads/testimonials/'.$row->image.'" alt="testimonials" width="199" height="124"/>';
					$str .= '<h2>Client Speaks</h2>';
					$str .= strip_slashes($row->description);
				$str .= '</div>';
				$str .= '<div class="bottom">'.$row->client_name.' <a href="http://'.$row->url.'" target="_blank">'.$row->url.'</a>';
				$str .= '</div>';
			}

			return $str;
		}
		else
		{
			return FALSE;
		}		
	}

	function get_states($sid = '')
	{
		$rows=$this->CI->Mod_common->get_states();
		$str = '';
		foreach($rows as $row)
		{
			if($row->state_id == $sid)
			{
				$str .= '<option value="'.$row->state_id.'" selected >'.$row->state_name.'</option>';
			}
			else
			{
				$str .= '<option value="'.$row->state_id.'">'.$row->state_name.'</option>';
			}
		}
		return $str;
	}

}