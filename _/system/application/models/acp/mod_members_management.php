<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mod_members_management extends Model {

    function Mod_members_management()
    {
        parent::Model();
    }

	function get_entries($page)
	{
		switch ($page)
		{
			case 'members':
				$cond = array('mem_id >' => 0);

				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('members', $cond, $this->config->item('page_limit'), $this->limit)->result();
			break;

			case 'monthly_updates':
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('uploads', array('doc_id > ' => 0,'doc_type' => 'monthly_updates'), $this->config->item('page_limit'), $this->limit)->result();
			break;
			
			case 'current_properties':
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('uploads', array('doc_id > ' => 0,'doc_type' => 'current_properties'), $this->config->item('page_limit'), $this->limit)->result();
			break;

			case 'sold_properties':
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('uploads', array('doc_id > ' => 0,'doc_type' => 'sold_properties'), $this->config->item('page_limit'), $this->limit)->result();
			break;

			case 'financial_reports':
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('uploads', array('doc_id > ' => 0,'doc_type' => 'financial_reports'), $this->config->item('page_limit'), $this->limit)->result();
			break;

			case 'current_notes_held':
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('uploads', array('doc_id > ' => 0,'doc_type' => 'current_notes_held'), $this->config->item('page_limit'), $this->limit)->result();
			break;

			case 'disposed_notes':
				$this->db->order_by($this->sortby, $this->disType);
				return $this->db->get_where('uploads', array('doc_id > ' => 0,'doc_type' => 'disposed_notes'), $this->config->item('page_limit'), $this->limit)->result();
			break;
		}
	}

	function get_entry($page, $ID)
	{
		switch ($page)
		{
			case 'members':
				return $this->db->get_where('members', array('mem_id' => $ID))->row_array();
    		break;

			case 'monthly_updates':
				return $this->db->get_where('uploads', array('doc_id' => $ID))->row_array();
			break;

			case 'current_properties':
				return $this->db->get_where('uploads', array('doc_id' => $ID))->row_array();
			break;

			case 'sold_properties':
				return $this->db->get_where('uploads', array('doc_id' => $ID))->row_array();
			break;

			case 'financial_reports':
				return $this->db->get_where('uploads', array('doc_id' => $ID))->row_array();
			break;

			case 'current_notes_held':
				return $this->db->get_where('uploads', array('doc_id' => $ID))->row_array();
			break;

			case 'disposed_notes':
				return $this->db->get_where('uploads', array('doc_id' => $ID))->row_array();
			break;
		}
	}

	function Add($page)
	{
		switch ($page)
		{
			case 'members':
				$data = array(
						  'mem_type' => $this->input->post('mem_type'),
						  'fname' => add_slashes($this->input->post('fname')),
						  'lname' => add_slashes($this->input->post('lname')),
						  'address' => add_slashes($this->input->post('address')),
						  'address2' => add_slashes($this->input->post('address2')),
						  'city' => add_slashes($this->input->post('city')),
						  'state' => $this->input->post('state'),
						  'zip' => $this->input->post('zip'),
						  'phone' => $this->input->post('phone'),
						  'email' => add_slashes($this->input->post('email')),
						  'uname' => add_slashes($this->input->post('uname')),
						  'pswd' => $this->encrypt->sha1($this->input->post('pswd')),
						  'pswd_key' => $this->encrypt->encode($this->input->post('pswd')),
						  'register_date' => $this->db->escape_str(date('Y-m-d')),
							);
				$this->db->insert('members', $data);
				setcookie("err", 'New member added successfully', time()+2, '/');
			break;

			case 'monthly_updates':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] ='pdf|doc|docx';
				$config['max_size']	= '1000000';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload', $config);
				$this->upload->initialize($config);
				if($this->upload->do_upload('file_name'))
				{
					$data1=$this->upload->data();
					$data = array(
							'file_name' => $data1['file_name'],
							'title' => $this->input->post('title'),
							'doc_type' => 'monthly_updates'
					);

					$this->db->insert('uploads', $data);
					setcookie("err", 'file uploaded successfully', time()+2, '/');
				}
				else
				{
					setcookie("err" ,$this->upload->display_errors(), time()+2, '/' );
				}
			
			break;

			case 'current_properties':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'pdf|doc|docx|rtf';
				$config['max_size']	= '1000000';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload', $config);
				$this->upload->initialize($config);
				if($this->upload->do_upload('file_name'))
				{
					$data1=$this->upload->data();
					$data = array(
							'file_name' => $data1['file_name'],
							'title' => $this->input->post('title'),
							'doc_type' => 'current_properties'
					);

					$this->db->insert('uploads', $data);
					setcookie("err", 'file uploaded successfully', time()+2, '/');
				}
				else
				{
					setcookie("err" ,$this->upload->display_errors(), time()+2, '/' );
				}
			
			break;

			case 'sold_properties':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'pdf|doc|docx';
				$config['max_size']	= '1000000';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload', $config);
				$this->upload->initialize($config);
				if($this->upload->do_upload('file_name'))
				{
					$data1=$this->upload->data();
					$data = array(
							'file_name' => $data1['file_name'],
							'title' => $this->input->post('title'),
							'doc_type'	=> 'sold_properties',
							'sold_type'	=> $this->input->post('sold_type')
					);

					$this->db->insert('uploads', $data);
					setcookie("err", 'file uploaded successfully', time()+2, '/');
				}
				else
				{
					setcookie("err" ,$this->upload->display_errors(), time()+2, '/' );
				}
			
			break;

			case 'financial_reports':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'pdf|doc|docx';
				$config['max_size']	= '1000000';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload', $config);
				$this->upload->initialize($config);
				if($this->upload->do_upload('file_name'))
				{
					$data1=$this->upload->data();
					$data = array(
							'file_name' => $data1['file_name'],
							'title' => $this->input->post('title'),
							'doc_type' => 'financial_reports'
					);

					$this->db->insert('uploads', $data);
					setcookie("err", 'file uploaded successfully', time()+2, '/');
				}
				else
				{
					setcookie("err" ,$this->upload->display_errors(), time()+2, '/' );
				}
			
			break;

			case 'current_notes_held':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'pdf|doc|docx';
				$config['max_size']	= '0';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload');
				$this->upload->initialize($config);
				if($this->upload->do_upload('file_name'))
				{
					$data1=$this->upload->data();
					$data = array(
							'file_name' => $data1['file_name'],
							'title' => $this->input->post('title'),
							'doc_type' => 'current_notes_held'
					);

					$this->db->insert('uploads', $data);
					setcookie("err", 'file uploaded successfully', time()+2, '/');
				}
				else
				{
					setcookie("err" ,$this->upload->display_errors(), time()+2, '/' );
				}
			
			break;

			case 'disposed_notes':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'pdf|doc|docx';
				$config['max_size']	= '0';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload');
				$this->upload->initialize($config);
				if($this->upload->do_upload('file_name'))
				{
					$data1=$this->upload->data();
					$data = array(
							'file_name' => $data1['file_name'],
							'title' => $this->input->post('title'),
							'doc_type' => 'disposed_notes'
					);

					$this->db->insert('uploads', $data);
					setcookie("err", 'file uploaded successfully', time()+2, '/');
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
			 case 'members':
				$data = array(
						  'mem_type' => $this->input->post('mem_type'),
						  'fname' => add_slashes($this->input->post('fname')),
						  'lname' => add_slashes($this->input->post('lname')),
						  'address' => add_slashes($this->input->post('address')),
						  'address2' => add_slashes($this->input->post('address2')),
						  'city' => add_slashes($this->input->post('city')),
						  'state' => $this->input->post('state'),
						  'zip' => $this->input->post('zip'),
						  'phone' => $this->input->post('phone'),
						  'email' => add_slashes($this->input->post('email')),
						  'uname' => add_slashes($this->input->post('uname')),
						  'pswd' => $this->encrypt->sha1($this->input->post('pswd')),
						  'pswd_key' => $this->encrypt->encode($this->input->post('pswd'))
							);
			    $this->db->update('members', $data, array('mem_id' => $this->input->post('UID')));
				setcookie("err", 'Selected member updated successfully', time()+2, '/');
			break;

			case 'monthly_updates':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'pdf|doc|docx';
				$config['max_size']	= '1000000';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->upload->initialize($config);

				if(file_exists($config['upload_path'].$this->input->post('filename')))
				{
					unlink($config['upload_path'].$this->input->post('filename'));
				}
				else
				{
					$this->upload->do_upload('file_name');
					$data1=$this->upload->data();
				}

				$data = array(
							'file_name' => $data1['file_name'],
							'title' => $this->input->post('title'),
							'doc_type' => 'monthly_updates'
						);

				$this->db->update('uploads', $data, array('doc_id' => $this->input->post('UID')));
				setcookie("err", 'Details modified successfully', time()+2, '/');
			break;

			case 'current_properties':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'pdf|doc|docx';
				$config['max_size']	= '1000000';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->upload->initialize($config);			

				if(file_exists($config['upload_path'].$this->input->post('filename')))
				{
					unlink($config['upload_path'].$this->input->post('filename'));
				}
				else
				{
					$this->upload->do_upload('file_name');
					$data1=$this->upload->data();
				}

				$data = array(
							'file_name' => $data1['file_name'],
							'title' => $this->input->post('title'),
							'doc_type' => 'current_properties'
						);

				$this->db->update('uploads', $data, array('doc_id' => $this->input->post('UID')));
				setcookie("err", 'Details modified successfully', time()+2, '/');
			break;

			case 'sold_properties':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'pdf|doc|docx';
				$config['max_size']	= '1000000';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload',$config);

				$this->upload->initialize($config);
				
				if(file_exists($config['upload_path'].$this->input->post('filename')))
				{
					unlink($config['upload_path'].$this->input->post('filename'));
				}
				else
				{
					$this->upload->do_upload('file_name');
					$data1=$this->upload->data();
				}

				$data = array(
							'file_name' => $data1['file_name'],
							'title' => $this->input->post('title'),
							'doc_type' => 'sold_properties',
							'sold_type'	=> $this->input->post('sold_type')
					);

				$this->db->update('uploads', $data, array('doc_id' => $this->input->post('UID')));
				setcookie("err", 'Details modified successfully', time()+2, '/');
			break;

			case 'financial_reports':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'pdf|doc|docx';
				$config['max_size']	= '1000000';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->upload->initialize($config);

				if(file_exists($config['upload_path'].$this->input->post('filename')))
				{
					unlink($config['upload_path'].$this->input->post('filename'));
				}
				else
				{
					$this->upload->do_upload('file_name');
					$data1=$this->upload->data();
				}

				$data = array(
							'file_name' => $data1['file_name'],
							'title' => $this->input->post('title'),
							'doc_type' => 'financial_reports'
						);

				$this->db->update('uploads', $data, array('doc_id' => $this->input->post('UID')));
				setcookie("err", 'Details modified successfully', time()+2, '/');
			break;

			case 'current_notes_held':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'pdf|doc|docx';
				$config['max_size']	= '0';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload');
				$this->upload->initialize($config);

				if(file_exists($config['upload_path'].$this->input->post('filename')))
				{
					unlink($config['upload_path'].$this->input->post('filename'));
				}
				else
				{
					$this->upload->do_upload('file_name');
					$data1=$this->upload->data();
				}

				$data = array(
							'file_name' => $data1['file_name'],
							'title' => $this->input->post('title'),
							'doc_type' => 'current_notes_held'
						);

				$this->db->update('uploads', $data, array('doc_id' => $this->input->post('UID')));
				setcookie("err", 'Details modified successfully', time()+2, '/');
			break;

			case 'disposed_notes':
				$config['upload_path'] = './uploads/';
				$config['allowed_types'] = 'pdf|doc|docx';
				$config['max_size']	= '0';
				$config['max_width']  = '0';
				$config['max_height']  = '0';
				$this->load->library('upload');
				$this->upload->initialize($config);

				if(file_exists($config['upload_path'].$this->input->post('filename')))
				{
					unlink($config['upload_path'].$this->input->post('filename'));
				}
				else
				{
					$this->upload->do_upload('file_name');
					$data1=$this->upload->data();
				}

				$data = array(
							'file_name' => $data1['file_name'],
							'title' => $this->input->post('title'),
							'doc_type' => 'disposed_notes'
						);

				$this->db->update('uploads', $data, array('doc_id' => $this->input->post('UID')));
				setcookie("err", 'Details modified successfully', time()+2, '/');
			break;
		}
	}

	function Del($page)
	{
		switch ($page)
		{
			case 'members':
				$this->db->where('mem_id IN ('.$this->input->post('UID').')');
				$this->db->delete('members');
				setcookie("err", 'Selected member deleted successfully', time()+2, '/');
			break;
			case 'monthly_updates':
				$path='./uploads/';
				$this->db->select('file_name');
				$filename=$this->db->get_where('uploads',array('doc_id' => $this->input->post('UID')))->row()->file_name;
				if(file_exists($path.$filename))
				{
					unlink($path.$filename);
				}
				$this->db->where('doc_id IN ('.$this->input->post('UID').')');
				$this->db->delete('uploads');
				setcookie("err", 'Selected document deleted successfully', time()+2, '/');
			break;

			case 'current_properties':
				$path='./uploads/';
				$this->db->select('file_name');
				$filename=$this->db->get_where('uploads',array('doc_id' => $this->input->post('UID')))->row()->file_name;
				if(file_exists($path.$filename))
				{
					unlink($path.$filename);
				}
				$this->db->where('doc_id IN ('.$this->input->post('UID').')');
				$this->db->delete('uploads');
				setcookie("err", 'Selected document deleted successfully', time()+2, '/');
			break;

			case 'sold_properties':
				$path='./uploads/';
				$this->db->select('file_name');
				$filename=$this->db->get_where('uploads',array('doc_id' => $this->input->post('UID')))->row()->file_name;
				if(file_exists($path.$filename))
				{
					unlink($path.$filename);
				}
				$this->db->where('doc_id IN ('.$this->input->post('UID').')');
				$this->db->delete('uploads');
				setcookie("err", 'Selected document deleted successfully', time()+2, '/');
			break;

			case 'financial_reports':
				$path='./uploads/';
				$this->db->select('file_name');
				$filename=$this->db->get_where('uploads',array('doc_id' => $this->input->post('UID')))->row()->file_name;
				if(file_exists($path.$filename))
				{
					unlink($path.$filename);
				}
				$this->db->where('doc_id IN ('.$this->input->post('UID').')');
				$this->db->delete('uploads');
				setcookie("err", 'Selected document deleted successfully', time()+2, '/');
			break;

			case 'current_notes_held':
				$path='./uploads/';
				$this->db->select('file_name');
				$filename=$this->db->get_where('uploads',array('doc_id' => $this->input->post('UID')))->row()->file_name;
				if(file_exists($path.$filename))
				{
					unlink($path.$filename);
				}
				$this->db->where('doc_id IN ('.$this->input->post('UID').')');
				$this->db->delete('uploads');
				setcookie("err", 'Selected document deleted successfully', time()+2, '/');
			break;

			case 'disposed_notes':
				$path='./uploads/';
				$this->db->select('file_name');
				$filename=$this->db->get_where('uploads',array('doc_id' => $this->input->post('UID')))->row()->file_name;
				if(file_exists($path.$filename))
				{
					unlink($path.$filename);
				}
				$this->db->where('doc_id IN ('.$this->input->post('UID').')');
				$this->db->delete('uploads');
				setcookie("err", 'Selected document deleted successfully', time()+2, '/');
			break;
		}
	}

	function Publish($page)
	{
		switch ($page)
		{
			case 'members':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('mem_id IN ('.$this->input->post('UID').')');
				$this->db->update('members', $data);
				setcookie("err", 'Selected member status changed successfully', time()+2, '/');
			break;
			case 'monthly_updates':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('doc_id IN ('.$this->input->post('UID').')');
				$this->db->update('uploads', $data);
				setcookie("err", 'Selected document status changed successfully', time()+2, '/');
			break;

			case 'current_properties':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('doc_id IN ('.$this->input->post('UID').')');
				$this->db->update('uploads', $data);
				setcookie("err", 'Selected document status changed successfully', time()+2, '/');
			break;

			case 'sold_properties':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('doc_id IN ('.$this->input->post('UID').')');
				$this->db->update('uploads', $data);
				setcookie("err", 'Selected document status changed successfully', time()+2, '/');
			break;

			case 'financial_reports':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('doc_id IN ('.$this->input->post('UID').')');
				$this->db->update('uploads', $data);
				setcookie("err", 'Selected document status changed successfully', time()+2, '/');
			break;

			case 'current_notes_held':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('doc_id IN ('.$this->input->post('UID').')');
				$this->db->update('uploads', $data);
				setcookie("err", 'Selected document status changed successfully', time()+2, '/');
			break;

			case 'disposed_notes':
				$data = array('status' => $this->input->post('status'));
				$this->db->where('doc_id IN ('.$this->input->post('UID').')');
				$this->db->update('uploads', $data);
				setcookie("err", 'Selected document status changed successfully', time()+2, '/');
			break;
		}
	}

		function sort_order($page)
	{
		switch($page)
		{
			
			case 'sold_properties':
				
				for($i=0;$i<=$this->input->post('rcnt');$i++)
				{
					$data = array('sort_order' => $this->input->post('sort_order'.$i));
					$this->db->where('doc_id', $this->input->post('id'.$i));
					$this->db->update('uploads', $data); 
				}
			break;

			case 'monthly_updates':
				
				for($i=0;$i<=$this->input->post('rcnt');$i++)
				{
					$data = array('sort_order' => $this->input->post('sort_order'.$i));
					$this->db->where('doc_id', $this->input->post('id'.$i));
					$this->db->update('uploads', $data); 
				}
			break;

			case 'current_properties':
				
				for($i=0;$i<=$this->input->post('rcnt');$i++)
				{
					$data = array('sort_order' => $this->input->post('sort_order'.$i));
					$this->db->where('doc_id', $this->input->post('id'.$i));
					$this->db->update('uploads', $data); 
				}
			break;

			case 'financial_reports':
				
				for($i=0;$i<=$this->input->post('rcnt');$i++)
				{
					$data = array('sort_order' => $this->input->post('sort_order'.$i));
					$this->db->where('doc_id', $this->input->post('id'.$i));
					$this->db->update('uploads', $data); 
				}
			break;

			case 'current_notes_held':
				
				for($i=0;$i<=$this->input->post('rcnt');$i++)
				{
					$data = array('sort_order' => $this->input->post('sort_order'.$i));
					$this->db->where('doc_id', $this->input->post('id'.$i));
					$this->db->update('uploads', $data); 
				}
			break;

			case 'disposed_notes':
				
				for($i=0;$i<=$this->input->post('rcnt');$i++)
				{
					$data = array('sort_order' => $this->input->post('sort_order'.$i));
					$this->db->where('doc_id', $this->input->post('id'.$i));
					$this->db->update('uploads', $data); 
				}
			break;
		}
	}
	function get_states($sid='')
	{
		$this->db->select('state_id,state_name');
		$query = $this->db->get('states');
		foreach ($query->result() as $row)
		{
			if($sid==$row->state_id)
			{
				$this->sname.='<option value='.$row->state_id.' selected>'.$row->state_name.'</option>';
			}
			else
			{
				$this->sname.='<option value='.$row->state_id.'>'.$row->state_name.'</option>';
			}
		}
		return $this->sname;
	}

	function get_date($slno)
	{
		return $this->db->query("SELECT DATE_FORMAT(payment_date,'%m-%d-%Y') AS payment_date from ".$this->db->dbprefix."membership_dues WHERE sl_no = ".$slno)->row()->payment_date;
	}

}