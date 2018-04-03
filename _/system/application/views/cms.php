<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view('header');?>

<div class="flashsection"><img src="<?=base_url().'uploads/bg/'.$bgimage?>" /></div>

<div class="contentarea">
	<div class="innercontainer">
		<fieldset>
			<legend><?=$heading?></legend>
			
			<?=$description?>
    
			<?if($display_login == 1){
			if ($this->session->flashdata('send_msg'))
			{
				echo "<p style=color:red;font-size:15px;>".$this->session->flashdata('send_msg')."</p>";
			}
			?>
			<form name="frmLogin" id="frmLogin" method="post" action="<?=site_url('account/invester_login')?>">
				<div class="investorlogin">
		  
					<strong>Investor Login</strong><br />
					<input type="text" name="uname" id="uname" />
				</div>
		
				<div class="investorlogin">
					<strong>Investor Password</strong><br />
					<input type="password" name="pswd" id="pswd"/>
				</div>
		
				<div class="investorlogin btn">
					<input type="submit" name="submit" class="button" value="Login"/>
					<input type="hidden" name="rpage" value="<?=$this->uri->segment(1)?>"/>
				</div>
			</form>
			<?}?>
			<P>&nbsp;</P>
			<P>&nbsp;</P>
    
		</fieldset>
	</div>
</div>

<?$this->load->view('footer');?>