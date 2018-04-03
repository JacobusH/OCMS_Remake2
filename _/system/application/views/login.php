<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view('header');?>

<div class="flashsection"><img src="<?=base_url().'images/topimg_contact.jpg'?>" /></div>

<div class="contentarea">
	<div class="innercontainer">
		<fieldset>
			<legend>Login</legend>
			<div class="investorlogin1">
				<?if ($this->session->flashdata('send_msg'))
				{
					echo "<p style=color:red;font-size:15px;padding-left:30px;>".$this->session->flashdata('send_msg')."</p>";
				}
				?>

				<ul style="border: 2px solid #d7d7d7;width: 350px;padding: 20px 20px 20px 70px;">
					
					<form name="frmLogin" id="frmLogin" method="post" action="<?=site_url('account/invester_login')?>">
						<table width="100%">
							<tr>
								<td><strong>Investor Login</strong></td>
								<td><input type="text" name="uname" id="uname" /></td>
							</tr>
							<tr>
								<td><strong>Investor Password</strong></td>
								<td><input type="password" name="pswd" id="pswd"/></td>
							</tr>
							<tr height="50px">
								<td colspan="2" align="center">
								<input type="submit" name="submit" class="button" value="Login"/></td>
								<input type="hidden" name="rpage" value="<?=$this->uri->segment(1)?>"/>
							</tr>
						</table>
					</form>
				</ul>
			</div>
		</fieldset>
	</div>
</div>

<?$this->load->view('footer');?>