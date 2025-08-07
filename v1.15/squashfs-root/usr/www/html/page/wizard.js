//wizard 快速配�?

function uiNextPage(){
	Cookie.Delete('cache_wiz');
	$H({
	    'var:menu'	: 'setup',
		'var:subpage'  : 'wizentrance',
		'var:page'  : 'wizard',
		'getpage'   : 'html/index.html'
		
	},true);
	
	$('uiPostForm').submit();
}
