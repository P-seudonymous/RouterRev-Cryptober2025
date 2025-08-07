//ip filter
var G_IPFilterEnable = "<?get :InternetGatewayDevice.X_TWSZ-COM_Firewall.IPFilterEnable?>"; // filter enable
var G_SecurityLevel  = "<?get :InternetGatewayDevice.X_TWSZ-COM_Firewall.SecurityLevel?>";  // security level
var G_LanFilterTable = "<?get :InternetGatewayDevice.X_TWSZ-COM_Firewall.CurrentLANFilterTable?>";
var G_WanFilterTable = "<?get :InternetGatewayDevice.X_TWSZ-COM_Firewall.CurrentWANFilterTable?>";

var m = 0;
var G_Wan_Black = [];
<? if gt `<?get :InternetGatewayDevice.X_TWSZ-COM_Firewall.WanBlackFilterNumberOfEntries?>` 0
`	<?objget :InternetGatewayDevice.X_TWSZ-COM_Firewall.WanBlackFilter. "Enable SrcIP SrcMask SrcPort DestIP DstMask DestPort Protocol Description DevPath"
	`	G_Wan_Black[m] = [];
		G_Wan_Black[m][0] = "$01"; //Enable
		G_Wan_Black[m][1] = "$02"; //SrcIP
		G_Wan_Black[m][2] = "$03"; //SrcMask
		G_Wan_Black[m][3] = "$04"; //SrcPort
		G_Wan_Black[m][4] = "$05"; //DestIP
		G_Wan_Black[m][5] = "$06"; //DstMask
		G_Wan_Black[m][6] = "$07"; //DestPort
		G_Wan_Black[m][7] = "$08"; //Protocol
		G_Wan_Black[m][8] = "$09"; //Description
		G_Wan_Black[m][9] = "$0a"; //DevPath
		G_Wan_Black[m][10] = "InternetGatewayDevice.X_TWSZ-COM_Firewall.WanBlackFilter.$00.";
		m++;
	`?>
`?>

var y = 0;
var G_Wan_White = [];
<? if gt `<?get :InternetGatewayDevice.X_TWSZ-COM_Firewall.WanWhiteFilterNumberOfEntries?>` 0
`	<?objget :InternetGatewayDevice.X_TWSZ-COM_Firewall.WanWhiteFilter. "Enable SrcIP SrcMask SrcPort DestIP DstMask DestPort Protocol Description DevPath"
	`	G_Wan_White[y] = [];
		G_Wan_White[y][0] = "$01"; //Enable
		G_Wan_White[y][1] = "$02"; //SrcIP
		G_Wan_White[y][2] = "$03"; //SrcMask
		G_Wan_White[y][3] = "$04"; //SrcPort
		G_Wan_White[y][4] = "$05"; //DestIP
		G_Wan_White[y][5] = "$06"; //DstMask
		G_Wan_White[y][6] = "$07"; //DestPort
		G_Wan_White[y][7] = "$08"; //Protocol
		G_Wan_White[y][8] = "$09"; //Description
		G_Wan_White[y][9] = "$0a"; //DevPath
		G_Wan_White[y][10] = "InternetGatewayDevice.X_TWSZ-COM_Firewall.WanWhiteFilter.$00.";
		y++;
	`?>
`?>

var n = 0;
var G_Lan_Black = [];
<? if gt `<?get :InternetGatewayDevice.X_TWSZ-COM_Firewall.LanBlackFilterNumberOfEntries?>` 0
`	<?objget :InternetGatewayDevice.X_TWSZ-COM_Firewall.LanBlackFilter. "Enable SrcIP SrcMask SrcPort DestIP DstMask DestPort Protocol Description DevPath"
	`	G_Lan_Black[n] = [];
		G_Lan_Black[n][0] = "$01"; //Enable
		G_Lan_Black[n][1] = "$02"; //SrcIP
		G_Lan_Black[n][2] = "$03"; //SrcMask
		G_Lan_Black[n][3] = "$04"; //SrcPort
		G_Lan_Black[n][4] = "$05"; //DestIP
		G_Lan_Black[n][5] = "$06"; //DstMask
		G_Lan_Black[n][6] = "$07"; //DestPort
		G_Lan_Black[n][7] = "$08"; //Protocol
		G_Lan_Black[n][8] = "$09"; //Description
		G_Lan_Black[n][9] = "$0a"; //DevPath
		G_Lan_Black[n][10] = "InternetGatewayDevice.X_TWSZ-COM_Firewall.LanBlackFilter.$00.";
		n++;
	`?>
`?>

var w = 0;
var G_Lan_White = [];
<? if gt `<?get :InternetGatewayDevice.X_TWSZ-COM_Firewall.LanWhiteFilterNumberOfEntries?>` 0
`	<?objget :InternetGatewayDevice.X_TWSZ-COM_Firewall.LanWhiteFilter. "Enable SrcIP SrcMask SrcPort DestIP DstMask DestPort Protocol Description DevPath"
	`	G_Lan_White[w] = [];
		G_Lan_White[w][0] = "$01"; //Enable
		G_Lan_White[w][1] = "$02"; //SrcIP
		G_Lan_White[w][2] = "$03"; //SrcMask
		G_Lan_White[w][3] = "$04"; //SrcPort
		G_Lan_White[w][4] = "$05"; //DestIP
		G_Lan_White[w][5] = "$06"; //DstMask
		G_Lan_White[w][6] = "$07"; //DestPort
		G_Lan_White[w][7] = "$08"; //Protocol
		G_Lan_White[w][8] = "$09"; //Description
		G_Lan_White[w][9] = "$0a"; //DevPath
		G_Lan_White[w][10] = "InternetGatewayDevice.X_TWSZ-COM_Firewall.LanWhiteFilter.$00.";
		w++;
	`?>
`?>
// WanDevice
var G_wanConnction = [];
var s = 0;
//modify by lbw 20110715
<?objget :InternetGatewayDevice.WANDevice. ""
	`
<?objget :InternetGatewayDevice.WANDevice.$10.WANConnectionDevice. "WANIPConnectionNumberOfEntries WANPPPConnectionNumberOfEntries"
`	<?if gt $11 0
	`	<?objget :InternetGatewayDevice.WANDevice.$30.WANConnectionDevice.$20.WANIPConnection. "Name"
		`	G_wanConnction[s] = [];
			G_wanConnction[s][0] = "$01"; // name;
			G_wanConnction[s][1] = "InternetGatewayDevice.WANDevice.$30.WANConnectionDevice.$20.WANIPConnection.$00"; // about Path
			++s;
		`?>
	`?>
	<?if gt $12 0
	`	<?objget :InternetGatewayDevice.WANDevice.$30.WANConnectionDevice.$20.WANPPPConnection. "Name"
		`	G_wanConnction[s] = [];
			G_wanConnction[s][0] = "$01"; // wan's name;
			G_wanConnction[s][1] = "InternetGatewayDevice.WANDevice.$30.WANConnectionDevice.$20.WANPPPConnection.$00"; // about Path;
			++s;
		`?>
	`?>
`?>
`?>
// LanDevice
var t = 0;
<?objget :InternetGatewayDevice.LANDevice. "X_TWSZ-COM_DeviceName"
`	G_wanConnction[s] = [];
	G_wanConnction[s][0] = "Lan" + (t+1) ; // lan's name
	G_wanConnction[s][1] = "InternetGatewayDevice.LANDevice.$00";
	++s;
	++t;
`?>
<?objget :InternetGatewayDevice.LANDevice.1.WLANConfiguration. "SSID"
`	G_wanConnction[s] = [];
	G_wanConnction[s][0] = "$01"; // lan's name
	G_wanConnction[s][1] = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.$00";
	++s;
`?>

//这个函数有两个用处：1、加载函数；2、变换安全级别时作为onchange的事件处理函�?
function uiOnload(sLevel){
	//启用IP Fliter
	Form.Checkbox('INPUT_Enable',G_IPFilterEnable);;
	//安全级别
	G_SecurityLevel = sLevel || G_SecurityLevel; // 如果有参数传进来，则覆盖原来安全级别的�?
	$('SELECT_SecurityLevel').value = G_SecurityLevel;
	//黑白单的节点引用
	var radio_node = $('INPUT_WanToLan_White','INPUT_WanToLan_Black','INPUT_LanToWan_White','INPUT_LanToWan_Black');
	var lang_node  = $('lang_wanToLan_white','lang_wanToLan_black','lang_lanToWan_white','lang_lanToWan_black');
	//初始化Radio的状�?
	for(var i = 0; i < 4; i++){
		radio_node[i].disabled = false;
		lang_node[i].style.color = "#000000";
	}
	//指定黑白名单的�?
	if(G_SecurityLevel == '0'){ //用户自定�?
		Form.Radio('wanToLan',Number(G_WanFilterTable) - 2);
		Form.Radio('lanToWan',Number(G_LanFilterTable));
	} else { // 系统指定
		switch(G_SecurityLevel){
			case '3' : {
				G_WanFilterTable = 1;
				G_LanFilterTable = 1;
				radio_node[1].disabled = true;
				radio_node[3].disabled = true;
				lang_node[1].style.color = "#aaaaaa";
				lang_node[3].style.color = "#aaaaaa";
				break;
			}
			case '2' : {
				G_WanFilterTable = 1;
				G_LanFilterTable = 2;
				radio_node[1].disabled = true;
				radio_node[2].disabled = true;
				lang_node[1].style.color = "#aaaaaa";
				lang_node[2].style.color = "#aaaaaa";
				break;
			}
			case '1' : {
				G_WanFilterTable = 2;
				G_LanFilterTable = 2;
				radio_node[0].disabled = true;
				radio_node[2].disabled = true;
				lang_node[0].style.color = "#aaaaaa";
				lang_node[2].style.color = "#aaaaaa";
				break;
			}
		}
		Form.Radio('wanToLan',G_WanFilterTable);
		Form.Radio('lanToWan',G_LanFilterTable);
	}
	//动态生成IP Filter的列�?
	createTable();
}

function createTable(){
	//初始化table,清空
	Table.Clear('Table_ip_list');
	//获取用户需要遍历的名单类型
	var G_FilterLists = $('SELECT_ListType').value == '1' ? (Form.Radio('wanToLan') == '1' ? G_Wan_White : G_Wan_Black) : (Form.Radio('lanToWan') == '1' ? G_Lan_White : G_Lan_Black);
	//遍历指定的FILTER
	var array_value = [];
	for(var i = 0; i < G_FilterLists.length; i++){
		array_value[i] = [];
		array_value[i].push(i+1);//序号
		array_value[i].push(G_FilterLists[i][0]); //Enable
		array_value[i].push(G_FilterLists[i][1] + '/' + G_FilterLists[i][3]); //Source IP and Port
		array_value[i].push(G_FilterLists[i][4] + '/' + G_FilterLists[i][6]); //Dest IP and Port
		array_value[i].push(G_FilterLists[i][7]); //protocol
		array_value[i].push(G_FilterLists[i][8]); //description
		array_value[i].push(searchDevPath(G_FilterLists[i][9])); //DevPath
		array_value[i].push('<input type="button" id="edit" value="' + data_language.dynamic.edit + '" onClick=uiEdit("' + G_FilterLists[i][10] + '")> <input type="button" id="delete" value="' + data_language.dynamic.del + '" onClick=uiDelete("' + G_FilterLists[i][10] + '")>'); //Edit and Delete
	}
	$T('Table_ip_list',array_value);
}
//将DevPath的路径转换为连接的Name
function searchDevPath(DevPath){
	for(var i = 0; i < G_wanConnction.length; i++){
		if(G_wanConnction[i][1] == DevPath){
			return G_wanConnction[i][0];
		}
	}
	return '';
}

function uiSumbit(){
	var WanFilterNum = Number(Form.Radio('wanToLan')) + 2;
	var LanFilterNum = Number(Form.Radio('lanToWan'));
	
	//��������˰�����(��ֵ����1����ΪֵΪ2ʱ��WAN �� LAN���ǰ�����)��������ʾ
	if ($('SELECT_SecurityLevel').value > 1)
	{
		if (confirm(data_language.innerHTML.lang_tips) == false)
		{
			return false;
		}
	}
	
	$H({
		':InternetGatewayDevice.X_TWSZ-COM_Firewall.IPFilterEnable': Form.Checkbox('INPUT_Enable'),
		':InternetGatewayDevice.X_TWSZ-COM_Firewall.SecurityLevel' : $('SELECT_SecurityLevel').value,
		':InternetGatewayDevice.X_TWSZ-COM_Firewall.CurrentLANFilterTable' : G_SecurityLevel == '0' ? LanFilterNum : undefined,
		':InternetGatewayDevice.X_TWSZ-COM_Firewall.CurrentWANFilterTable' : G_SecurityLevel == '0' ? WanFilterNum : undefined,
		'obj-action'       : 'set',
		'var:menu'         : 'advanced',
		'var:page'         : 'ip_list',
		'getpage'          : 'html/index.html',
		'errorpage'        : 'html/index.html',
		'var:errorpage'    : 'ip_list',
		'var:CacheLastData': ViewState.Save()
	});
	$('uiPostForm').submit();
}

function uiEdit(Path){
	var _split = Path.split('.');
	
	$H({
		'var:IPfilterType':_split[2].substring(0,8),
		'var:nodePath'    :_split[3],
		'getpage'         :'html/index.html',
		'errorpage'       :'html/index.html',
		'var:menu'        :'advanced',
		'var:page'        :'ip_list',
		'var:subpage'     :'ip_filter'
	});
	$('uiPostForm').submit();	
}

function uiDelete(){
	if(!confirm(SEcode[1001])){ return false;}
	
	$H({
		'del-obj'   :arguments[0],
		'obj-action':'del',
		'var:menu'  :'advanced',
		'var:page'  :'ip_list',
		'getpage'   :'html/index.html',
		'errorpage' :'html/index.html',
		'var:errorpage':'ip_list'
	});
	$('uiPostForm').submit();	
}

function uiAdd(){
	//选择方向：WAN->LAN(1),还是LAN->WAN(2)
	var listType = $('SELECT_ListType').value;
	var filterType;
	
	switch(G_SecurityLevel){
		case '3' : {
			filterType = listType == '1' ? 'WanWhite' : 'LanWhite';
			break;
		}
		case '2' : {
			filterType = listType == '1' ? 'WanWhite' : 'LanBlack';
			break;
		}
		case '1' : {
			filterType = listType == '1' ? 'WanBlack' : 'LanBlack';
			break;
		}
		case '0' : {
			filterType = listType == '1' ? (Form.Radio('wanToLan') == '1' ? 'WanWhite' : 'WanBlack') : (Form.Radio('lanToWan') == '1' ? 'LanWhite' : 'LanBlack');
			break;
		}
	}
	
	$H({
		'var:IPfilterType' : filterType,
		'var:menu'         : 'advanced',
		'var:page'         : 'ip_list',
		'var:subpage'      : 'ip_filter',
		'getpage'          : 'html/index.html',
		'errorpage'        : 'html/index.html'
	});
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
