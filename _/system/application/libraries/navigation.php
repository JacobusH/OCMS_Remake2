<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class MY_Navigation {

	var $CI = '';

    function MY_Navigation()
    {
		// Instantiate the class		
		$this->CI =& get_instance();
		$this->CI->load->model('Mod_common');
    }

	// Front End navigation starts //

	function f_top_navigation()
	{
		$str = '';
		$page = ($this->CI->uri->segment(1) <> '') ? $this->CI->uri->segment(1) : 'home';
		$rows = $this->CI->Mod_common->show_menu_items();

			$str .= '<ul>';				

				foreach($rows as $row)
				{
					$s_cnt = $this->CI->Mod_common->sub_menu_count($row->id);

					$url = ($s_cnt > 0) ? 'javascript:;': site_url($row->alias);

					$class = ($page == $row->alias) ? 'class="selected select"': '';

					$str .= '<li '.$class.'><a href="'.$url.'"><span>'.$row->title.'</span>';

					if($s_cnt > 0)
					{
						$str .= $this->_list($row->id, 'droptop');
						$str .= '</li>';
						$this->sub_menus_list = '';
					}
					else
					{
						$str .= '</a></li>';
					}
				}

			$str .= '</ul>';
			$str .= '<br style="clear: left" />';

		return $str;
	}

	function _list($pid, $class)
	{
		$rows = $this->CI->Mod_common->get_sub_menu_items($pid);

		$this->sub_menus_list .= '<!--[if gte IE 7]><!--></a><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->';
			$this->sub_menus_list .= '<ul>';			
				$this->sub_menus_list .= '<li><span class="'.$class.'"></span></li>';
		
				if($rows > 0)
				{
					foreach($rows as $row)
					{
						$s_cnt = $this->CI->Mod_common->sub_menu_count($row->id);

						$url = ($s_cnt > 0) ? 'javascript:;': site_url($row->alias);

						$this->sub_menus_list .= '<li><a href="'.$url.'">'.$row->title.'</a>';

						if($s_cnt > 0)
						{
							$this->_list($row->id, 'subdroptop');
						}

						$this->sub_menus_list .= '</li>';
					}
				}
		
			$this->sub_menus_list .= '</ul>';
		$this->sub_menus_list .= '<!--[if lte IE 6]></td></tr></table></a><![endif]-->';

		return $this->sub_menus_list;
	}

	function footer_navigation()
	{
		$rows = $this->CI->Mod_common->get_footer_list();

		if($rows > 0)
		{
			$str = '';
			foreach($rows as $row)
			{
				$str .= '<a href="'.site_url($row->alias).'">'.$row->title.'</a>';
			}

			return $str;
		}
		else
		{
			return FALSE;
		}		
	}

	function f_quick_navigation()
	{
		$str = '';
		$str .= '<div class="search">';
			$str .= '<ul class="">';
				$str .= '<li>Iam intrested in...';
					$str .= '<ul class="droplist">';
						$str .= '<li>';
							$str .= '<ul class="menu">';
								$str .= '<li class="maintitle">Company</li>';
								$str .= '<li><a href="'.site_url('overview').'">Overview</a></li>';
								$str .= '<li><a href="'.site_url('facts-figures').'">Facts &amp; Figures</a></li>';
								$str .= '<li><a href="'.site_url('mission-quality-policy').'">Mission &amp; Quality Policy</a></li>';
								$str .= '<li><a href="'.site_url('investors-relations').'">Investors Relations</a></li>';
								$str .= '<li><a href="'.site_url('iso-90012008-certification').'">ISO 9001:2008 Certification</a></li>';
								$str .= '<li><a href="'.site_url('client-testionials').'">Client Testimonials</a></li>';
							$str .= '</ul>';

							$str .= '<ul class="menu">';
								$str .= '<li class="maintitle">Solutions</li>';
								$str .= '<li><a href="'.site_url('outsource-inforlinx').'">Outsource @ Inforlinx</a></li>';
								$str .= '<li><a href="'.site_url('engagement-models').'">Engagement Models</a></li>';
								$str .= '<li><a href='.site_url('technologies').'>Technologies</a></li>';
								$str .= '<li><a href='.site_url('methodology').'>White Papers &amp; Articles</a></li>';
							$str .= '</ul>';
		  
							$str .= '<ul class="menu">';
								$str .= '<li class="maintitle">Careers</li>';
								$str .= '<li><a href='.site_url('careers-inforilnx').'>Careers @ Inforilnx</a></li>';
								$str .= '<li><a href='.site_url('current-job-openings').'>Current Job Openings</a></li>';
							$str .= '</ul>';
						   
							$str .= '<br class="clear" />';

							$str .= '<ul class="menu">';
								$str .= '<li class="maintitle">SERVICES</li>';
								$str .= '<li class="title-links">Web Development</li>';
								$str .= '<li><a href='.site_url('web-design-services').'>Website Design &amp; Programming</a></li>';
								$str .= '<li><a href='.site_url('web-application-development').'>Web Application Development</a></li>';
								$str .= '<li><a href='.site_url('e-commerce-solutions').'>E-Business &amp; E-Commerce Solutions</a></li>';
								$str .= '<li><a href='.site_url('enterprise_portal_development').'>Enterprise Portal Development</a></li>';
								$str .= '<li><a href='.site_url('rich-internet-applications').'>Rich Internet Applications</a></li>';
								$str .= '<li><a href='.site_url('web-based-business-applications').'>Business Applications</a></li>';
							$str .= '</ul>';
							$str .= '<ul class="menu">';
								$str .= '<li class="title-links">Application Development</li>';
								$str .= '<li><a href='.site_url('custom-application-development').'>Custom Application Development</a></li>';
								$str .= '<li><a href='.site_url('application-maintenance-services').'>Application Maintenance Services </a></li>';
								$str .= '<li><a href='.site_url('web-enabling-legacy-applications').'>Web-Enabling Legacy Applications</a></li>';
								$str .= '<li><a href='.site_url('crm-services').'>Customer Relationship Management</a></li>';
								$str .= '<li><a href='.site_url('interactive-learning').'>Interactive Learning</a></li>';
							$str .= '</ul>';	
							$str .= '<ul class="menu">';
								$str .= '<li class="title-links">SEO &amp; Marketing Consulting</li>';
								$str .= '<li><a href='.site_url('seo-services').'>Search Engine Optimization</a></li>';
								$str .= '<li><a href='.site_url('pay-per-click-management-services').'>Pay Per Click ManagementService</a></li>';
								$str .= '<li><a href='.site_url('conversion-optimization').'>Conversion Optimization</a></li>';
								$str .= '<li><a href='.site_url('social-media-marketing-services').'>Social Media Marketing</a></li>';
								$str .= '<li><a href='.site_url('seo-web-design').'>Search Optimized Web design</a></li>';
							$str .= '</ul>';
					  
							$str .= '<br class="clear" />';

							$str .= '<ul class="menu">';
								$str .= '<li class="title-links">Mobile Application Development</li>';
								$str .= '<li><a href='.site_url('iphone-application-development').'>Iphone Apps Development</a></li>';
								$str .= '<li><a href='.site_url('blackberry-application-development').'>Blackberry Apps Development</a></li>';
								$str .= '<li><a href='.site_url('android-application-development').'>Anaroid Apps Development</a></li>';
								$str .= '<li><a href='.site_url('windows-application-development').'>Windows Apps Development</a></li>';
							$str .= '</ul>';								
						$str .= '</li>';
					$str .= '</ul>';
				$str .= '</li>';
			$str .= '</ul>';
		$str .= '</div>';

		return $str;
	}
	

	// Front End navigation ends //

	// Control Panel navigation starts //

	function home_navigation()
	{	
		$dir_list = ($this->CI->session->userdata('gblDirList') <> '') ? $this->CI->session->userdata('gblDirList') : array();
		$str = '';

		foreach($dir_list as $dir => $files)
		{
			$str .= '<div id="boxed1">';

				$str .= '<div class="eg-bar"><span id="faq'.$dir.'-title" class="iconspan"><img src="'.base_url().'images/acp/tri_bullet_down.gif"/></span>'.humanize($dir).'</div>';

				$str .= '<div id="faq'.$dir.'" class="icongroup1">';

					$str .= '<div class="list1">';

						foreach($files as $file)
						{
							$str .= '<ul>';

								$str .= '<li><a href="'.site_url(array($this->CI->uri->segment(1), $dir, $file)).'">'.humanize($file).'</a></li>';

							$str .= '</ul>';
						}

						$str .= '<br style="clear:both;"/>';

					$str .= '</div>';

				$str .= '</div>';

			$str .= '</div>';
		}		

		return $str;
	}

	function left_navigation()
	{		
		$dir_list = $this->CI->session->userdata('gblDirList');
		$arr_seg = $this->CI->uri->segment_array();
		$str = '';

		$str = '<div id="masterdiv">';

			foreach($dir_list as $dir => $files)
			{
				$str .= '<div class="sdmenu">';

					$str .= '<div>';

						$str .= '<div class="sdgrad">';

							$str .= '<a href="javascript:;" onClick="SwitchMenu(\''.$dir.'\')">'.humanize($dir).'</a>';

						$str .= '</div>';

					$str .= '</div>';

					$str .= '<span class="submenu" id="'.$dir.'">';

						foreach($files as $file)
						{	
							$active = ($this->CI->uri->rsegment(1).'/'.$this->CI->uri->rsegment(2) == $dir.'/'.$file) ? 'class="active"': '';

							$str .= '<a href="'.site_url(array($this->CI->uri->segment(1), $dir, $file)).'" '.$active.'>'.humanize($file).'</a>';
						}

					$str .= '</span>';

				$str .= '</div>';
			}

		$str .= '</div>';

		$str .= '<script language="javascript">';

			$str .= 'SwitchMenu(\''.$arr_seg[2].'\')';

		$str .= '</script>';

		return $str;		
	}	

	function actions()
	{
		$str = '';		
		$gblPublish   = $this->CI->session->userdata('gblPublish');
		$gblAdd       = $this->CI->session->userdata('gblAdd');
		$gblEdit      = $this->CI->session->userdata('gblEdit');
		$gblTrash     = $this->CI->session->userdata('gblTrash');

		if($this->CI->session->userdata('gblAdminId') <> '')
		{
			$str .= '<table border="0" align="right" cellpadding="0" cellspacing="0" id="toolbar">';

				$str .= '<tr>';

					$str .= '<td><a class="toolbar" href="'.site_url($this->CI->uri->segment(1)).'"><span class="icon"><img src="'.base_url().'images/acp/home.png'.'" alt="Home" name="home" width="16" height="16" border="0" align="middle" title="Home"></span><span class="padd"> Home</span></a></td>';

					if(($this->CI->input->post('pType') == 'Add') || ($this->CI->input->post('pType') == 'Edit'))
					{
						$str .= '<td><a class="toolbar" href="javascript:;" onclick="javascript: fnSave(\'\');" ><span class="icon"><img src="'.base_url().'images/acp/save.png'.'" alt="Save" name="save" width="16" height="16" border="0" align="middle" title="Save"></span><span class="padd"> Save</span></a></td>';

						$str .= '<td><a class="toolbar" href="'.site_url($this->CI->uri->segment_array()).'"><span class="icon"><img src="'.base_url().'images/acp/cancel.png'.'" alt="Cancel" name="cancel" width="16" height="16" border="0" align="middle" title="Cancel"></span><span class="padd"> Cancel</span></a></td>';
					}
					else
					{						
						if(@$gblPublish[$this->CI->uri->rsegment(1).'/'.$this->CI->uri->rsegment(2)] == 'Y')
						{
							$str .= '<td><a class="toolbar" href="javascript:;" onclick="javascript: fnPublishAll(\''.site_url($this->CI->uri->segment_array()).'\',\'1\');"><span class="icon"><img src="'.base_url().'images/acp/publish.png'.'" alt="Publish" name="publish" width="16" height="16" border="0" align="middle" title="Publish"></span><span class="padd"> Publish</span></a></td>';

							$str .= '<td><a class="toolbar" href="javascript:;" onclick="javascript: fnPublishAll(\''.site_url($this->CI->uri->segment_array()).'\',\'0\');"><span class="icon"><img src="'.base_url().'images/acp/unpublish.png'.'" alt="UnPublish" name="unpublish" width="16" height="16" border="0" align="middle" title="UnPublish"></span><span class="padd"> Unpublish</span></a></td>';
						}
						
						if(@$gblAdd[$this->CI->uri->rsegment(1).'/'.$this->CI->uri->rsegment(2)] == 'Y')
						{
							$str .= '<td><a class="toolbar" href="javascript:;" onclick="javascript: fnAdd(\''.site_url($this->CI->uri->segment_array()).'\',\'Add\');"><span class="icon"><img src="'.base_url().'images/acp/new.png'.'" alt="New" name="new" width="16" height="16" border="0" align="middle" title="New"></span><span class="padd"> New</span></a></td>';
						}

						if(@$gblTrash[$this->CI->uri->rsegment(1).'/'.$this->CI->uri->rsegment(2)] == 'Y')
						{
							$str .= '<td><a class="toolbar" href="javascript:;" onclick="javascript: fnDelete(\''.site_url($this->CI->uri->segment_array()).'\',\'Del\');"><span class="icon"><img src="'.base_url().'images/acp/delete.png'.'" alt="Delete" name="delete" width="16" height="16" border="0" align="middle" title="Delete"></span><span class="padd"> Delete</span></a></td>';
						}
					}

					$str .= '<td><a class="toolbar" href="'.site_url($this->CI->uri->slash_segment(1).'account/dologout').'"><span class="icon"><img src="'.base_url().'images/acp/logout.png'.'" alt="Logout" name="logout" width="16" height="16" border="0" align="middle" title="Logout"></span><span class="padd"> Logout</span></a></td>';

				$str .= '</tr>';

			$str .= '</table>';

		}

		return $str;
	}

	function sub_actions_title($width = '8')
	{
		$str = '';
		$gblPublish   = $this->CI->session->userdata('gblPublish');
		$gblEdit      = $this->CI->session->userdata('gblEdit');
		$gblTrash     = $this->CI->session->userdata('gblTrash');
		
		if((@$gblEdit[$this->CI->uri->rsegment(1).'/'.$this->CI->uri->rsegment(2)] == 'Y') || (@$gblTrash[$this->CI->uri->rsegment(1).'/'.$this->CI->uri->rsegment(2)] == 'Y') || (@$gblPublish[$this->CI->uri->rsegment(1).'/'.$this->CI->uri->rsegment(2)] == 'Y'))
		{
			$str = '<th width="'.$width.'%">Actions</th>';
		}

		return $str;
	}

	function sub_actions($id, $publish)
	{
		$str = '';$publish_str = '';$edit = '';$delete = '';
		$gblPublish   = $this->CI->session->userdata('gblPublish');
		$gblEdit      = $this->CI->session->userdata('gblEdit');
		$gblTrash     = $this->CI->session->userdata('gblTrash');

		if($this->CI->session->userdata('gblAdminId') <> '')
		{
			$edit = 'Edit';$del = 'Del';$pub = 'Publish';

			if(@$gblPublish[$this->CI->uri->rsegment(1).'/'.$this->CI->uri->rsegment(2)] == 'Y')
			{
				$pclass = ($publish == 1) ? 'publish' : 'unpublish';

				$publish_str = '<a href="javascript:;" onclick="javascript: fnPublish(\''.site_url($this->CI->uri->segment_array()).'\',\''.$id.'\',\''.$publish.'\',\''.$pub.'\');" class="'.$pclass.'" alt="Publish" title="Publish"></a>';
			}			

			if(@$gblEdit[$this->CI->uri->rsegment(1).'/'.$this->CI->uri->rsegment(2)] == 'Y')
			{
				$edit = '<a href="javascript:;" onclick="javascript: fnEdit(\''.site_url($this->CI->uri->segment_array()).'\',\''.$id.'\',\''.$edit.'\');" class="edit" alt="Edit" title="Edit"></a>';
			}

			if(@$gblTrash[$this->CI->uri->rsegment(1).'/'.$this->CI->uri->rsegment(2)] == 'Y')
			{
				$delete = '<a href="javascript:;" onclick="javascript: fnDel(\''.site_url($this->CI->uri->segment_array()).'\',\''.$id.'\',\''.$del.'\');" class="delete" alt="Delete" title="Delete"></a>';
			}

			$str = '<td align="center">'.$publish_str.$edit.$delete.'</td>';
		}

		return $str;
	}

	function number_limit($low = 1,$high = 1,$step = 1,$slimit = 1)
	{
		$this->arrlmt = range($low,$high,$step);
		$this->lmt = '';
		foreach($this->arrlmt as $val)
		{
			$selected = ($val == $slimit) ? 'selected' : '';
			$this->lmt = $this->lmt.'<option value="'.$val.'" "'.$selected.'">'.$val.'</option>';			
		}

		return $this->lmt;
	}

	function paging($url, $pagecount, $pg, $sortby, $disType)
	{
		$str = '';

		if($pg > 1)
		{
			$str .= '<a href="'.site_url(array($this->CI->uri->segment(1), $url, 'sortby', $sortby, 'disType', $disType, 'pg', 1)).'"><div class="but"><div class="first">First</div></div></a>';
		}
		else
		{
			$str .= '<a href="javascript:;"><div class="but"><div class="first">First</div></div></a>';
		}

		if($pg > 1)
		{
			$str .= '<a href="'.site_url(array($this->CI->uri->segment(1), $url, 'sortby', $sortby, 'disType', $disType, 'pg', ($pg-1))).'"><div class="but"><div class="prev">Prev</div></div></a>';
		}
		else
		{
			$str .= '<a href="javascript:;"><div class="but"><div class="prev">Prev</div></div></a>';
		}

		if($pagecount > $pg)
		{
			$str .= '<a href="'.site_url(array($this->CI->uri->segment(1), $url, 'sortby', $sortby, 'disType', $disType, 'pg', ($pg+1))).'"><div class="but"><div class="next">Next</div></div></a>';
		}
		else
		{
			$str .= '<a href="javascript:;"><div class="but"><div class="next">Next</div></div></a>';
		}

		if($pagecount > $pg)
		{
			$str .= '<a href="'.site_url(array($this->CI->uri->segment(1), $url, 'sortby', $sortby, 'disType', $disType, 'pg', $pagecount)).'"><div class="but"><div class="end">End</div></div></a>';
		}
		else
		{
			$str .= '<a href="javascript:;"><div class="but"><div class="end">End</div></div></a>';
		}
		
		return $str;		
	}

	// Control Panel navigation ends //

}