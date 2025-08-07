//ALG
<?mget :InternetGatewayDevice.Services.X_TWSZ-COM_ALGAbility. "TFTPEnabled FTPEnabled PPTPEnabled RTSPEnabled L2TPEnabled H323Enabled SIPEnabled IPSECEnabled"
`
var G_TFTPEnabled 	= "$01";
var G_FTPEnabled 	= "$02";
var G_PPTPEnabled 	= "$03";
var G_RTSPEnabled 	= "$04";
var G_L2TPEnabled  	= "$05";
var G_H323Enabled  	= "$06";
var G_SIPEnabled  	= "$07";
var G_IPSECEnabled  = "$08";
`?>
function uiOnload(){
	setJSONValue({
		'INPUT_TFTPEnabled' : G_TFTPEnabled,
		'INPUT_FTPEnabled'  : G_FTPEnabled,
		'INPUT_PPTPEnabled' : G_PPTPEnabled,
		'INPUT_RTSPEnabled' : G_RTSPEnabled,
		'INPUT_L2TPEnabled' : G_L2TPEnabled,
		'INPUT_H323Enabled' : G_H323Enabled,
		'INPUT_SIPEnabled'  : G_SIPEnabled,
		'INPUT_IPSECEnabled': G_IPSECEnabled
	});

	dealWithError();
}


function uiSubmit(){
	var array_node = $('INPUT_FTPEnabled','INPUT_TFTPEnabled','INPUT_PPTPEnabled','INPUT_RTSPEnabled','INPUT_L2TPEnabled','INPUT_H323Enabled','INPUT_SIPEnabled','INPUT_IPSECEnabled');
	$H({
	   ':InternetGatewayDevice.Services.X_TWSZ-COM_ALGAbility.FTPEnabled'  :(array_node[0].checked ? 1 : 0),
	   ':InternetGatewayDevice.Services.X_TWSZ-COM_ALGAbility.TFTPEnabled' :(array_node[1].checked ? 1 : 0),
	   ':InternetGatewayDevice.Services.X_TWSZ-COM_ALGAbility.PPTPEnabled' :(array_node[2].checked ? 1 : 0),
	   ':InternetGatewayDevice.Services.X_TWSZ-COM_ALGAbility.RTSPEnabled' :(array_node[3].checked ? 1 : 0),
	   ':InternetGatewayDevice.Services.X_TWSZ-COM_ALGAbility.L2TPEnabled' :(array_node[4].checked ? 1 : 0),
	   ':InternetGatewayDevice.Services.X_TWSZ-COM_ALGAbility.H323Enabled' :(array_node[5].checked ? 1 : 0),
	   ':InternetGatewayDevice.Services.X_TWSZ-COM_ALGAbility.SIPEnabled'  :(array_node[6].checked ? 1 : 0),
	   ':InternetGatewayDevice.Services.X_TWSZ-COM_ALGAbility.IPSECEnabled':(array_node[7].checked ? 1 : 0),
	   'var:menu'         :'advanced',
	   'getpage'          :'html/index.html',
	   'errorpage'        :'html/index.html',
	   'var:page'         :'alg',
	   'obj-action'       :'set',
	   'var:errorpage'    :'alg',
	   'var:CacheLastData': ViewState.Save()
	});
	$('uiPostForm').submit();
}

function dealWithError(){
	if (G_Error != 1){
		return false;
	}

	var arrayHint = [];
	arrayHint['FTPEnable']  = 'INPUT_FTPEnabled';
	arrayHint['TFTPEnable'] = 'INPUT_TFTPEnabled';
	arrayHint['PPTPEnable'] = 'INPUT_PPTPEnabled';
	arrayHint['RTSPEnable'] = 'INPUT_RTSPEnabled';
	arrayHint['L2TPEnable'] = 'INPUT_L2TPEnabled';
	arrayHint['H323Enable'] = 'INPUT_H323Enabled';
	arrayHint['SIPEnable']  = 'INPUT_SIPEnabled';
	arrayHint['IPSECEnable']= 'INPUT_IPSECEnabled';

	dealErrorMsg(arrayHint, G_Error_Msg);
}

addListeners(uiOnload);
