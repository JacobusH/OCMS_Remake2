<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class MY_Fckeditor {

    function MY_Fckeditor()
    {
		// Instantiate the class		
		$CI =& get_instance();
    }

	function create($name = 'fckeditor', $value = '')
	{

		require_once (BASEPATH.'plugins/fckeditor/fckeditor'.EXT);

		$sBasePath               = base_url()."system/plugins/fckeditor/";

		$oFCKeditor              = new FCKeditor($name);

		$oFCKeditor->BasePath    = $sBasePath;

		$oFCKeditor->Value = ($value <> '') ? $value : '';

		return $oFCKeditor->Create();

	}

}