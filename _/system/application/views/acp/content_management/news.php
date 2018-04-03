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
						<th width="72%"><a href="<?=site_url(array($this->uri->segment(1), $this->url, 'sortby', 'news_title', 'disType', $this->disType1, 'pg', $this->pg ))?>">News Title</a></th>
						<th width="15%"><a href="<?=site_url(array($this->uri->segment(1), $this->url, 'sortby', 'news_date', 'disType', $this->disType1, 'pg', $this->pg ))?>">News Date</a></th>
						<?=$this->navigation->sub_actions_title(10)?>
					</tr>
					<?foreach($result as $key => $row){
					  $this->bgClass = ($key % 2) ? 'odd' : 'even';?>					
					<tr class="<?=$this->bgClass?>">
						<td align="center"><input type="checkbox" name="check" id="check" value="<?=$row->news_id?>"/></td>
						<td align="left"><?=$row->news_title?></td>
						<td align="center"><?=$row->news_date?></td>
						<?=$this->navigation->sub_actions($row->news_id, $row->status)?>
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
		<input type="hidden" name="sType" id="sType"><input type="hidden" name="pType" id="pType"><input type="hidden" name="UID" id="UID"><input type="hidden" name="status" id="status">
	</td>
  </tr>
</table>
</form>
<?}else if(($this->input->post('pType') == 'Add') || ($this->input->post('pType') == 'Edit')){
						  
$tmp = explode('-', $row['news_date']);
$ndate = $tmp[1].'-'.$tmp[2].'-'.$tmp[0];?>

<script type="text/javascript">
function fnSave(url){
	var val = fnValidation('frmEdit');
	if(val == true){
		fnSubmit('frmEdit',url);
	}
}

var dateAvailable = new ctlSpiffyCalendarBox("dateAvailable", "frmEdit", "news_date","news_date","<?=$ndate?>",scBTNMODE_CALBTN);
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
					  <td width="15%" align="left" valign="top">News Title</td>
					  <td width="2%" align="center" valign="top">:</td>
					  <td width="83%" align="left"><input type="text" class="form1" name="news_title" id="news_title" style="width: 300px;" title="news title" value="<?=$row['news_title']?>"></td>
					</tr>
					<tr>
					  <td width="15%" align="left">Is Featured</td>
					  <td width="2%" align="center">:</td>
					  <td width="83%" align="left"><input type="checkbox" name="is_featured" id="is_featured" value="1" <?if($row['is_featured'] == 1){echo 'checked';}?>></td>
					</tr>	
					<tr>
					  <td align="left" valign="top">News Date</td>
					  <td align="center" valign="top">:</td>
					  <td align="left"><script language="javascript">dateAvailable.writeControl(); dateAvailable.dateFormat="MM-dd-yyyy";</script></td>
					</tr>
					<tr>
					  <td align="left">Link</td>
					  <td align="center">:</td>
					  <td align="left"><input type="text" class="form1" name="link" id="link" style="width: 300px;" value="<?=$row['link']?>"></td>
					</tr>
					<tr>
					  <td align="left" valign="top">News Description</td>
					  <td align="center" valign="top">:</td>
					  <td align="left">&nbsp;</td>
					</tr>
					<tr>
					  <td align="left" colspan="3"><?=$this->fckeditor->create('news_desc', strip_slashes($row['news_desc']))?></td>
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