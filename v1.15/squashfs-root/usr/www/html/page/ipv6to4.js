var activedIpv6to4ID = -1;
var Select6to4ID = '';
var SelectTunnelID = 0;
var G_IpTunnel = [];
var G_IPv6to4 = [];
var m = 0;
var n = 0;
var t = 0;

<?objget :InternetGatewayDevice.X_TELEFONICA-ES_IPTunnel. "TunnelName Mode AssociatedWanIfName AssociatedLanIfName Activated TunnelCounter"
`
    G_IpTunnel[m] = [];
    G_IpTunnel[m][0] = "InternetGatewayDevice.X_TELEFONICA-ES_IPTunnel.$00.";
    G_IpTunnel[m][1] = "$01";    //TunnelName
    G_IpTunnel[m][2] = "$02";    //Mode
    G_IpTunnel[m][3] = "$03";    //AssociatedWanIfName
    G_IpTunnel[m][4] = "$04";    //AssociatedLanIfName
	G_IpTunnel[m][5] = "$05";    //Activated
	G_IpTunnel[m][6] = "$06";    //Counter
	G_IpTunnel[m][7] = "$00";    //{i}½Úµã

	<?if eq `6to4` "$12"
	`
	  <?objget :InternetGatewayDevice.X_TELEFONICA-ES_IPTunnel.$20.6to4Tunnel. "Mechanism Dynamic SLAID BorderRelayAddress ConnStatus Select"
       `
	      G_IPv6to4[t] = [];
          G_IPv6to4[t][0] = "InternetGatewayDevice.X_TELEFONICA-ES_IPTunnel.$20.6to4Tunnel.$00.";
		  G_IPv6to4[t][1] = "$01";
		  G_IPv6to4[t][2] = "$02";
		  G_IPv6to4[t][3] = "$03";
		  G_IPv6to4[t][4] = "$04";
		  G_IPv6to4[t][5] = "$05";
		  G_IPv6to4[t][6] = "$06";
		  t++;
	  `?>
	`?>
	m++;
`?>

//WAN Device
var G_Wanconns = [];
n=0;
<?objget :InternetGatewayDevice.WANDevice.1.WANConnectionDevice. "WANIPConnectionNumberOfEntries WANPPPConnectionNumberOfEntries"
`	<?if gt $11 0
	`	<?objget :InternetGatewayDevice.WANDevice.1.WANConnectionDevice.$20.WANIPConnection. "Name ConnectionType X_TWSZ-COM_ServiceList X_TELEFONICA-ES_IPv4Enabled X_TELEFONICA-ES_IPv6Enabled"
		`	G_Wanconns[n] = [];
			G_Wanconns[n][0] = "$01";
			G_Wanconns[n][1] = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.$20.WANIPConnection.$00"
			G_Wanconns[n][2] = "$02";
			G_Wanconns[n][3] = "$03";
			G_Wanconns[n][4] = "$04";
			G_Wanconns[n][5] = "$05";
			n++;
		`?>
	`?>
	<?if gt $12 0
	`	<?objget :InternetGatewayDevice.WANDevice.1.WANConnectionDevice.$20.WANPPPConnection. "Name ConnectionType X_TWSZ-COM_ServiceList X_TELEFONICA-ES_IPv4Enabled X_TELEFONICA-ES_IPv6Enabled"
		`	G_Wanconns[n] = [];
			G_Wanconns[n][0] = "$01";
			G_Wanconns[n][1] = "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.$20.WANPPPConnection.$00"
			G_Wanconns[n][2] = "$02";
			G_Wanconns[n][3] = "$03";
			G_Wanconns[n][4] = "$04";
			G_Wanconns[n][5] = "$05";
			n++;
		`?>
	`?>
`?>

//LAN Device
<?objget :InternetGatewayDevice.LANDevice. "X_TWSZ-COM_DeviceName"
`	G_Wanconns[n] = [];
	G_Wanconns[n][0] = "$01";
	G_Wanconns[n][1] = "InternetGatewayDevice.LANDevice.$00.LANHostConfigManagement.IPInterface.1";
	G_Wanconns[n][2] = "";
	n++;
`?>

function SelectTunnelEntry(index)
{
    Table.Clear('Ipv6to4List');
	createIpv6to4Table(index);
	return 0;
}

function ctrlSelectItem(_id)
{
   if(G_IPv6to4[_id][6] == "1" )	
   {
	   Select6to4ID = '';

		$H({
			'obj-action'    : 'set',
			'var:menu'      : 'setup',
			'var:page'      : 'iptunnel',
			'var:subpage'   : 'ipv6to4',
			'var:errorpage' : 'ipv6to4',
			'getpage'       : 'html/index.html',
			'errorpage'     : 'html/index.html'
		},true);
		$F(':'+G_IPv6to4[_id][0] + 'Select','0');
		$('uiPostForm').submit();
   }
   else 
   {
	   if(Select6to4ID != '')
	   {	
		   $H({
				'obj-action'    : 'set',
				'var:menu'      : 'setup',
				'var:page'      : 'iptunnel',
				'var:subpage'   : 'ipv6to4',
				'var:errorpage' : 'ipv6to4',
				'getpage'       : 'html/index.html',
				'errorpage'     : 'html/index.html'
			},true);
            $F(':'+Select6to4ID + 'Select','0');
			$F(':'+G_IPv6to4[_id][0] + 'Select','1');
			$('uiPostForm').submit();
			Select6to4ID = G_IPv6to4[_id][0];    
	   }
	   else
	   {
		   Select6to4ID = G_IPv6to4[_id][0];

		   $H({
				'obj-action'    : 'set',
				'var:menu'      : 'setup',
				'var:page'      : 'iptunnel',
				'var:subpage'   :'ipv6to4',
				'var:errorpage' : 'ipv6to4',
				'getpage'       : 'html/index.html',
				'errorpage'     : 'html/index.html'
			},true);
			$F(':'+G_IPv6to4[_id][0] + 'Select','1');
			$('uiPostForm').submit(); 
	   }
	}
}

function createIpv6to4Table(TunnelIndex)
{
	var array_value = [];
	var idx=0;
	var flag = -1;
    for(var i=0; i< G_IPv6to4.length ; i++)
	{
        if(G_IPv6to4[i][6] == "1")
		{
			Select6to4ID = G_IPv6to4[i][0];
		}
		if((G_IPv6to4[i][0].indexOf(G_IpTunnel[TunnelIndex][0])>-1) )
		{

            flag  = 1;
			array_value[i] = [];
			array_value[i].push('<input type="radio" id="ip6to4_index'+i+'" name="ip6to4_index" value="'+i+'" >');
			array_value[i].push(G_IPv6to4[i][1]+'&nbsp;'); //Mechanism
			array_value[i].push(G_IPv6to4[i][2]+'&nbsp;'); //Dynamic
			array_value[i].push(G_IPv6to4[i][3]+'&nbsp;'); //SLA ID
			array_value[i].push(G_IPv6to4[i][4]+'&nbsp;'); //BorderRelayAddress
			array_value[i].push(G_IPv6to4[i][5]+'&nbsp;'); //ConnStatus
			array_value[i].push('<input type="checkbox" id="INPUT_Select' + i + '" onclick="ctrlSelectItem(' + i + ')"' + ("1" == G_IPv6to4[i][6] ? 'checked' : '') + '>'); //Select
		}
	}
	$T('Ipv6to4List',array_value);
	
	if(G_IpTunnel.length==0)
	{
		$('addIpv6to4').disabled=true;
		$('editIpv6to4').disabled=true;
		$('deleteIpv6to4').disabled=true;
		$('editTunnel').disabled=true;
		$('removeTunnel').disabled=true;
	}
	else
	{
		$('editTunnel').disabled=false;
		$('removeTunnel').disabled=false;

		if(flag == 1)
		{
			$('editIpv6to4').disabled=false;
		    $('deleteIpv6to4').disabled=false;
            $('addIpv6to4').disabled=false;     
		}
		else
		{
		   $('editIpv6to4').disabled=true;
		   $('deleteIpv6to4').disabled=true;
           $('addIpv6to4').disabled=false;   
		}
	}
}

function createTunnelTable() {
	Table.Clear('Iptunnel_table');

	var array_value = [];
	var m = 0;
	var flagCheck = -1;

	for (var i = 0; i < G_IpTunnel.length; i++) {
		array_value[m] = [];
		if (G_IpTunnel[i][2] == "6to4") {
			if(G_IpTunnel[i][5] == "1")
			{
				activedIpv6to4ID = G_IpTunnel[i][7];
			}
		  
			if(flagCheck == -1)
		    {
			    array_value[m].push('<input type="radio" id="Tunnel_index'+i+'" name="Tunnel_index" value="'+i+'" onclick="SelectTunnelEntry(' + i + ')" checked>');
		        flagCheck = 0;
				SelectTunnelID = i;
			}
		    else
		    {
			    array_value[m].push('<input type="radio" id="Tunnel_index'+i+'" name="Tunnel_index" value="'+i+'" onclick="SelectTunnelEntry(' + i + ')">');
		    }
           
		    array_value[m].push(G_IpTunnel[i][1]+'&nbsp;'); //Name
		    array_value[m].push(G_IpTunnel[i][2]+'&nbsp;'); //Mode
		    array_value[m].push(transform_name(G_IpTunnel[i][3])+'&nbsp;'); //WanInterfaceName
		    array_value[m].push("LAN:"+transform_name(G_IpTunnel[i][4])+'&nbsp;'); //LanInterfaceName
            array_value[m].push('<input type="checkbox" id="INPUT_Actived' + i + '" onclick="ctrlActived(' + i + ')"' + ("1" == G_IpTunnel[i][5] ? 'checked' : '') + '>'); //actived
		    array_value[m].push((G_IpTunnel[i][6])+'&nbsp;'); //Counter
		    m++;
		}
	}
	$T('Iptunnel_table',array_value);
	if(m > 0)
	{
		$('editTunnel').disabled=false;
		$('removeTunnel').disabled=false;
	}
	else
	{
       	$('editTunnel').disabled=true;
		$('removeTunnel').disabled=true;
	}
}

function ctrlActived(_id)
{
	var path;
	var paht_ex;

	if(G_IpTunnel[_id][5] == "1" )	
	{
		activedIpv6to4ID = -1;
	   path = ':InternetGatewayDevice.X_TELEFONICA-ES_IPTunnel.'+G_IpTunnel[_id][7];
		$H({
			'obj-action'    : 'set',
			'var:menu'      : 'setup',
			'var:page'      : 'iptunnel',
			'var:subpage'   : 'ipv6to4',
			'var:errorpage' : 'ipv6to4',
			'getpage'       : 'html/index.html',
			'errorpage'     : 'html/index.html'
		},true);
		$F(path + '.Activated','0');
		$('uiPostForm').submit();
	}
	else 
	{
		if(activedIpv6to4ID != -1)
		{
			var tmpid = activedIpv6to4ID; 
			activedIpv6to4ID = G_IpTunnel[_id][7];
		   path_ex = ':InternetGatewayDevice.X_TELEFONICA-ES_IPTunnel.'+tmpid;
		   path = ':InternetGatewayDevice.X_TELEFONICA-ES_IPTunnel.'+G_IpTunnel[_id][7];
			$H({
				'obj-action'    : 'set',
				'var:menu'      : 'setup',
				'var:page'      : 'iptunnel',
				'var:subpage'   :'ipv6to4',
				'var:errorpage' : 'ipv6to4',
				'getpage'       : 'html/index.html',
				'errorpage'     : 'html/index.html'
			},true);
			$F(path_ex + '.Activated','0');
			$F(path + '.Activated','1');
			$('uiPostForm').submit();
		}
		else
		{
			activedIpv6to4ID = G_IpTunnel[_id][7];		   
		   path = ':InternetGatewayDevice.X_TELEFONICA-ES_IPTunnel.'+G_IpTunnel[_id][7];
			$H({
				'obj-action'    : 'set',
				'var:menu'      : 'setup',
				'var:page'      : 'iptunnel',
				'var:subpage'   :'ipv6to4',
				'var:errorpage' : 'ipv6to4',
				'getpage'       : 'html/index.html',
				'errorpage'     : 'html/index.html'
			},true);
			$F(path + '.Activated','1');
			$('uiPostForm').submit(); 
		}
	}
}

function uiOnload() {
	selectIpv6to4mode();
	wanAndLanPath();
	createTunnelTable();
	createIpv6to4Table(SelectTunnelID);
}

function wanAndLanPath()
{
	var text_wan = [], value_wan = [];
	var text_lan = [], value_lan = [];
	
	for(var i = 0; i < G_Wanconns.length; i++)
	{
		if(G_Wanconns[i][1].indexOf('WANDevice') > 0)
		{
			if (G_Wanconns[i][2].indexOf('IP_Bridged') < 0 && G_Wanconns[i][2].indexOf('PPP_Bridged') < 0)
			{
				if (G_Wanconns[i][4] == '0')
				{
					continue;
				}

				if (G_Wanconns[i][3] == 'TR069')
				{
					continue;
				}
				
				text_wan.push(G_Wanconns[i][0]);
				value_wan.push(G_Wanconns[i][1]);
			}
		}
		else if (G_Wanconns[i][1].indexOf('LANDevice') > 0)
		{
			if (G_Wanconns[i][0].indexOf('br1') < 0 && G_Wanconns[i][0].indexOf('br0') < 0 )
			{
				continue;
			}
			text_lan.push("LAN:"+G_Wanconns[i][0]);
			value_lan.push(G_Wanconns[i][1]);
		}
	}
	$S('SELECT_WanInterface', text_wan, value_wan);
	$S('SELECT_LanInterface', text_lan, value_lan);
}

function selectIpv6to4mode() {
	var text_ipv6to4_mode = [], value_ipv6to4_mode = [];

	text_ipv6to4_mode.push('6to4');
	value_ipv6to4_mode.push('6to4');
	$S('SELECT_TunnelMode', text_ipv6to4_mode, value_ipv6to4_mode);
}

function transform_name(path)
{
	for (var i = 0; i < G_Wanconns.length; i++)
	{
		if (G_Wanconns[i][1] == path)
			return G_Wanconns[i][0];
	}

	return "unknown";
}


var addTunnelAction=0;
var editTunnelIdx=0;

function onChgRelay()
{
	var value_relay = $('SELECT_Ipv6to4Dynamic').value;

	if (value_relay == "0")
	{
		$("div_ipv6to4_dynamic").style.display = "block";
	}
	else if (value_relay == "1")
	{
		$("div_ipv6to4_dynamic").style.display = "none";
	}
}

function AddTunnel(){
	
	addTunnelAction = 1;
  	$('addTunnel').disabled=true;
	$('editTunnel').disabled=true;
	$('removeTunnel').disabled=true;
	$('addIpv6to4').disabled=true;
	$('tunnel_setup').style.display='block';
	$('Ipv6to4Setting').style.display='none';
	$('Ipv6to4_setup').style.display='none';

}

function EditTunnel(){
	
	addTunnelAction = 2;
	editTunnelIdx=Form.Radio('Tunnel_index');
	$('addTunnel').disabled=true;	
	$('editTunnel').disabled=true;
	$('removeTunnel').disabled=true;
	$('tunnel_setup').style.display='block';

	$('Ipv6to4Setting').style.display='none';
	$('Ipv6to4_setup').style.display='none';
    $('addIpv6to4').disabled=true;
	
	$('INPUT_TunnelName').value=G_IpTunnel[editTunnelIdx][1];
	$('SELECT_TunnelMode').value=G_IpTunnel[editTunnelIdx][2];
	$('SELECT_WanInterface').value=G_IpTunnel[editTunnelIdx][3];
    $('SELECT_LanInterface').value=G_IpTunnel[editTunnelIdx][4];
	
}

function RemoveTunnel(){
	if(!confirm(SEcode[1008])){return false;}

	var DelIndex=Form.Radio('Tunnel_index');
	
	$H({
		'del-obj'   :G_IpTunnel[DelIndex][0],
		'obj-action':'del',
		'var:menu'  :'advanced',
		'var:page'  :'iptunnel',
		'getpage'   :'html/index.html',
		'errorpage' :'html/index.html',
		'var:subpage'   :'ipv6to4',
		'var:errorpage':'ipv6to4'
	});
	$('uiPostForm').submit();
}

function uiTunnelSubmit(){
	var Value_Nodes = $('INPUT_TunnelName', 'SELECT_TunnelMode', 'SELECT_WanInterface',
						'SELECT_LanInterface');

	var i=0;
	for(i=0;i<G_IpTunnel.length;i++)
	{

		if(addTunnelAction != 2 && Value_Nodes[0].value==G_IpTunnel[i][1] )
			break;

	}

	if(i!=G_IpTunnel.length)
	{
		alert("Error: This Tunnel has exists in Tunnel table!");
		return false;
	}

	if(addTunnelAction=='1'){	
		$H({
			'add-obj' 	  	: 'InternetGatewayDevice.X_TELEFONICA-ES_IPTunnel.',
			':TunnelName'	: 	Value_Nodes[0].value,
			':Mode'	:  Value_Nodes[1].value,
			':AssociatedWanIfName'   : Value_Nodes[2].value,
			':AssociatedLanIfName'   : Value_Nodes[3].value,

			'obj-action' 		: 'add-set',
			'getpage'  : 'html/index.html',
			'errorpage': 'html/index.html',
			'var:menu' : 'advanced',
			'var:subpage'   :'ipv6to4',
			'var:page' : 'iptunnel',
			'var:errorpage'     : 'ipv6to4',
			'var:CacheLastData': ViewState.Save()
		},true);

	}
	else if(addTunnelAction=='2')     //edit
	{
		$H({
			'obj-action' 		: 'set',
			'getpage'  : 'html/index.html',
			'errorpage': 'html/index.html',
			'var:menu' : 'advanced',
			'var:subpage'   :'ipv6to4',
			'var:page' : 'iptunnel',
			'var:errorpage'    : 'ipv6to4',
			'var:CacheLastData': ViewState.Save()
		},true);		

		var path=':'+G_IpTunnel[editTunnelIdx][0];
		$F(path+'TunnelName',Value_Nodes[0].value);
		$F(path+'Mode',Value_Nodes[1].value);
		$F(path+'AssociatedWanIfName',Value_Nodes[2].value);
		$F(path+'AssociatedLanIfName',Value_Nodes[3].value);
	}
	$('uiPostForm').submit();
	addTunnelAction = 0;
}


var addIpv6to4Action=0;
var editIpv6to4Idx=0;

function uiAddIpv6to4()
{
	addIpv6to4Action = 1;
	$('TunnelSetting').style.display='none';
	$('tunnel_setup').style.display='none';

	$('addIpv6to4').disabled=true;
	$('editIpv6to4').disabled=true;
	$('deleteIpv6to4').disabled=true;
	

	$('Ipv6to4Setting').style.display='block';
	$('Ipv6to4_setup').style.display='block';

}

function uiEditIpv6to4()
{
	var ip6to4Idx=Form.Radio('ip6to4_index');
	addIpv6to4Action = 2;
    if(G_IPv6to4.length==0)
	{
    	return;
	}
   /*  for (var i=0; i < G_IPv6to4.length; i++)
    {
		if(G_IPv6to4[i][0].indexOf(G_IpTunnel[IptunnelIdx][0])>0)
		{
           editIpv6to4Idx = i;
		   break;
		}
    } */
	editIpv6to4Idx = ip6to4Idx;
	$('TunnelSetting').style.display='none';
	$('tunnel_setup').style.display='none';
	$('Ipv6to4Setting').style.display='none';
	$('Ipv6to4_setup').style.display='block';

	setJSONValue({	
					'SELECT_Ipv6to4Mechanism'      : G_IPv6to4[editIpv6to4Idx][1],
					'SELECT_Ipv6to4Dynamic'     : G_IPv6to4[editIpv6to4Idx][2],
					'INPUT_SLAID'     : G_IPv6to4[editIpv6to4Idx][3],
					'INPUT_BorderRelayAddress'     : G_IPv6to4[editIpv6to4Idx][4]
				});
		
}

function uiDeleteIpv6to4() {
	if (!confirm(SEcode[1008])) {return false;}

	var Index = Form.Radio('ip6to4_index');

	if (Index == undefined) {
		alert("[error] Please Select one item!");
		return false;
	}

	$H({
		'del-obj'   :G_IPv6to4[Index][0],
		'obj-action':'del',
		'var:menu'  :'advanced',
		'var:page'  :'iptunnel',
		'getpage'   :'html/index.html',
		'errorpage' :'html/index.html',
		'var:subpage'   :'ipv6to4',
		'var:errorpage':'ipv6to4'
	});
	$('uiPostForm').submit();
}

function btnApplyIpv6to4() {
	var TunnelIdx = Form.Radio('Tunnel_index');
	var Path = G_IpTunnel[TunnelIdx][0]+'6to4Tunnel.';

	if (addIpv6to4Action == 1) {
		if (('SELECT_Ipv6to4Dynamic').value == '1') {
			$H({
				'add-obj' 	  	: Path,
				':Mechanism'	: $('SELECT_Ipv6to4Mechanism').value ,
				':Dynamic'	    : $('SELECT_Ipv6to4Dynamic').value,
				'obj-action' 		: 'add-set',
				'getpage'  : 'html/index.html',
				'errorpage': 'html/index.html',
				'var:menu' : 'advanced',
				'var:subpage'   :'ipv6to4',
				'var:page' : 'iptunnel',
				'var:errorpage'    : 'ipv6to4',
				'var:CacheLastData': ViewState.Save()
			},true);
		} else {
			$H({
				'add-obj' 	  	: Path,
				':Mechanism'	: $('SELECT_Ipv6to4Mechanism').value,
				':Dynamic'	    : $('SELECT_Ipv6to4Dynamic').value,
				':SLAID'        : $('INPUT_SLAID').value,
				':BorderRelayAddress'        : $('INPUT_BorderRelayAddress').value,
				
				'obj-action' 		: 'add-set',
				'getpage'  : 'html/index.html',
				'errorpage': 'html/index.html',
				'var:menu' : 'advanced',
				'var:subpage'   :'ipv6to4',
				'var:page' : 'iptunnel',
				'var:errorpage'    : 'ipv6to4',
				'var:CacheLastData': ViewState.Save()
			},true);
		}
	}else if(addIpv6to4Action== 2){     //edit
		var Ipv6to4Idx= 0;
		$H({
			'obj-action' 		: 'set',
			'getpage'  : 'html/index.html',
			'errorpage': 'html/index.html',
			'var:menu' : 'advanced',
			'var:subpage'   :'ipv6to4',
			'var:page' : 'iptunnel',
			'var:errorpage'    : 'ipv6to4',
			'var:CacheLastData': ViewState.Save()
		},true);		
		
		var path=':'+G_IPv6to4[Ipv6to4Idx][0];
		$F(path+'Mechanism',$('SELECT_Ipv6to4Mechanism').value);
		$F(path+'Dynamic',$('SELECT_Ipv6to4Dynamic').value);
		if($('SELECT_Ipv6to4Dynamic').value == "0")
		{
			$F(path+'SLAID', $('INPUT_SLAID').value);
			$F(path+'BorderRelayAddress', $('INPUT_BorderRelayAddress').value);
		}
	}
	$('uiPostForm').submit();
	addIpv6to4Action=0;
}
function dealWithError()
{
	if (G_Error != 1)
	{
		return false;
	}

	var arrayHint = [];
	dealErrorMsg(arrayHint, G_Error_Msg);
}

addListeners(uiOnload, dealWithError);
