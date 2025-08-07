// bdsl Edit
<?mget :InternetGatewayDevice.LANDevice.1.X_TWSZ-COM_DataSpeedLimit. "SpeedLimitMode_UP InterfaceLimit_UP VlanTagLimit_UP IPLimit_UP SpeedLimitMode_DOWN InterfaceLimit_DOWN VlanTagLimit_DOWN IPLimit_DOWN"
`	var G_SpeedLimitMode_UP = "$01";
	var G_InterfaceLimit_UP = "$02";
	var G_VlanTagLimit_UP = "$03";
	var G_IPLimit_UP = "$04";
	var G_SpeedLimitMode_DOWN = "$05";
	var G_InterfaceLimit_DOWN = "$06";
	var G_VlanTagLimit_DOWN = "$07";
	var G_IPLimit_DOWN = "$08";
`?>

var G_Wlan = [];
var t = 0;
<?objget :InternetGatewayDevice.LANDevice.1.WLANConfiguration. "SSID"
`	G_Wlan[t] = ["$01","InternetGatewayDevice.LANDevice.1.WLANConfiguration.$00"];
	t++;
`?>

var G_Lan = [];
var Ln = 0;
<?objget :InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig. "X_TWSZ-COM_Description"
`	G_Lan[Ln] = ["$01","InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.$00"];
	Ln++;
`?>

function uiOnload(){
	setJSONValue({
		'INPUT_WlanQosEnable' : (G_SpeedLimitMode_UP == 0)? 0:1
	});
	CreateTable();
}

function $CheckBox(_id,_value){
	return '<input type="checkbox" id="' + _id + '" ' + (_value == '1' ? 'checked' : '') + '>';
}

function $Text(_id,_value){ 
	return '<input type="text" id="'+ _id +'" value="' + _value + '">';
}
function CreateTable(){
	var value_array_up = [];
	var value_array_down = [];
	
	Table.Clear('td_config_up');
	Table.Clear('td_config_down');

	var interfaces_up = G_InterfaceLimit_UP.split(',');

	for(var i = 0; i < 4; i++){
	 	
	 	var interfaces_up_tmp = interfaces_up[i].split('/');
	
		if(interfaces_up_tmp.length > 0)
		{
			value_array_up[i] = [];
			value_array_up[i].push($CheckBox('Up_Enable' + i, interfaces_up_tmp[0])); //enable
			value_array_up[i].push(G_Lan[i][0]); // Queue Name
			value_array_up[i].push($Text('Up_QueueCARRate' + i, interfaces_up_tmp[1])); //X_TWSZ-COM_QueueCAR
		}
	}
	
	for(var i = 4; i < interfaces_up.length; i++){
	 	
	 	var interfaces_up_tmp = interfaces_up[i].split('/');
	
		if(interfaces_up_tmp.length > 0)
		{
			value_array_up[i] = [];
			value_array_up[i].push($CheckBox('Up_Enable' + i, interfaces_up_tmp[0])); //enable
			value_array_up[i].push(G_Wlan[i-4][0]); // Queue Name
			value_array_up[i].push($Text('Up_QueueCARRate' + i, interfaces_up_tmp[1])); //X_TWSZ-COM_QueueCAR
		}
	}

	$T('td_config_up',value_array_up);

	var interfaces_down = G_InterfaceLimit_DOWN.split(',');
	
	for(var i = 0; i < 4; i++){
			var interfaces_down_tmp = interfaces_down[i].split('/');
			
			if(interfaces_down_tmp.length > 0)
			{
				value_array_down[i] = [];
				value_array_down[i].push($CheckBox('Down_Enable' + i,interfaces_down_tmp[0])); //enable
				value_array_down[i].push(G_Lan[i][0]); // Queue Name
				value_array_down[i].push($Text('Down_QueueCARRate' + i,interfaces_down_tmp[1])); //X_TWSZ-COM_QueueCAR
			}
	}
	
	for(var i = 4; i < interfaces_down.length; i++){
			var interfaces_down_tmp = interfaces_down[i].split('/');
			
			if(interfaces_down_tmp.length > 0)
			{
				value_array_down[i] = [];
				value_array_down[i].push($CheckBox('Down_Enable' + i,interfaces_down_tmp[0])); //enable
				value_array_down[i].push(G_Wlan[i-4][0]); // Queue Name
				value_array_down[i].push($Text('Down_QueueCARRate' + i,interfaces_down_tmp[1])); //X_TWSZ-COM_QueueCAR
			}
	}

	$T('td_config_down',value_array_down);
 
}


function uiSubmit(){
	var node_bdsl = $('INPUT_UserIntfUp','INPUT_UserVLANUp','INPUT_UserIPUp','INPUT_UserIntfDown','INPUT_UserVLANDown','INPUT_UserIPDown');

	var set_value_up = "";
	var set_value_down = "";

	for(var k = 0; k < 8; k++){
		if(k < 7)
			set_value_up += Form.Checkbox('Up_Enable' + k) + '/' + $('Up_QueueCARRate' + k).value + ',';
		else
			set_value_up += Form.Checkbox('Up_Enable' + k) + '/' + $('Up_QueueCARRate' + k).value;

	}
	for(var k = 0; k < 8; k++){
		if(k < 7)
			set_value_down += Form.Checkbox('Down_Enable' + k) + '/' + $('Down_QueueCARRate' + k).value + ',';
		else
			set_value_down += Form.Checkbox('Down_Enable' + k) + '/' + $('Down_QueueCARRate' + k).value;
	}
	
	$H({
		':InternetGatewayDevice.LANDevice.1.X_TWSZ-COM_DataSpeedLimit.SpeedLimitMode_UP' : Form.Checkbox('INPUT_WlanQosEnable'),
		':InternetGatewayDevice.LANDevice.1.X_TWSZ-COM_DataSpeedLimit.InterfaceLimit_UP' : set_value_up,
		':InternetGatewayDevice.LANDevice.1.X_TWSZ-COM_DataSpeedLimit.SpeedLimitMode_DOWN' : Form.Checkbox('INPUT_WlanQosEnable'),
		':InternetGatewayDevice.LANDevice.1.X_TWSZ-COM_DataSpeedLimit.InterfaceLimit_DOWN' : set_value_down,
		'obj-action'   : 'set',
		'var:menu'     : 'advanced',
		'var:page'     : 'bdsl',
		'var:errorpage': 'bdsl',
		'getpage'      : 'html/index.html',
		'errorpage'    : 'html/index.html',
		'var:CacheLastData': ViewState.Save()
	},true);

	$('uiPostForm').submit();
}

function dealWithError(){
	if (G_Error != 1){
		return false; 
	}
	
	var arrayHint = [];
	
	dealErrorMsg(arrayHint, G_Error_Msg);
	
}

addListeners(uiOnload, dealWithError);

