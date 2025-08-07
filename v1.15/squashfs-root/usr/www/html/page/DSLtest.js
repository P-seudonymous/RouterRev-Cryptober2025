

/**************************************all wan info***********************************************************/
//Wan Conns List
var G_wanConnction = [];
var m = 0;

<?objget :InternetGatewayDevice.WANDevice. ""
	`
<?objget :InternetGatewayDevice.WANDevice.$10.WANConnectionDevice. "WANIPConnectionNumberOfEntries WANPPPConnectionNumberOfEntries"
`	<?if gt $11 0
	`	<?objget :InternetGatewayDevice.WANDevice.$30.WANConnectionDevice.$20.WANIPConnection. "ConnectionStatus Name Enable ConnectionType AddressingType ExternalIPAddress"
		`	G_wanConnction[m] = ["InternetGatewayDevice.WANDevice.$30.WANConnectionDevice.$20.WANIPConnection.$00", //Path
							 "$01",   //ConnectionStatus
							 "$02",    //name
							 "$03",    //enalbe
							 "$04",    //ConnectionType
							 "$05",    //AddressingType
							 "",		//  igmp
							 "Enable",		// qos
							 "$06"        //  ip addr 
							 ];
			++m;
		`?>
	`?>
	<?if gt $12 0
	`	<?objget :InternetGatewayDevice.WANDevice.$30.WANConnectionDevice.$20.WANPPPConnection. "ConnectionStatus Name Enable ConnectionType ExternalIPAddress"
		`	G_wanConnction[m] = ["InternetGatewayDevice.WANDevice.$30.WANConnectionDevice.$20.WANPPPConnection.$00", //Path
							 "$01",//ConnectionStatus
							 "$02",//name;
							 "$03",//Enable;
							 "$04", ////ConnectionType
							 "PPPoE", //protocol
							 "",       //  igmp
							 "Enable",       //qos
							 "$05"		// ip addr
							 ];
			++m;
		`?>
	`?>
`?>
`?>


/*************************************************************************************************************/


//浠ュお缃戜笂琛屾椂锛?涓狶AN鍙ｈ鍗犵敤涓�涓?
//lan test status
var G_test_lan_status = [];
var G_Lan_Description = [];
var n = 0;
/*当LAN4口用于上行口时，LANEthernetInterfaceConfig节点下会自动去除LAN4口节点信息，
这里选择遍历方式去获取LAN口更为妥当*/
<?objget :InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig. "Status X_TWSZ-COM_Description" 
`       G_test_lan_status[n] = [];
		G_Lan_Description[n] = [];
		G_test_lan_status[n][0] = "$01"; 
		G_Lan_Description[n][1] = "$02"; 
		n++;
`?>

//wlan test status
var G_wlan_status = "<?get :InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Enable ?>" 

var G_adslsyn_status = "N/A";
var G_atmf5seg_status = "N/A";
var G_atmf5end_status = "N/A";
var G_atmf4seg_status = "N/A";
var G_atmf4end_status = "N/A";
var G_pinggw_status = "N/A";
var G_pingdns_status = "N/A";
   G_pinggw_status = "<?get :InternetGatewayDevice.X_TWSZ-COM_Diagnostics.Status.IPPingGateway?>";
   G_pingdns_status = "<?get :InternetGatewayDevice.X_TWSZ-COM_Diagnostics.Status.IPPingPrimaryDNS?>";
var G_InternetWanType = "Ethernet";
<?objget :InternetGatewayDevice.WANDevice. "WANCommonInterfaceConfig.WANAccessType"
`	<?if eq `DSL` `<?echo $21?>`
	`	<?mget :InternetGatewayDevice.X_TWSZ-COM_Diagnostics.Status. "ADSLSynchronization ATMF5SegmentLoopback ATMF5EndToEndLoopback ATMF4SegmentLoopback ATMF4EndToEndLoopback"  
		`	//adsl test status
			G_adslsyn_status	= "$01";
			G_atmf5seg_status	= "$02";
			G_atmf5end_status	= "$03";
			G_atmf4seg_status	= "$04";
			G_atmf4end_status	= "$05";
		`?>
		G_InternetWanType = "DSL";
	`?>
`?>

<?mget :InternetGatewayDevice.X_TWSZ-COM_Diagnostics. "DiagnosticsState Interface"  `
var G_DiagnosticsState	= "$01";
var G_Interface			= "$02";
`?>
var G_wanpath			= "<?echo $var:wanpath ?>";

/**************************************************************************************
* submit data
**************************************************************************************/
function uiSubmit()
{	
	var wan_path = $('select_wan_interface').value;
	if (wan_path == '')
	{
		alert(SEcode[1009]);
		return false;
	}

	$H({
		':InternetGatewayDevice.X_TWSZ-COM_Diagnostics.DiagnosticsState' : 'Requested',
		':InternetGatewayDevice.X_TWSZ-COM_Diagnostics.Interface' : wan_path,
		'var:menu'		: G_Menu,
		'var:page'		: G_Page,
		'getpage'		: 'html/index.html',
		'errorpage'		: 'html/index.html',
		'obj-action'	: 'set',
		'var:wanpath'	: wan_path,
		'var:subpage'   : G_SubPage,
		'var:errorpage'	: G_SubPage,
		'var:CacheLastData': ViewState.Save()
	});
	$('uiPostForm').submit();
	$('first_test').disabled = true;
}
function uiSubmit_again()
{	
	var wan_path = $('select_wan_interface_again').value;
	if (wan_path == '')
	{
		alert(SEcode[1009]);
		return false;
	}

	$H({
		':InternetGatewayDevice.X_TWSZ-COM_Diagnostics.DiagnosticsState' : 'Requested',
		':InternetGatewayDevice.X_TWSZ-COM_Diagnostics.Interface' : wan_path,
		'var:menu'		: G_Menu,
		'var:page'		: G_Page,
		'getpage'		: 'html/index.html',
		'errorpage'		: 'html/index.html',
		'obj-action'	: 'set',
		'var:wanpath'	: wan_path,
		'var:subpage'   : G_SubPage,
		'var:errorpage'	: G_SubPage,
		'var:CacheLastData': ViewState.Save()
	});
	$('uiPostForm').submit();
	$('again_test').disabled = true;
}


/**************************************************************************************
* load status
**************************************************************************************/
function load_wan_select()
{
	var _text = [], _value = [], _textagain = [], _valueagain = [];
	for(var i = 0; i < G_wanConnction.length; i++){
		_text.push(G_wanConnction[i][2]);
		_value.push(G_wanConnction[i][0]);
		_textagain.push(G_wanConnction[i][2]);
		_valueagain.push(G_wanConnction[i][0]);
	}
	$S('select_wan_interface',_text,_value);
	$S('select_wan_interface_again',_textagain,_valueagain);
}

function get_wanconn(path)
{
	for(var i = 0; i < G_wanConnction.length; i++)
	{
		if (G_wanConnction[i][0] == path)
		{
			return G_wanConnction[i];
		}
	}

	return null;
}

function select_wan()
{
	$('select_wan_interface').value = G_Interface;
	var intf = Form.Select('select_wan_interface');
	if (intf == '')
	{
		$('select_wan_interface').selectedIndex = 0;
		intf = Form.Select('select_wan_interface');
	}

	if (G_wanpath == '-')
	{
		$('div_test').style.display = "none";
		$('first_test').style.display = "block";
		$('again_test').style.display = "none";
	}
	else
	{
		$('div_test').style.display = "block";
		$('first_test').style.display = "none";
		$('again_test').style.display = "block";
		
		var wanconn = get_wanconn(intf);
		if (wanconn == null)
		{
			return;
		}

		//bridge connection
		if (wanconn[4] != "IP_Routed")
		{
			$('div_test_wan').style.display = "none";
		}
		//ip or ppp connection
		else
		{
			
		}
	}
}

var G_lan_status=[];
function change_lan_status()
{
	var _len = 0;
	/*G_test_lan_status.length为真正作为LAN口的数目，当LAN4作为上行口，这个值为3*/
	for(var i = 0, _len = G_test_lan_status.length; i < _len; i++)
    {   
        var index = 1+i;
		if(G_Lan_Description[i][1].indexOf(index) > 0)
		{
			G_lan_status[i] = G_test_lan_status[i][0];
		}
		else
		{
			G_lan_status[i] = G_test_lan_status[_len-i-1][0];  
		}
	}
}

function load_lan_status()
{
       change_lan_status();
	if('DSL' == G_InternetWanType)
		setJSONValue({
			'test_lan1' : G_lan_status[0] == "Up" ? data_language.dynamic.pass : data_language.dynamic.fail,
			'test_lan2' : G_lan_status[1] == "Up" ? data_language.dynamic.pass : data_language.dynamic.fail,
			'test_lan3' : G_lan_status[2] == "Up" ? data_language.dynamic.pass : data_language.dynamic.fail,
			'test_lan4' : G_lan_status[3] == "Up" ? data_language.dynamic.pass : data_language.dynamic.fail,
			'test_wlan' : G_wlan_status == "1" ? data_language.dynamic.pass : data_language.dynamic.fail
		});
	else
		setJSONValue({
			'test_lan1' : G_lan_status[0] == "Up" ? data_language.dynamic.pass : data_language.dynamic.fail,
			'test_lan2' : G_lan_status[1] == "Up" ? data_language.dynamic.pass : data_language.dynamic.fail,
			'test_lan3' : G_lan_status[2] == "Up" ? data_language.dynamic.pass : data_language.dynamic.fail,
			'test_wlan' : G_wlan_status == "1" ? data_language.dynamic.pass : data_language.dynamic.fail
		});

}

function load_dsl_status()
{
	setJSONValue({
		'test_adslsyn'  : G_adslsyn_status == 'PASS' ? data_language.dynamic.pass : data_language.dynamic.fail,
		'test_atmf5seg' : G_atmf5seg_status == 'PASS' ? data_language.dynamic.pass : data_language.dynamic.fail,
		'test_atmf5end' : G_atmf5end_status == 'PASS' ? data_language.dynamic.pass : data_language.dynamic.fail,
		'test_atmf4seg' : G_atmf4seg_status == 'PASS' ? data_language.dynamic.pass : data_language.dynamic.fail,
		'test_atmf4end' : G_atmf4end_status == 'PASS' ? data_language.dynamic.pass : data_language.dynamic.fail
	});
}

function load_wan_status()
{
	setJSONValue({
		'test_pinggw'  : G_pinggw_status == 'PASS' ? data_language.dynamic.pass : data_language.dynamic.fail,
		'test_pingdns' : G_pingdns_status == 'PASS' ? data_language.dynamic.pass : data_language.dynamic.fail
	});
}


function set_color(obj, text)
{
	obj.style.color = (text == data_language.dynamic.pass || text == "Up" || text == "1") ? "green" : "red";
}

function set_colors()
{
	var objs = $('test_lan1', 'test_lan2', 'test_lan3', 'test_lan4', 'test_wlan',
		'test_adslsyn', 'test_atmf5seg', 'test_atmf5end', 'test_atmf4seg', 'test_atmf4end',
		'test_pinggw', 'test_pingdns'
	);

	for(var i=0; i<objs.length; i++)
	{
		if (objs[i] != null)
		{
			set_color(objs[i], objs[i].innerHTML);
		}
	}
}

function load_status()
{
	load_lan_status();
	load_dsl_status();
	load_wan_status();
	set_colors();
}


/**************************************************************************************
*  onload function
**************************************************************************************/
function uiOnload() 
{
	load_wan_select();
	select_wan();
	load_status();
	if (G_InternetWanType == "Ethernet")
	{
		$("TR_Show_Adsl_Only").style.display = "none";
		$("div_test_dsl").style.display = "none";
	}
}

function dealWithError(){
	if (G_Error != 1){
		return false;
	}
	
	var arrayHint = [];
	
	dealErrorMsg(arrayHint, G_Error_Msg);
}

addListeners(uiOnload, dealWithError);
 
