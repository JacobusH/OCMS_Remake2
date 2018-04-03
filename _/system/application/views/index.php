<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view('header');?>
	
<!--Flash Starts-->
<div class="flashsection">
	<div class="flahsbg">
		<div id="slider1" class="sliderwrapper">
			<?=$this->control->_flash()?>
			<!-- <div class="contentdiv"><a href="#"><img src="<?=base_url().'images/img1.jpg'?>" alt=" " border="0" /></a></div>
			<div class="contentdiv"><a href="#"> <img src="<?=base_url().'images/img2.jpg'?>" alt=" " border="0" /></a></div>
			<div class="contentdiv"><a href="#"> <img src="<?=base_url().'images/img4.jpg'?>" alt=" " border="0" /></a></div>
			<div class="contentdiv"><a href="#"> <img src="<?=base_url().'images/img3.jpg'?>" alt=" " border="0" /></a></div>	 -->			
		</div>
		<div id="paginate-slider1" class="pagination"></div>
		
		<script type="text/javascript">
			featuredcontentslider.init({
				id: "slider1",  //id of main slider DIV
				contentsource: ["inline", ""],  //Valid values: ["inline", ""] or ["ajax", "path_to_file"]
				toc: "#increment",  //Valid values: "#increment", "markup", ["label1", "label2", etc]
				nextprev: ["", ""],  //labels for "prev" and "next" links. Set to "" to hide.
				revealtype: "click", //Behavior of pagination links to reveal the slides: "click" or "mouseover"
				enablefade: [true, 0.10],  //[true/false, fadedegree]
				autorotate: [true, 5000],  //[true/false, pausetime]
				onChange: function(previndex, curindex){  //event handler fired whenever script changes slide
					//previndex holds index of last slide viewed b4 current (1=1st slide, 2nd=2nd etc)
					//curindex holds index of currently shown slide (1=1st slide, 2nd=2nd etc)
				}
			})
		</script>
	</div>
</div>
<!--Flash End-->

<div class="contentarea">

	<!--left container Starts-->
	<div class="left_container">
		<fieldset>
			<legend><?=$heading?></legend>

			<?=$description?>

		</fieldset>
	</div>		
	<!--left container End-->

	<div class="latestnews">
		<h2>LATEST NEWS</h2>
		
		<?=$this->control->_home_news();?>
	</div>
</div>

<?$this->load->view('footer');?>