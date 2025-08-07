//lan clients --
var LanHosts = [];
var m = 0;
<?objget :InternetGatewayDevice.LANDevice. "Hosts.HostNumberOfEntries"
`	<?if gt $11 0
	`	<?objget :InternetGatewayDevice.LANDevice.$20.Hosts.Host. "HostName MACAddress IPAddress LeaseTimeRemaining VendorClassID AddressSource"
             `	<?if eq `DHCP` `<?echo $26?>` 	
		`	LanHosts[m] = [];
				LanHosts[m][0] = "<?echo $21?>";
				LanHosts[m][1] = "<?echo $22?>";
				LanHosts[m][2] = "<?echo $23?>";
				LanHosts[m][3] = "<?echo $24?>";
			++m;
			`?>
		`?>
	`?>
`?>

var G_IPv6Client = "<?get :InternetGatewayDevice.LANDevice.1.X_TELEFONICA-ES_IPv6LANHostConfigManagement.X_TWSZ-COM_Clients?>"
function uiOnload(){	
	var _ipv6lan = [];
	var ipv6clients = G_IPv6Client.split(';');
	for(var i = 0; i<ipv6clients.length ;i++)
	{
		var ipv6client = ipv6clients[i].split(',');
		_ipv6lan[i] = [];
		for(var j = 0; j<ipv6client.length;j++)
		{
			_ipv6lan[i][j] = ipv6client[j];
		}
	}
	$T('td_Ipv6Clients',_ipv6lan);
	$T('td_lanClients',LanHosts);
}

addListeners(uiOnload);
