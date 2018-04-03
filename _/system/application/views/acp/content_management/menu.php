<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view($this->uri->slash_segment(1).'header');

if($this->input->post('pType') == ''){?>

<form name="frmView" method="post">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="200" class="leftpart" id="leftpart" valign="top" height="100%"><?=$left_navigation?></td>
    <td align="center" valign="top">
		<div class="rightpart">            
			<div class="topsec">
				<h1>&nbsp;<!-- pagename --></h1>
				<div class="msg" <?if($error == ''){echo 'style="display: none;"';}?>><?=$error?></div>
			</div>			
			<!-- <div class="msg"><?=get_cookie('err')?></div> -->
			<div class="tablepart">
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="top">
					<tr>
						<td width="50%" align="left"><?=$this->common->menu_title($this->pid)?> <?=humanize($title).' ( '.$this->t_cnt.' )'?></td>
						<td width="50%" align="right">page 
							<?='<select name="pagevalue" id="pagevalue" class="select" onchange="window.location.href=\''.site_url(array($this->uri->segment(1), $this->url, 'sortby', $this->sortby, 'disType', $this->disType, 'pg', '\'+this.value+\'')).'\'">'.$number_limit.'</select> of <span>'.$this->pg_cnt.'</span>';?>
						</td>
					</tr>
				</table>
				<?if($this->t_cnt > 0){
				$this->disType1 = (($this->disType == '') || ($this->disType == 'DESC')) ? 'ASC' : 'DESC';?>
				<table width="100%" border="0" cellspacing="1" cellpadding="0">
					<tr>
						<th width="3%"><input type="checkbox" name="checkall" id="checkall" value="0" onclick="javascript: fnCheckAll();"/></th>
						<th width="57%"><a href="<?=site_url(array($this->uri->segment(1), $this->url, 'sortby', 'title', 'disType', $this->disType1, 'pg', $this->pg, 'pid', $this->pid ))?>">Menu Item</a></th>
						<th width="12%"><a href="<?=site_url(array($this->uri->segment(1), $this->url, 'sortby', 'display_in', 'disType', $this->disType1, 'pg', $this->pg, 'pid', $this->pid ))?>">Menu Type</a></th>						
						<th width="18%"><img src="<?=base_url().'images/acp/save.png'?>" width="16" height="16" style="cursor: pointer;" onclick="sort_order('<?=site_url($this->uri->segment_array())?>', 'sort_order');"> | <a href="<?=site_url(array($this->uri->segment(1), $this->url, 'sortby', 'title', 'disType', $this->disType1, 'pg', $this->pg, 'pid', $this->pid ))?>">Sort Order</a></th>
						<?=$this->navigation->sub_actions_title(10)?>
					</tr>
					<?foreach($result as $key => $row){
					  $this->bgClass = ($key % 2) ? 'odd' : 'even';?>					
					<tr class="<?=$this->bgClass?>">
						<td align="center"><input type="checkbox" name="check" id="check" value="<?=$row->id?>"/></td>
						<td align="left"><a href="<?=site_url(array($this->uri->segment(1), $this->url, 'sortby', $this->sortby, 'disType', $this->disType, 'pg', $this->pg, 'pid', $row->id ))?>"><?=$row->title?></a></td>
						<td align="center"><?=($row->display_in == 0) ? 'Top Menu' : 'Footer Menu';?></td>
						<td align="center"><input type="text" name="sort_order<?=$key?>" id="sort_order<?=$key?>" class="form1" style="width: 40px;" value="<?=$row->sort_order?>">
						<input type="hidden" name="id<?=$key?>" id="id<?=$key?>" value="<?=$row->id?>"></td>
						<?=$this->navigation->sub_actions($row->id, $row->status)?>
					</tr>
					<?}?>
				</table>
				<?}else{?>
				<table width="100%" border="0" cellspacing="1" cellpadding="0">
					<tr>
						<th width="100%">&nbsp;</th>
					</tr>
					<tr class="odd">
						<td align="center" width="100%" height="100" class="bold_txt"><b>No records available to display</b></td>
					</tr>					
				</table>
				<?}?>
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="paging">
					<tr>
						<td width="38%" align="left"><?if($this->pid > 0){?><input type="button" name="back" value="Back" class="button" onclick="window.history.back();"><?}?></td>
						<td width="62%" align="center"><?=$paging?></td>
					</tr>
				</table>
			</div>
		</div>
		<input type="hidden" name="sType" id="sType"><input type="hidden" name="pType" id="pType"><input type="hidden" name="UID" id="UID"><input type="hidden" name="status" id="status"><input type="hidden" name="rcnt" id="rcnt" value="<?=@$key?>">
	</td>
  </tr>
</table>
</form>
<?}else if(($this->input->post('pType') == 'Add') || ($this->input->post('pType') == 'Edit')){?>

<script type="text/javascript">
function fnSave(url){
	var val = fnValidation('frmEdit');
	if(val == true){
		fnSubmit('frmEdit',url);
	}
}
</script>
<form name="frmEdit" method="post" enctype="multipart/form-data">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="200" class="leftpart" id="leftpart" valign="top" height="100%"><?=$left_navigation?></td>
    <td align="center" valign="top">
		<div class="rightpart">
			<div class="topsec">
				<h1>&nbsp;<!-- pagename --></h1>
			</div>
			<div class="tablepart">
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="top">
					<tr>
						<th width="50%" style="text-align: left;padding-left: 10px;"><?=$this->input->post('pType').nbs(1).humanize($title)?></th>
						<th width="50%" align="right">&nbsp;</th>
					</tr>
				</table>
				<table border="0" cellspacing="0" cellpadding="0" class="middle">
					<tr>
					  <td width="18%" align="left">Parent</td>
					  <td width="2%" align="center">:</td>
					  <td width="80%" align="left"><?=form_dropdown('parent_id', $this->common->menu_list(), $this->pid, 'id="parent_id" class="form1" style="width: 300px;"')?></td>
					</tr>
					<tr>
					  <td align="left">Title</td>
					  <td align="center">:</td>
					  <td align="left"><input type="text" class="form1" title="title" name="title" id="title" style="width: 300px;" value="<?=$row['title']?>" readonly></td>
					</tr>
					<tr>
					  <td align="left">Alias</td>
					  <td align="center">:</td>
					  <td align="left"><input type="text" class="form1" title="alias" name="alias" id="alias" style="width: 300px;" value="<?=$row['alias']?>" readonly></td>
					</tr>					
					<tr>
					  <td align="left">Back Ground Image</td>
					  <td align="center">:</td>
					  <td align="left"><input type="file" class="form1" name="image" id="image"> <?=$row['image']?><input type="hidden" name="pre_img" id="pre_img" value="<?=$row['image']?>"><p style="color: red;padding-top: 3px;font-weight: bold;">Image Size :- width: 800px, height: 217px</p></td>
					</tr>
					<?if($this->pid > 0){?>
					<tr>
					  <td align="left">Is Default</td>
					  <td align="center">:</td>
					  <td align="left"><input type="checkbox" name="is_default" id="is_default" value="1" <?if($row['is_default'] == 1){echo 'checked';}?>></td>
					</tr>
					<?}else{?>
					<tr>
					  <td align="left">Display In</td>
					  <td align="center">:</td>
					  <td align="left"><?=form_dropdown('display_in', array('Top Menu', 'Footer Menu', 'None'), $row['display_in'], 'id="display_in" class="form1" style="width: 120px;"')?></td>
					</tr>
					<?}?>
					<tr>
					  <td align="left">Meta Title</td>
					  <td align="center">:</td>
					  <td align="left"><input type="text" class="form1" name="meta_title" id="meta_title" style="width: 300px;" value="<?=strip_slashes($row['meta_title'])?>"></td>
					</tr>
					<tr>
					  <td align="left" valign="top">Meta Keywords</td>
					  <td align="center" valign="top">:</td>
					  <td align="left"><textarea class="form1" name="meta_keywords" id="meta_keywords" style="width: 300px;height: 40px;"><?=strip_slashes($row['meta_keywords'])?></textarea></td>
					</tr>
					<tr>
					  <td align="left" valign="top">Meta Description</td>
					  <td align="center" valign="top">:</td>
					  <td align="left"><textarea class="form1" name="meta_desc" id="meta_desc" style="width: 300px;height: 40px;"><?=strip_slashes($row['meta_desc'])?></textarea></td>
					</tr>
				</table>				
			</div>
		</div>
		<input type="hidden" name="sType" id="sType" value="<?=$this->input->post('pType')?>"><input type="hidden" name="UID" id="UID" value="<?=$this->input->post('UID')?>">
	</td>
  </tr>
</table>
</form>
<?}

$this->load->view($this->uri->slash_segment(1).'footer');
?>