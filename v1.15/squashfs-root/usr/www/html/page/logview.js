// JavaScript Document//LOG
<?mget :InternetGatewayDevice.X_TWSZ-COM_Logger. "LoggerEnabled"
`	var G_LoggerEnabled		= "$01";
`?>

function uiOnload(){
	ajax_GetLogText();
}



//����PBC-ajax
function ajax_GetLogText()
{

	//$('INPUT_LogText').value = uError.lang_log_loading;

	if (G_LoggerEnabled == '') return;
	var _url = "/cgi-bin/webupg";
	ajax = Ajax.getInstance(_url, "", 0, processResult);
	ajax.post($('uiShowLog'));
}

//�����ص���־�ļ�,��ʾ��ҳ��
function processResult(responseText)
{

	$('INPUT_LogText').value = responseText;
	
}

function dealWithError(){

         if (G_Error != 1){ return false; }
         var arrayHint = [];
         dealErrorMsg(arrayHint, G_Error_Msg);
}

addListeners(uiOnload, dealWithError);


