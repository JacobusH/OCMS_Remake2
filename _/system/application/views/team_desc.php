<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view('header');
$bgimage = $this->control->get_bgimage('team');
?>

<div class="flashsection"><img src="<?=base_url().'uploads/bg/'.$bgimage?>" width="800" height="217" /></div>

<div class="contentarea">
	<div class="innercontainer">
		<fieldset>
			<legend>Team</legend> 
			<?=$this->control->team_desc($this->uri->segment(2))?>
			<div align="right">
				<input type="button" name="button" class="button" value="back" onclick="window.history.back(-1)"/>
			</div>
    
		</fieldset>
	</div>
</div>

<?$this->load->view('footer');?>