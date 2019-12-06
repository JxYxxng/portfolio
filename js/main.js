$(function(){
	var a; // gnb 이벤트
	var t=0; // window top
	var firstFlag=false; // 스크롤 이벤트 초기 변수
	var gnb_down=false; // 리사이즈 이벤트 초기 변수

	setTimeout(function(){
		$("html").animate({scrollTop : 0}, 300, function(){
			firstFlag=true;
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
				$("#gnb_fixed").addClass("active");
			}
			else{
				$("#gnb_fixed").removeClass("active");
			}
		}

		// 변수
		if(t < $(".profile1").offset().top - 300){
			a=0;
		}
		else if(t < $(".profile2").offset().top - 300){
			a=1;
		}
		else if(t < $("#portfolio .portfolio1").offset().top - 300){
			a=2;
		}
		else if(t < $("#portfolio .portfolio2").offset().top - 300){
			a=3;
		}
		else if(t < $("#portfolio .portfolio3").offset().top - 300){
			a=4;
		}
		else if(t < $("#portfolio .portfolio4").offset().top - 300){
			a=5;
		}
		else{
			a=6;
		}

		// 스크롤 이벤트
		$("#gnb_fixed li, #gnb_mobile li").removeClass("active");

		if(a == 0){
			$("#gnb_fixed li").eq(a).addClass("active");
			$("#gnb_mobile li").eq(a).addClass("active");
		}
		else if(a < 3) {
			$("#profile > div").eq(a-1).addClass("show");
			$("#gnb_fixed li").eq(1).addClass("active");
			$("#gnb_mobile li").eq(1).addClass("active");
		}
		else{
			$("#gnb_fixed li").eq(a-1).addClass("active");
			$("#gnb_mobile li").eq(a-1).addClass("active");
			$("#portfolio").addClass("show")
		}
	});
	// *스크롤 이벤트 end



	// *리사이즈 이벤트
	var w=0;
	$(window).resize(function(){
		w=$(window).width();

		if(w<704 ){
			gnb_down=false;
			// $("#gnb_fixed").slideUp();
			$("#gnb_fixed").removeClass("active");
			$(".bg").fadeIn(300);
		}
		else{
			gnb_down=true;
			mobile_hide();
			$(".bg").fadeOut(300);
			$(window).trigger("scroll");
		}
	});
	$(window).trigger("resize");


	// *메뉴 클릭시 화면 이동
	var a2=0;
	var move=0;
	$("#gnb > .gnb_inner > ul > li").click(function(e){
		e.preventDefault();

		a2=$(this).index();

		if(a2 == 0){
			move=0;
		}
		else {
			move=$("section").eq(a2-1).offset().top;
		}
		$("html").animate({"scrollTop":move},800);
	});

	// *gnb_fixed
	$("#gnb_fixed > .gnb_inner > ul > li").click(function(e){
		e.preventDefault();

		a2=$(this).index();

		if(a2 == 0){
			move=0;
		}
		else if(a2 == 1){
			move=$("section").eq(a2-1).offset().top;
		}
		else{
			move=$("#portfolio > div").eq(a2-2).offset().top;
		}
		$("html").animate({"scrollTop":move},800);
	});

	// *모바일 메뉴 클릭시 화면 이동
	$("#gnb_mobile > .gnb_inner > ul > li").click(function(e){
		e.preventDefault();

		a2=$(this).index();

		if(a2 == 0){
			move=0;
		}
		else if(a2 == 1){
			move=$("section").eq(a2-1).offset().top;
		}
		else{
			move=$("#portfolio > div").eq(a2-2).offset().top;
		}
		$("html").animate({"scrollTop":move},800);
		mobile_hide();
		$(".bg").fadeIn(300);
	});

	// gnb_fixed 탭
	$("#gnb_fixed a").hover(
		function(){
		$("#gnb_fixed span").stop().fadeIn(300);
		},
		function(){
		$("#gnb_fixed span").stop().fadeOut(300);
		},
	);


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

	var video=document.getElementsByTagName("video");
	// 포트폴리오 탭

	$(".port_tab").click(function(e){
		e.preventDefault();

		var portTab=$(this);

		if($(this).parents(".content").next(".inner").is(":visible")){
			$(this).parents(".content").next(".inner").slideUp(800, function(){
				$("html").animate({scrollTop:portTab.parents(".content").offset().top},300);
			});
			for(var i=0; i<video.length; i++){
				video[i].pause();
				video[i].currentTime=0;
			}
			$(this).text("자세히보기");
		}
		else{
			// $(".inner").slideUp(800);
			// $(this).parents(".content").next(".inner").slideDown(800,function(){
			// 	$("html").animate({scrollTop:portTab.parents(".content").offset().top},300);
			// });
			var portName=$(this).parents("div[class^=portfolio]").attr("class"); // port1, port2
			var portNum=portName.substr(portName.length-1); // 1 2
			portNum=Number(portNum)-1;


			$("#portfolio div[class^=portfolio]").each(function(i){
				if(i != portNum){
					$(this).find(".inner").slideUp(800);
					video[portNum].play();
				}
				else{
					$(this).find(".inner").slideDown(800,function(){
						$("html").animate({scrollTop:portTab.parents(".content").offset().top},300);
					});
					for(var i=0; i<video.length; i++){
						video[i].pause();
						video[i].currentTime=0;
					}
				}
			});
			$(".port_tab").text("자세히보기");
			$(this).text("닫기");
		}
	});
	$(".inner_tab").click(function(e){
		e.preventDefault();
		$(this).parent(".inner").slideUp(500);
		$(this).parent(".inner").prev(".content").find(".port_tab").text("자세히보기");
		$("html").animate({"scrollTop":$(this).parent().prev(".content").offset().top}, 500);
		for(var i=0; i<video.length; i++){
			video[i].pause();
			video[i].currentTime=0;
		}
	});
});
