<?setvaronce var:state 0?>
<?mget :InternetGatewayDevice.X_TWSZ-COM_BerTest. "TimeInterval TotalErrorsBits TotalTransmittedBits BitErrorRate Status"
`	var G_TimeInterval                = "$01";
	var G_TotalErrorsBits             = "$02";
	var G_TotalTransmittedBits        = "$03";
	var G_BitErrorRate                = "$04";
	var G_Status                      = "$05";
`?>
								 
var data_dynamic = {
	lang_bertest_status					: 'Ber Test Status',
	lang_running						: ' Ber test is running... ',
	lang_finished						: ' Ber test has finished',
	lang_error						    : ' Ber test error',
	lang_error_link_down                : ' DSL Link is down'
};



function uiOnload(){
	var Node_Output = '';
	
	$('INPUT_TimeInterval').value = G_TimeInterval || '100';
	
	with(data_dynamic)
    {
		switch (G_Status){
			case 'Complete':{
				Node_Output += lang_bertest_status + ': '+ lang_finished + unescape("%0a");
				Node_Output += 'Total Errors Bits     : '+ G_TotalErrorsBits + unescape("%0a");
                Node_Output += 'Total Transmitted Bits: '+ G_TotalTransmittedBits + unescape("%0a");
                Node_Output += 'Bits Errors Rate      : '+ G_BitErrorRate + '%' + unescape("%0a");
				break;
			}
			case 'Requested':{
				Node_Output +=  lang_bertest_status + ': ' + lang_running;
				setTimer();
				break;
			}
            case 'Error_DSLLinkDown':{
                Node_Output +=  lang_bertest_status + ': ' + lang_error_link_down;
				break;
            }
            case 'Error':{
                Node_Output +=  lang_bertest_status + ': ' + lang_error;
				break;
            }
			case 'None': break;
		}
	}
	$('BerTest_Output').value = Node_Output;
	
	dealWithError();
}

function uiSubmit(){

	$H({
		':InternetGatewayDevice.X_TWSZ-COM_BerTest.TimeInterval' :$('INPUT_TimeInterval').value,
		':InternetGatewayDevice.X_TWSZ-COM_BerTest.Status'       :'Requested',
		'var:state' :'1',
		'var:menu'      : G_Menu,
		'var:page'      : G_Page,
		'var:subpage'   : G_SubPage,
		'var:errorpage' : G_SubPage,
		'getpage'       : 'html/index.html',
		'errorpage'     : 'html/index.html',
		'var:CacheLastData':ViewState.Save(),
		'obj-action':'set'
	});

	    $('uiPostForm').submit();
}


function setTimer(){
    var timeValue = (parseInt($('INPUT_TimeInterval').value) + 3)*1000;
	var Timer = setTimeout('uiPageRefresh()', timeValue);
	if(G_Status != 'Requested'){
		clearTimeout(Timer);
	} else {
		$('btn_BerTest').disabled = true;
	}
}

function uiPageRefresh(){
	document.location.href = uiGetPageUrl() + '&var:state=1';
}

function dealWithError(){
	if (G_Error != 1){ return false;}
	
	var arrayHint = [];
	arrayHint['TimeInterval']          	= 'Time Interval';
	
	dealErrorMsg(arrayHint, G_Error_Msg);
}

addListeners(uiOnload);
