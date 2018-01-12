$().ready(function() {



    originTool();

    banner();

    client();

    scrollBack();

    ourYouDian();

    getVideoHeight();

    window.onresize = function(){

    	getVideoHeight();

    };

});

$('#lgfdl').click(function(){
    $("#lgfzhezao").css("display","block");
    $("#lgfDenglu").css("display","block");
});

$('#lgfopen').click(function(){
    $("#lgfzhezao").css("display","none");
    $("#lgfDenglu").css("display","none");
});

$(".lgfTabQiehuan li").click(function() {
    var denglu = $(this).index();
    $(".lgfdengluBox li").removeClass("classxianshi");
    $(".lgfdengluBox li").eq(denglu).addClass("classxianshi");
    $(".lgfTabQiehuan li").removeClass('lgfborbottom');
    $(".lgfTabQiehuan li").eq(denglu).addClass('lgfborbottom');
});






function getVideoHeight(){

	    var screenWidth = document.documentElement.clientWidth;

	    var videoHeight = screenWidth/16*9*0.6;

	    if(screenWidth<=960){

	    	videoHeight = 320;

	    	$('.video-bg').css('width','949');

	    }



	    $('.flex-wrap').css('height',videoHeight);

	    $('.flexVideo').css('height',videoHeight);

	    $('.flexVideo video').css('height',videoHeight);

}





function scrollBack() {

    var top = $('#advan').position();

}





function client() {

    var num = $("#Clients .logo");

    num.hover(function() {  

        var top = $(this).position().top;

        var left = $(this).position().left;

    });



    $('#Clients').hover(function() {}, function() {

        $('.noLi').css('display', 'none');

    });

}



//特效优势

function ourYouDian() {

    $("#caLogo1").hover(function() {

        $('#caLogo1w').removeClass('oro');

        $('#caLogo1w').addClass('hoverLogo');

    }, function() {

        $('#caLogo1w').removeClass('hoverLogo');

        $('#caLogo1w').addClass('oro');

    });

    $("#caLogo2").hover(function() {

        $('#caLogo2w').removeClass('oro');

        $('#caLogo2w').addClass('hoverLogo');

    }, function() {

        $('#caLogo2w').removeClass('hoverLogo');

        $('#caLogo2w').addClass('oro');

    });

    $("#caLogo3").hover(function() {

        $('#caLogo3w').removeClass('oro');

        $('#caLogo3w').addClass('hoverLogo');

    }, function() {

        $('#caLogo3w').removeClass('hoverLogo');

        $('#caLogo3w').addClass('oro');

    });

}

function originTool() {



    // 滚动监听 start

    $('.changeHideHeader').waypoint(function(direction) {

        /*if (direction == "up") { // 了解 拍片网之前

            $('#header').removeClass('headerMove');

        } else {

            $('#header').addClass('headerMove');

        }*/

    $('#search').unbind('click');

        $('#search').bind('click', function() {

            searchOnclick();

        });

    });

     $('.dropdown li').on('click',function(){

          $(this).parent().parent().find('.dropdown-toggle').find('span').text($(this).text());

          $(this).parent().slideUp();

          return false;

     });



    $('#classical').waypoint(function() {

        //$('.cardUl').find('li').addClass('topAnimaltion');

    }, { offset: 600 });

    $('.hereClients').waypoint(function() {

        $('#Clients').find('.up').css('top', '0');

        $('#Clients').find('.up').css('opacity', '1');

        $('#Clients').find('.down').css('top', '0');

        $('#Clients').find('.down').css('opacity', '1');

    }, { offset: 1500 });



}

function banner() {

    $('#bannerTitleAn1').addClass('showTitle');

    $('#DescAn1').addClass('showTitle');

    var banner = new Swiper('.swiper-banner', {

        pagination: '.swiper-pagination-banner',

        paginationClickable: true,

        loop: true,

        grabCursor: true,

        nextButton: '.swiper-button-next',

        prevButton: '.swiper-button-prev',

        autoplay: 5000,

        onSlideChangeEnd: function(swiper) {

            var number = swiper.activeIndex; //每次切换时，提示现在是第几个slide

        },

    });

}



/**

 * 主页业务处理部分

 */

var homePage = {

	init:function(){



		//点击帮我推荐提交订单

		this.clickHelpYou();

		//获取热门爆款和经典案例

		this.getRecommendProduct();

		//获取首页推荐导演

		this.getRecommendTeam();

		//获取推荐新闻

		this.getRecommendNews();

		//案例找创意

		this.search();

		//立即下单

		this.deliverOrder();

		//初始化视频加载

		this.initVideo();

	},

	search:function(){

		$(".home-search").off("click").on("click",function(){

			var flag = $(this).attr("data-text");

			if (flag == '广告片')

				window.location.href='/search?q='+flag;

			else

				window.location.href='/search?q=&industry='+flag;

		})

	},

	deliverOrder:function(){

		$(".home-order").off("click").on("click",function(){

			var flag = $(this).attr("data-text");

			showOrder(flag);

		})

	},

	clickHelpYou:function(){

		$(".helpYou").off("click").on("click",function(){

			var phone = $("#help-phone").val();

			showError($('.bannerOut'),'');

			if(phone==''){

				showError($('.bannerOut'),'请填写手机号');

				return false;

			}

			if(!checkMobile(phone)){

				showError($('.bannerOut'),'手机格式不正确');

				return false;

			}else{

				$.ajax({

					url : '/order/deliver',

					type : 'POST',

					data : {

						csrftoken:$("#csrftoken").val(),

						indent_tele:$("#help-phone").val(),

						phoneCode:'-1',

						indent_recomment:$("#indent_recomment").text(),

						indentName:'首页banner下单',

						productId:-1,

						teamId:-1,

						serviceId:-1,

						sendToStaff:true,

						sendToUser:false

					},

					dataType : 'json',

					success : function(data){

						window.location.href='/search?q='+$("#indent_recomment").text();

					}

				});

			}

		})

	},



	//热门报款///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	getRecommendProduct:function(){

		var _this = this;

		// loadData(function(data){

		// 	if(data.code==1){

		// 		var result = data.result;

		// 		var hot_section = new Array(); // 第一区域

		// 		var classical_section = new Array(); // 第二区域

		// 		$.each(result,function(i,solr){

		// 			if(solr.recommend == 1){

		// 				hot_section.push(solr);

		// 			}

		// 			if(solr.recommend == 2){

		// 				classical_section.push(solr);

		// 			}

		// 		});

		// 		juicer.register('thousandCount', thousandCount);

		// 		$("#product-container").empty().html(juicer(homePage_tpl.hot_recommend,{list:hot_section}));

		// 		//初始化爆款加载

		// 		_this.cover();

		// 		$(".cardUl").empty().html(juicer(homePage_tpl.classical_recommend,{list:classical_section}));

		// 	}else{

		// 		//alert("数据加载错误")

		// 	}

		// }, getContextPath() + '/home/product/loadProduct/',$.toJSON({

		// 	sort:"supportCount"

		// }));



		data = {"errorCode":null,"errorMsg":null,"result":[{"productId":"3579","productName":"紫燕无人机","pDescription":"实拍的方式介绍产品，展现了炫酷时尚的工业设计，科技感十足的功能优势。用于产品发布会、科技展、会议等场所进行产品宣传。","picLDUrl":"images\/test.jpg","orignalPrice":161000,"price":128800,"length":0,"teamId":"16","teamName":"北京丁鑫工作室","itemId":null,"itemName":null,"tags":"产品宣传片\/无人机\/智能硬件","condition":null,"total":161,"recommend":2,"supportCount":19},{"productId":"2121","productName":"艺教星","pDescription":"镜头记录了朴实的生活状态，真实感人，重点凸显出艺术教育的重要性。适用于网络媒体病毒视频、企业理念宣传片等。","picLDUrl":"images\/test.jpg","orignalPrice":124750,"price":99800,"length":251,"teamId":"68","teamName":"北京蕴舍映画工作室","itemId":null,"itemName":null,"tags":"企业宣传片\/MV\/教育","condition":null,"total":161,"recommend":2,"supportCount":18},{"productId":"660","productName":"土曼(TOMOON) 太空旅行篇","pDescription":"本片通过一位男士要去月球旅行的计划展示了产品的一系列功能，实拍+特效表现的未来科技感展现了产品的智能、高端、大气。","picLDUrl":"images\/test.jpg","orignalPrice":229800,"price":229800,"length":143,"teamId":"16","teamName":"北京丁鑫工作室","itemId":null,"itemName":null,"tags":"产品宣传片\/智能手表\/智能硬件","condition":null,"total":161,"recommend":2,"supportCount":17},{"productId":"1326","productName":"稻草人","pDescription":"唯美清新的MV画面，动听的歌曲音乐，给人沉浸感。适用于网络媒体、移动电视、音乐MV、视频节目片尾等场景。","picLDUrl":"images\/test.jpg","orignalPrice":59800,"price":59800,"length":226,"teamId":"219","teamName":"北京大铭兴业广告传媒有限公司","itemId":null,"itemName":null,"tags":"MV\/唯美画质\/原创音乐","condition":null,"total":161,"recommend":3,"supportCount":16},{"productId":"714","productName":"三好网","pDescription":"企业微电影，讲述企业故事，真实故事改编，结构紧凑，画质细腻，传播效果绝佳。","picLDUrl":"images\/test.jpg","orignalPrice":59800,"price":59800,"length":266,"teamId":"228","teamName":"北京孙湘东工作室","itemId":null,"itemName":null,"tags":"微电影\/企业宣传片\/教育","condition":null,"total":161,"recommend":2,"supportCount":15},{"productId":"3576","productName":"爱刷科技-NFC+","pDescription":"采访为主线介绍产品，配合功能动画和实际应用场景，科技感极强。适用于科技展、路演、网络、户外媒体等的产品宣传。","picLDUrl":"images\/test.jpg","orignalPrice":42250,"price":33800,"length":179,"teamId":"68","teamName":"北京蕴舍映画工作室","itemId":null,"itemName":null,"tags":"产品宣传片\/访谈\/APP","condition":null,"total":161,"recommend":2,"supportCount":14},{"productId":"677","productName":"小镇风光秀丽","pDescription":"全片采用大量的航拍技术，使人更清晰的看到微电影小镇的全貌，展现小镇的风光秀丽，景色怡人。给人以大气、舒心、清爽的感觉。","picLDUrl":"images\/test.jpg","orignalPrice":59800,"price":59800,"length":135,"teamId":"50","teamName":"北京智酷文化传媒有限公司","itemId":null,"itemName":null,"tags":"微电影\/房地产\/航拍","condition":null,"total":161,"recommend":2,"supportCount":13},{"productId":"678","productName":"用友财务共享","pDescription":"特效+实拍+证言的方式。全片有磁性的男声介绍公司的业务特点及前景。风格大气、整洁，节奏轻快。","picLDUrl":"images\/test.jpg","orignalPrice":99800,"price":99800,"length":326,"teamId":"50","teamName":"北京智酷文化传媒有限公司","itemId":null,"itemName":null,"tags":"企业宣传片\/系统\/互联网","condition":null,"total":161,"recommend":2,"supportCount":12},{"productId":"3577","productName":"网易考拉双十一","pDescription":"特约明星演员，时尚搞笑的故事情节，加深观众对产品的印象。适用于网络视频传播、网络购物节宣传等。","picLDUrl":"images\/test.jpg","orignalPrice":99800,"price":99800,"length":0,"teamId":"48","teamName":"北京金小圈文化传播有限公司","itemId":null,"itemName":null,"tags":"活动广告\/网站视频\/电商","condition":null,"total":161,"recommend":2,"supportCount":11},{"productId":"738","productName":"如果我在富阳遇见你","pDescription":"城市旅游宣传微电影，实景拍摄，电影级画面质感，绝佳的城市旅游宣传名片。","picLDUrl":"images\/test.jpg","orignalPrice":829800,"price":829800,"length":1284,"teamId":"9","teamName":"北京攀峰文化传播有限公司","itemId":null,"itemName":null,"tags":"微电影\/旅游\/电影级","condition":null,"total":161,"recommend":2,"supportCount":10},{"productId":"389","productName":"茅台-巴拿马金奖之旅","pDescription":"全球广告投放、企业品牌片\r\n含创意、拍摄、演员、后期制作、CG特效","picLDUrl":"images\/test.jpg","orignalPrice":2680000,"price":2680000,"length":604,"teamId":"9","teamName":"北京攀峰文化传播有限公司","itemId":null,"itemName":null,"tags":"品牌宣传片\/微电影\/酒","condition":null,"total":161,"recommend":2,"supportCount":9},{"productId":"707","productName":"麻麻汇-巴比立方","pDescription":"采用实拍的方式，温馨的基调，唯美的画面， 三维立体的手法，来表达产品的功能","picLDUrl":"images\/test.jpg","orignalPrice":86800,"price":86800,"length":153,"teamId":"16","teamName":"北京丁鑫工作室","itemId":null,"itemName":null,"tags":"产品宣传片\/智能硬件\/3D","condition":null,"total":161,"recommend":1,"supportCount":9},{"productId":"385","productName":"未来方舟","pDescription":"本片展览馆播放， 网上展厅，科技感极强，有种看科幻大片的感觉，从视觉到听觉给人以新的体验。","picLDUrl":"images\/test.jpg","orignalPrice":1145000,"price":916000,"length":248,"teamId":"9","teamName":"北京攀峰文化传播有限公司","itemId":null,"itemName":null,"tags":"宣传片\/人工智能\/电影级","condition":null,"total":161,"recommend":2,"supportCount":8},{"productId":"1785","productName":"小鱼办公-会议专家","pDescription":"适用于产品宣传片、科技展。整体风格简单大方，各个场景产品展现恰到好处，企业产品宣传性价比极高的宣传短片。","picLDUrl":"images\/test.jpg","orignalPrice":198000,"price":198000,"length":159,"teamId":"16","teamName":"北京丁鑫工作室","itemId":null,"itemName":null,"tags":"产品宣传片\/广告\/智能硬件","condition":null,"total":161,"recommend":1,"supportCount":8},{"productId":"3572","productName":"数据堂-Our Data Your Value","pDescription":"本片风格mg动画的形式，加上解说的形式，英文的字幕让片子调性提高","picLDUrl":"images\/test.jpg","orignalPrice":66000,"price":52800,"length":116,"teamId":"534","teamName":"烟台魔匠人文化传媒有限公司","itemId":null,"itemName":null,"tags":"品牌宣传片\/大数据\/MG动画","condition":null,"total":161,"recommend":1,"supportCount":7},{"productId":"3578","productName":"海尔-搞定歌搞笑版","pDescription":"魔性的旋律，简单粗暴的歌词，以及歌曲本身积极向上的精神内涵，堪称“神曲”。这种网络媒体病毒视频，有助于商家在商业活动大战中脱颖而出。","picLDUrl":"images\/test.jpg","orignalPrice":124750,"price":99800,"length":0,"teamId":"972","teamName":"北京悦心悦意文化传媒有限公司","itemId":null,"itemName":null,"tags":"MV\/电器\/群众演员","condition":null,"total":161,"recommend":2,"supportCount":7},{"productId":"7","productName":"华为智能机顶盒国际版","pDescription":"逼真的工业级渲染，家庭的使用场景展示，通过高科技的视觉元素渲染产品特点，完美呈现产品精致的一面，国际市场取得了惊人的销量。","picLDUrl":"images\/test.jpg","orignalPrice":98800,"price":59280,"length":188,"teamId":"9","teamName":"北京攀峰文化传播有限公司","itemId":null,"itemName":null,"tags":"产品宣传片\/电视机顶盒\/智能硬件","condition":null,"total":161,"recommend":2,"supportCount":6}],"code":1};



		var sss2 = [

	        '{@each list as item}',

			'<div class="swiper-slide coverSlide">',

			'	<div class="scaleDiv">',

			'		<a href="/play/${item.teamId}_${item.productId}.html" target="_blank">',

 			'            <div class="bg"></div>' ,

			'{@if item.picLDUrl!= null && item.picLDUrl!= "" && item.picLDUrl!= undefined }',

			'			<img src="other/${item.picLDUrl}">',

			'{@else}',

			'           <img src="images/noImg.jpg"> ',

			'{@/if}',

			'			<div class="coverContent">',

			'				<div class="">${item.productName}</div>',

			'				{@if item.price == 0}',

			'					<div>￥暂无报价</div>',

			'				{@else}',

			'					<div>￥${item.price|thousandCount}</div>',

			'				{@/if}',

			'			</div>',

			'		</a>',

			'	</div>',

			'</div>',

			'{@/each}'

       	 ].join("");



       	 var sss3 = [

			'{@each list as item, index}',

			'{@if index % 4 == 0}',

			'<div class="flow-div">',

			'{@/if}',

			' <div class="topAnimaltion oneFlow">',

			'	<div class="videoCard">',

			'		<a href="/play/${item.teamId}_${item.productId}.html" target="_blank">',

			'{@if item.picLDUrl!= null && item.picLDUrl!= "" && item.picLDUrl!= undefined }',

			'			<img src="'+getDfsHostName()+'other/${item.picLDUrl}">',

			'{@else}',

			'           <img src="images/noImg.jpg"> ',

			'{@/if}',

			'			<div class="videoContet">',

			'				<div class="title">${item.productName}</div>',

			'				<div class="type">${item.tags}</div>',

			'				{@if item.price == 0}',

			'					<div  class="price">￥暂无报价</div>',

			'				{@else}',

			'					<div  class="price">￥${item.price|thousandCount}</div>',

			'				{@/if}',

			'				{@if item.orignalPrice != null && item.orignalPrice != 0 && item.orignalPrice != item.price}',

			'					<div class="realPrice">原价￥${item.orignalPrice|thousandCount}</div>',

			'				{@/if}',

			'			</div>',

			'		</a>',

			'	</div>',

			'  </div>',

			'{@if index % 4 == 3}',

			'</div>',

			'{@/if}',

			'{@/each}'

         ].join("");





		var result = data.result;

		var hot_section = new Array(); // 第一区域

		var classical_section = new Array(); // 第二区域

		$.each(result,function(i,solr){

			if(solr.recommend == 1){

				hot_section.push(solr);

			}

			if(solr.recommend == 2){

				classical_section.push(solr);

			}

		});

		juicer.register('thousandCount', thousandCount);

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// $("#product-container").empty().html(juicer(sss2,{list:hot_section}));

		//初始化爆款加载

		_this.cover();

		//$(".cardUl").empty().html(juicer(sss3,{list:classical_section}));









	},



	// 1111   导演工作室//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	getRecommendTeam:function(){

		var _this = this;

		// loadData(function(data){

		// 	if(data.code==1){

		// 		$("#directorContent").empty().html(juicer(homePage_tpl.team_recommend,data));

		// 		//渲染team效果

		// 		_this.director();

		// 	}else{

		// 		//TODO

		// 		console.log("数据加载错误")

		// 	}

		// }, getContextPath() + '/home/team/recommend',null);

		//

		data = {"errorCode":null,"errorMsg":null,"result":[{"id":null,"version":0,"roles":null,"superAdmin":false,"rightSum":null,"teamName":"北京金小圈文化传播有限公司","teamPhotoUrl":"images\/test.jpg","teamDescription":"北京金小圈文化传播有限公司成立于2012年，是一家以广告制作为主的影视公司，公司每年制作拍摄十余部商业广告，积累了大量经验和资源。在这个飞速发展的时代专注做出最让广告雇主满意，最能达到视频推广目标的广告作品。公司拍摄广告涉及多种行业多种类型，从策划到成片交付，全神贯注于每条广告的制作。\r\n\r\n2015年公司在扩大，在发展，只为满足更多客户的广告需求。","createDate":null,"od":0,"updateDate":null,"password":"E10ADC3949BA59ABBE56E057F20F883E","phoneNumber":null,"email":null,"address":null,"flag":1,"loginName":null,"recommendation":"有合同【2014年注册】","linkman":null,"webchat":null,"qq":null,"officialSite":null,"scale":null,"establishDate":null,"business":null,"businessDesc":null,"priceRange":0,"demand":null,"infoResource":0,"description":"北京金小圈文化传播有限公司本着踏实稳健的生存理念，不断在视频制作领域研究学习，以为客户提供最好的视频产品、最贴心的服务、最高性价比的影视作品而奋斗。","qqUnique":null,"wbUnique":null,"wechatUnique":null,"uniqueId":null,"pmsCity":null,"pmsProvince":null,"recommend":null,"recommendSort":1,"thirdLoginType":null,"checkStatus":null,"checkDetails":null,"teamId":48,"verification_code":null,"city":0,"loginType":null,"teamCity":null,"teamProvince":null,"teamProvinceName":null,"teamCityName":null},{"id":null,"version":0,"roles":null,"superAdmin":false,"rightSum":null,"teamName":"北京数智创壹科技有限公司","teamPhotoUrl":"images\/test.jpg","teamDescription":"北京数智创壹科技有限公司是中国数字视觉创意与跨界应用领域创新企业之一，为不同行业客户提供一站式的数字化传播解决方案。公司主要提供微视频、微动画、宣传视频、数字宣传片、发布会视频制作。服务团队由来自电影界，4A广告公司，CCTV，电影学院等国内高级影视制作公司的导演、创意总监、艺术总监和影视公司资深合伙人组成。团队具有国际化视野，以及国际化水准的影视制作能力。","createDate":null,"od":0,"updateDate":null,"password":"E10ADC3949BA59ABBE56E057F20F883E","phoneNumber":null,"email":null,"address":null,"flag":1,"loginName":null,"recommendation":"有合同【2014年注册】","linkman":null,"webchat":null,"qq":null,"officialSite":null,"scale":null,"establishDate":null,"business":null,"businessDesc":null,"priceRange":0,"demand":null,"infoResource":0,"description":"北京数智创壹科技有限公司多次为老鹰基金、丝里伯、央视微电影、洪泰加速、金海洋航天科技、颐和安缦、用友软件、微投网、云朵课堂、趣活科技、雷迪森酒店、众创空间等客户服务，陆续被拍片网评为金牌供应商、独家供应商。","qqUnique":null,"wbUnique":null,"wechatUnique":null,"uniqueId":null,"pmsCity":null,"pmsProvince":null,"recommend":null,"recommendSort":2,"thirdLoginType":null,"checkStatus":null,"checkDetails":null,"teamId":18,"verification_code":null,"city":0,"loginType":null,"teamCity":null,"teamProvince":null,"teamProvinceName":null,"teamCityName":null},{"id":null,"version":0,"roles":null,"superAdmin":false,"rightSum":null,"teamName":"北京智酷文化传媒有限公司","teamPhotoUrl":"images\/test.jpg","teamDescription":"智酷传媒——感受影像的力量！创建6年时间里，专注于影视策划、实景航拍、后期剪辑、特效包装、微电影等视频创作，具有专业影视创作者15人，办公面积300平，影棚面积40平。自拍片网创建之日起，多次为老鹰基金、丝里伯、央视微电影、洪泰加速、金海洋航天科技、颐和安缦、用友软件、微投网、云朵课堂、趣活科技、雷迪森酒店、众创空间等客户服务，陆续被拍片网评为金牌供应商、独家供应商。","createDate":null,"od":0,"updateDate":null,"password":"E10ADC3949BA59ABBE56E057F20F883E","phoneNumber":null,"email":null,"address":null,"flag":1,"loginName":null,"recommendation":"有合同【2012年注册】","linkman":null,"webchat":null,"qq":null,"officialSite":null,"scale":null,"establishDate":null,"business":null,"businessDesc":null,"priceRange":0,"demand":null,"infoResource":0,"description":"北京智酷文化传媒有限公司成立于2010年主营影视策划、视频剪辑、特效包装！","qqUnique":null,"wbUnique":null,"wechatUnique":null,"uniqueId":null,"pmsCity":null,"pmsProvince":null,"recommend":null,"recommendSort":3,"thirdLoginType":null,"checkStatus":null,"checkDetails":null,"teamId":50,"verification_code":null,"city":0,"loginType":null,"teamCity":null,"teamProvince":null,"teamProvinceName":null,"teamCityName":null},{"id":null,"version":0,"roles":null,"superAdmin":false,"rightSum":null,"teamName":"北京大铭兴业广告传媒有限公司","teamPhotoUrl":"images\/test.jpg","teamDescription":"北京大铭兴业广告传媒有限公司成立于2009年，是一家以综合性品牌咨询、平面视觉、影视广告制作为主营方向的品牌视觉服务商。专注于为客户创造和管理品牌，实现企业价值，提供品牌分析、战略、规划、设计（包括品牌识别设计、环境空间导视设计、包装设计、网络设计、产品UI设计等）、品牌传播（TVC广告、宣传片、纪录片、产品视频、活动视频、影视网络视频等）的综合性服务公司。","createDate":null,"od":0,"updateDate":null,"password":"E10ADC3949BA59ABBE56E057F20F883E","phoneNumber":null,"email":null,"address":null,"flag":1,"loginName":null,"recommendation":"有合同【2009年注册】","linkman":null,"webchat":null,"qq":null,"officialSite":null,"scale":null,"establishDate":null,"business":null,"businessDesc":null,"priceRange":0,"demand":null,"infoResource":0,"description":"北京大铭兴业广告传媒有限公司是一家以综合性品牌咨询、平面视觉、影视广告制作为主营方向的品牌视觉服务商。专注于为客户创造和管理品牌，实现企业价值，提供品牌分析、战略、规划、设计（包括品牌识别设计、环境空间导视设计、包装设计、网络设计、产品UI设计等）、品牌传播（TVC广告、宣传片、纪录片、产品视频、活动视频、影视网络视频等）的综合性服务公司。","qqUnique":null,"wbUnique":null,"wechatUnique":null,"uniqueId":null,"pmsCity":null,"pmsProvince":null,"recommend":null,"recommendSort":4,"thirdLoginType":null,"checkStatus":null,"checkDetails":null,"teamId":219,"verification_code":null,"city":0,"loginType":null,"teamCity":null,"teamProvince":null,"teamProvinceName":null,"teamCityName":null},{"id":null,"version":0,"roles":null,"superAdmin":false,"rightSum":null,"teamName":"深圳一米天文化传播有限公司","teamPhotoUrl":"images\/test.jpg","teamDescription":"一米天动画提供新颖有效的动画营销方案，专注于动画短片、动态图形等的策划与制作，同时出品制作有创意有态度的原创动画短片。","createDate":null,"od":0,"updateDate":null,"password":"E10ADC3949BA59ABBE56E057F20F883E","phoneNumber":null,"email":null,"address":null,"flag":1,"loginName":null,"recommendation":"有合同【2014年注册】","linkman":null,"webchat":null,"qq":null,"officialSite":null,"scale":null,"establishDate":null,"business":null,"businessDesc":null,"priceRange":0,"demand":null,"infoResource":0,"description":"一米天动画是一个基于动画的互联网内容创作团队，创作有态度、有创意的优秀原创动画。","qqUnique":null,"wbUnique":null,"wechatUnique":null,"uniqueId":null,"pmsCity":null,"pmsProvince":null,"recommend":null,"recommendSort":5,"thirdLoginType":null,"checkStatus":null,"checkDetails":null,"teamId":92,"verification_code":null,"city":0,"loginType":null,"teamCity":null,"teamProvince":null,"teamProvinceName":null,"teamCityName":null},{"id":null,"version":0,"roles":null,"superAdmin":false,"rightSum":null,"teamName":"深圳市记忆盒子文化传播有限公司","teamPhotoUrl":"images\/test.jpg","teamDescription":"深圳市记忆盒子文化传播有限公司2013年成立于深圳；从事影视传媒多年，对广告拍摄、微电影制作、企业宣传片等有着丰富的实战经验；拥有专业设备及团队，为客户带来高效的回报。","createDate":null,"od":0,"updateDate":null,"password":"E10ADC3949BA59ABBE56E057F20F883E","phoneNumber":null,"email":null,"address":null,"flag":1,"loginName":null,"recommendation":"有合同【2014年注册】","linkman":null,"webchat":null,"qq":null,"officialSite":null,"scale":null,"establishDate":null,"business":null,"businessDesc":null,"priceRange":0,"demand":null,"infoResource":0,"description":"深圳市记忆盒子文化传播有限公司从事影视传媒多年，拥有丰富的实战经验，专业的设备及团队。","qqUnique":null,"wbUnique":null,"wechatUnique":null,"uniqueId":null,"pmsCity":null,"pmsProvince":null,"recommend":null,"recommendSort":6,"thirdLoginType":null,"checkStatus":null,"checkDetails":null,"teamId":229,"verification_code":null,"city":0,"loginType":null,"teamCity":null,"teamProvince":null,"teamProvinceName":null,"teamCityName":null},{"id":null,"version":0,"roles":null,"superAdmin":false,"rightSum":null,"teamName":"北京伴我同行文化发展有限公司","teamPhotoUrl":"images\/test.jpg","teamDescription":"北京伴我同行文化发展有限公司，成立于2016年3月。业务范围包括电视节目、企业宣传片等；擅长制作演播室节目，纪录片等。由央视资深导演带领的年轻团队。提供从前期策划到后期制作的一条龙视频服务。无论是脑洞大开的创意型视频，还是中规中矩的企业大片，都能竭尽全力把不可能变成可能。","createDate":null,"od":0,"updateDate":null,"password":"E10ADC3949BA59ABBE56E057F20F883E","phoneNumber":null,"email":null,"address":null,"flag":1,"loginName":null,"recommendation":"有合同【2016年注册】","linkman":null,"webchat":null,"qq":null,"officialSite":null,"scale":null,"establishDate":null,"business":null,"businessDesc":null,"priceRange":0,"demand":null,"infoResource":0,"description":"北京伴我同行文化发展有限公司，提供从前期策划到后期制作的一条龙视频服务，由央视资深导演带领的年轻团队组成。","qqUnique":null,"wbUnique":null,"wechatUnique":null,"uniqueId":null,"pmsCity":null,"pmsProvince":null,"recommend":null,"recommendSort":7,"thirdLoginType":null,"checkStatus":null,"checkDetails":null,"teamId":66,"verification_code":null,"city":0,"loginType":null,"teamCity":null,"teamProvince":null,"teamProvinceName":null,"teamCityName":null},{"id":null,"version":0,"roles":null,"superAdmin":false,"rightSum":null,"teamName":"北京浩天启文化传媒有限责任公司","teamPhotoUrl":"images\/test.jpg","teamDescription":"北京浩天启文化传媒有限责任公司是一家多元化综合性传媒公司，致力于影视广告片，城市企业宣传片，微电影，活动现场视频，专题纪录片，三维建筑动画，电视栏目，MV等影视片的策划，创意，拍摄与制作。公司贯彻“用最精彩的创意，最周密的策划，最有力的执行实现最完美的目标”为服务宗旨，努力打造行业领先品牌。","createDate":null,"od":0,"updateDate":null,"password":"E10ADC3949BA59ABBE56E057F20F883E","phoneNumber":null,"email":null,"address":null,"flag":1,"loginName":null,"recommendation":"有合同【2014年注册】","linkman":null,"webchat":null,"qq":null,"officialSite":null,"scale":null,"establishDate":null,"business":null,"businessDesc":null,"priceRange":0,"demand":null,"infoResource":0,"description":"北京浩天启文化传媒有限责任公司是一家多元化综合性传媒公司，致力于影视广告片，城市企业宣传片，微电影，活动现场视频，专题纪录片，三维建筑动画，电视栏目，MV等影视片的策划，创意，拍摄与制作。","qqUnique":null,"wbUnique":null,"wechatUnique":null,"uniqueId":null,"pmsCity":null,"pmsProvince":null,"recommend":null,"recommendSort":8,"thirdLoginType":null,"checkStatus":null,"checkDetails":null,"teamId":128,"verification_code":null,"city":0,"loginType":null,"teamCity":null,"teamProvince":null,"teamProvinceName":null,"teamCityName":null},{"id":null,"version":0,"roles":null,"superAdmin":false,"rightSum":null,"teamName":"北京虎视文化传媒有限公司","teamPhotoUrl":"images\/test.jpg","teamDescription":"北京虎视文化传媒有限公司致力于为客户打造最具影响力的品牌形象，提升品牌的认知度及影响力。主营业务为真人秀、广告、宣传片、网络电影。","createDate":null,"od":0,"updateDate":null,"password":"E10ADC3949BA59ABBE56E057F20F883E","phoneNumber":null,"email":null,"address":null,"flag":1,"loginName":null,"recommendation":"有合同【2016年注册】","linkman":null,"webchat":null,"qq":null,"officialSite":null,"scale":null,"establishDate":null,"business":null,"businessDesc":null,"priceRange":0,"demand":null,"infoResource":0,"description":"北京虎视文化传媒有限公司致力于为客户打造最具影响力的品牌形象，提升品牌的认知度及影响力。","qqUnique":null,"wbUnique":null,"wechatUnique":null,"uniqueId":null,"pmsCity":null,"pmsProvince":null,"recommend":null,"recommendSort":9,"thirdLoginType":null,"checkStatus":null,"checkDetails":null,"teamId":721,"verification_code":null,"city":0,"loginType":null,"teamCity":null,"teamProvince":null,"teamProvinceName":null,"teamCityName":null},{"id":null,"version":0,"roles":null,"superAdmin":false,"rightSum":null,"teamName":"南京凌浩工作室","teamPhotoUrl":"images\/test.jpg","teamDescription":"南京凌浩工作室成立于2000年，是一家集企业市场营销策划，品牌整合营销推广、电视栏目运作、影视策划创意、拍摄制作、发布的专业广告全案和影视制作传播机构。","createDate":null,"od":0,"updateDate":null,"password":"E10ADC3949BA59ABBE56E057F20F883E","phoneNumber":null,"email":null,"address":null,"flag":1,"loginName":null,"recommendation":"有合同\/以南京光影文化传媒有限公司注册","linkman":null,"webchat":null,"qq":null,"officialSite":null,"scale":null,"establishDate":null,"business":null,"businessDesc":null,"priceRange":0,"demand":null,"infoResource":0,"description":"云麦影视是一家集企业市场营销策划，品牌整合营销推广、电视栏目运作、影视策划创意、拍摄制作、发布的专业广告全案和影视制作传播机构。可以承接全国各地的拍摄制作等，不仅限于南京。","qqUnique":null,"wbUnique":null,"wechatUnique":null,"uniqueId":null,"pmsCity":null,"pmsProvince":null,"recommend":null,"recommendSort":10,"thirdLoginType":null,"checkStatus":null,"checkDetails":null,"teamId":277,"verification_code":null,"city":0,"loginType":null,"teamCity":null,"teamProvince":null,"teamProvinceName":null,"teamCityName":null}],"code":1};



		// var data = JSON.parse(data);

		// data = eval('(' + data1 + ')');



		ss = [

            '{@each result as item}',

			'<div class="swiper-slide">',

			'	<div class="m"></div>',

			'	<div class="b"></div>',

			'	<div class="directorContent">',

			'		<a href="/provider/info_${item.teamId}.html" target="_blank">',

			'			<img src="other/${item.teamPhotoUrl}">',

			'			<div class="title">${item.teamName}</div>',

			'			<div class="line"></div>',

			'			<div class="content dContent">${item.description}</div>',

			'			<div class="toProduct">作品集</div>',

			'		</a>',

			'	</div>',

			'</div>',

			'{@/each}'

         ].join("");



		// $("#directorContent").empty().html(juicer(ss,data));

		_this.director();

	},





	cover:function(){

		var statues = true;

	    var nowIndex = 0;

	    var cover = new Swiper('.swiperCover', {

	        pagination: '.swiper-pagination-cover',

	        paginationClickable: true,

	        effect: 'coverflow',

	        grabCursor: true,

	        centeredSlides: true,

	        slidesPerView: 'auto',

	        loop: true,

	        nextButton: '.swiper-button-next',

	        prevButton: '.swiper-button-prev',

	        coverflow: {

	            rotate: 0,

	            stretch: 100,

	            depth: 00,

	            modifier: 1,

	            slideShadows: true

	        }

	    });

	    $('.leftClick').on('click', function() {



	        cover.slidePrev();

	    });

	    $('.rightClick').on('click', function(e) {

	        cover.slideNext();

	    });

	},









	director:function(){



	    var director = new Swiper('.swiper-director', {

	        pagination: '.swiper-pagination',

	        slidesPerView: 5,

	       // centeredSlides: true,

	        paginationClickable: true,

	        spaceBetween: 12,

	        grabCursor: true,

	        nextButton: '.swiper-button-next',

	        prevButton: '.swiper-button-prev',

	        loop: true

	    });



	    var images = new Array(

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat',

	        'url(images/db1.jpg) no-repeat'

	    );





	    var initM = $('#directorContent .swiper-slide .m');

	    $.each(initM, function(i, item) {

	        $(this).css('background', images[i]);

	    });



	    var dirSwi = $('#directorContent .swiper-slide');



	},







	getRecommendNews:function(){

		var _this = this;

		// loadData(function(data){

		// 	if(data.code==1){

		// 		juicer.register("getContentIndex",getContentIndex);

		// 		$("#news-container").empty().html(juicer(homePage_tpl.news_resommend,data));

		// 		_this.getNewsDetail();



  //                 var hasNum = $('.Content').length;

		// 	}else{

		// 		//TODO

		// 		console.log("数据加载错误")

		// 	}

		// }, getContextPath() + '/home/news/recommend',null);

	},

	getNewsDetail:function(){

		$(".get-new-detail").off("click").on("click",function(){

			var id = $(this).parent("li").attr("data-id");

			//window.location.href="/home/news/info/"+id;

			window.location.href="/news/article-"+id+".html?q=index";

		})



	    $(".get-new-detail").parent().off("click").on("click",function(){

			var id = $(this).attr("data-id");

			//window.location.href="/home/news/info/"+id;

			window.location.href="/news/article-"+id+".html?q=index";

		})

	},

	initVideo:function(){

		$('#showVideoS').off("click").on('click', function() {

	        $('#showVideo').click();

	    });

	}

}

homePage.init();



var homePage_tpl = {

	hot_recommend:[

	        '{@each list as item}',

			'<div class="swiper-slide coverSlide">',

			'	<div class="scaleDiv">',

			'		<a href="/play/${item.teamId}_${item.productId}.html" target="_blank">',

 			'            <div class="bg"></div>' ,

			'{@if item.picLDUrl!= null && item.picLDUrl!= "" && item.picLDUrl!= undefined }',

			'			<img src="'+getDfsHostName()+'other/${item.picLDUrl}">',

			'{@else}',

			'           <img src="images/noImg.jpg"> ',

			'{@/if}',

			'			<div class="coverContent">',

			'				<div class="">${item.productName}</div>',

			'				{@if item.price == 0}',

			'					<div>￥暂无报价</div>',

			'				{@else}',

			'					<div>￥${item.price|thousandCount}</div>',

			'				{@/if}',

			'			</div>',

			'		</a>',

			'	</div>',

			'</div>',

			'{@/each}'

       	 ].join(""),

    classical_recommend:[

			'{@each list as item, index}',

			'{@if index % 4 == 0}',

			'<div class="flow-div">',

			'{@/if}',

			' <div class="topAnimaltion oneFlow">',

			'	<div class="videoCard">',

			'		<a href="/play/${item.teamId}_${item.productId}.html" target="_blank">',

			'{@if item.picLDUrl!= null && item.picLDUrl!= "" && item.picLDUrl!= undefined }',

			'			<img src="'+getDfsHostName()+'other/${item.picLDUrl}">',

			'{@else}',

			'           <img src="images/noImg.jpg"> ',

			'{@/if}',

			'			<div class="videoContet">',

			'				<div class="title">${item.productName}</div>',

			'				<div class="type">${item.tags}</div>',

			'				{@if item.price == 0}',

			'					<div  class="price">￥暂无报价</div>',

			'				{@else}',

			'					<div  class="price">￥${item.price|thousandCount}</div>',

			'				{@/if}',

			'				{@if item.orignalPrice != null && item.orignalPrice != 0 && item.orignalPrice != item.price}',

			'					<div class="realPrice">原价￥${item.orignalPrice|thousandCount}</div>',

			'				{@/if}',

			'			</div>',

			'		</a>',

			'	</div>',

			'  </div>',

			'{@if index % 4 == 3}',

			'</div>',

			'{@/if}',

			'{@/each}'

         ].join(""),

     team_recommend:[

            '{@each result as item}',

			'<div class="swiper-slide">',

			'	<div class="m"></div>',

			'	<div class="b"></div>',

			'	<div class="directorContent">',

			'		<a href="/provider/info_${item.teamId}.html" target="_blank">',

			'			<img src="'+getDfsHostName()+'other/${item.teamPhotoUrl}">',

			'			<div class="title">${item.teamName}</div>',

			'			<div class="line"></div>',

			'			<div class="content dContent">${item.description}</div>',

			'			<div class="toProduct">作品集</div>',

			'		</a>',

			'	</div>',

			'</div>',

			'{@/each}'

         ].join(""),

     news_resommend:[

            '{@each result as item}',

			'<li data-id=${item.id}>',

			'	<div class="get-new-detail newsTitle">${item.title}</div>',

			'	<div class="newsLine"></div>',

			'	<div class="Content">${item.discription | getContentIndex}</div>',

			'	<div class="get-new-detail newsMore">',

			'		<span>了解更多</span>',

			'		<div class="moreIcon"></div>',

			'	</div>',

			'</li>',

			'{@/each}'

         ].join("")



}









function getContentIndex(string){

	 var screenWidth = document.documentElement.clientWidth;

	 var num = 100;

	    if(screenWidth<=1500){

	    	num = 70;

	    }

	    if(screenWidth<=1276){

	    	num = 50;

	    }

	if(string.length<=num){

		var content = string

	}else{

		var content = string.substr(1,num) +"[...]"

	}



	return  content;

}

