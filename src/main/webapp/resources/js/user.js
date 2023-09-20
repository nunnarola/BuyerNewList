$(document).ready(function() {

	
	$(document).on("click", '.messend', function(e) { 
		$(e.target).closest(".convitem").find(".respmess").slideDown("fast");
		
	});
	
	$(document).on("click", '.messmore', function(e) { 
		var ConvDiv = $(e.target).closest(".convitem").find(".messhist");
		seemore(ConvDiv, e);	
	});
	
	$(document).on("click", '.lastmsgbod', function(e) { 
		var ConvDiv = $(e.target).closest(".convitem").find(".messhist");
		seemore(ConvDiv, e);	
	});	
	

	
	$(document).on("click", '.messagebyr', function(e) { 
		
		var oid = "";

		if ($(e.target).data("oid") != null && ("" + $(e.target).data("oid")).length > 0){oid = "&oid=" + $(e.target).data("oid"); }
		
		var pid = "";
		if ($(e.target).data("pid") != null && ("" + $(e.target).data("pid")).length > 0){pid = "&pid=" + $(e.target).data("pid"); }
		
		if (pid != "" || oid != "" ){
			cancelDefaultAction(e);

			var URL = "/message.jsp?tt=1&by=1" + pid + oid;
			
			if ($.magnificPopup != null && $.magnificPopup.length > 0){
				$.magnificPopup.close();
			}
			
			$.get(URL, function(data) {
				$.magnificPopup.open({  items: {src: '<div class="white-popup thun">' + data + '</div>', type: 'inline'}    });
			});

			


		}else{
			poperm("An error occurred, please refresh the page and try again.");
		} 
	});

	


	$("#visitorselect").select2({
		  ajax: {
		    url: SecSv + "/CRM/user_worker.jsp?sh=1&a=ulist",
		    placeholder: function(){$(this).data('placeholder');},
		    dataType: 'json',
		    multiple: false,
		    delay: 250,
		    data: function (params) {
		      return {
		        q: params.term, // search term
		        page: params.page
		      };
		    },
		    processResults: function (data, page) {
		      return data;
		    },
		    cache: true
		  },
		  minimumInputLength: 3, 
		  templateResult: formatOutputEU
	});

    $('.select2-selection__arrow b').hide();
    $('.select2-selection__arrow').append('<i class="fa fa-angle-down"></i>');
	
	
	
	
});



	
	
	
function sendvalidatevisitoremail(sellerid,e,pid){
	
  	$("#sndvvbutn").hide();
  	$("#sndvvbutnres").html("<i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
	$.getJSON(SecSv + "/show_worker.jsp?a=vv&pid=" + pid + "&uid=" + sellerid , function(data) {  	
		
		
		if (data.result == 'ok' ){  
			$("#sndvvbutnres").html("<span style='color:green'>Sent OK</span>"); 	
   	 	}else if (data.result == 'signin' ){ 
   	 		$("#sndvvbutn").show();
   	 		$("#sndvvbutnres").html(data.message);
   	 		$("#sndvvbutnres").hide();	
   	 		popSI(e);
   	 	}else{	
   	 		$("#sndvvbutn").show();
   	 		$("#sndvvbutnres").html(data.message);
   	 		$("#sndvvbutnres").hide();
   	 		popalert(data.message);
   	 	}
   	});   
  
}



function formatOutputEU (optionElement) {
	  if (!optionElement.id) { return optionElement.text; }
	  
	  var ver = "FAILSelect";
	  
	  if (optionElement.shok && optionElement.shok == 'yes'){
		  ver = "OKSelect";
	  }
	  var $state = $('<span class=' + ver + '>' + optionElement.text + '</span>');
	  return $state;
};

function showverphone(Field, e){
	
	$("#phoneverhld .prochg").hide();
	$("#phoneverhld .verval").hide();
	$("#phoneverhld .upok").html("");
	$("#phoneverhld .upok").show();
	$("#phoneverhld .defob").hide();
	$("#phonentry .preambl").show();
	$("#phonentry").slideDown("fast");
	

}

function resendpin(uid){
	$("#phoneverhld .upok").show();
	$("#phoneverhld .upok").html("<i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
	
	var UIS = "";
	if (uid != null){UIS = "&uid=" + uid}	
	
	$.getJSON(SecSv + "/profile_worker.jsp?action=phvr"  + UIS , function(data) {  	

		if (data.result == 'ok' ){  

			$("#phoneverhld .upok").html("<span class='smallnote'>Resent</span>");
			
		}else if (data.result == 'signin' ){   
   	 		popSI(e);
   	 		$("#phoneverhld .upok").html("");
   	 	
		}else { 
			$("#phoneverhld .upok").html("");
			$("#phoneverhld .AdInputInfo").html(data.message);
			$("#phoneverhld .AdInputInfo").addClass("FailMessage");


		}

	});
	
}

function verifyphone(Field, e, uid){

	var UIS = "";
	if (uid != null){UIS = "&uid=" + uid}	
		
	$("#phoneverhld .prochg").hide();
	$("#phoneverhld .verval").hide();
	$("#phoneverhld .upok").show();
	$("#phoneverhld .upok").html("<i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
	$("#phoneverhld .AdInputInfo").html("");
	$("#phoneverhld .AdInputInfo").removeClass("FailMessage");
	
	$.getJSON(SecSv + "/profile_worker.jsp?action=phva&v=" + $(Field).val() + "&f=" + $(Field).attr('id')  + UIS , function(data) {  	
		$("#phoneverhld .upok").html("");
		$("#phoneverhld .upok").hide();
		if (data.result == 'ok' ){  
			$("#phoneverhld .defob").hide();
			$("#verphnumel").html("Verified");
			$("#phoneverhld .verval").show();
			$("#phoneverhld .verval .prochg").html("Change");
			$("#phoneverhld .verval .prochg").show();
			$("#phoneverhld .upok").html('<i class="fa fa-check-circle" aria-hidden="true"></i>');
			$("#phoneverhld .upok").show();
			if ($("#phoneverhld").hasClass("attend")){$("#phoneverhld").removeClass("attend");}
			if ($("#shreqform").length > 0){
				$("#shreqload").slideUp("fast");
				$("#shreqload").html("");
				$.magnificPopup.close();
				$("#shrqfrmbt").click();

			}

		}else if (data.result == 'signin' ){   
   	 		popSI(e);
   	 	
		}else if (data.result == 'phone' ){ 
			$("#phoneverhld .defob").hide();
			$("#phonentry .preambl").show();
			if (data.mesage != ''){
				$("#phoneverhld .upok").hide();
				$("#phoneverhld .AdInputInfo").html(data.message);
				$("#phoneverhld .AdInputInfo").addClass("FailMessage");
				$("#phonentry .intextwrap").addClass('failval');
			}
			
			$("#phonentry").slideDown("fast");
		}else if (data.result == 'pin' ){ 
			
			$("#phoneverhld .defob").hide();
			$(".adminphonenet#phonentry").show();
			$(".resendpin").show();
			$("#pinentry .preambl").show();
			if (data.message && data.message != ''){
				$("#phoneverhld .upok").hide();
				$("#pinentry .preambl").hide();
				$("#mobpin").val('');
				$("#pinentry .intextwrap").addClass('failval');
				$("#phoneverhld .AdInputInfo").html(data.message);
				$("#phoneverhld .AdInputInfo").addClass("FailMessage");
			}			
			$("#pinentry").slideDown("fast");
			

		}
		verifyprofilelevel();

	});
		
	
}

function verFB( ob, e){
	$("#fbverhld .prochg").hide();
	$("#fbverhld .verval").hide();
	$("#fbverhld .upok").show();
	$("#fbverhld .upok").html("<i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
	$("#fbverhld .AdInputInfo").html(" ");
	$("#fbverhld .AdInputInfo").removeClass("FailMessage");
	$(".authProviderLogo").css('display', 'none');
	$(".authProvidertxt .fa").css('display', 'inline-block');

	FB.login(function(response) {
		statusChangeFBCallback(response, ob,e);
	}, {
	    scope: 'email', 
	    return_scopes: true
	});		
}


function rmvpic(uid){
	$("#profpic .prfldholder").html("<i class='fa fa-circle-o-notch fa-spin fa-3x fa-fw margin-bottom'></i>");
	$("#profpic .prfldholder").show();
	$("#profpic img").attr("src", "/images_static/dot.png");

	var UIS = "";
	if (uid != null){UIS = "&uid=" + uid}	
	
	$.getJSON(SecSv + "/profile_worker.jsp?action=delpp" + UIS , function(data) {  	

		if (data.url && data.url.length > 5){
			$("#profpic img").attr("src", "/images_static/dot.png");
			$("#profpic img").attr("src", data.url);
			$("#profpic img").show();
			$("#delpcbt").show();
		}else{
			$("#profpic img").hide();
			$("#profpic .prfldholder").html("<i class='fa fa-user' aria-hidden='true'></i>");
			$("#profpic .prfldholder").show();
		}			
		
		
		if (data.result == 'ok' ){  
			$("#profpires i").hide();
			$("#delpcbt").hide();
		}else if (data.result == 'signin' ){   
   	 		popSI(e);
		}else { 		
			popalert(data.message);
		}
		
		$.get("/tb_refresh.jsp", function(data) {$("#tb").html(data);});
		verifyprofilelevel();
	});
}



function quickDelPic(imageInputId){
	$("#profpic .prfldholder").html("<i class='fa fa-circle-o-notch fa-spin fa-3x fa-fw margin-bottom'></i>");
	$("#profpic .prfldholder").show();
	$("#profpic img").attr("src", "/images_static/dot.png");
	
	$("#" + imageInputId).val("");

}





function statusChangeFBCallback(response,ob,e) {

    if (response.status === 'connected') {
      // Logged in
    	$.getJSON(SecSv + "/profile_worker.jsp?action=fbauth&k=" + response.authResponse.accessToken, function(data) { 

    		if (data.result == 'ok' ){  

	   	 		$("#fbverhld .upok").show();
	   	 		$("#fbverhld .upok").html('<i class="fa fa-check-circle" aria-hidden="true"></i>');
	   	 		if ($("#fbverhld .AdInputInfo").hasClass("FailMessage")){$("#fbverhld .AdInputInfo").removeClass('FailMessage');}
	   	 		$("#fbverhld .verval").html("Verified");
	   	 		$("#fbverhld .verval").show();	
	   	 		$("#fbverhld .AdInputInfo").html("");
	   	 		if ($(".perssprofile").length > 0){
	   	 			window.location.href = SecSv + "/Profile.jsp";
	   	 		}
	   	 		if (data.FBPic == 'no'){
	   	 			// lets ui know
	   	 			$("#profilepop #fbverhld").html("<span class='errspan'>Your Facebook profile does not have a photo, please upload one to us directly.</span>");
	   	 		}else if (data.FBPic == 'yes'){
	   	 			$("#fbverhld .verval").html("Got Facebook photo");
		   	 		if (data.url && data.url.length > 5){
		   				$("#profpic img").attr("src", "/images_static/dot.png");
		   				$("#profpic img").attr("src", data.url);
		   				$("#profpic img").show();
		   				$("#delpcbt").show();
		   	 		}
	   			}
	   	 		verifyprofilelevel();
    			
    		}else if (data.result == 'signin' ){   
       	 		popSI(e);
    		}else { 		
    			popalert(data.message);
    		}
    		
    		
    	});

    } else {
      // Not logged into Facebook
		$(ob).parent().find(".upok").hide();
		$(ob).parent().find(".upok").html("");
		$(ob).parent().find(".AdInputInfo").html("You have not authorised Facebook to connect.");
		$(ob).parent().find(".AdInputInfo").addClass("FailMessage");
		$("#fbverhld .prochg").show();
		$("#fbverhld .verval").show();

    }
}


function UpdateProfileField(Field,e,uid){

	
		if (Field != null && $(Field).attr('id') != null){
			var UIS = "";
			if (uid != null){UIS = "&uid=" + uid}
			var OKtoProceed = true;
			if (idok && 
					(	$(Field).attr('id') == 'firstname' || $(Field).attr('id') == 'lastname' ||
					 $(Field).attr('id') == 'middle_name' || $(Field).attr('id') == 'id_no'
					)
			){
				OKtoProceed = confirm("Please note that if you change your name, we will need to reverify your ID.\n\nDo you still wish to proceed?");
			}
			if (OKtoProceed){
			
				$(Field).parent().parent().find(".upok").show();
				$(Field).parent().parent().find(".upok").html("<i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
				$(Field).parent().parent().find(".AdInputInfo").html("");
				$(Field).parent().parent().find(".preambl").hide();
				try{$("#persdetsthining").css('display', 'inline-block');$("#persdetssub").hide();}catch(e){;}
				$.getJSON(SecSv + "/profile_worker.jsp?action=pup&v=" + $(Field).val() + "&f=" + $(Field).attr('id') + UIS , function(data) {  	
					
			   	 	if (data.result == 'ok' ){  
			   	 		$(Field).parent().parent().find(".upok").show();
			   	 		$(Field).parent().parent().find(".upok").html('<i class="fa fa-check-circle" aria-hidden="true"></i>');
			   	 		if ($(Field).parent().hasClass("failval")){$(Field).parent().removeClass('failval');}
			   	 		$(Field).parent().addClass('okval');  
			   	 		$(Field).parent().parent().find(".AdInputInfo").removeClass("FailMessage");
			   	 		$(Field).parent().parent().find(".profsub").hide();
			   	 		if (data.message && data.message != ''){$(Field).parent().parent().find(".AdInputInfo").html(data.message);}
			   	 		if ($(Field).attr('id') == 'phone'){
			   	 			$("#mobphn").val($(Field).val());
			   	 			verifyphone($("#mobphn"),e,uid);
			   	 		}else if ($(Field).attr('id') == 'email'){
			   	 			$("#contactver .intextwrap").slideUp("fast");
			   	 			$("#contactver .upok").slideUp("fast");
			   	 		}else if ($(Field).attr('id') == 'newpassw'){
			   	 			if ($("#redironok").length){
			   	 				popalertNoOK("<p style='font-size:18px;text-align:center;'><i class=\"fa fa-check-circle\" aria-hidden=\"true\" style='color:green;padding-right:10px;'></i>Password Saved<BR>&nbsp;<BR>redirecting ...</p>");
			   	 				setTimeout(function(){ window.location = $("#redironok").val(); },1000);
			   	 			}
			   	 		}			   	 		
			   	 		$("#dshbdpassfd").hide();
			   	 		if (data.reverify == 'yes'){
			   	 			$("#idverhld .verval").html("Being re-assessed");
			   	 			$("#idverhld .upok").show();
			   	 			$("#profidres").hide();
			   	 		}
			   	 		
			   	 	}else if (data.result == 'signin' ){   
			   	 		$(Field).parent().parent().find(".upok").html("");
			   	 		$(Field).parent().parent().find(".upok").hide();
			   	 		popSI(e);
			   	 	}else{
			   	 		$(Field).parent().parent().find(".upok").hide();
			   	 		$(Field).parent().parent().find(".upok").html("");
			   	 		$(Field).parent().parent().find(".AdInputInfo").html(data.message);
			   	 		if ($(Field).parent().hasClass("okval")){$(Field).parent().removeClass('okval');}
			   	 		$(Field).parent().parent().find(".AdInputInfo").addClass("FailMessage");
			   	 		$(Field).parent().addClass('failval');	   	 		
			   	 	}
			   	 try{$("#persdetsthining").hide();$("#persdetssub").show();}catch(e){;}
			   	verifyprofilelevel();
			   	});
			}
		}	
	
}


function togglenoyes(sel, cont,scoll){
	
	if ($(sel).val() == 0){
		$("#" + cont).slideDown('fast', function(){
			if (scoll){
				$('html, body').animate({ scrollTop: $("#" + cont).parent().offset().top }, 500);
			}
		});
	}else if ($(sel).val() == 1){
		$("#" + cont).slideUp('fast');
		$("#" + cont + " input").val("");
		$("#" + cont + " select").val("");
		$("#" + cont + " textarea").val("");		
		$("#" + cont).find(".intextwrap").removeClass("attention");
		$("#" + cont).find(".selwrap").removeClass("attention");
		$("#" + cont).find(".offinputerr").html("");
		$("#" + cont).find(".datedisp").html("");	
	}
	
}


function toggleyesno(sel, cont,scoll){
	
	if ($(sel).val() == 1){
		$("#" + cont).slideDown('fast', function(){
			if (scoll){
				$('html, body').animate({ scrollTop: $("#" + cont).parent().offset().top }, 500);
			}
		});

	}else if ($(sel).val() == 0){
		$("#" + cont).slideUp('fast');
		$("#" + cont + " input").val("");
		$("#" + cont + " select").val("");
		$("#" + cont + " textarea").val("");		
		$("#" + cont).find(".intextwrap").removeClass("attention");
		$("#" + cont).find(".selwrap").removeClass("attention");
		$("#" + cont).find(".offinputerr").html("");
		$("#" + cont).find(".datedisp").html("");	
	}
	
}

function toggleyesnoloan(sel, cont,scoll){
	
	if ($(sel).val() == 1){
		$("#" + cont).slideDown('fast', function(){
			if (scoll){
				$('html, body').animate({ scrollTop: $("#" + cont).parent().offset().top }, 500);
			}
		});

	}else if ($(sel).val() == 0){
		$("#" + cont).slideUp('fast');
		$("#loanmmount").val("");	
		$("#" + cont).find(".intextwrap").removeClass("attention");
		$("#" + cont).find(".selwrap").removeClass("attention");
		$("#" + cont).find(".offinputerr").html("");
	}
	
}

function clearfields(cont){
	

	$("#" + cont).slideUp('fast');
	$("#" + cont + " input").val("");
	$("#" + cont + " select").val("");
	$("#" + cont + " textarea").val("");		
	$("#" + cont).find(".intextwrap").removeClass("attention");
	$("#" + cont).find(".selwrap").removeClass("attention");
	$("#" + cont).find(".offinputerr").html("");
	$("#" + cont).find(".datedisp").html("");
	
}

function releaseneedtosell(sel, cont,scoll){
	
	if ($(sel).val() == '1'){
		$("#soldyetdet").slideDown('fast', function(){;});
		$("#notsoldyetdet").slideUp('fast', function(){;});
		
		$("#bhavesoldprop").val('1');
		$("#bhaveunsoldprop").val('0');
		clearfields("notsoldyetdet");

	}else if ($(sel).val() == '0'){
		
		$("#notsoldyetdet").slideDown('fast', function(){;});
		$("#soldyetdet").slideUp('fast', function(){;});

		$("#bhavesoldprop").val('0');
		$("#bhaveunsoldprop").val('1');
		clearfields("soldyetdet");
		
		
	}else{
		$("#notsoldyetdet").hide();
		$("#soldyetdet").hide();
		$("#bhavesoldprop").val('0');
		$("#bhaveunsoldprop").val('0');
		clearfields("soldyetdet");
		clearfields("notsoldyetdet");
		
	}
	
}






function fullscreen(el){
	
}
function checktcs(){
	
	/**/
	$("#tcconds").removeClass("reviewTCCond");
	if($("#agreetotcs").prop("checked") == true){
		
		if($("#agreetoconds").prop("checked") == true){
			
			$("#offersbmtbtn").hide();
			$('#subdspin').show();
			
			return true;
		}else{
			poperm("Please indicate if you accept the condition of the property");
			$("#tcconds").addClass("reviewTCCond");
			return false;
		}
	}else{
		poperm("Please indicate if you have read and agree with the terms and conditions");
		$("#tcconds").addClass("reviewTCCond");
		return false;
	}
	/**/
		
}

function sizetextbox(el){
	
	var wh =getWinHeight();
	var newheight = $(el).height();
	if (wh < 400){
		newheight = wh*0.8;
	}else if (wh > 500){
		newheight = wh*0.8;
	}
	$(el).height(newheight);	
	
}


function sendmsg(theform,e){

	try{

			// static div in details page
			
			var cont =  $(e.target).closest(".convitem").find(".messhist");
			$(cont).css("display","inline-block");
			$(cont).slideDown("fast");
			$(cont).html("<div class='popstatus'><i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i></div>");
			$.getJSON(SecSv + '/message_worker.jsp?tt=1&f=m', $(theform).serialize(), function(data) {
				
		   	 	$(cont).slideUp("fast");
		   	 	$(cont).html("");
		   	 	if (data.result == 'ok' ){  
		   	 	
			   	 	$(e.target).closest(".convitem").find(".respmess").val("");
			   	 	var MoreDiv = $(e.target).closest(".convitem").find(".messmore");
			   	 	$(MoreDiv).trigger('click');
		
		   	 	}else if (data.result == 'signin' ){   popSI(e);}else{popalert(data.message);}
		    });
			

	}catch(err){;}finally{}
}

function seemore(ConvDiv,e){
	
	$(ConvDiv).html("<span class='convload'><i id='idspinner' class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i></span>");	
	$(ConvDiv).slideDown("fast");
	$(e.target).closest(".convitem").find(".respmess").slideDown("fast");
	
   	$.getJSON(SecSv + "/message_worker.jsp?a=r&mid=" + $(e.target).data("mid"), function(data) {  
   	 	if (data.result == 'ok' ){   	 
   	 		$(ConvDiv).html(data.message);
   	 		// hide the unread count if its showing
   	 		$(e.target).closest(".convitem").find(".unreadcnthlder").fadeOut("fast");
   	 		// refresh tb stats
   	 		$.get("/tb_refresh.jsp", function(data) {$("#tb").html(data);});
   	 			
   	 	}else if (data.result == 'signin' ){   popSI(e);}else{popalert(data.message);}
   	});	
	
}


