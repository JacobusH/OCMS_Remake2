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
						<th width="50%"><a href="<?=site_url(array($this->uri->segment(1), $this->url, 'sortby', 'fname', 'disType', $this->disType1, 'pg', $this->pg ))?>">Administrator Name</a></th>
						<th width="37%"><a href="<?=site_url(array($this->uri->segment(1), $this->url, 'sortby', 'email', 'disType', $this->disType1, 'pg', $this->pg ))?>">E-Mail</a></th>
						<?=$this->navigation->sub_actions_title(10)?>
					</tr>
					<?foreach($result as $key => $row){
					  $this->bgClass = ($key % 2) ? 'odd' : 'even';?>					
					<tr class="<?=$this->bgClass?>">
						<td align="center"><input type="checkbox" name="check" id="check" value="<?=$row->admin_id?>"/></td>
						<td align="left"><?=$row->fname.' '.$row->lname?></td>
						<td align="left"><?=$row->email?></td>
						<?=$this->navigation->sub_actions($row->admin_id, $row->status)?>
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
<?}else if(($this->input->post('pType') == 'Add') || ($this->input->post('pType') == 'Edit')){?>

<script type="text/javascript">
function fnSave(url){
	var val = fnValidation('frmEdit');
	if(val == true){
		if(validateEmail(document.frmEdit.email) == false){
			alert('Invalid Email');
			document.frmEdit.email.focus();
			return false;
		}
		document.frmEdit.action = url;
		<?if($this->input->post('pType') == 'Add'){?>
			xmlHttpfnSave = GetXmlHttpObject()
			if(xmlHttpfnSave == null)
			{
				alert ("Browser does not support HTTP Request");
				return;
			}
			createCookie('uname',document.frmEdit.uname.value,1);
			var url = "<?=site_url('acp/general_settings/validate_administrator')?>?sessid="+Math.random();
			xmlHttpfnSave.onreadystatechange=stateChangedfnSave;
			xmlHttpfnSave.open("GET",url,true);
			xmlHttpfnSave.send(null);
		<?}else{?>
			document.frmEdit.submit();
		<?}?>		
	}
}

function stateChangedfnSave(){
	if(xmlHttpfnSave.readyState == 4 || xmlHttpfnSave.readyState == "complete")
    {
		if(xmlHttpfnSave.responseText == 'Y')
		{
			document.frmEdit.submit();
		}
		else if(xmlHttpfnSave.responseText == 'N')
		{
			alert('Member already exist with this username');
			document.frmEdit.uname.focus();
			return false;
		}
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
					  <td width="15%" align="left">First Name</td>
					  <td width="2%" align="center">:</td>
					  <td width="83%" align="left"><input type="text" class="form1" name="fname" id="fname" title="first name" style="width: 180px;" value="<?=$row['fname']?>"></td>
					</tr>
					<tr>
					  <td align="left">Last Name</td>
					  <td align="center">:</td>
					  <td align="left"><input type="text" class="form1" name="lname" id="lname" title="last name" style="width: 180px;" value="<?=$row['lname']?>"></td>
					</tr>
					<tr>
					  <td align="left">E-Mail</td>
					  <td align="center">:</td>
					  <td align="left"><input type="text" class="form1" name="email" id="email" title="email" style="width: 180px;" value="<?=$row['email']?>"></td>
					</tr>
					<tr>
					  <td align="left">Phone</td>
					  <td align="center">:</td>
					  <td align="left"><input type="text" class="form1" name="phone" id="phone" title="phone" style="width: 180px;" value="<?=$row['phone']?>"></td>
					</tr>
					<tr>
					  <td align="left">Username</td>
					  <td align="center">:</td>
					  <td align="left"><input type="text" class="form1" name="uname" id="uname" title="user name" style="width: 180px;" value="<?=$row['uname']?>" <?if($this->input->post('pType') == 'Edit'){echo 'readonly';}?>></td>
					</tr>
					<tr>
					  <td align="left">Password</td>
					  <td align="center">:</td>
					  <td align="left"><input type="text" class="form1" name="pswd" id="pswd" title="password" style="width: 180px;" value="<?=$this->encrypt->decode($row['pswd_key'])?>"></td>
					</tr>
					<tr>
					  <td align="left" colspan="3"><?=($this->input->post('UID') <> $this->session->userdata('gblAdminId')) ? $this->control->_permissions($this->input->post('UID')) : '';?></td>
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