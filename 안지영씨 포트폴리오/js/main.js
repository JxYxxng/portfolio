$(function(){
	var a; // 화면 show 변수
	var b; // 메뉴 active 이벤트
	var t=0; // window top
	var firstFlag=false; // 스크롤 이벤트 초기 변수
	var gnb_down=false; // 리사이즈 이벤트 초기 변수

	// false :w<720 :: 모바일 이벤트만 발생, gnb_fixed 발생 X(gnb_fixed)
	// gnb_fixed는 true 일때만 발생(w<720 일때 flase 만들기)
	// w<720일 때 gnb_fixed 올리기, bg 생기기

	// true:w>720 :: gnb_fixed 발생
	// true가 되는 순간부터 gnb_fixed 이벤트 한번 발생(trigger로 한번 돌려주기)--> slidedown X
	// slidedown 하면 키비주얼 부분에서도 발생
	// w>720일 때 gnb_mobile, bg 없애기

	setTimeout(function(){
		$("html").animate({scrollTop : 0}, 300, function(){
			firstFlag=true;
			// $(window).trigger("scroll");
		});
	}, 10);

	// *스크롤 이벤트
	$(window).scroll(function(){
		if(firstFlag == false){
			return;
		}

		t=$(window).scrollTop();

		// w>720 일 때 gnb_fixed show/hide
		if( gnb_down ){
			if(t > $(".profile1").offset().top - 70){
				$("#gnb_fixed").slideDown(500);
				// console.log("fixed 내려와");
			}
			else{
				$("#gnb_fixed").slideUp(500);
				// console.log("fixed 올라가");
			}
		}


		// 변수
		if(t < $(".profile1").offset().top - 300){
			b=0;
		}
		else if(t < $(".profile2").offset().top - 300){
			a=0; b=1;
		}
		else if(t < $("#portfolio1").offset().top - 300){/**/
			a=1;
		}
		else if(t < $("#portfolio2").offset().top - 300){/**/
			a=2; b=2;
		}
		else if(t < $("#portfolio3").offset().top - 300){/**/
			a=3; b=3;
		}
		else if(t < $("#portfolio3").offset().top - 300){
			a=4; b=4;
			if(t == $(document).height()-$(window).height()){
				a=5;
			}
		}
		else{
			a=5;
		}


		// 스크롤 이벤트들
		$("#gnb_fixed li, #gnb_mobile li").removeClass("active");
		$("#gnb_fixed li").eq(b).addClass("active");
		$("#gnb_mobile li").eq(b).addClass("active");

		if( a < 3 ){
			$("#profile > div").eq(a).addClass("show");
		}
	});
	// *스크롤 이벤트 end



	// *리사이즈 이벤트
	var w=0;
	$(window).resize(function(){
		w=$(window).width();

		if( w<704 ){
			gnb_down=false;
			$("#gnb_fixed").slideUp();
			$(".bg").fadeIn(300);
			// console.log("작을때");
		}
		else{
			gnb_down=true;
			mobile_hide();
			$(".bg").fadeOut(300);
			$(window).trigger("scroll");
			// console.log("클때");
		}
	});
	$(window).trigger("resize");


	// *메뉴 클릭시 화면 이동
	var a2=0;
	var move=0;
	$("#gnb > .inner > ul > li, #gnb_fixed > .inner > ul > li").click(function(e){
		e.preventDefault();

		a2=$(this).index();
		move=$("section").eq(a2-1).offset().top;

		if(a2 == 0){
			$("html").animate({"scrollTop":0},800);
		}
		else {
			$("html").animate({"scrollTop":move},800);
		}
	});

	// *모바일 메뉴 클릭시 화면 이동
	$("#gnb_mobile > .inner > ul > li").click(function(e){
		e.preventDefault();

		a2=$(this).index();
		move=$("section").eq(a2-1).offset().top;

		if(a2 == 0){
			$("html").animate({"scrollTop":0},800);
		}
		else {
			$("html").animate({"scrollTop":move},800);
		}
		mobile_hide();
		$(".bg").fadeIn(300);
	});


	// *모바일 메뉴 탭
	$(".tab, .dim").click(function(e){
		e.preventDefault();

		if($("#gnb_mobile").is(":visible")){
			mobile_hide();
			$(".bg").fadeIn(300);
		}
		else{
			mobile_show();
		}
	});
	function mobile_show(){
		$("#gnb_mobile").fadeIn(300);
		$("body").addClass("static");
		$(".dim").fadeIn(300);
		$(".tab").addClass("active");
		$(".bg").fadeOut(300);
	}
	function mobile_hide(){
		$("#gnb_mobile").fadeOut(300);
		$("body").removeClass("static");
		$(".dim").fadeOut(300);
		$(".tab").removeClass("active");
	}

	// 2019-12-03
	function ismobile(){
		var useragent=navigator.userAgent.toLowerCase();
		// console.log(useragent);

		if(useragent.indexOf("android") != -1 || useragent.indexOf("iphone") != -1 || useragent.indexOf("ipad") != -1){
			// console.log("mobile");
			return true;
		}
		else{
			// console.log("pc");
			return false;
		}
	}
	ismobile();

	$(".port_tab").click(function(e){
		e.preventDefault();

		if(ismobile() == false){
			var portTab=$(this);

			if($(this).parents(".content").next(".inner").is(":visible")){
				$(this).parents(".content").next(".inner").slideUp(800, function(){
					$("html").animate({"scrollTop":portTab.parents(".content").offset().top}, 300);
				});
			}
			else{
				// console.log("없을 때");
				var idName=$(this).parents("section").attr("id"); // portfolio1, portfolio2, ... 
				var idNum=idName.substr(idName.length-1); // 1, 2, ...
				idNum=Number(idNum)-1; // 0, 1, ...
				// console.log(idName+" : "+idNum);

				$("section[id^=portfolio]").each(function(i){
					if(i != idNum){
						$(this).find(".inner").slideUp(800);
					}
					else{
						$(this).find(".inner").slideDown(800, function(){
							$("html").animate({"scrollTop":portTab.parents(".content").offset().top}, 300);
						});
					}
				});
			}
		}
	});
	$(".inner_tab").click(function(e){
		e.preventDefault();
		$(this).parent(".inner").slideUp(800);
		$("html").animate({"scrollTop":$(this).parent().prev(".content").offset().top},800);
	});

});
