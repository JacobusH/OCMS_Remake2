<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mod_common extends Model {

    function Mod_common()
    {
        parent::Model();
    }

	function get_countries()
	{
		$this->db->order_by("country_name", "ASC");
		return $this->db->get_where('countries', array('status' => 1))->result();	
	}

	function get_country($param = '')
	{
		return $this->db->get_where('countries', array('country_id' => $param))->row();
	}

	function get_cc_types()
	{
		$this->db->order_by("cc_type", "ASC");
		return $this->db->get_where('cc_types', array('status' => 1))->result();	
	}

	function get_states()
	{
		$this->db->order_by("state_name", "ASC");
		return $this->db->get_where('states', array('status' => 1))->result();	
	}

	function get_state($param = '')
	{
		return $this->db->get_where('states', array('state_id' => $param))->row();
	}

	function get_menu_items()
	{
		$this->db->select('id,title,alias,parent_id');
		$this->db->order_by('sort_order', 'ASC');
		return $this->db->get_where('menu', array('id > ' => 0, 'display_in' => 0, 'status' => 1))->result();
	}

	function get_menu_list($pid)
	{
		$this->db->select('id,title,alias,parent_id');
		$this->db->order_by('sort_order', 'ASC');
		if($pid == 0)
		{
			$this->db->where('display_in', 0);
			//$this->db->or_where('display_in', 2);
		}
		return $this->db->get_where('menu', array('parent_id' => $pid, 'status' => 1))->result();
	}

	function show_menu_items()
	{
		$this->db->select('id,title,alias');
		$this->db->order_by('sort_order', 'ASC');
		return $this->db->get_where('menu', array('parent_id' => 0, 'display_in' => 0, 'status' => 1))->result();
	}

	function sub_menu_count($pid)
	{
		$this->db->where('parent_id', $pid);
		$this->db->where('status', 1);
		if($pid == 0)
		{
			$this->db->where('display_in', 0);
		}
		return $this->db->count_all_results('menu');
	}

	function get_parent($pid)
	{	
		$this->db->select('id,parent_id');
		$row = $this->db->get_where('menu', array('id' => $pid, 'status' => 1))->row();
		return $row->parent_id;
	}

	function get_sub_menu_items($pid)
	{
		$this->db->select('id,title,parent_id,alias');
		$this->db->order_by('sort_order', 'ASC');
		$qry = $this->db->get_where('menu', array('parent_id' => $pid, 'status' => 1));

		if($qry->num_rows() > 0)
		{
			return $qry->result();
		}
		else
		{
			return FALSE;
		}
	}

	function get_menu_title($param = '')
	{
		$this->db->select('title');
		$row = $this->db->get_where('menu', array('id' => $param))->row_array();
		return @$row['title'];
	}

	function get_footer_list()
	{
		$this->db->select('id,title,alias');
		$this->db->order_by('sort_order', 'ASC');
		$qry = $this->db->get_where('menu', array('display_in' => 1, 'status' => 1));

		if($qry->num_rows() > 0)
		{
			return $qry->result();
		}
		else
		{
			return FALSE;
		}
	}

	function get_testimonial()
	{
		$this->db->order_by('testimonial_id', 'random');
		return $this->db->get_where('testimonials', array('status' => 1))->row();
	}

}