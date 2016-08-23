
var cordovaUtil = cordovaUtil || {};
/**弹出框*/
cordovaUtil.showAlert=function(message){
	navigator.notification.alert('',alertDismissed,message,'确认');
}

function alertDismissed(){	
}
cordovaUtil.watchId=null;
cordovaUtil.positon=null;
cordovaUtil.userId=null;
/**定时取得位置*/
cordovaUtil.getPosition=function(userId) { 
		cordovaUtil.userId=userId;
		cordovaUtil.getBaiduLoc();
		setInterval(cordovaUtil.getBaiduLoc,300000);
		//intervalGetPosition();
		//setInterval(intervalGetPosition,10000); //600000
		//var options={frequency:300000, maximumAge: 3000, timeout: 6000, enableHighAccuracy: false};
		//cordovaUtil.watchId=navigator.geolocation.watchPosition(cordovaUtil.getPositionSuccess,cordovaUtil.getPositionError,options);//检测地理位置变化    
} 
cordovaUtil.getBaiduLoc = function(){
	var success = function(data){ //处理定位结果
		var latitude= data.Latitude;//纬度
		var longitude= data.Longitude;//	经度
		
//		for(var a in data){
//			alert(a+" :"+data[a])
//		}
		//cordovaUtil.showAlert("纬度latitude:"+latitude+";经度longitude"+longitude);
		commonutil.doAjax('/m/attendance/gpsupload', {'userId':cordovaUtil.userId,'latitude':latitude, 'longitude': longitude}, function(data) {
		}, 'json');
	}; 
	window.Location(success,function(msg){
		cordovaUtil.showAlert(msg);
	}); 
};
var intervalGetPosition=function(){
	navigator.geolocation.getCurrentPosition(cordovaUtil.getPositionSuccess,cordovaUtil.getPositionError, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: false });
}
cordovaUtil.getPositionSuccess=function(position) { 
		var latitude= position.coords.latitude;//纬度
		var longitude= position.coords.longitude;//	经度

		//alert("纬度latitude:"+latitude+";经度longitude"+longitude)
		commonutil.doAjax('/m/attendance/gpsupload', {'userId':cordovaUtil.userId,'latitude':latitude, 'longitude': longitude}, function(data) {
				
		}, 'json');
		
} 
cordovaUtil.getPositionError=function(error) { 
	cordovaUtil.showAlert('获取地理位置出错,错误编码['    + error.code    + '],请检查gps是否已经打开！'); 
} 
