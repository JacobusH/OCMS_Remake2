<?php

class Mod_content extends Model 
{
	function Mod_content()
	{
		parent::Model();
	}

	function get_menu($name)
	{
		$this->db->select('parent_id,id');
		$qry = $this->db->get_where('menu', array('status' => 1, 'alias' => $name));

		if($qry->num_rows() > 0)
		{
			$row = $qry->row();
			$s_cnt = $this->sub_menu_count($row->id);
			
			if($s_cnt > 0)
			{
				return $this->db->get_where('menu', array('is_default' => 1, 'parent_id' => $row->id))->row_array();
			}
			else
			{
				return $this->db->get_where('menu', array('alias' => $name))->row_array();
			}
		}
		else
		{
			return FALSE;
		}		
	}

	function get_content($id)
	{
		$qry = $this->db->get_where('content', array('menu_id' => $id, 'status' => 1));

		if($qry->num_rows() > 0)
		{
			return $qry->row_array();
		}
		else
		{
			return FALSE;
		}
	}

	function get_news()
	{
		$this->db->select('news_id,news_title,news_desc,link,news_date');
		$this->db->order_by('news_date', 'DESC');
		return $this->db->get_where('news', array('status' => 1))->result();
	}

	function sub_menu_count($pid)
	{
		$this->db->where('parent_id', $pid);
		$this->db->where('status', 1);
		$this->db->where('is_default', 1);
		return $this->db->count_all_results('menu');
	}

	function get_home_news($year = '', $limit = '')
	{	
		if($year <> '')
		{
			$cond = "status = 1 AND DATE_FORMAT(news_date, '%Y') = '".$year."'";
		}
		else
		{
			$cond = "status = 1 AND is_featured=1";
		}	
		
		$qry = $this->db->query("SELECT news_id,news_title,news_desc,link as link1,news_date AS ndate FROM ".$this->db->dbprefix."news WHERE ".$cond." ORDER BY news_date DESC");

		if($qry->num_rows() > 0)
		{
			return $qry->result();
		}
		else
		{
			return FALSE;
		}
	}

	function get_all_news()
    {    
        $cond = "status = 1";
            
        
        $qry = $this->db->query("SELECT news_id,news_title,news_desc,link as link1,DATE_FORMAT(news_date, '%d- %m- %y') AS ndate FROM ".$this->db->dbprefix."news WHERE ".$cond." ORDER BY news_date DESC");

        if($qry->num_rows() > 0)
        {
            return $qry->result();
        }
        else
        {
            return FALSE;
        }
    }

	function get_team()
	{	
		$qry = $this->db->query("SELECT team_id,name,image,description,designation FROM ".$this->db->dbprefix."team WHERE status = 1 ORDER BY team_id ASC");

		if($qry->num_rows() > 0)
		{
			return $qry->result();
		}
		else
		{
			return FALSE;
		}
	}

	function get_team_desc($team_id)
	{	
		$qry = $this->db->query("SELECT team_id,name,image,description,designation FROM ".$this->db->dbprefix."team WHERE status = 1 and team_id = ".$team_id." ORDER BY team_id ASC");

		return $qry->row();
	}

	function get_press()
	{	
		$this->db->select('press_id,press_title,press_link');
		return $this->db->get_where('press',array('status' => 1))->result();
		
	}

	function get_flash_imgs()
	{	
		$this->db->select('img_id,file_name');
		return $this->db->get_where('home_flash_images',array('status' => 1))->result();
		
	}
function get_image($page)
	{
		$this->db->select('image');
		$res = $this->db->get_where('menu',array('alias' => $page))->row();
		return $res->image;
	}
	
}