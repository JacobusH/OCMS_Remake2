<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view('header');?>

<div class="flashsection"><img src="<?=base_url().'uploads/bg/'.$bgimage?>" /></div>
    
<div class="contentarea">
	<div class="innercontainer">
		<fieldset>
			<legend><?=$heading?></legend> 
		
			<?=$description?>

			<p></p><br />
			
			<form name="frmContact" method="post" action="<?=site_url('welcome/submit_contact')?>">
				<p><strong>SEND MESSAGE TO EWCP</strong></p>
				<textarea name="comments" cols="27" rows="4" class="comments"></textarea><br />
				<input type="submit" value="Submit" style="margin-top:10px; text-align:center;" class="button"  />
			</form>
			<p></p>
 
			<!--  <div class="map"><br /><br /><br /><iframe marginheight="0" marginwidth="0" src="http://maps.google.com/maps?hl=en&amp;q=341+bayside+drive,+newport+beach,+ca+92662&amp;ie=UTF8&amp;hq=&amp;hnear=341+Bayside+Dr,+Newport+Beach,+Orange,+California+92662&amp;gl=us&amp;ei=_LY7S4uFIYjCsQP8nbjDBA&amp;ved=0CAsQ8gEwAA&amp;z=16&amp;ll=33.618524,-117.927858&amp;output=embed" width="600" frameborder="0" height="400" scrolling="no"></iframe><br /><small><a href="http://maps.google.com/maps?hl=en&amp;q=3388+via+lido,+newport+beach,+ca+92662&amp;ie=UTF8&amp;hq=&amp;hnear=3388+Via+Lido,+Newport+Beach,+Orange,+California+92662&amp;gl=us&amp;ei=_LY7S4uFIYjCsQP8nbjDBA&amp;ved=0CAsQ8gEwAA&amp;z=16&amp;ll=33.618524,-117.927858&amp;source=embed" style="color:#0000FF;text-align:left"><span class="link21">View Larger Map</span></a></small></div> -->
			<div class="map"><br /><br /><br /><iframe width="600" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps?f=q&amp;source=embed&amp;hl=en&amp;geocode=&amp;q=92663+Via+Lido,+Newport+Beach,+California,+United+States&amp;sll=33.612832,-117.920637&amp;sspn=0.038813,0.066175&amp;ie=UTF8&amp;hq=&amp;hnear=3388+Via+Lido,+Newport+Beach,+California+92663&amp;ll=33.61718,-117.92759&amp;spn=0.038811,0.066175&amp;z=14&amp;output=embed"></iframe><br /><small><a href="http://maps.google.com/maps?f=q&amp;source=embed&amp;hl=en&amp;geocode=&amp;q=92663+Via+Lido,+Newport+Beach,+California,+United+States&amp;sll=33.612832,-117.920637&amp;sspn=0.038813,0.066175&amp;ie=UTF8&amp;hq=&amp;hnear=Via+Lido,+Newport+Beach,+California+92663&amp;ll=33.61718,-117.92759&amp;spn=0.038811,0.066175&amp;z=14" style="color:#0000FF;text-align:left">View Larger Map</a></small></div>


			<P>&nbsp;</P>
    
		</fieldset>
	</div>
</div>

<?$this->load->view('footer');?>