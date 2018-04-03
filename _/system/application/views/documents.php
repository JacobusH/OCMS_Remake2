<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view('header');?>

<div class="flashsection"><img src="<?=base_url().'images/topimg_contact.jpg'?>" /></div>

<?$arrlink = array('monthly_updates' => 'MONTHLY UPDATES', 'current_properties' => 'CURRENTLY HELD PROPERTIES', 'financial_reports' => 'FINANCIAL REPORTS', 'sold_properties' => 'SOLD PROPERTIES', 'all_sold' => 'ALL SOLD PROPERTIES', 'current_notes_held' => 'CURRENT NOTES HELD', 'disposed_notes' => 'DISPOSED NOTES');?>

<div class="contentarea">
	<div class="innercontainer">
		<fieldset>
			<legend><?=$arrlink[$this->uri->segment(3)]?></legend>
			
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
				
				<!-- <li>SOLD PROPERTIES</li>

				<ul style="margin-top: -5px;margin-left: 10px;">
					<li><a href="<?=site_url()?>account/documents/quarterly_sold">QUARTERLY SOLD PROPERTIES</a></li>
					<li><a href="<?=site_url()?>account/documents/all_sold">ALL SOLD PROPERTIES</a></li>
				</ul> -->
				<?}?>
			</ul>

			<ul style="border: 1px solid #d7d7d7;width: 480px;padding: 20px;">
				<?=$documents;?>
			</ul>
    
		</fieldset>
	</div>
</div>

<?$this->load->view('footer');?>