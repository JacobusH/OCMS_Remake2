<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->load->view($this->uri->slash_segment(1).'header');?>

<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" id="container">
	<tr>
		<td height="100%" align="center" valign="middle">
			<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td height="30" align="right" valign="top"><div style="margin-top:15px; margin-right:30px;" class="homepagetit">Welcome to Administrator  | <a class="link" href="javascript:;" onClick="IFramePopup('<?=site_url($this->uri->slash_segment(1).'account/changepassword')?>','Change Password', '350', '165');">Change Password</a></div></td>
				</tr>
				<tr>
					<td align="center" valign="middle">
						<table width="96%" border="0" cellspacing="5" cellpadding="0" id="mainbox">
							<tr>
								<td height="20" align="center" valign="middle">&nbsp;</td>
								<td height="20" align="center"></td>
							</tr>
							<tr>
								<td width="50%" height="100%" align="left" valign="top">				
									<?=$home_navigation;?>
									<script type="text/javascript">
									var faq=new switchicon("icongroup1", "div") //Limit scanning of switch contents to just "div" elements
									faq.setHeader('<?=img("images/acp/tri_bullet_down.gif")?>', '<?=img("images/acp/tri_bullet.gif")?>') //set icon HTML
									faq.collapsePrevious(true) //Allow only 1 content open at any time
									faq.setPersist(true) //No persistence enabled
									faq.defaultExpanded(0) //Set 1st content to be expanded by default
									faq.init();
									</script>
								</td>
								<td width="45%" height="100%" align="center" valign="top">&nbsp;</td>
							</tr>
							<tr>
								<td height="20" align="center" valign="middle">&nbsp;</td>
								<td height="20" align="center"></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<div style="background: #FAFAFA;">&nbsp;</div>

<?$this->load->view($this->uri->slash_segment(1).'footer');?>