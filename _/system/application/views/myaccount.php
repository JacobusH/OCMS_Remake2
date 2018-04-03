<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view('header');?>

<div class="flashsection"><img src="<?=base_url().'uploads/bg/'.$bgimage?>" /></div>

<div class="contentarea">
	<div class="innercontainer">
		<fieldset>
			<legend><?=$heading?></legend> 

			<?=$description?>
			<ul style="margin-left: -2px;">
				<li><a href="<?=site_url()?>account/documents/monthly_updates">MONTHLY UPDATES </a></li>
				<li><a href="<?=site_url()?>account/documents/financial_reports">FINANCIAL REPORTS</a></li>
				<?if(($this->session->userdata('gblTypeId') == 2) || ($this->session->userdata('gblTypeId') == 3) ){?>
				<li><a href="<?=site_url()?>account/documents/current_notes_held">CURRENT NOTES HELD</a></li>
				<li><a href="<?=site_url()?>account/documents/disposed_notes">DISPOSED NOTES </a></li>
				<?}?>
				<?if(($this->session->userdata('gblTypeId') == 1) || ($this->session->userdata('gblTypeId') == 3)){?>
				<li><a href="<?=site_url()?>account/documents/current_properties">CURRENTLY HELD PROPERTIES </a></li>
				<li><a href="<?=site_url()?>account/documents/sold_properties">SOLD PROPERTIES</a></li>

				<!-- <ul style="margin-top: -5px;margin-left: 10px;">
					<li><a href="<?=site_url()?>account/documents/quarterly_sold">QUARTERLY SOLD PROPERTIES</a></li>
					<li><a href="<?=site_url()?>account/documents/all_sold">ALL SOLD PROPERTIES</a></li>
				</ul> -->
				<?}?>
			</ul>
		</fieldset>
	</div>
</div>

<?$this->load->view('footer');?>