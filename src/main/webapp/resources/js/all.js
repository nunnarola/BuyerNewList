var FBInit = false;

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

function msgsl(theform,e){

	try{
		if($(e.target).closest('#offercontactdiv').length > 0 ){ 	
			
			
			// static div in details page
			var cont =  $(theform).parent().parent();
			$(cont).html("<div class='popstatus'><i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i></div>");
			$.post(SecSv + '/message.jsp?tt=1', $(theform).serialize(), function(data) {
		    	if (data.indexOf("Messg_Sentd_Ok") >= 0){
		    		$(cont).html('<div class="messdone"><span>Message sent successfully</span></div>');
		    		$('html, body').animate({ scrollTop: ($(cont).offset().top - 80)}, 500);
		    	}else if (data.indexOf("Sign_In_Reqquired") >= 0){
		    		popSI(e);
		    	}else{
		    		$(cont).html(data);
		    	}
		    });
		}else if($(e.target).closest('#contactdiv').length > 0 ){ 	
			
			
			// static div in details page
			var cont =  $(theform).parent().parent();
			$(cont).html("<div class='popstatus'><i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i></div>");
			$.post(SecSv + '/message.jsp?tt=1', $(theform).serialize(), function(data) {
		    	if (data.indexOf("Messg_Sentd_Ok") >= 0){
		    		
		    		gtag('event', 'buy_enquiry');
		    		$(cont).html('<div class="messdone"><i class="fa fa-check-circle"></i><span>Message sent successfully</span></div>');
		    		$('html, body').animate({ scrollTop: ($(cont).offset().top - 80)}, 500);
		    		
		    	}else if (data.indexOf("Sign_In_Reqquired") >= 0){
		    		popSI(e);
		    	}else{
		    		$(cont).html(data);
		    	}
		    });
			
		}else if( $(e.target).closest('#ctafloat').length > 0 ){ 	
			
			
				// popup div at bottom of details page
				var cont =  $("#ctafloat");
				$(cont).html("<div class='popstatus'><i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i></div>");
				$.post(SecSv + '/message.jsp?tt=1', $(theform).serialize(), function(data) {
			    	if (data.indexOf("Messg_Sentd_Ok") >= 0){
			    		//popdyingalert('<div class="messdone"><i class="fa fa-check-circle"></i><span>Message sent successfully</span></div>', 1000);
			    		$('html, body').animate({ scrollTop: (0)}, 500, function(){popdyingalert('<div class="messdone"><i class="fa fa-check-circle"></i><span>Message sent successfully</span></div>', 2000);});
			    	}else if (data.indexOf("Sign_In_Reqquired") >= 0){
			    		popSI(e);
			    	}else{
			    		
			    		$(cont).html(data);
			    		$("#ctafloat .popcontbox").addClass("lightup");
			    		$("#ctafloat .actretract").css('display', 'block');
			    		$("#ctafloat .popcontbox").animate({ 
			            	bottom: ($("#ctafloat .popcontbox").height() - $("#ctafloat .infoboxhdr").height()),
			          	}, 500 );
			    		
			    	}
			    });			
		}else{
			
			//popup
			cancelDefaultAction(e);
			$(theform).parent().html("<div class='popstatus'><i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i></div>");
			$.post(SecSv + '/message.jsp?tt=1', $(theform).serialize(), function(data) {
		    	$.magnificPopup.close();
		    	if (data.indexOf("Messg_Sentd_Ok") >= 0){
		    		popdyingalert('<div class="messdone"><i class="fa fa-check-circle"></i><span>Message sent</span></div>',1000);
		    		$.magnificPopup.close();
		    	}else if (data.indexOf("Sign_In_Reqquired") >= 0){
		    		popSI(e);
		    	}else{
			    	$.magnificPopup.open({  items: {src: '<div class="white-popup thun">' + data + '</div>', type: 'inline'}    });
		    	}
		    });
		}
	}catch(err){;}finally{}
}


function sendEnquiry(theform,e){

	try{
		
			// static div in details page
			var sendBtn = $(e.target);
			var cont =  $(theform).parent().parent();
			$(sendBtn).parent().html("<div class='enquiryspinner'>Sending <i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i></div>");
			$.post(SecSv + '/message.jsp?tt=1', $(theform).serialize(), function(data) {
		    	if (data.indexOf("Messg_Sentd_Ok") >= 0){
		    		
		    		gtag('event', 'buy_enquiry');
		    		$(cont).html('<div class="messdone"><i class="fa fa-check-circle"></i><span>Message sent successfully</span></div>');
		    		$('html, body').animate({ scrollTop: ($(cont).offset().top - 80)}, 500);
		    		
		    	}else if (data.indexOf("Sign_In_Reqquired") >= 0){
		    		popSI(e);
		    	}else{
		    		$(cont).html(data);
		    	}
		    });
			
	}catch(err){;}finally{}
}



function ping(){
   	$.getJSON(SecSv + "/ust_worker.jsp?q=ping&ts=" + new Date().getTime(),  function(data) { 
   	 	if (data.result == 'ok' ){  ;}
   	});
	
}

function pinglv(pid){
   	$.getJSON(SecSv + "/ust_worker.jsp?q=pinglv&ts=" + new Date().getTime() + "&pid=" + pid,  function(data) { 
   	 	if (data.result == 'ok' ){  ;}
   	});
	
}

function setact(act){
   	$.getJSON(SecSv + "/ust_worker.jsp?q=act&type=" + act + "&ts=" + new Date().getTime(),  function(data) { 
   	 	if (data.result == 'ok' ){  ;}
   	});
	
}

$(document).ready(function() {

	// run the ping function 
	ping();
	
	$('#defectsholder .arad, #disclosureholder .arad').change(function(e) {
		
		if ($('input[name=' + $(this).attr('name') + ']:checked').length == 0){
			
			$(this).closest(".termsitem").addClass('attend');			
		}else{
			$(this).closest(".termsitem").removeClass('attend');
		}
	});
	
	$('input[name=accept]').change(function(e) {
		if ($("#accept").length > 0 ){
			if ($('input[name=accept]:checked').length == 0 || $('input[name=accept]:checked').val() != '1'){
				$("#accept").addClass('attend');
			}else{
				$("#accept").removeClass('attend');
			}
			
		}
	});
	
	if (!iOS){
		$(document).on('mouseover', '.hoverhd', function() {
			$(this).children(".hovermenucont").first().show();
			  $(this).closest(".tbmenitem").addClass('menuselected');
		});
		
	
		$(document).on('mouseout', '.hoverhd', function() {
			$(this).children(".hovermenucont").first().hide();
			$(this).closest(".tbmenitem").removeClass('menuselected');
		});	
	}else{
		
		$(document).on('click', '.hoverhd', function() {
			
			$(".hovermenucont").hide();
			$(".tbmenitem").removeClass('menuselected');
			
			$(this).children(".hovermenucont").first().show();
			  $(this).closest(".tbmenitem").addClass('menuselected');
		});
	}

	$('html').click(function(e) {

		if ( !$(e.target).parents().hasClass('hoverhd')  )  {
			
			$(".hovermenucont").hide();
			$(".tbmenitem").removeClass('menuselected');
				
		}
		
		if ( !$(e.target).parents().hasClass('staticfootercell')  )  {
			$("#contactusholder").removeClass("opencontform");
			$("#contactdets").hide();
			$("#contactuslinks").hide();
			$("#footconttext .fa-chevron-up").show();
			$("#footconttext .fa-chevron-down").hide();
		}

	});
	
	
	$(document).on("click", '#opencont', function(e) { 
		
		popContactBox(e);
		
		
	});	
	
	
	$(document).on("click", '#contactuslinks a', function(e) {
	    e.stopPropagation();
	});
	
	
	
	$(document).on("click", '.favouritize .fa-thumbs-o-up, .favouritize .fa-toggle-off', function(e) { 
			e.preventDefault();	
			var ids = $(this).parent().attr('id').split("_");
			if (ids != null && ids.length == 2 && ids[1] != null){	

				var ParO = $(this);
				$(ParO).parent().find(".fa").hide();
				$(ParO).parent().append("<div class='favChgWaiting'><i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i></div>");
				$("#favDivider").hide();
				
			   	$.getJSON(SecSv + "/profile_worker.jsp?act=1&id=" + ids[1], function(data) {  
			   		$(ParO).parent().find(".favChgWaiting").remove();
			   	 	if (data.result == 'ok' ){   	
			   	 		$(ParO).closest(".srprevhld").removeClass("hiddenProp");  
			   	 		$(".hiddenpropspage #listsum_" + ids[1]).fadeOut('fast');
			   	 		$(ParO).parent().find(".fa-thumbs-o-up").hide();
			   	 		$(ParO).parent().find(".fa-thumbs-o-down").show();
			   	 		$(ParO).parent().find(".fa-thumbs-down").hide();
			   	 		$(ParO).parent().find(".fa-thumbs-up").show();
			   	 		$("#offersignup .fa-toggle-off").hide();
			   	 		$("#offersignup .fa-toggle-on").show();
			   	 		$.get("/tb_refresh.jsp", function(data) {$("#tb").html(data);});
			    		if ($(ParO).parent().hasClass("detailsPage")){ // in details page - refresh all favouritize instances to reflect new change
				    		var facCont =  $(ParO).parent().html();
				    		$(".favouritize.detailsPage").html(facCont);
			    		}
			    		$.magnificPopup.close();
			   	 	}else if (data.result == 'signin' ){
			   	 		$(ParO).parent().find(".fa-thumbs-o-up").show();
			   	 		$(ParO).parent().find(".fa-thumbs-o-down").show();
			   	 		popSI(e);
			   	 	}else{popalert(data.message);}
			   	 	$("#favDivider").show();
			   	});
			   	
			   	
			   	
			}
	});
	
	
	$(document).on("click", '.togglefield .fa-toggle-off, .togglefield .fa-toggle-on', function(e) { 
		e.preventDefault();	
		var buttn = $(e.target);
		var parent = $(buttn).closest(".togglefield");
		if ($(buttn).hasClass('fa-toggle-off')){
   	 		$(parent).find(".fa").hide();
   	 		$(parent).find(".fa-toggle-on").show();
   	 		$(parent).find(".toggleInput").val("1");
		}else if ($(buttn).hasClass('fa-toggle-on')){
			$(parent).find(".fa").hide();
   	 		$(parent).find(".fa-toggle-off").show();
   	 		$(parent).find(".toggleInput").val("0");
		}
		   	
	});
	
	
	
	
	$(document).on("click", '.favouritize .fa-thumbs-o-down', function(e) { 
		e.preventDefault();	
		var ids = $(this).parent().attr('id').split("_");
		if (ids != null && ids.length == 2 && ids[1] != null){	
			
				var ParO = $(this);
				$(ParO).parent().find(".fa").hide();
				$(ParO).parent().append("<div class='favChgWaiting'><i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i></div>");
				$("#favDivider").hide();
				
			   	$.getJSON(SecSv + "/profile_worker.jsp?act=-1&id=" + ids[1], function(data) {  
			   		$(ParO).parent().find(".favChgWaiting").remove();
			   	 	if (data.result == 'ok' ){   
			   	 		//$(".resPage #listsum_" + ids[1]).fadeOut('fast');
			   	 		//$(".favpage #listsum_" + ids[1]).fadeOut('fast');
			   	 		$(ParO).closest(".srprevhld").addClass("hiddenProp");  
			   	 		$(ParO).parent().find(".fa-thumbs-o-up").show();
			   	 		$(ParO).parent().find(".fa-thumbs-up").hide();
			   	 		$(ParO).parent().find(".fa-thumbs-o-down").hide();
			   	 		$(ParO).parent().find(".fa-thumbs-down").show();
			   	 		$("#offersignup .fa-toggle-off").hide();
			   	 		$("#offersignup .fa-toggle-on").show();
			   	 		$.get("/tb_refresh.jsp", function(data) {$("#tb").html(data);});
			    		
			    		if ($(ParO).parent().hasClass("detailsPage")){ // in details page - refresh all favouritize instances to reflect new change
				    		var facCont =  $(ParO).parent().html();
				    		$(".favouritize.detailsPage").html(facCont);
			    		}
			    		$.magnificPopup.close();
			    		
			   	 	}else if (data.result == 'signin' ){ 
			   	 		$(ParO).parent().find(".fa-thumbs-o-up").show();
			   	 		$(ParO).parent().find(".fa-thumbs-o-down").show();
			   	 		popSI(e);
			   	 	}else{popalert(data.message);}
			   	 	$("#favDivider").show();
			   	});
			   	
		}
		
	});
	

	$(document).on("click", '.favouritize .fa-thumbs-up, .favouritize .fa-thumbs-down, .favouritize .fa-times, .favouritize .fa-toggle-on', function(e) { 
		e.preventDefault();	
		var ids = $(this).parent().attr('id').split("_");
		if (ids != null && ids.length == 2 && ids[1] != null){
			
				var ParO = $(this);
				$(ParO).parent().find(".fa").hide();
				$(ParO).parent().append("<div class='favChgWaiting'><i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i></div>");
				$("#favDivider").hide();
				
			   	$.getJSON(SecSv + "/profile_worker.jsp?act=0&id=" + ids[1], function(data) {  	
			   		$(ParO).parent().find(".favChgWaiting").remove();
			   	 	if (data.result == 'ok' ){   	 
			   	 		$(ParO).closest(".srprevhld").removeClass("hiddenProp");  
			   	 		$(ParO).parent().find(".fa-thumbs-up").hide();
			   	 		$(ParO).parent().find(".fa-times").hide();
			   	 		$(ParO).parent().find(".fa-thumbs-o-up").show();
			   	 		$(ParO).parent().find(".fa-thumbs-o-down").show();
			   	 		$("#offersignup .fa-toggle-off").show();
			   	 		$("#offersignup .fa-toggle-on").hide();
				   	 	$.get("/tb_refresh.jsp", function(data) {$("#tb").html(data);});
				   	 	// remove marker & listing summary on the faves page
				   	 	$(".favpage #mark_" + ids[1]).hide();
			    		
			    		if ($(ParO).parent().hasClass("detailsPage")){ // in details page - refresh all favouritize instances to reflect new change
				    		var facCont =  $(ParO).parent().html();
				    		$(".favouritize.detailsPage").html(facCont);
			    		}
			    		$.magnificPopup.close();
				   	 
			   	 	}else if (data.result == 'signin' ){
			   	 		$(ParO).parent().find(".fa-thumbs-o-up").show();
			   	 		$(ParO).parent().find(".fa-thumbs-o-down").show();
			   	 		popSI(e);
			   	 	}else{popalert(data.message);}
			   	 	$("#favDivider").show();
			   	});
			   	
		}
		
	});	
	
	$(document).on("click", '#tb #adminmenu .tbmenulnkcat', function(e) { 
		$(this).find(".sttblink").toggle(300);
		$(this).find(".fa").toggle();
		
		
	});
	
	$(document).on("click", '#coronaNoticeClose', function(e) { 

    	$('#coronaNotice').slideUp("fast");
    	setact('doneCovid');
    	
    });
	
	
	
});

function popContactBox(e){
	
	if ($("#contactusholder").hasClass("opencontform") ){
		$("#contactusholder").removeClass("opencontform");
		$("#contactdets").hide();
		$("#contactuslinks").hide();
		$("#footconttext .fa-chevron-down").hide();
		$("#footconttext .fa-chevron-up").show();
		
	}else{
		$("#contactusholder").addClass("opencontform");
		try{
			var gto = $("#contactdets").height();
			if (gto > 0){
				$("#contactdets").css('height', 0);
				$("#contactdets").show();
				$("#contactuslinks").show();
				$("#footconttext .fa-chevron-down").show();
				$("#contactdets").animate({height:gto},300, function(){$("#contactdets").css('height', 'auto');});					
			}

		}catch(err){$("#contactdets").show();$("#contactdets").css('height', 'auto');}

	}
	
}

function ajregs(theform,e){
	
	$('.white-popup').html("<div class='popstatus'><i class='fa fa-circle-o-notch fa-spin fa-3x fa-fw margin-bottom'></i>Creating your account ...</div>");
    $.post(SecSv + '/Register.jsp', $(theform).serialize(), function(data) {
    	$.magnificPopup.close();
    	if (data.indexOf("rggtrrdokk") >= 0){
    		popalert(data);
    	}else{
    		popalertNoOK(data);
    	}

    });
	e.preventDefault();
}

function GetQS(){
	  var query_string = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0]] = decodeURIComponent(pair[1]);
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
	      query_string[pair[0]] = arr;
	    } else {
	      query_string[pair[0]].push(decodeURIComponent(pair[1]));
	    }
	  } 
	  return query_string;
}


function FBLogin(theform,e) {
	
	$(".authProviderLogo").css('display', 'none');
	$(".authProvidertxt .fa").css('display', 'inline-block');

	$("#loginerm").html('');
	FB.login(function(response) {

		statusChangeCallback(response, theform,e);
	}, {
	    scope: 'email', 
	    return_scopes: true
	});

}


function FBLoginReg(theform,e) {
	
	$(".fblgcont.signIn .custLoginButton .authProviderLogo .fbloginLogo").css('display', 'none');
	$(".fblgcont.signIn .custLoginButton .authProviderLogo .fa").css('display', 'inline-block');

	$("#loginerm").html('');
	FB.login(function(response) {

		statusChangeCallback(response, theform,e);
	}, {
	    scope: 'email', 
	    return_scopes: true
	});

}

function FBLogout(){

	FB.logout(function(response) { 
		statusChangeCallback(response);
	});
}

function statusChangeCallback(response,theform,e) {
	document.getElementById('fbk').value = '';
    if (response.status === 'connected') {
      // Logged in
    	document.getElementById('fbk').value = response.authResponse.accessToken;
    	var scopes = response.authResponse.grantedScopes;
    	ajlg(theform,e);
      
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        $("#loginerm").html('<span style="color:red;">You have not authorised Facebook to sign in.</span>');
        $("#loginerm").slideDown('fast');
	    $(".fblgcont.signIn .custLoginButton .authProviderLogo .fa").hide();
	    $(".fblgcont.signIn .custLoginButton .authProviderLogo .fbloginLogo").css('display', 'inline-block');
	    
    } else {
      // The person is not logged into Facebook
        $("#loginerm").html('<span style="color:red;">You have not authorised Facebook to sign in.</span>');
        $("#loginerm").slideDown('fast');
	    $(".fblgcont.signIn .custLoginButton .authProviderLogo .fa").hide();
	    $(".fblgcont.signIn .custLoginButton .authProviderLogo .fbloginLogo").css('display', 'inline-block');
    }
  }

if (FBInit){
	$(".fblgcont.signIn .custLoginButton .authProviderLogo .fa").hide();
	$(".fblgcont.signIn .custLoginButton .authProviderLogo .fbloginLogo").css('display', 'inline-block');
}


function ajlg(theform,e){
	
try{
	
	var gotoafterlogin = null;
	if (theform != null && theform.elements["redir"] && theform.elements["redir"] != null && theform.elements["redir"].value != null){
		gotoafterlogin =  theform.elements["redir"].value;
	}
	$('.white-popup').css('background', 'none');
	$('.white-popup').html("<div class='popstatus' style='color:white;font:30px Roboto,sans-serif;font-weight:300;'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>Signing In... </div>");

	$.post(SecSv + '/login.jsp?tt=1', $(theform).serialize(), function(data) {


    	//console.log(data);
    	if (data.indexOf("Login-Successfully-Completed") >= 0){

    		if (window.location.pathname.indexOf("/login.jsp") == 0 ||  window.location.pathname.indexOf("/Register.jsp") == 0){

    			var Goto = SecSv + "/";
    			try{
    				var QS = GetQS();

    				if (QS != null && QS.redir && GetQS().redir != null && QS.redir.indexOf('http') == 0
    						&& QS.redir.indexOf('/login.jsp') < 0 && QS.redir.indexOf('/Register.jsp') < 0 
    				){
    					Goto = 	QS.redir;
    				}
    			}catch(e){;}
    			window.location.href = Goto;
    		}else if (gotoafterlogin != null){
    			
    			window.location.href = gotoafterlogin;
    			
    		}else{
	   	 		if (bGet){ 		// if method was get, then rfresh whole page, otherwise just toolbar
	   	 			location.reload();
	   	 		}else{
	   	 		
	   		   	 	$.get("/tb_refresh.jsp", function(data) {
	   		   	 		$.magnificPopup.close();
	   		   			$("#tb").html(data);
	   		   			$("#logodiv").hide();
	   		   		});
	   	 		}
    		}
    	}else if (data.indexOf("Reg_Confirmation") >= 0){
    		window.location.href = "/Reg_OK.jsp";
    		
    	}else{
    		$.magnificPopup.close();
    		popalertNoOK(data);
    	}
    	
	    $(".fblgcont.signIn .custLoginButton .authProviderLogo .fa").hide();
	    $(".fblgcont.signIn .custLoginButton .authProviderLogo .fbloginLogo").css('display', 'inline-block');
	    
		$(".glgcont.signIn .custLoginButton .authProviderLogo .gloginLogo").css('display', 'inline-block');
		$(".glgcont.signIn .custLoginButton .authProviderLogo .fa").css('display', 'none');

    	
    });
	if (e != null){
		e.preventDefault();
	}
	
}catch(err){;
}finally{if (document.getElementById('fbk') != null){document.getElementById('fbk').value = '';}}
}

function verifyprofilelevel(){
	
	$.getJSON(SecSv + "/profile_worker.jsp?action=vp" , function(data) {  	
   	 	if (data.result == 'ok' ){  
   	 		//alert(data.view + ":" + data.offer);
   	 		if (data.view != null && data.view == '1'){$(".oktoview").show();$(".notoktoview").hide();}else{$(".oktoview").hide();$(".notoktoview").show();}
   	 		if (data.offer != null && data.offer == '1'){$(".oktooffer").show();$(".notoktooffer").hide();}else{$(".oktooffer").hide();$(".notoktooffer").show();}
   	 		if (data.gotpic != null && data.gotpic == 1){$(".profpicprsnt").removeClass('nopicsub');}else{$(".profpicprsnt").addClass('nopicsub');}
   	 	}else if (data.result == 'signin' ){   
   	 		//popSI(e);
   	 	}
   	});	
	
}


function popSI(ev){
	
	popAP(ev, SecSv + '/login.jsp?tt=1');
}

function popSIT(ev,gogo){
	popAP(ev, SecSv + '/login.jsp?tt=1&redir=' + gogo);
}


function popAP(ev, URL){

	// if screen is big enough pop ajax box otherwise return true to go through to static page
	if ($.magnificPopup != null && $.magnificPopup.length > 0){
		$.magnificPopup.close();
	}
	if (getWinWidth() >= 320 ){
			if (ev){cancelDefaultAction(ev);}
			$.get(URL, function(data) {
				popalertNoOK(data);
			});
	}else{
		return true;
	}
	
	
}

function getWinWidth(){
	var ViewWidth = $(window).width();
	try{ if(window.innerWidth != null  && window.innerWidth > 1){
			if (ViewWidth == null || window.innerWidth < ViewWidth){ViewWidth = window.innerWidth;}}
	}catch(exc){;}
	try{
		if(document.body != null && document.body.clientWidth != null && document.body.clientWidth > 1){
			if (ViewWidth == null || document.body.clientWidth < ViewWidth){ViewWidth = document.body.clientWidth;}
		}
	}catch(exc){;}
    return ViewWidth;
}
  
function getWinHeight(){
	var ViewHeight = $(window).height();
	try{
		if(window.innerHeight != null && window.innerHeight > 1){
			if (ViewHeight == null || window.innerHeight < ViewHeight){ViewHeight = window.innerHeight;}
		}
	}catch(exc){;}
    return ViewHeight;
}  
  

function fieldfocus(field,defaultval){

	if (field.value == defaultval || field.value == "" || field.value == "Price (R)"){
		field.value = "";
		//field.style.color='#333';
	}
	
}
function fieldblur(field, defaultval){

	if (field.value == defaultval || field.value == ""){	
		ValListingField(field,"");
		field.value = defaultval;
	}else{
		ValListingField(field, null);
		
	}
	
}

function setformontype(typesel){
	
var t=$(typesel).val();
if ( t == 'Townhouse' || t == 'Apartment'){
	
	$("#levieswrap").show("fast");	
	$("#placeunitwrap").show("fast");
	$("#placecomplexnamewrap").show("fast");


}else{
	$("#rateswrap").show("fast");
	$("#placeunitwrap").hide("fast");
	$("#placecomplexnamewrap").hide("fast");

}

}

function showiddocl(){
	$("#idverhld .upok").hide();
	$("#idverhld .verval").hide();
	$("#iddocloader").slideDown("fast", function() {  setIDUploader("iduploader", "addidfilesbuttn");/***/  });
}


function showpicloadr(){
	$("#profpicloader").slideDown("fast", function() {setUploader("uploader", "addfilesbuttn"); } );
}



function profverit(TheDiv, e){

	$(TheDiv).parent().find(".verval").hide();
	$(TheDiv).parent().find(".intextwrap").show();
	$(TheDiv).parent().find(".versub").show();
	$(TheDiv).parent().find(".preambl").show();
	$(TheDiv).hide();
	$(TheDiv).parent().find(".defob").slideDown("fast");
}

function profchgpas(TheDiv, e){
	$(TheDiv).hide();
	$(TheDiv).parent().find(".intextwrap").show();
	$(TheDiv).parent().find(".profval").hide();
	$(TheDiv).parent().find(".profsub").show();
	$(TheDiv).parent().find(".preambl").show();
	

}

function countcharleft(fieldOb,limit){
	
	var cahrsleft = limit - $(fieldOb).val().length;
	$(fieldOb).parent().parent().find(".charleftcnt").html("" + cahrsleft + " characters left");
	
}

function ValListingField(Field, Fval){
	if (Field != null && Field.id != null /**&& Field.value != null && Field.value.length > 0**/){
		FVal = Field.value;
		if (FVal == null){FVal = "";}
		if (Fval != null){FVal = Fval;}
		//alert(Field.id);
		var data = $("#propentryform").serialize();
	   	$.getJSON("/validator.jsp?v=" + FVal + "&f=" + Field.id, data, function(data) {  
	   	 	if (data.result == 'ok' ){   	 		
	   	 		$("#" + Field.id).parent().parent().find(".AdInputInfo").html("&nbsp;");
	   	 		if ($("#" + Field.id).parent().hasClass("failval")){$("#" + Field.id).parent().removeClass('failval');}
	   	 		$("#" + Field.id).parent().addClass('okval');  
	   	 		$("#" + Field.id).parent().parent().find(".AdInputInfo").removeClass("FailMessage");
	   	 		$("#" + Field.id).parent().parent().find(".AdInputInfo").hide();
	   	 	}else{
	   	 		$("#" + Field.id).parent().parent().find(".AdInputInfo").show();
	   	 		$("#" + Field.id).parent().parent().find(".AdInputInfo").html(data.showhtml);
	   	 		if ($("#" + Field.id).parent().hasClass("okval")){$("#" + Field.id).parent().removeClass('okval');}
	   	 		$("#" + Field.id).parent().parent().find(".AdInputInfo").addClass("FailMessage");
	   	 		$("#" + Field.id).parent().addClass('failval');	   	 		
	   	 	}
	   	});
	}
	
}

function vertcenterpic(pic){
	
	$(pic).parent().parent().height(getWinHeight()-$("#tb").height()-0.1*getWinHeight());
	
	var newtop=($(pic).parent().height() - $(pic).height())/2;	
	//alert($(pic).parent().height()  + ":" + $(pic).height() + ":" + pic[0].naturalHeight );
	if (newtop > 0){newtop = 0;}
	
	
	if ($(pic).height() > 0 && ($(pic).height() < ($(pic).parent().parent().height()))){
		$(pic).parent().parent().height($(pic).height());
	}
	$(pic).css('top', newtop + "px");
	$(pic).css('margin', "0px");
	$(pic).fadeIn(1000);
}

function cancelDefaultAction(evt) {

	 if (evt.preventDefault) evt.preventDefault();
	 evt.returnValue = false;
	 return false;


} 


function processingPop(message){
	popalertNoOK("");
	$('.white-popup').css('background', 'none');
	$('.white-popup').html("<div class='popstatus' style='color:white;font:30px Roboto,sans-serif;font-weight:300;'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>" + message + "</div>");

	
}

function processing(){
	
	processingPop("&nbsp;");
	
}


function popalert(Message){
	
	$.magnificPopup.open({
		  items: {
		    src: '<div class="white-popup">' + Message + '<p class="popok"><span><input type="button" value="OK" onclick="$.magnificPopup.close();"></span></p></div>', // can be a HTML string, jQuery object, or CSS selector
		    type: 'inline'
		  }
	});
	
}

function popIframe(iFrameUrl){
	
	$.magnificPopup.open({
		  items: {
		        src: iFrameUrl,
		        type: 'iframe' 

		  }
	});
	
}


function popok(Message,AddClass,duration){
	var delay = 1000;
	if (duration != null){delay = duration;}
	if (!AddClass || AddClass == null){AddClass = '';}
	$.magnificPopup.open({
		  items: {
		    src: '<div class="dying-pop ' + AddClass + '">' + Message + '</div>', // can be a HTML string, jQuery object, or CSS selector
		    type: 'inline'
		  }, removalDelay: delay
	});
	$.magnificPopup.close();
	
}



function popHeadingAlert(Heading, Message){
	
	$.magnificPopup.open({
		  items: {

				
			  
			  
		    src: '<div class="white-popup headedalert"><div class="white-popup"><div class="messgecont"><div class="messgemark"></div><div class="messgehdn">' + Heading + '</div>' + 
			'<div class="messgepar">' + Message + '</div></div><p class="popok"><span><input type="button" value="OK" onclick="$.magnificPopup.close();"></span></p></div>', // can be a HTML string, jQuery object, or CSS selector
		    type: 'inline'
		  }
	});
	
}


function popalertNoOK(Message){
	
	$.magnificPopup.open({
		  items: {
		    src: '<div class="white-popup">' + Message + '</div>', // can be a HTML string, jQuery object, or CSS selector
		    type: 'inline'
		  }
	});
	
}

function popalertNoOKWide(Message){
	
	$.magnificPopup.open({
		  items: {
		    src: '<div class="white-popup widePop">' + Message + '</div>', // can be a HTML string, jQuery object, or CSS selector
		    type: 'inline'
		  }
	});
	
}

function poperm(Message){
	
	popalert("<div class='ermhldre'><i class='fa fa-exclamation-circle' aria-hidden='true'></i><span class='emss'>" + Message + "</span></div>");	
}


function popdyingalert(Message,delay){
	
	$.magnificPopup.open({
		  items: {
		    src: '<div class="white-popup">' + Message + '</div>', // can be a HTML string, jQuery object, or CSS selector
		    type: 'inline'
		  }, removalDelay: delay
	});
	$.magnificPopup.close();
	
}



function popspinner(Message){
	
	var displaymessage = "&nbsp;";
	if (Message && Message != null && Message != ''){displaymessage = Message;}
	$.magnificPopup.open({
	  items: {
	    src: '<div id="popspin">&nbsp;</div><div id="popstatus">' + displaymessage + '</div>', // can be a HTML string, jQuery object, or CSS selector
	    type: 'inline'
	  }
	});
	
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function InspectObject(Obj){
var output = '';
for (var property in Obj) {
  output += property + ': ' + Obj[property]+'; ';
}
//alert(output);
console.log(Obj);  
console.log(JSON.stringify(Obj));
}


function showoffercal(Calid){
	$("#" + Calid).show();
	$("#" + Calid).slideDown("fast");
}

function GetDisplayDate(input){

var comps = input.split("-");	

//var dt = new Date(2014, 11, 31);
/** Javascript bug in this code - on 31 of a month it sets date to next month 
replaced by code below
var out = new Date();
var comps = input.split("-");
var mnth = parseInt(comps[0]) - 1;
out.setMonth(comps[0]);
out.setDate(comps[1]);
out.setFullYear(comps[2]);	
alert(comps[0] + "os:" + os + " getMonth:" + out.getMonth() + " :mnth" + mnth + " :" + os.substring(4, os.length) );
 **/	

var out = new Date(parseInt(comps[2]),(parseInt(comps[0]) - 1), parseInt(comps[1]));
//alert(out.toDateString());
var os =  out.toDateString();
return (os.substring(0, 3) + ', ' + os.substring(4, os.length));
}


function setSelectedDate(calid){
	
	var DateStr = $('#' + calid + ' input.data1').val();
	$('#' + calid).parent().find('.datedisp').html(GetDisplayDate(DateStr));
	$('#' + calid).parent().find('.datedisp').css('display', 'inline-block');
	$('#' + calid).parent().find('.dateinputfiled').val(DateStr).change();
	$('#' + calid).parent().find('.dateinputfiled').hide();
	$('#' + calid).slideUp("fast");
	
}

function sendshreq(e, pid){

	try{

			// static div in details page
			
			var cont =  $(e.target).closest(".convitem").find(".messhist");
			$("#shreqform").slideUp("fast");
			$("#shreqload").html("<div class='popstatus'><i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i></div>");
			//$("#shreqload").css("display","inline-block");
			$("#shreqload").slideDown("fast");
			$.getJSON(SecSv + '/message_worker.jsp?tt=1&f=sh', $(document.getElementById("shrequestform")).serialize(), function(data) {
				
				
		   	 	if (data.result == 'ok' ){  
		   	 		$("#shentrpr").hide();
					$("#shreqload").slideUp("fast", function(){$("#shreqload").html("<div class='prook'><i class='fa fa-check-circle'></i><span class='procoktxt'>Request sent</span></div>");$("#shreqload").slideDown("fast");});
		   	 		

		   	 	}else if (data.result == 'signin' ){
		   	 		$("#shentrpr").hide();
		   	 		$("#shreqload").slideUp("fast", function(){$("#shreqload").html("<span class='errspan'>Please sign in.</span>");$("#shreqload").slideDown("fast");});
		   	 		popSI(e);
		   	 	}else if (data.result == 'info' ){
		   	 		
			   	 	$("#shreqload").html("<span class='errspan'>" + data.message + "</span>");
			   	 	$("#shreqform").slideDown("fast");
			   	 		
			   	 	  var profurl = SecSv + "/SH_Profile.jsp?pid=" + pid + "&ts=" + new Date().getTime();
				   	   $.get(profurl, function(data) {
					   		$.magnificPopup.open({
						  		  items: {
						  		    src: '<div class="white-popup wider">' + data + '<p class="popok"><span><input type="button" value="Close" onclick="$.magnificPopup.close();"></span></p></div>', // can be a HTML string, jQuery object, or CSS selector
						  		    type: 'inline'
						  		  }
				   			});
				   	   });   
		   	 	}else if (data.result == 'form' ){
		   	 		$("#shentrpr").hide();
		   	 		$("#shreqload").slideUp("fast", function(){$("#shreqload").html("<span class='errspan'>" +  data.message + "</span>");$("#shreqload").slideDown("fast");$("#shreqform").slideDown("fast");});
		   	 	}else{
		   	 		$("#shentrpr").hide();
		   	 		$("#shreqload").slideUp("fast", function(){
		   	 			$("#shreqload").html("<span class='errspan'>" +  data.message + "</span>");
		   	 			$("#shreqload").slideDown("fast");
		   	 		});
		   	 	}		   	 	
		    });
			

	}catch(err){;}finally{}
}


function saveshowday(el, shid){
	
var pid =  $(el).data("pid");
var htm = $(el).html();
$(el).html("<p class='svsdtmp'>saving...</p>");
$.getJSON(SecSv + '/show_worker.jsp?a=bk&shid=' + shid + '&pid=' + pid,  function(data) {
	
	$(el).html(htm);	
 	if (data.result == 'ok' ){  
 		popdyingalert('<div class="messdone"><i class="fa fa-check-circle"></i><span>Saved</span></div>',1000);
 	}else if (data.result == 'signin' ){
 		popSI();
 	}else{
 		poperm(data.message);
 	}		   	 	
});

	
}

function DisplayShowHouseData(shid, ev){

	popalert("<div class='shprevwcont'><p class='loading' style='padding-bottom:30px'><i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i></p></div>");
	$(".white-popup").css('width','300px');
	$(".popok span").hide();
	
   	$.getJSON(SecSv + "/show_worker.jsp?a=vsh&shid=" + shid, null, function(data) {  
   		
   		$(".popok span").hide();
   		
   	 	if (data.result == 'ok' ){  
   	 	
   	 		$(".shprevwcont").html(data.htmlcont); 	 		
	   	 
   	 	}else if (data.result == 'signin' ){ 
   	 		$.magnificPopup.close();
   	 		popSI(ev);
   	 	}else{
   	 		$.magnificPopup.close();
   	 		poperm(data.message);
   	 	}
   	});
	
}



function sendusamess(theform,e){
	try{

		// static div in details page
		var cont =  $("#messformcont");
		$("#messformcont .contactusbutwrap input").val("...");
		
		$.post(SecSv + '/message.jsp?tt=1', $(theform).serialize(), function(data) {
	    	if (data.indexOf("Messg_Sentd_Ok") >= 0){
	    		$(cont).html('<div class="messdone"><i class="fa fa-check-circle"></i><span>Message sent successfully</span></div>');
	    	}else if (data.indexOf("Sign_In_Reqquired") >= 0){
	    		popSI(e);
	    	}else{
	    		$(cont).html(data);
	    	}
	    });
		
	}catch(err){;}finally{}
}

function tsi(){
	
	//ga('send', 'event', 'JS Action', 'click', 'Sell_Info', '1');
	gtag('event', 'click_sell_popup');
	
}


var prePopHTML = "";

function getprePopHTML(ct){
	var url = SecSv + '/list_pop.jsp?tt=1&type=' + ct;
	$.get(url, function(data) {
		prePopHTML = data;
	});
}


function popListOption(e, contype, prePopulatedHTML, addressDetails, doorId){
	if (e.preventDefault) e.preventDefault();
	var buttn = $(e.target);
	var ct = "";
	if (contype && contype != null){ct = contype;}
	var orightml = $(buttn).closest(".spinme").html();
	
	$(buttn).closest(".spinme").html("<i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
	
	if (prePopulatedHTML && prePopulatedHTML != null && prePopulatedHTML != ''){
		
		popalertNoOKWide("<div style='display:inline-block;width:100%;'>" + prePopulatedHTML + "</div>");
		$(buttn).closest(".spinme").html(orightml);
		initAutoCompleteSub();
		
	}else{
		
		var url = SecSv + '/list_pop.jsp?tt=1&type=' + ct;
		if (addressDetails != null){
			url += "&address=" + encodeURIComponent(addressDetails.address) + "&lat=" + encodeURIComponent(addressDetails.lat) +
			 	 "&lng=" + encodeURIComponent(addressDetails.lng)
		}
		if (doorId != null){
			url += "&doorId=" + encodeURIComponent(doorId);
		}
		$.get(url, function(data) {
			popalertNoOKWide("<div style='display:inline-block;width:100%;'>" + data + "</div>");
			$(buttn).closest(".spinme").html(orightml);
			initAutoCompleteSub();
			
		});
	}
	tsi();	
}

function ulist(theform,e,isValuation){
	try{
		
		var targetURL = "/";
		if (isValuation != null && isValuation){
			targetURL = "/";
		}
		var lType = $(theform).find("[name=type]").val();

		// static div in details page
		var cont =  $(theform).closest(".lscontcent").parent();
		$(e.target).html("<i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
		
		$.post(SecSv + '/list_pop.jsp?tt=1', $(theform).serialize(), function(data) {

	    	if (data.indexOf("Messg_Sentd_Ok") >= 0){
	    		
	    		gtag('event', lType);
	    		
	    		$(cont).html("<div class='messdone' style='margin-top:0px;'>" + 
    					"<p  style='margin:20px 0px 00px 0px;font-size:32px;color:#060C3B;'><img src='/images_static/favicon-32x32.png' style='height:32px;border:0px;'>" + 
    					"<span style='padding-left:20px;font-size:20px;color:#060C3B;'>Thank you!</span></p>" + 
    					"<p style='margin:20px 0px 0px 0px;font-size:26px;color:#060C3B;'> We'll be in touch shortly.</p>" + 
    					"<p style='margin:50px 0px 10px 0px;'><span><input type='button' value='Ok' onclick='$.magnificPopup.close();' style='font: 20px Roboto, sans-serif;font-weight:400;display:inline-block;border-radius:8px;border: 0px;width: 100px;color:white;background: #060C3B;padding: 5px 10px 5px 10px;'></span></p>" + 
    					"</div>");
	    		
	    		//$.magnificPopup.close();
	    		//window.location.href = targetURL;
	    	}else{

	    		$(cont).html(data);
	    		initAutoCompleteSub();
	    	}
	    });
		
	}catch(err){;}finally{}
}

function sendTCReminder(pid,e){

	var sndrembut = $(e.target).parent();
	var sndrembutres = $(e.target).parent().parent().find(".sndrembutnres");
			
	$(sndrembut).hide();
  	$(sndrembutres).html("<i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
	$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=stcr&id=" + pid  , function(data) {  	
		
		if (data.result == 'ok' ){  
			$(sndrembutres).html("<span style='color:green'>&nbsp;&nbsp;<i class='fa fa-check-circle'></i>&nbsp;Reminder Sent</span>"); 	
   	 	}else if (data.result == 'signin' ){ 
   	 		$(sndrembut).show();
   	 		$(sndrembutres).html(data.message);
   	 		$(sndrembutres).hide();	
   	 		popSI(e);
   	 	}else{	
   	 		$(sndrembut).show();
   	 		$(sndrembutres).html(data.message);
   	 		$(sndrembutres).hide();
   	 		popalert(data.message);
   	 	}
   	});   
  
}

function toggleListingMap(){
	
	var curLoc = window.location.href;
	
	if ($("#resultsholder").hasClass('hidemap')){
		
		if (curLoc.indexOf('?') >= 0){
			window.location.href = curLoc.substring(0, curLoc.indexOf('?')) + '?map=on&' + curLoc.substring((curLoc.indexOf('?') +1), curLoc.length) ;
		}else{
			window.location.href = curLoc + '?map=on';
		}
		
	}else{
		curLoc = curLoc.replace("map=on&", "");
		curLoc = curLoc.replace("map=on", "");
		window.location.href = curLoc;
	}
	
}


function toggleSrMap(action, e){
	
	if (e.preventDefault) e.preventDefault();
	var listingId = $(e.target).closest('.srprevhld ').data('pid');
	$("#listsum_" + listingId + " .listingMapToggleLink").removeClass("displaying");
	$(e.target).addClass("displaying");
	
	if (action == 'photos'){
		
		$("#listsum_" + listingId + " .srprevpichld").hide();
		$("#listsum_" + listingId + " .picsprev").show();
		
	}else if (action == 'map'){
		
		$("#listsum_" + listingId + " .srprevpichld").hide();
		var imgUrl = $("#listsum_" + listingId + " .maprev img").data("url");
		$("#listsum_" + listingId + " .maprev img").attr("src",imgUrl);
		$("#listsum_" + listingId + " .maprev img").show();
		$("#listsum_" + listingId + " .maprev").show();
		try{
			gtag('event', 'sr_map_view');
		}catch(exP){;}
		
		
		
		
	}
	
	
}

