<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view('header');?>

<div class="flashsection"><img src="<?=base_url().'images/topimg_newsimg.jpg'?>" /></div>

<div class="contentarea">
	<div class="innercontainer">
		<fieldset>
			<legend>News</legend> 

			<?=$this->control->_news()?>
    
		</fieldset>
	</div>
</div>

<?$this->load->view('footer');?>