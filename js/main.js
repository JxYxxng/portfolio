window.addEventListener("load",function(){

	// DOM 타입 작성
	// document.getElementById(id) : HTML 반환
	// document.getElementsByClassName()
	// document.getElementsByTagName()


	// 1) 데이터 로딩(JSON)
	// 1-1) JSON 데이터의 url을 지정합니다.
	var url="/data/gallery.json";

	// 1-2) 웹 서버에 요청을 하기 위한 XMPHttpRequest  객체를 선언합니다.
	// 웹 서버
	var request=new XMLHttpRequest();

	// 1-3) open() 메서드를 사용해서 서버로부터 URL을 읽어옵니다.
	request.open("GET", url, true); // open(서버 데이터 전송방식(GET, POST), JSON 데이터 경로, true)

	// 1-4) 데이터 타입을 JSON 타입으로 정해줍니다.
	request.responseType="json"; // default는 string입니다.

	// 1-5) send() 메서드를 사용해서 open()과 반대로 요청합니다.
	request.send();

	// 1-6) 요청이 끝나면 load 이벤트가 발생됩니다.
	request.addEventListener("load",function(){
		// 1-7) XMPHttpRequest 객체의 response 속성으로 send된 데이터를 확인할 수 있습니다.
		var galleryData=request.response;
		// console.log(galleryData);

		var container=document.getElementsByClassName("container")[0];
		for(var i=0; i<container.children.length; i++){
			if(container.children[i].className == "viewer"){
				var viewer=container.children[i];
			}
			else if(container.children[i].className == "btn_group"){
				var btn=container.children[i];
			}
		}
		var viewerStr="";
		var btnStr="";
		var n=1;


		for(key1 in galleryData){
			// console.log(key1 +" : "+galleryData[key1]);
			viewerStr+='<img class="'+key1+'" src="'+galleryData[key1]+'">\n'
			btnStr+='<li id="btn0"><a href="'+galleryData[key1]+'">'+n+'</a></li>\n'
			n +=1;
		}
		console.log(viewerStr);
		console.log(btnStr);
		viewer.innerHTML=viewerStr;
		btn.innerHTML=btnStr;
	});

});
