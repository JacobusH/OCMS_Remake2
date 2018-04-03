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
						<td width="50%" align="left"><?=humanize($title).' ( '.$this->t_cnt.' )'?></td>
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
						<th width="59%"><a href="<?=site_url(array($this->uri->segment(1), $this->url, 'sortby', 'title', 'disType', $this->disType1, 'pg', $this->pg ))?>">Document Title</a></th>

						<th width="18%"><img src="<?=base_url().'images/acp/save.png'?>" width="16" height="16" style="cursor: pointer;" onclick="sort_order('<?=site_url($this->uri->segment_array())?>', 'sort_order');"> | <a href="<?=site_url(array($this->uri->segment(1), $this->url, 'sortby', 'sort_order', 'disType', $this->disType1, 'pg', $this->pg, 'pid', $this->pid ))?>">Sort Order</a></th>
						<?=$this->navigation->sub_actions_title(10)?>
					</tr>
					<?foreach($result as $key => $row){
					  $this->bgClass = ($key % 2) ? 'odd' : 'even';?>					
					<tr class="<?=$this->bgClass?>">
						<td align="center"><input type="checkbox" name="check" id="check" value="<?=$row->doc_id?>"/></td>
						<td align="left"><?=$row->title?></td>
						<td align="center"><input type="text" name="sort_order<?=$key?>" id="sort_order<?=$key?>" class="form1" style="width: 40px;" value="<?=$row->sort_order?>">
						<input type="hidden" name="id<?=$key?>" id="id<?=$key?>" value="<?=$row->doc_id?>"></td>
						<?=$this->navigation->sub_actions($row->doc_id, $row->status)?>
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
						<td width="38%" align="left">&nbsp;</td>
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
<?}else if(($this->input->post('pType') == 'Add') || ($this->input->post('pType') == 'Edit')){
$path='../liaas/uploads/'
?>
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
					  <td width="13%" align="left">Document Title</td>
					  <td width="2%" align="center">:</td>
					  <td width="85%" align="left"><input type="text" class="form1" title="Document Title" name="title" id="title" style="width: 180px;" value="<?=$row['title']?>"></td>
					</tr>
					<tr>
					  <td align="left">Upload</td>
					  <td align="center">:</td>
					  <td align="left"><input type="file" name="file_name" id="file_name" class="form1" value="<?=$row['file_name']?>">
					  <span style="color:#970505;font-weight:bold;"><?=$row['file_name']?></span><input type="hidden" name="filename" id="filename" value="<?=$row['file_name']?>">
					  <p style="padding:10px 0px 0px 8px;"><span style="color:red;font-size:13px;"><b>[Upload .pdf | .doc |.docx only]</b></span></p>
					  </td>
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