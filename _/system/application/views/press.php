<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view('header');?>

<div class="flashsection"><img src="<?=base_url().'images/topimg_press.jpg'?>" /></div>

<div class="contentarea">
	<div class="innercontainer">
		<fieldset>
			<legend>Press</legend> 

			<?=$this->control->_press()?>
    
		</fieldset>
	</div>
</div>

<?$this->load->view('footer');?>