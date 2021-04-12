var QQMapWX = require('../js/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
	  key: 'TTABZ-ITPRU-LDHV5-4ENA5-AHFYH-S5BO6' // 必填
});
var map={}

map.search= function(keyword,cb){
	
	return  qqmapsdk.search({
					      keyword: keyword,  //搜索关键词
					   
					      success: function (res) { //搜索成功后的回调
					        var mks = []
					        for (var i = 0; i < res.data.length; i++) {
					          mks.push({ // 获取返回结果，放到mks数组中
					            title: res.data[i].title,
					            id: res.data[i].id,
					            latitude: res.data[i].location.lat,
					            longitude: res.data[i].location.lng,
					            iconPath: "../../static/logo.png", //图标路径
								address:res.data[i].address,
					            width: 20,
					            height: 20
					          })
					        }
							cb(mks)
					      },
					      fail: function (res) {
					        console.log(res);
					      },
					      complete: function (res){
					        console.log(res);
					      }
					  });
}
 export default map