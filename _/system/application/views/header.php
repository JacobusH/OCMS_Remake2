<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
<meta name="keywords" content="<?=$meta_keywords?>"/>
<meta name="description" content="<?=$meta_desc?>"/>

<link href="<?=base_url().'styles/homestyles.css'?>" rel="stylesheet"  media="all" type="text/css" />
<link href="<?=base_url().'styles/contentslider.css'?>" rel="stylesheet" media="all" type="text/css"/>
<link href="<?=base_url().'styles/inner_styles.css'?>" rel="stylesheet" media="all" type="text/css"/>
<link href="<?=base_url().'styles/navigation.css'?>" rel="stylesheet" media="all" type="text/css" />
<script src="<?=base_url().'js/contentslider.js'?>" type="text/javascript" ></script>

<!--[if lte IE 6]>
<link href="<?=base_url().'styles/flyout_ie.css'?>" rel="stylesheet" media="all" type="text/css" />
<![endif]-->

<title><?=$meta_title?></title>

</head>

<body>

<!--Container Starts-->
<div id="container">
	<div id="header">
		<div class="logosection">
			<div class="logo"><a href="<?=site_url()?>"><img src="<?=base_url().'images/logo.jpg'?>" style="border:none;" /></a></div>
			<div class="login"><?if($this->session->userdata('gblUserId') <> ''){?><a href="<?=site_url('account/myaccount')?>">My Account</a><?}?><?if($this->session->userdata('gblUserId') <> ''){?> | <a href="<?=site_url('account/logout')?>">Logout</a><?}else{?><a href="<?=site_url('login')?>">Investor Login</a><?}?></div>
		</div>
    
		<div class="navigation">
			<!--menu starts here -->
			<?=$this->navigation->f_top_navigation()?>
			<!--menu end here -->
		</div> 
	</div>
	<!--header End-->