//get user info
var G_UserInfo = new Array();
var m = 0;
<?objget :InternetGatewayDevice.X_TWSZ-COM_Authentication.UserList. "UserName Password Level X_TWSZ-COM_UserNameSSH X_TWSZ-COM_PasswordSSH"
`	G_UserInfo[m] = new Array();
	G_UserInfo[m][0] = "$01"; //UserName
	G_UserInfo[m][1] = ""; //Password
	G_UserInfo[m][2] = "$03"; //Level
	G_UserInfo[m][3] = "$00"; //Index
	G_UserInfo[m][4] = "$04"; //SSHUserName
	G_UserInfo[m][5] = ""; //SSHPassword
	m++;
`?>

//get session timeout
var G_SessionTimeout = "<?get :InternetGatewayDevice.X_TWSZ-COM_Authentication.SessionTimeout?>";
var UserLevel = <?get :InternetGatewayDevice.X_TWSZ-COM_Authentication.UserList.<?echo $var:sys_UserIndex?>.Level?>;
var UserIndex = <?echo $var:sys_UserIndex?>;

function uiOnload()
{
	var accountType = document.getElementsByName("INPUT_AccountType"); 
    	setJSONValue({
		'INPUT_SessionTimeOut'   : G_SessionTimeout/60
	});

	setJSONValue({
   	      'SELECT_UserLevel'       : UserLevel
	});

	setJSONValue({
   	      'SELECT_SSHUserLevel'       : UserLevel
	});
	
	InitSelectUserLevel();
	changetypeSelect(1);	//htmlÓëÒ³Ãæ³õ´ÎÏÔÊ¾µÄÄ¬ÈÏÑ¡ÔñWeb/telnet 
	
	dealWithError();
}

function InitSelectUserLevel()
{
	var text = [], value = [];
	var sshtext = [], sshvalue = [];
	var i = 0;
	
        if (1 == UserLevel)
        {
                for (i = 0; i < G_UserInfo.length; i++)
                {
                        text.push(G_UserInfo[i][0]);
                        value.push(G_UserInfo[i][3]);
                }
		
		for (i = 0; i < G_UserInfo.length; i++)
                {
                        sshtext.push(G_UserInfo[i][4]);
                        sshvalue.push(G_UserInfo[i][3]);
                }			
        }
        else
        {
                text.push(G_UserInfo[UserIndex-1][0]);
                value.push(G_UserInfo[UserIndex-1][3]);
		
		sshtext.push(G_UserInfo[UserIndex-1][4]);
                sshvalue.push(G_UserInfo[UserIndex-1][3]);
        }

        $S('SELECT_UserLevel', text, value);
        setJSONValue({
                'SELECT_UserLevel'    : UserIndex,
                'INPUT_NewUsername'   : G_UserInfo[UserIndex-1][0]
        });
	
	$S('SELECT_SSHUserLevel', sshtext, sshvalue);
        setJSONValue({
                'SELECT_SSHUserLevel'    : UserIndex,
                'INPUT_SSHNewUsername'   : G_UserInfo[UserIndex-1][4]
        });
}

function changetypeSelect(value){
	if(1 == value){
		$('account_info').style.display = 'block';
		$('ssh_account_info').style.display = 'none';
		ctrlChageUser();
	}
	else{
		$('account_info').style.display = 'none';
		$('ssh_account_info').style.display = 'block';
		ctrlChageSSHUser();
	}
}

function ctrlChageUser()
{
	var select_userlevel = $('SELECT_UserLevel').value;
        setJSONValue({
                'SELECT_UserLevel'    : select_userlevel,
                'INPUT_NewUsername'   : G_UserInfo[select_userlevel-1][0]
        });
}

function ctrlChageSSHUser()
{
	var select_sshuserlevel = $('SELECT_SSHUserLevel').value;
        setJSONValue({
                'SELECT_SSHUserLevel'    : select_sshuserlevel,
                'INPUT_SSHNewUsername'   : G_UserInfo[select_sshuserlevel-1][4]
        });
}

function uiSubmit()
{
	if(!checkValue()) 
		return false;
	
	var value_node = $('SELECT_UserLevel','INPUT_OldPassword','INPUT_NewPassword','INPUT_NewUsername');
	
	$F(':InternetGatewayDevice.X_TWSZ-COM_Authentication.UserList.' + value_node[0].value + '.Password', value_node[1].value + ':' +value_node[2].value);
	$F(':InternetGatewayDevice.X_TWSZ-COM_Authentication.UserList.' + value_node[0].value + '.UserName', value_node[3].value);

	$H({
		'obj-action'   : 'set',
		'var:nodeIndex': value_node[0].value,
		//'var:menu'     : 'maintenance',
		'var:page'     : 'accessctrl',
		'var:subpage'  : 'accountpsd',
		'var:errorpage': 'accountpsd',
		'getpage'      : 'html/main.html',
		'errorpage'    : 'html/index.html',
		'var:noredirect':'0',
		'var:CacheLastData': ViewState.Save()
	});
	$('uiPostForm').submit();
}

function uiSSHSubmit()
{
	if(!checkSSHValue()) 
		return false;
	
	var value_node = $('SELECT_SSHUserLevel','INPUT_SSHOldPassword','INPUT_SSHNewPassword','INPUT_SSHNewUsername');
	
	$F(':InternetGatewayDevice.X_TWSZ-COM_Authentication.UserList.' + value_node[0].value + '.X_TWSZ-COM_PasswordSSH', value_node[1].value + ':' +value_node[2].value);
	$F(':InternetGatewayDevice.X_TWSZ-COM_Authentication.UserList.' + value_node[0].value + '.X_TWSZ-COM_UserNameSSH', value_node[3].value);

	$H({
		'obj-action'   : 'set',
		'var:nodeIndex': value_node[0].value,
		//'var:menu'     : 'maintenance',
		'var:page'     : 'accessctrl',
		'var:subpage'  : 'accountpsd',
		'var:errorpage': 'accountpsd',
		'getpage'      : 'html/index.html',
		'errorpage'    : 'html/index.html',
		'var:noredirect':'0',
		'var:CacheLastData': ViewState.Save()
	});
	$('uiPostForm').submit();
}

function uiSubmit_TO()
{
	$H({
		":InternetGatewayDevice.X_TWSZ-COM_Authentication.SessionTimeout" : $('INPUT_SessionTimeOut').value*60,
		'obj-action'   	:'set',
		'var:menu'     	:'maintenance',
		'var:page'     	:'accessctrl',
		'var:subpage'   :'accountpsd',
		'var:errorpage': 'accountpsd',
		'getpage'   	:'html/index.html',
		'errorpage'    : 'html/index.html',
		'var:CacheLastData': ViewState.Save()
	});
	$('uiPostForm').submit();
}

function checkValue()
{
	//check NewPassword
	var _NewPassword = String($("INPUT_NewPassword").value);	
	//check ConfirmPassword
	var _ConfirmPassword = String($('INPUT_ConfirmPassword').value);
	if(_ConfirmPassword != _NewPassword)
	{
		alert(SEcode[1010]);
		return false;
	}else if( -1 != _NewPassword.indexOf(" ") )
	{
		alert(SEcode[1013]);
		return false;
	}
	
	return true;
}

function checkSSHValue()
{
	//check NewPassword
	var _NewPassword = String($("INPUT_SSHNewPassword").value);	
	//check ConfirmPassword
	var _ConfirmPassword = String($('INPUT_SSHConfirmPassword').value);
	if(_ConfirmPassword != _NewPassword)
	{
		alert(SEcode[1010]);
		return false;
	}else if( -1 != _NewPassword.indexOf(" ") )
	{
		alert(SEcode[1013]);
		return false;
	}
	
	return true;
}

function dealWithError()
{
	if (G_Error != 1)
	{
		return false;
	}
	
	var arrayHint = [];
//	arrayHint['SessionTimeout']  = 'INPUT_SessionTimeOut';
	
	dealErrorMsg(arrayHint, G_Error_Msg);
}

addListeners(uiOnload);
