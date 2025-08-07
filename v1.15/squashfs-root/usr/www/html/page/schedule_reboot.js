00
var Reboot_Enable = "<?get :InternetGatewayDevice.X_TWSZ-COM_RebootTime.Enable ?>";
var Reboot_Time   = "<?get :InternetGatewayDevice.X_TWSZ-COM_RebootTime.X_TWSZ-COM_Time ?>";
var Reboot_day    = "<?get :InternetGatewayDevice.X_TWSZ-COM_RebootTime.X_TWSZ-COM_SelectDays ?>";

function Select_Day(){
	
	var starttime= Reboot_Time;
	var num=starttime.indexOf(':');
	var starttimeh=starttime.substring(0,num);
	var starttimem=starttime.substring(num+1,starttime.length+1);
			
	if(Reboot_day.indexOf('Sun')!=-1)
		var SunEnable=1; //Sun
	else
		var SunEnable=0; //Sun
	
	if(Reboot_day.indexOf('Mon')!=-1)
		var MonEnable=1; //Mon
	else
		var MonEnable=0; //Mon
		
	if(Reboot_day.indexOf('Tue')!=-1)
		var TueEnable=1; //Tue
	else
		var TueEnable=0; //Tue
		
	if(Reboot_day.indexOf('Wed')!=-1)
		var WedEnable=1; //Wed
	else
		var WedEnable=0; //Wed
		
	if(Reboot_day.indexOf('Thu')!=-1)
		var ThuEnable=1; //Thu
	else
		var ThuEnable=0; //Thu
		
	if(Reboot_day.indexOf('Fri')!=-1)
		var FriEnable=1; //Fri
	else
		var FriEnable=0; //Fri
		
	if(Reboot_day.indexOf('Sat')!=-1)
		var SatEnable=1; //Sat
	else
		var SatEnable=0; //Sat
	
	setJSONValue({
		sunday          : SunEnable,
		monday          : MonEnable,
		tuesday         : TueEnable,
		wednesday       : WedEnable,
		thursday        : ThuEnable,
		friday          : FriEnable,
		saturday        : SatEnable,
		startTimeH 		: starttimeh,
		startTimeM 		: starttimem
	});
}

function uiOnload(){
	
	if('1' == Reboot_Enable)
	{
		disCtrl('display_time',true);
	}
	else
	{
		disCtrl('display_time',false);
	}

	Form.Radio('INPUT_Disable_Enable',Reboot_Enable);
	
	Select_Day();
}

function changeSelect(value){
	
	if(value)
	{
		disCtrl('display_time',true);
	}
	else
	{
		disCtrl('display_time',false);
	}
	
	Reboot_Enable = value;
}

function FullFillTimeBlank(value){
	var num;
	var time;
	num = parseInt(value,10);
	if (num < 10)
		time = "0" + num;
	else
		time = num;
		
	return time;
}


function uiSubmit(){
	
	var TimeH = FullFillTimeBlank($('startTimeH').value);
	var TimeM = FullFillTimeBlank($('startTimeM').value);
	
	var starttime= TimeH + ':' + TimeM;
	
	var selectdays='';
	if(Form.Checkbox('sunday')=='1')
	     selectdays='Sun,';
	if(Form.Checkbox('monday')=='1')
	     selectdays+='Mon,';
	if(Form.Checkbox('tuesday')=='1')
	     selectdays+='Tue,';
	if(Form.Checkbox('wednesday')=='1')
	     selectdays+='Wed,';
	if(Form.Checkbox('thursday')=='1')
	     selectdays+='Thu,';
	if(Form.Checkbox('friday')=='1')
	     selectdays+='Fri,';
	if(Form.Checkbox('saturday')=='1')
	     selectdays+='Sat,';
		 
    $H({
		':InternetGatewayDevice.X_TWSZ-COM_RebootTime.Enable' :Reboot_Enable,
		':InternetGatewayDevice.X_TWSZ-COM_RebootTime.X_TWSZ-COM_Time' :starttime,
		':InternetGatewayDevice.X_TWSZ-COM_RebootTime.X_TWSZ-COM_SelectDays' :selectdays,
		'obj-action':'set',
		'var:menu'  :'<?echo $var:menu?>',
		'var:page'  :'<?echo $var:page?>',
		'getpage'   : 'html/index.html',
		'errorpage' : 'html/index.html',
		'var:errorpage' : 'schedule_reboot',
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
