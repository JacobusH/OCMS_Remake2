<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mod_content_management extends Model {

    function Mod_content_management()
    {
        parent::Model();
    }

	function get_entries($page)
	{
		switch ($page)
		{
			case 'menu':
				$this->db->select('id,title,parent_id,sort_order,display_in,status');
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('menu', $this->cond, $this->config->item('page_limit'), $this->limit)->result();
			break;

			case 'content_pages':
				$this->db->select('content_id,menu_id,title,sort_order,status');
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('content', array('content_id > ' => 0), $this->config->item('page_limit'), $this->limit)->result();
			break;	
			
			case 'news':
				$this->db->select('news_id,news_title,news_desc,link,news_date,status');
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('news', array('news_id > ' => 0), $this->config->item('page_limit'), $this->limit)->result();
			break;

			case 'team':
				$this->db->select('team_id,name,designation,status');
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('team', array('team_id > ' => 0), $this->config->item('page_limit'), $this->limit)->result();
			break;

			case 'press':
				$this->db->select('press_id,press_title,press_link,status');
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('press', array('press_id > ' => 0), $this->config->item('page_limit'), $this->limit)->result();
			break;

			case 'home_flash_images':
				$this->db->select('img_id,file_name,status');
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('home_flash_images', array('img_id > ' => 0), $this->config->item('page_limit'), $this->limit)->result();
			break;
		}
	}

	function get_entry($page, $ID)
	{
		switch ($page)
		{
			case 'menu':
				return $this->db->get_where('menu', array('id' => $ID))->row_array();
			break;

			case 'content_pages':
				return $this->db->get_where('content', array('content_id' => $ID))->row_array();
			break;	

			case 'news':
				return $this->db->get_where('news', array('news_id' => $ID))->row_array();
			break;

			case 'team':
				return $this->db->get_where('team', array('team_id' => $ID))->row_array();
			break;

			case 'press':
				return $this->db->get_where('press', array('press_id' => $ID))->row_array();
			break;

			case 'home_flash_images':
				return $this->db->get_where('home_flash_images', array('img_id' => $ID))->row_array();
			break;
		}
	}

	function Add($page)
	{
		switch ($page)
		{
			case 'menu':

				if($this->input->post('is_default') == 1)
				{
					$data = array('is_default' => 0);
					$this->db->update('menu', $data, array('parent_id' => $this->input->post('parent_id')));
				}

				$config['upload_path'] = './uploads/bg/';
				$config['allowed_types'] = 'gif|jpg|png|bmp';
				$config['max_size']	= '0';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload');
				$this->upload->initialize($config);
				$this->upload->do_upload('image');
				$file = $this->upload->data();

				$data = array(
							'title' => $this->input->post('title'),
							'alias' => url_title($this->input->post('alias'), 'dash', TRUE),							
							'image' => $file['file_name'],
							'parent_id' => $this->input->post('parent_id'),
							'meta_title' => add_slashes($this->input->post('meta_title')),
							'meta_keywords' => add_slashes($this->input->post('meta_keywords')),
							'meta_desc' => add_slashes($this->input->post('meta_desc')),
							'is_default' => $this->db->escape_str($this->input->post('is_default')),
							'display_in' => $this->db->escape_str($this->input->post('display_in'))
						);

				$this->db->insert('menu', $data); 	
				setcookie("err", 'New menu created successfully', time()+2, '/');
			break;

			case 'content_pages':

				$data = array(
							'menu_id' => $this->input->post('menu_id'),
							'title' => $this->input->post('title'),
							'display_login' => $this->input->post('display_login'),
							'description' => add_slashes($this->input->post('description'))
						);

				$this->db->insert('content', $data); 	
				setcookie("err", 'New content page created successfully', time()+2, '/');
			break;

			case 'news':
				$ndate = explode('-', $this->input->post('news_date'));
				$data = array(
							'news_title' => $this->input->post('news_title'),
							'news_desc' => add_slashes($this->input->post('news_desc')),
							'link' => $this->input->post('link'),
							'news_date' => $ndate[2].'-'.$ndate[0].'-'.$ndate[1],
							'is_featured' => $this->input->post('is_featured')
						);

				$this->db->insert('news', $data); 	
				setcookie("err", 'New news created successfully', time()+2, '/');
			break;

			case 'team':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'gif|jpg|png|bmp';
				$config['max_size']	= '0';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload');
				$this->upload->initialize($config);
				$this->upload->do_upload('image');
				$file = $this->upload->data();
				
				$data = array(
							'name' => $this->input->post('name'),
							'designation' => $this->input->post('designation'),
							'image' => $file['file_name'],
							'description' => add_slashes($this->input->post('description')),
						);

				$this->db->insert('team', $data); 	
				setcookie("err", 'New team member created successfully', time()+2, '/');
			break;

			case 'press':
				$data = array(
							'press_title' => $this->input->post('press_title'),
							'press_link' => $this->input->post('press_link')
						);

				$this->db->insert('press', $data); 	
				setcookie("err", 'New press created successfully', time()+2, '/');
			break;

			case 'home_flash_images':
				$config['upload_path'] = './images/';
				$config['allowed_types'] = 'gif|jpg|png|bmp';
				$config['max_size']	= '0';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload');
				$this->upload->initialize($config);
				if($this->upload->do_upload('file_name'))
				{
					$data1=$this->upload->data();
					$data = array(
							'file_name' => $data1['file_name']
					);

					$this->db->insert('home_flash_images', $data);
					setcookie("err", 'image uploaded successfully', time()+2, '/');
				}
				else
				{
					setcookie("err" ,$this->upload->display_errors(), time()+2, '/' );
				}
			
			break;
		}		
	}

	function Edit($page)
	{
		switch ($page)
		{
			case 'menu':

				if($this->input->post('is_default') == 1)
				{
					$data = array('is_default' => 0);
					$this->db->update('menu', $data, array('parent_id' => $this->input->post('parent_id')));
				}

				$config['upload_path'] = './uploads/bg/';
				$config['allowed_types'] = 'gif|jpg|png|bmp';
				$config['max_size']	= '0';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload');
				$this->upload->initialize($config);

				$this->upload->do_upload('image');
				$file = $this->upload->data();

				if($file['file_name'] <> '')
				{
					$upfile = $file['file_name'];

					if(file_exists($config['upload_path'].$this->input->post('pre_img')))
					{
						@unlink($config['upload_path'].$this->input->post('pre_img'));
					}
				}
				else
				{
					$upfile = $this->input->post('pre_img');
				}

				$data = array(
							'title' => $this->input->post('title'),
							'alias' => url_title($this->input->post('alias'), 'dash', TRUE),							
							'image' => $upfile,
							'parent_id' => $this->input->post('parent_id'),
							'meta_title' => add_slashes($this->db->escape_str($this->input->post('meta_title'))),
							'meta_keywords' => add_slashes($this->db->escape_str($this->input->post('meta_keywords'))),
							'meta_desc' => add_slashes($this->db->escape_str($this->input->post('meta_desc'))),
							'is_default' => $this->db->escape_str($this->input->post('is_default')),
							'display_in' => $this->db->escape_str($this->input->post('display_in'))
						);

				$this->db->update('menu', $data, array('id' => $this->input->post('UID')));
				setcookie("err", 'Selected menu updated successfully', time()+2, '/');
			break;

			case 'content_pages':

				$data = array(
							'menu_id' => $this->input->post('menu_id'),
							'title' => $this->input->post('title'),
							'display_login' => $this->input->post('display_login'),
							'description' => add_slashes($this->input->post('description'))
						);

				$this->db->update('content', $data, array('content_id' => $this->input->post('UID')));
				setcookie("err", 'Selected content page updated successfully', time()+2, '/');
			break;

			case 'news':
				$ndate = explode('-', $this->input->post('news_date'));
				$data = array(
							'news_title' => $this->input->post('news_title'),
							'news_desc' => add_slashes($this->input->post('news_desc')),
							'link' => $this->input->post('link'),
							'news_date' => $ndate[2].'-'.$ndate[0].'-'.$ndate[1],
							'is_featured' => $this->input->post('is_featured')
						);

				$this->db->update('news', $data, array('news_id' => $this->input->post('UID')));
				setcookie("err", 'Selected news updated successfully', time()+2, '/');
			break;

			case 'team':

				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'gif|jpg|png|bmp';
				$config['max_size']	= '0';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload');
				$this->upload->initialize($config);

				$this->upload->do_upload('image');
				$file = $this->upload->data();

				if($file['file_name'] <> '')
				{
					$upfile = $file['file_name'];

					if(file_exists($config['upload_path'].$this->input->post('pre_img')))
					{
						@unlink($config['upload_path'].$this->input->post('pre_img'));
					}
				}
				else
				{
					$upfile = $this->input->post('pre_img');
				}
				
				$data = array(
							'name' => $this->input->post('name'),
							'designation' => $this->input->post('designation'),
							'image' => $upfile,
							'description' => add_slashes($this->input->post('description'))
						);

				$this->db->update('team', $data, array('team_id' => $this->input->post('UID')));
				setcookie("err", 'Selected team member details updated successfully', time()+2, '/');
			break;

			case 'press':
				$ndate = explode('-', $this->input->post('news_date'));
				$data = array(
							'press_title' => $this->input->post('press_title'),
							'press_link' => $this->input->post('press_link')
						);

				$this->db->update('press', $data, array('press_id' => $this->input->post('UID')));
				setcookie("err", 'Selected press updated successfully', time()+2, '/');
			break;

			case 'home_flash_images':
				$config['upload_path'] = './images/';
				$config['allowed_types'] = 'gif|jpg|png|bmp';
				$config['max_size']	= '0';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->upload->initialize($config);
				if(file_exists($config['upload_path'].$this->input->post('filename')))
				{
					unlink($config['upload_path'].$this->input->post('filename'));
				}
				if($this->upload->do_upload('file_name'))
				{
					$data1=$this->upload->data();
					$data = array(
							'file_name' => $data1['file_name']

					);

					$this->db->update('home_flash_images', $data, array('img_id' => $this->input->post('UID')));
					setcookie("err", 'Image uploaded successfully', time()+2, '/');
				}
				else
				{
					setcookie("err" ,$this->upload->display_errors(), time()+2, '/' );
				}
			break;
		}		
	}

	function Del($page)
	{
		switch ($page)
		{
			case 'menu':				 
				$arr = explode(',', $this->input->post('UID'));
				$this->delete_menu($arr);

				$path="./uploads/bg/";
				
				foreach($arr as $id)
				{
					$this->db->select('image');
					$row = $this->db->get_where('menu',array('id' => $id))->row();
					@unlink($path.$row->image);
				}

				$this->db->where('id IN ('.$this->input->post('UID').')');
				$this->db->delete('menu');
				setcookie("err", 'Selected menu deleted successfully', time()+2, '/');
			break;

			case 'content_pages':
				$this->db->where('content_id IN ('.$this->input->post('UID').')');
				$this->db->delete('content'); 
				setcookie("err", 'Selected content page deleted successfully', time()+2, '/');
			break;

			case 'news':
				$this->db->where('news_id IN ('.$this->input->post('UID').')');
				$this->db->delete('news'); 
				setcookie("err", 'Selected news deleted successfully', time()+2, '/');
			break;

			case 'team':				 
				$arr = explode(',', $this->input->post('UID'));
				$path="./uploads/";
				
				foreach($arr as $id)
				{
					$this->db->select('image');
					$row = $this->db->get_where('team',array('team_id' => $id))->row();
					@unlink($path.$row->image);
				}

				$this->db->where('team_id IN ('.$this->input->post('UID').')');
				$this->db->delete('team');
				setcookie("err", 'Selected team member deleted successfully', time()+2, '/');
			break;

			case 'press':
				$this->db->where('press_id IN ('.$this->input->post('UID').')');
				$this->db->delete('press'); 
				setcookie("err", 'Selected press deleted successfully', time()+2, '/');
			break;

			case 'home_flash_images':
				$path='./images/';
				$this->db->select('file_name');
				$filename=$this->db->get_where('home_flash_images',array('img_id' => $this->input->post('UID')))->row()->file_name;
				if(file_exists($path.$filename))
				{
					unlink($path.$filename);
				}
				$this->db->where('img_id IN ('.$this->input->post('UID').')');
				$this->db->delete('home_flash_images');
				setcookie("err", 'Selected image deleted successfully', time()+2, '/');
			break;
		}		
	}

	function Publish($page)
	{
		switch ($page)
		{
			case 'menu':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('id IN ('.$this->input->post('UID').')');
				$this->db->update('menu', $data); 
				setcookie("err", 'Selected menu status modified successfully', time()+2, '/');
			break;

			case 'content_pages':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('content_id IN ('.$this->input->post('UID').')');
				$this->db->update('content', $data); 
				setcookie("err", 'Selected content page status modified successfully', time()+2, '/');
			break;

			case 'news':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('news_id IN ('.$this->input->post('UID').')');
				$this->db->update('news', $data); 
				setcookie("err", 'Selected news status modified successfully', time()+2, '/');
			break;

			case 'team':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('team_id IN ('.$this->input->post('UID').')');
				$this->db->update('team', $data); 
				setcookie("err", 'Selected team member status modified successfully', time()+2, '/');
			break;

			case 'press':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('press_id IN ('.$this->input->post('UID').')');
				$this->db->update('press', $data); 
				setcookie("err", 'Selected press status modified successfully', time()+2, '/');
			break;

			case 'home_flash_images':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('img_id IN ('.$this->input->post('UID').')');
				$this->db->update('home_flash_images', $data);
				setcookie("err", 'Selected image status changed successfully', time()+2, '/');
			break;
		}		
	}

	function sort_order($page)
	{
		switch($page)
		{
			case 'menu':
				for($i=0;$i<=$this->input->post('rcnt');$i++)
				{
					$data = array('sort_order' => $this->input->post('sort_order'.$i));
					$this->db->where('id', $this->input->post('id'.$i));
					$this->db->update('menu', $data); 
				}
			break;

			case 'content_pages':
				for($i=0;$i<=$this->input->post('rcnt');$i++)
				{
					$data = array('sort_order' => $this->input->post('sort_order'.$i));
					$this->db->where('content_id', $this->input->post('id'.$i));
					$this->db->update('content', $data); 
				}
			break;
		}
	}

	function delete_menu($ids)
	{	
		$cnt = count($ids);	
		$tmp = array();
		foreach($ids as $id)
		{
			$this->db->select('id');
			$qry = $this->db->get_where('menu', array('parent_id' => $id));
			if($qry->num_rows() > 0)
			{
				foreach($qry->result() as $row)
				{
					$tmp[] = $row->id;
				}
			}
		}

		if($cnt > 0)
		{
			if(count($tmp) > 0)
			{
				$path="./uploads/bg/";			

				foreach($tmp as $id)
				{
					$this->db->select('image');
					$row = $this->db->get_where('menu',array('id' => $id))->row();
					@unlink($path.$row->image);
				}

				$this->db->where('id IN ('.implode(',', $tmp).')');
				$this->db->delete('menu');
				$this->delete_menu($tmp);
				return $tmp;
			}
			else
			{
				return FALSE;
			}
		}
		else
		{
			return TRUE;
		}
	}

}