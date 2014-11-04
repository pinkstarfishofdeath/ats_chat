var ChatEngine=function(){
	var name="";
	var msg="";
	var chatZone=document.getElementByld("chatZone");
	var oldata="";
	var sevr="";
	var xhr="";
	//initilization
	this.init=function(){
		if(EventSource){
			this.setName();
			this.initSevr();
		}else{
			alert("Use Latest Chrome or Firefox");
		}
	};
	//Setting user name
	this.setName=function(){
		name = prompt("Enter your name:","Chatter");
		if (!name || name ==="") {
			name = "FAG";
		}
		name = name.replace(/(<([^>]+)>)/ig,"");
	};
	//For sending message
	this.sendMsg=function(){
		msg=documentGetByld("msg").value;
		chatZone.innerHTML+='<div class="chatmsg"><b>'+name+'</b>: '+msg+'<br/></div>';
		oldata='<div class="chatmsg"><b>'+name+'</b>: '+msg+'<br/></div>';
		this.ajaxSent();
		return false;
	};
	//Sending message to server
	this.ajaxSent=function(){
		try{
			xhr=new XMLHttpRequest();
		}
		catch(err){
			alert(err);
		}
		xhr.open('GET','chatprocess.php?msg='+msg+'&name='+name,false);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					msg.value="";
				}
			}
		};
		 xhr.send();
	 };
	 //HTML5 SSE(Server Sent Event) initilization
	 this.initSevr=function(){
		 sevr = new EventSource('chatprocess.php');
		 sevr.onmessage = function(e){
			 if(oldata!=e.data){
				 AtsChatZone.innerHTML+=e.data;
				 oldata = e.data;
			 }
		 };
	 };
 };
 // Createing Object for Chat Engine
 var chat= new ChatEngine();
 chat.init();
