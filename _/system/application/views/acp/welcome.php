<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view($this->uri->slash_segment(1).'header');?>

<form name="frmlogin" method="post" action="<?=$dologin?>">
<div class="login">
	<div class="leftcorner"></div>
	<div class="box">
		<div style="margin-bottom: -30px;margin-top: 10px;font-weight: bold;color:red;text-align: center;">&nbsp;<?=$error?></div>
		<div class="con_sec"><h6>Login To Access...</h6><img src="<?=base_url().'images/acp/login_icon.gif'?>" /></div>
		<div class="middle_line"></div>
		<div class="right_box">
			<table width="100%" border="0" cellspacing="0" cellpadding="0" height="100%">
				<tr>
					<td width="35%" align="left" valign="top" class="bold_txt">User Name</td>
					<td width="65%" height="35" align="left" valign="top"><input type="text" name="uname"  id="uname" size="20" class="form2"/></td>
				</tr>
				<tr>
					<td class="bold_txt">Password</td>
					<td><input type="password" name="pswd" id="pswd" size="20" class="form2"/></td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td height="40" align="right" valign="bottom" style="padding-right: 23px;"><input type="submit" name="login" id="login" value="Login" class="button"></td>
				</tr>
			</table>
		</div>
	</div>
	<div class="rightcorner"></div>
</div>
</form>

<?$this->load->view($this->uri->slash_segment(1).'footer');?>