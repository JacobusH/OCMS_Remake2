<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view('header');?>

<div class="flashsection"><img src="<?=base_url().'uploads/bg/'.$bgimage?>" width="800" height="217" /></div>

<div class="contentarea">
	<div class="innercontainer">
		<fieldset>
			<legend>Team</legend> 
			<?=$description?>
			<p>&nbsp;</p>

			<?=$this->control->_team()?>
    
		</fieldset>
	</div>
</div>

<?$this->load->view('footer');?>