var LocationMarker = null;
var  latInit = -30.00;
var  lngInit = 25.00;
var map;
var markloc = false;
var zooml = 5;
var mapmarkers = [];//some array

var leadprospectWorker = "/CRM/lead_worker.jsp";
var leadPage = "/CRM/Lead.jsp";

$(document).on("click", '.leadsummline.expand', function(e) {
	popLeadDetails(this);
});

$(document).on("click", '.refreshLeadDetail', function(e) {
	refreshLeadDetails(this);
});
$(document).on("click", '.closeLeadDetail', function(e) {
	$(".leadholder").removeClass('active');
});



function popLeadDetails(summLineObj){
	var lh = $(summLineObj);
	var lid = $(summLineObj).data("lid");
	if(!$(lh).closest('.leadholder').hasClass('active')){
		$(".leadholder").removeClass('active');
		$(lh).closest('.leadholder').addClass('active');
		$(lh).closest('.leadholder').find('.detailscontent').html("<div class='spinnr'><i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i></div>");
		refreshLead(lid);
	}
}

function refreshLeadDetails(summLineObj){
	var lh = $(summLineObj);
	var lid = $(summLineObj).data("lid");
	$(".leadholder").removeClass('active');
	$(lh).closest('.leadholder').addClass('active');
	$(lh).closest('.leadholder').find('.detailscontent').html("<div class='spinnr'><i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i></div>");
	refreshLead(lid);
}




$(document).on("click", '.statusformwrap .leadactionbutton.actstatchg', function(e) { 
	
	var el = $(e.target);
	var orightml =  $(el).html();
	var aid = $(e.target).data("aid");
	var lid = $(e.target).data("lid");
	var leadtype = $(el).data("leadtype");
	var stat = $(el).closest('.statusformwrap').find('.actstatussel').val();
	$(el).html("<i id='idspinner' class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
	
	$.getJSON(SecSv + leadprospectWorker + "?action=leaddone&id=" + lid + "&aid=" + aid + "&stat=" + stat, function(data) {  
		$(el).html(orightml);
		if (data.result == 'ok' ){  
			
			if ($(e.target).parents().hasClass('leaddetail')){  // if its in the leads page refresh
				refreshLead(lid);								// if its in the activities page then not
			}else{
				var newstat = $("#actstatsel-" + aid + " option:selected").text();
				$(el).parent().html("<span style='font-size:14px;font-weight:400;'><i class='fa fa-check-circle' style='color:green;'></i>&nbsp;&nbsp;" + newstat + "</span>");
			}
			
			
			//update status
			var statusEl = $('#detcont-' + lid).closest('.leadholder').find('.leadstatus'); 
			$(statusEl).removeClass();
			$(statusEl).addClass('leadstatus').addClass(data.statusClass);
			$(statusEl).html(data.statusDesc);
		

   	 	}else if (data.result == 'signin' ){ 
   		  	$(el).parent().find(".leadmute").hide();
   		  	$(el).show();	
   	 		popSI(e);
   	 	}else{	
   		  	$(el).parent().find(".leadmute").hide();
   		  	$(el).show();
   	 		popalert(data.message);
   	 	}
   	});  

});	




$(document).on("click", '.editleadlink, .compresslink', function(e) {
	var el = $(this);
	var lid = $(this).data("lid");
	
	
	if ($(el).parent().hasClass('alive')){
		$(this).parent().removeClass('alive');
		$(el).closest('.leaddetail').find('.editleaddetails').slideUp(300);
		
	}else{

		$(this).parent().addClass('alive');
		$(el).closest('.leaddetail').find('.editleaddetails').slideDown(300, function(){fitLead(lid);});
		
	}
	
});



$(document).on("click", '.actaction.editlink', function(e) { 
	
	$(e.target).closest('.leadhistitem ').find('.leadhistitemcont').hide();
	$(e.target).closest('.leadhistitem ').find('.leadhistitemcont.updater').slideDown('fast');
	
		
});	


$(document).on("click", '.addnote .leadactionbutton', function(e) { 
	
	var el = $(e.target);
	var lid = $(e.target).data("lid");
	var src = "<form name='leadform' id='addnote-" + lid + "'>" + noteformhtml + "<input type='hidden' class='hdnlid' name='id' value='" + lid + "'>" + "</form>";
	$.magnificPopup.open({  items: {src: '<div class="white-popup lead">' + src + '</div>', type: 'inline'}    });
		
});	



$(document).on("click", '.addactivity .leadactionbutton', function(e) { 
	var el = $(e.target);
	popNewActivity($(el).data("lid"), $(el).data("leadtype"));
});	


function popNewActivity(lid, leadType){

	var src = "<form name='leadform' id='addactivity-" + lid + "' data-lid='" + lid + "' data-ltype='" + leadType + "'>" + activityformhtml + "<input type='hidden' class='hdnlid' name='id' value='" + lid + "'>" + "</form>";
	
	if (leadType == 's'){
		$.magnificPopup.open({  items: {src: '<div class="white-popup lead">' + src + '</div>', type: 'inline'}    });
		$("#addactivity-" + lid + " .insAssigned").html($("#detcont-" + lid + " .activityassignsel").html()); 
		$('.buyerlead').html('');
		$('.buyerlead').hide('');
	}else if (leadType == 'b'){
		$.magnificPopup.open({  items: {src: '<div class="white-popup lead">' + src + '</div>', type: 'inline'}    });
		$("#addactivity-" + lid + " .insAssigned").html($("#detcont-" + lid + " .activityassignsel").html()); 
		$('.sellerlead').html('');
		$('.sellerlead').hide('');
	}else if (leadType == 'p'){
		$.magnificPopup.open({  items: {src: '<div class="white-popup lead">' + src + '</div>', type: 'inline'}    });
		$("#addactivity-" + lid + " .insAssigned").html($("#detcont-" + lid + " .activityassignsel").html()); 
		$('.buyerlead').html('');
		$('.buyerlead').hide('');
	}else{
		poperm('Please first set the type of lead (Buy/Sell)');
	}
	
}

function selectActivityType(theForm){
	
	
	var lid = $(theForm).data("lid");
	var actType = $(theForm).find('select[name="activity_type"]').val();
	$(theForm).find(".popformline.actAddForm").html("");
	
	

		
	
	$(theForm).find(".popformline.actAddForm").html("<i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
	$(theForm).find(".popformline.actAddForm").slideDown('fast');
	

	$.getJSON(SecSv + leadprospectWorker + "?action=getActivityForm&id=" + lid + "&actType=" + actType, function(data) {  
		
		if (data.result == 'ok' ){  
			
			$(theForm).find(".popformline.actAddForm").html(data.InsHtml);
			
   	 	}else if (data.result == 'signin' ){ 
   	 		popSI(e);
   	 	}else{	
   	 		popalert(data.message);

   	 	}
	});
	
	
	
	
}


$(document).on("click", '.closelead .wonlead', function(e) { 
	var el = $(e.target);
	CloseLead($(el).data("lid"), $(el).data("leadtype"), 'w');
});	

$(document).on("click", '.closelead .reOpenLead', function(e) { 
	var el = $(e.target);
	CloseLead($(el).data("lid"), $(el).data("leadtype"), 'ro');
});	

$(document).on("click", '.closelead .lostlead', function(e) { 
	var el = $(e.target);
	
	$(".onlyOneOpen").slideUp('fast'); 
	
	var formId = "lostleadform-" + $(e.target).data("lid");
	$("#" + formId).slideDown('fast'); 
	
});	



function UpdateMails(id, forceRefresh){
	
	var originalHTML = $("#updatedActivities" + id).html();
	
	$("#updatedActivities" + id).html("<div style='float:left;width:100%;padding:10px;font:14px Roboto, sans-serif;text-align:center;'><i style='font-size:16px;' class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i> Checking for new emails ... </div>");
	
	$.getJSON(SecSv + leadprospectWorker + "?action=refreshEmails&id=" + id + "&forceRefresh=" +forceRefresh, function(data) {  
		
		if (data.result == 'ok' ){  
			
			$("#updatedActivities" + id).html(data.message + originalHTML);
			
   	 	}else if (data.result == 'signin' ){ 
   	 		popSI();
   	 	}else{	
   	 		popalert(data.message);
   	 	}
		
	});
	


	
};	


$(document).on("click", '.leadcontactmethod.emailcontact.inApp', function(e) { 
	
	popMailForm($(this).data("lid"));
});	

function popMailForm(lid, messageId){

	var formId = "emailform-" + lid;
	var tinymeId = 'email_body_' + lid;
	var formContent = $("#" + formId).html();
	
	
	if($("#" + formId).is(":visible") && messageId == null){
		
		$("#" + formId).slideUp('fast');
		
	}else{
	
		$(".onlyOneOpen").hide(); 
		$("#" + formId).slideDown('fast');
		$('html, body').animate({ scrollTop: ($("#detcont-" + lid).offset().top)}, 0);
		
		if (messageId && messageId != null && messageId.length > 0){
			
			// refresh form if we're sending a new message
			$("#" + formId).html("");
			formContent = $("#" + formId).html();
		}
			
		if (formContent == null || formContent.trim() == ""){  // blank - needs to be populated
			
			$("#" + formId).html("<div style='float:left;width:100%;padding:10px;font-size:14px;text-align:center;'><i style='font-size:16px;' class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i></div>");
			
			$.getJSON(SecSv + leadprospectWorker + "?action=getEmailForm&id=" + lid , function(data) {  
				if (data.result == 'ok' ){  
					

					
					$("#" + formId).html(data.message);
					// load the tooltips 
					 $('.tooltip').tooltipster({ 
						 animation: 'fade', delay: 50, maxWidth:ttwidth,timer:10000,
						 touchDevices: true, trigger: 'click', contentAsHTML:true
					});
					 
					//alert("messageId:" + messageId)
					if (messageId && messageId != null && messageId.length > 0){
						
						
						//alert($("#msg-subject-" + messageId).html());
						$("#" + tinymeId).val($("#msg-preamble-" + messageId).val() + $("#msg-body-" + messageId).html());
						$("#email_subject_" + lid).val("Re: " + $("#msg-subject-" + messageId).html());
						
						$("#email_to_" + lid).val($("#msg-from-" + messageId).val());
						
						
					}
					 
					 
					 
					// first remove any mce instance that has already been loaded, otherwise it won't attach to the new element 
					tinymce.execCommand('mceRemoveEditor', true, tinymeId);
					tinymce.EditorManager.editors = []; 
				 
	
					// now load/reload tinymce
					tinymce.init({
						  selector: ("#" + tinymeId) ,
						  menubar: false,
						  relative_urls : false,
						  remove_script_host : false,						  
						  plugins: [
						    	    'advlist  lists '
						    	  ],
						  toolbar: 'undo redo | bold italic | bullist numlist outdent indent ',
						  content_css: ['//fonts.googleapis.com/css?family=Roboto:300'],
						  content_style: "p {margin:5px 0px 0px 0px;padding:0px;} .mce-content-body {font-size:14px;font-family:Roboto,sans-serif;font-weight:300;}"
					});
					

					
					
					
		   	 	}else if (data.result == 'signin' ){ 
		   	 		popSI();
		   	 	}else{	
		   	 		popalert(data.message);
		   	 	}
				
		   	});  
		}
	}
		

}


function popPopiaForm(el){

	$(".onlyOneOpen").slideUp('fast'); 
	
	var lid = $(el).data("lid");
	var formId = "popiaFormHolder-" + lid;
	$("#" + formId).slideToggle('fast');
	
		
}


function insertEmailTemplate(el) { 

	var lid = $(el).data("lid");
		
	$.getJSON(SecSv + leadprospectWorker + "?action=getEmailTemplate&id=" + lid + "&template=" + encodeURIComponent($(el).val()), function(data) {  
		if (data.result == 'ok' ){  

			// load the tooltips 
			//$("#email_body_" + lid).val(data.message);
			//alert(data.message);

			$("#email_subject_" + lid).val(data.emailTemplateSubject);
			tinymce.get("email_body_" + lid).setContent(data.emailTemplateBody);
			
   	 	}else if (data.result == 'signin' ){ 
   	 		popSI();
   	 	}else{	
   	 		popalert(data.message);
   	 	}
		
   	});  
		
}



$(document).on("click", '.closelead .closeProspect', function(e) { 
	var el = $(e.target);
	$(el).hide();
	CloseProspect($(el).data("lid"), $(el).data("leadtype"), 'c', true);
});	

$(document).on("click", '.closelead .reOpenProspect', function(e) { 
	var el = $(e.target);
	CloseProspect($(el).data("lid"), $(el).data("leadtype"), 'ro');
});

function popAlertForm(leadId,el){
	
	if ($(el).is(':checked')){
		setSuburbSelect("areasselect" + leadId);
		$("#propertytype" + leadId).select2( {placeholder:'Property Types'});
		$("#srchfrm" + leadId).slideDown('fast');
	}else{
		$("#srchfrm" + leadId).slideUp('fast');
	}
	
}

function setSuburbSelect(subSelectId){
	 
	 $("#" + subSelectId).select2({
	 	  ajax: {
	 	    url: "/areas_json.jsp",
	 	    placeholder: function(){$(this).data('placeholder');},
	 	    dataType: 'json',
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
	 	  minimumInputLength: 2, 
		  templateResult: formatOutput
	 	});	
}


$(document).ready(function() {	
	
	

    $("#subselect").select2({
  	  ajax: {
  	    url: "/areas_json.jsp",
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
  	  minimumInputLength: 2, 
	  templateResult: formatOutput
  	});
    
     

    $("#dooruserselect").select2({
    	  ajax: {
    	    url: SecSv + "/Admin/user_worker.jsp?a=ulist",
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
    	  minimumInputLength: 2, 
    	  templateResult: formatOutputEU
    	});
      
    
    
    $('.select2-selection__arrow b').hide();
    $('.select2-selection__arrow').append('<i class="fa fa-angle-down"></i>');
    
  
    
    
    
    $(document).ready(function() {
    	$('.popup-gallery').magnificPopup({
    		delegate: 'a',
    		type: 'image',
    		closeOnContentClick: false,
    		closeBtnInside: false,
    		tLoading: 'Loading image #%curr%...',
    		mainClass: 'mfp-img-mobile',
    		gallery: {
    			enabled: true,
    			navigateByImgClick: true,
    			preload: [0,2] // Will preload 0 - before current, and 2 after the current image
    		},
    		image: {
    			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    			titleSrc: function(item) {
    				return item.el.attr('title');
    			}
    		}
    	});
    });

});


function CloseLead(lid, leadType,wonLost){
	
	$('#lostleadform-' + lid + ' .leadupfail').hide();
	$('#lostleadform-' + lid + ' .leadupfail').html('');
	var alertInfo = "";
	if (leadType && leadType != null && leadType == 'b'){
		
		if ($("#addAlertCheck" + lid).is(':checked')){
			
			var subsString = "";
			var subsArray = $('#areasselect' + lid ).val();
			if (subsArray != null){
				for (var i = 0; i < subsArray.length; i++){
					if (i > 0){subsString+=",";}
					subsString+=subsArray[i];
				}
			}
			alertInfo += "&areasselect=" + encodeURIComponent(subsString);
			alertInfo += "&bedrooms=" + encodeURIComponent($('#bedrooms' + lid ).val());
			alertInfo += "&propertytype=" + encodeURIComponent($('#propertytype' + lid ).val());
			alertInfo += "&maxprice=" + encodeURIComponent($('#maxprice' + lid ).val());
			alertInfo += "&minprice=" + encodeURIComponent($('#minprice' + lid ).val());
			alertInfo += "&addAlertCheck=" + encodeURIComponent($('#addAlertCheck' + lid ).val());
					
		}
		if ($("#addProspectCheck" + lid).is(':checked')){
			alertInfo += "&addProspectCheck=" + encodeURIComponent($('#addProspectCheck' + lid ).val());
		}
	}

	$.getJSON(SecSv + leadprospectWorker + "?action=closelead&id=" + lid + "&wonLost=" + wonLost + "&leadType=" + leadType
				+ "&lost_reason=" + encodeURIComponent($('#lost_reason_' + lid ).val()) + "&lost_reason_text=" + encodeURIComponent($('#lost_reason_text-' + lid ).val()) 
				+ alertInfo, 
				function(data) {  	
		
		if (data.result == 'ok' ){  
			
			refreshLead(lid);

   	 	}else if (data.result == 'signin' ){ 
   	 		popSI(e);
   	 	}else{	
   	 		if (wonLost == 'w' || wonLost == 'ro'){
   	 			popalert(data.message);
   	 		}else{
   	 			$('#lostleadform-' + lid + ' .leadupfail').html(data.message);
   	 			$('#lostleadform-' + lid + ' .leadupfail').slideDown('fast');
   	 		}
   	 	}
   	});  

	
	
}



function CloseProspect(lid, leadType,wonLost,initial){
	
	$('#lostleadform-' + lid + ' .leadupfail').hide();
	$('#lostleadform-' + lid + ' .leadupfail').html('');
	var alertInfo = "";
	var initialClick = "";
	if (initial){initialClick = "&init=1";}


	$.getJSON(SecSv + leadprospectWorker + "?action=closeProspect&id=" + lid + "&wonLost=" + wonLost + "&leadType=" + leadType
				+ "&lost_reason=" + encodeURIComponent($('#lost_reason_' + lid ).val()) + "&lost_reason_text=" + encodeURIComponent($('#lost_reason_text-' + lid ).val()) 
				+ alertInfo + initialClick, 
				function(data) {  	
		//alert(data.result + ":" + data.message);
		if (data.result == 'ok' ){  
			
			popok(data.message, "processedok");
			refreshLead(lid);
			
   	 	}else if (data.result == 'lostForm' ){ 
   	 		
	   		var formId = "lostleadform-" + lid;
	   		$("#" + formId).slideDown('fast'); 
	   		
   	 	}else if (data.result == 'signin' ){ 
   	 		popSI(e);
   	 	}else{	
   	 		if (wonLost == 'ro'){
   	 			popalert(data.message);
   	 		}else{
   	 			$('#lostleadform-' + lid + ' .leadupfail').html(data.message);
   	 			$('#lostleadform-' + lid + ' .leadupfail').slideDown('fast');
   	 		}
   	 	}
   	});  

	
	
}



function LogPopia(lid, theForm,ppType){
	
	$('#popiaInputForm-' + lid + ' .leadupfail').html("");
	$('#popiaInputForm-' + lid + ' .leadupfail').hide();
	var butVal = $('#popiaInputForm-' + lid + ' .leadupdatebtn').val();
	$('#popiaInputForm-' + lid + ' .leadupdatebtn').val("...");
	
	
	$.post(SecSv + leadprospectWorker + "?action=logPopiaContact&id=" + lid , $(theForm).serialize(), function(data) {
		
		$('#popiaInputForm-' + lid + ' .leadupdatebtn').val(butVal);

		if (data.result == 'ok' ){  
			
			refreshLead(lid);

		}else if (data.result == 'signin' ){ 
			
			popSI(e);	
			
		}else{	
			
			$('#popiaInputForm-' + lid + ' .leadupfail').html(data.message);
			$('#popiaInputForm-' + lid + ' .leadupfail').slideDown('fast');

		}
	});
	

	
}




function sendEmail(lid, theForm,ppType){
	
	$('#emailInputForm-' + lid + ' .leadupfail').html("");
	$('#emailInputForm-' + lid + ' .leadupfail').hide();
	var butVal = $('#emailInputForm-' + lid + ' .leadupdatebtn').val();
	$('#emailInputForm-' + lid + ' .leadupdatebtn').val("...");
	
	$('#emailInputForm-' + lid + ' .loadingclass').show();
	$('#emailInputForm-' + lid + ' .emailSendForm').hide();
	
	$('html, body').animate({ scrollTop: ($('#emailInputForm-' + lid + ' .loadingclass').offset().top - 80)}, 500);

	$("#email_body_" + lid).val(tinymce.get("email_body_" + lid).getContent());
	
	
	$.post(SecSv + leadprospectWorker + "?action=sendEmail&id=" + lid , $(theForm).serialize(), function(data) {			
		$('#emailInputForm-' + lid + ' .loadingclass').hide();
		
		$('#emailInputForm-' + lid + ' .leadupdatebtn').val(butVal);

		if (data.result == 'ok' ){  
			
			popok("Sent", "processedok", 500);
			refreshLead(lid);

		}else if (data.result == 'signin' ){ 
			
			$('#emailInputForm-' + lid + ' .emailSendForm').show();
			
			popSI(e);	
			
		}else{	
			
			$('#emailInputForm-' + lid + ' .emailSendForm').slideDown('fast');
			$('#emailInputForm-' + lid + ' .leadupfail').html(data.message);
			$('#emailInputForm-' + lid + ' .leadupfail').slideDown('fast');

		}
	});
	


	
}







function formatOutput (optionElement) {
	  if (!optionElement.id) { return optionElement.text; }
	  var $state = $('<span><strong>' + optionElement.text + '</strong> ' + optionElement.area + '</span>');
	  return $state;
};

function formatOutputEU (optionElement) {
	  if (!optionElement.id) { return optionElement.text; }
	  var $state = $('<span>' + optionElement.text + '</span>');
	  return $state;
};



function initMap() {
    map = new google.maps.Map(document.getElementById('mappo'), {
      zoom: zooml,
      center: {lat: latInit, lng: lngInit}
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('locatemap').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });
    if (markloc){
	    LocationMarker = new google.maps.Marker({
	        map: map,
	        draggable: true,
	        position: new google.maps.LatLng(latInit, lngInit)
	      });	
    }
    
  }

function initMapWithMarker() {
    map = new google.maps.Map(document.getElementById('mappo'), {
      zoom: zooml,
      center: {lat: latInit, lng: lngInit}
    });
    
    var geocoder = new google.maps.Geocoder();
    document.getElementById('locatemap').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
      });
	    LocationMarker = new google.maps.Marker({
	        map: map,
	        draggable: true,
	        position: new google.maps.LatLng(latInit, lngInit)
  });	
 
    
  }

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        resultsMap.setZoom(17);
        LocationMarker = new google.maps.Marker({
          map: resultsMap,
          draggable: true,
          position: results[0].geometry.location
        });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }



  function setPropSub(e){
	  //alert(LocationMarker.getPosition().lat());
	  if ($("#subselect").val() == null || $("#subselect").val().length == 0){
		  popalert("Please enter a suburb");  
	  }else{
		  	$("#substat .fa").hide();
		  	$("#substat .fa-cog.fa-spin").css('display', 'inline-block');
			$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=sub&id=" + id + "&sid=" + $("#subselect").val() , function(data) {  	
				$("#substat .fa").hide();
				if (data.result == 'ok' ){  
					$("#substat .fa-check-circle").show();
		   	 	}else if (data.result == 'signin' ){ popSI(e);$("#substat .fa-times").show();	}else{	popalert(data.message);$("#substat .fa-times").show();}
		   	});
		
	  }
	  
  }
  
  
  
  
  function setStructAdd(e){

	  	$("#stucaddsubbbutt").hide();
	  	$("#structaddrworking .fa").hide();
	  	$("#structaddrworking").css('display', 'inline-block');
	  	$("#structaddrworking .fa-cog.fa-spin").css('display', 'inline-block');
		$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=strucadd" +
				"&id=" + id + 
				"&placeunit=" + encodeURIComponent($("#placeunit").val())  + 
				"&placecomplexname=" + encodeURIComponent($("#placecomplexname").val())  + 
				"&placestreetnumber=" + encodeURIComponent($("#placestreetnumber").val())  + 
				"&placestreetname=" + encodeURIComponent($("#placestreetname").val())  
				, function(data) {  
			
			$("#structaddrworking .fa").hide();
			if (data.result == 'ok' ){  
				$("#structaddrworking .fa-check-circle").show();
	   	 	}else if (data.result == 'signin' ){ popSI(e);$("#structaddrworking .fa-times").show();	
	   	 	}else{	popalert(data.message);$("#structaddrworking .fa-times").show();}
			$("#stucaddsubbbutt").show();
		});
	  
} 
  
  
  function setPrice(e){

	  	$("#pricesubbbutt").hide();
	  	$("#priceworking .fa").hide();
	  	$("#priceworking").css('display', 'inline-block');
	  	$("#priceworking .fa-cog.fa-spin").css('display', 'inline-block');
		$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=prcchg&id=" + id + 
				"&price=" + encodeURIComponent($("#price").val())  + 
				"&pricemin=" + encodeURIComponent($("#pricemin").val()) + 
				"&valuation_price=" + encodeURIComponent($("#valuation_price").val())
				
				, function(data) {  	
			$("#priceworking .fa").hide();
			if (data.result == 'ok' ){  
				$("#priceworking .fa-check-circle").show();
	   	 	}else if (data.result == 'signin' ){ popSI(e);$("#priceworking .fa-times").show();	}else{	popalert(data.message);$("#priceworking .fa-times").show();}
			
			$("#pricesubbbutt").show();
	   	});
	  
  }
  
  
  function setListingAdminField(e, fieldName){

	  	$("#" + fieldName + "subbbutt").hide();
	  	$("#" + fieldName + "working .fa").hide();
	  	$("#" + fieldName + "working").css('display', 'inline-block');
	  	$("#" + fieldName + "working .fa-cog.fa-spin").css('display', 'inline-block');
	  	
		$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=" + fieldName + "&id=" + id + 
				"&val=" + encodeURIComponent($("#" + fieldName + "").val())  
				
				, function(data) {  	
			
			$("#" + fieldName + "working .fa").hide();
			if (data.result == 'ok' ){  
				$("#" + fieldName + "working .fa-check-circle").show();
	   	 	}else if (data.result == 'signin' ){ popSI(e);$("#" + fieldName + "working .fa-times").show();	}else{	popalert(data.message);$("#" + fieldName + "working .fa-times").show();}
			
			$("#" + fieldName + "subbbutt").show();
	   	});
	  
}
  
  
  function setListingItemValidated(e, fieldName){
	  
	  //alert(LocationMarker.getPosition().lat());

	  	$("#" + fieldName + "stat .fa").hide();
	  	$("#" + fieldName + "stat .fa-cog.fa-spin").css('display', 'inline-block');


		$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=" + fieldName + "Val&id=" + id  , function(data) {  	
			//alert(fieldName + ":" + data.result);
			$("#" + fieldName + "stat .fa").hide();
			if (data.result == 'ok' ){  
				$("#" + fieldName + "stat .fa-check-circle").show();
	   	 	}else if (data.result == 'signin' ){ 
	   	 		popSI(e);$("#" + fieldName + "stat .fa-times").show();	
	   	 	}else{	
	   	 		popalert(data.message);
	   	 		$("#" + fieldName + "stat .fa-times").show();
	   	 	}
	   	});

  }  
  
  function resendactivationemail(sellerid,e,pid){
	  	$("#sndactvbutn").hide();
	  	$("#sndactvbutnres").html("<i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
		$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=rae&id=" + pid + "&uid=" + sellerid , function(data) {  	
			
			
			if (data.result == 'ok' ){  
				$("#sndactvbutnres").html("<span style='color:green'>Activation Email Resent</span>"); 	
	   	 	}else if (data.result == 'signin' ){ 
	   	 		$("#sndactvbutn").show();
	   	 		$("#sndactvbutnres").html(data.message);
	   	 		$("#sndactvbutnres").hide();	
	   	 		popSI(e);
	   	 	}else{	
	   	 		$("#sndactvbutn").show();
	   	 		$("#sndactvbutnres").html(data.message);
	   	 		$("#sndactvbutnres").hide();
	   	 		popalert(data.message);
	   	 	}
	   	});   
	  
  }
  

  
  
  
  function setIDVer(e,stat,id){
	  //alert(LocationMarker.getPosition().lat());
	  if ($(".iddoclnk") == null || $(".iddoclnk").length == 0){
		  popalert("There is no id document, please ask the user to submit one!!");  
	  }else{

		  	if (stat == 'reject' && ($("#iddecreason").val() ==null || $("#iddecreason").val() == '')){
		  		$("#iddecreason").show();
		  		$("#IDVEROK").hide();

		  	}else{
			  	$("#idverres .fa").hide();
			  	$("#idspinner").css('display', 'inline-block');
				$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=idv&id=" + id + "&stat=" + escape(stat) +  "&reason=" + escape($("#iddecreason").val()) , function(data) {  	
					$("#idverproc").hide();
					if (data.result == 'ok' ){  
						$("#idverres .fa").hide();
						$("#idverres").html("Update Successful");
						$(".supdocs").html(data.docs); 
						popalert(data.message);
						
			   	 	}else if (data.result == 'signin' ){ 
			   	 		$("#idverres .fa").hide();
			   	 		$("#idverres .fa-times").show();	
			   	 		popSI(e);
			   	 	}else{	
			   	 		$("#idverres .fa").hide();
			   	 		$("#idverproc").show();
			   	 		popalert(data.message);
			   	 	}
			   	}); 
		  	}
		
	  }
	  
  }
  
  function setPhotoVer(e){
	  //alert(LocationMarker.getPosition().lat());
	  if ($("#photover .admprvpc") == null || $("#photover .admprvpc").length == 0){
		  popalert("There are no pictures!!");  
	  }else{
		  	$("#photostat .fa").hide();
		  	$("#photostat .fa-cog.fa-spin").css('display', 'inline-block');
			$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=pic&id=" + id  , function(data) {  	
				$("#photostat .fa").hide();
				if (data.result == 'ok' ){  
					$("#photostat .fa-check-circle").show();
		   	 	}else if (data.result == 'signin' ){ popSI(e);$("#photostat .fa-times").show();	}else{	popalert(data.message);$("#photostat .fa-times").show();}
		   	});
		
	  }
	  
  }
  
  function setDeedVer(e){

	  	$("#sellerstat .fa").hide();
	  	$("#sellerstat .fa-cog.fa-spin").css('display', 'inline-block');
	  	var deeds_owner_nameV = $("#deeds_owner_name").val();
	  	var titletypeV = "" + $("#titletype").val();
	  	var erfV = "" + $("#erf").val();
	  	var townshipV = $("#township").val();
	  	var section_numberV = $("#section_number").val();
	  	var section_scheme_numberV = $("#section_scheme_number").val();
	  	var outbuilding_descV = $("#outbuilding_desc").val();
	  	
	  	
		$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=deeds&id=" + id  + "&titletype=" + titletypeV + 
				"&deeds_owner_name=" + encodeURIComponent(deeds_owner_nameV) +
				"&erf=" + encodeURIComponent(erfV)  +
				"&township=" + encodeURIComponent(townshipV) + 
				"&section_number=" + encodeURIComponent(section_numberV) +
				"&section_scheme_number=" + encodeURIComponent(section_scheme_numberV) +				
				"&outbuilding_desc=" + encodeURIComponent(outbuilding_descV) 
			, function(data) {  	
			$("#sellerstat .fa").hide();
			if (data.result == 'ok' ){  
				$("#sellerstat .fa-check-circle").show();
	   	 	}else if (data.result == 'signin' ){ 
	   	 		popSI(e);$("#sellerstat .fa-times").show();	
	   	 	}else{	
	   	 		popalert(data.message);
	   	 		$("#sellerstat .fa-times").show(); 
	   	 	}
	   	});
	


}   
  
  function setSellerPhoneVer(e,uid){
	  
	  	$("#adminphonever .fa").hide();
	  	$("#adminphonever .fa-cog.fa-spin").css('display', 'inline-block');
		$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=phver&id=" + id + "&uid=" + uid , function(data) {  	
			$("#adminphonever .fa").hide();
			if (data.result == 'ok' ){  
				$("#adminphonever .fa-check-circle").show();
	   	 	}else if (data.result == 'signin' ){ popSI(e);$("#adminphonever .fa-times").show();	}else{	popalert(data.message);$("#adminphonever .fa-times").show();}
	   	});
	


}   

  function setPhoneVer(e,uid){
	  
	  	$("#uadminphonever .fa").hide();
	  	$("#uadminphonever .fa-cog.fa-spin").css('display', 'inline-block');
		$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=phuver&id=" + uid , function(data) {  	
			$("#uadminphonever .fa").hide();
			if (data.result == 'ok' ){  
				$("#uadminphonever .fa-check-circle").show();
	   	 	}else if (data.result == 'signin' ){ popSI(e);$("#uadminphonever .fa-times").show();	}else{	popalert(data.message);$("#uadminphonever .fa-times").show();}
	   	});
	


}  
  
  
  function setPriceVer(e){
	  
	  //alert(LocationMarker.getPosition().lat());

	  	$("#pricestat .fa").hide();
	  	$("#pricestat .fa-cog.fa-spin").css('display', 'inline-block');
	  	var pricemin = $("#pricemin").val();
	  	if (pricemin == null || pricemin == '' || pricemin == 0 || isNaN(pricemin)){
	  		popalert("Please enter the minimum price");
	  		$("#pricestat .fa").hide();
	  		$("#pricestat .fa-times").show();
	  		
	  	}else{
			$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=prc&id=" + id  , function(data) {  	
				$("#pricestat .fa").hide();
				if (data.result == 'ok' ){  
					$("#pricestat .fa-check-circle").show();
		   	 	}else if (data.result == 'signin' ){ 
		   	 		popSI(e);$("#pricestat .fa-times").show();	
		   	 	}else{	
		   	 		popalert(data.message);
		   	 		$("#pricestat .fa-times").show();
		   	 	}
		   	});
	  	}

  }  
  
function changeMandateStatusSelect(){
	
	$('.statuschangeinfo').hide();	
	
	if($('#mandatestatus').val() == 8){
		$('#paidinfo').show();
	}else if($('#mandatestatus').val() == 9){
		$('#withdrawninfo').show();
	}else if($('#mandatestatus').val() == 5){
		$('#termsfullInfo').show();
	}
	
}
    

function setMandateStatus(e, confirmed){
	  
	  //alert(LocationMarker.getPosition().lat());

	  	$("#mandatestatstat .fa").hide();
	  	$("#mandatestatstat .fa-cog.fa-spin").css('display', 'inline-block');
	  	if (confirmed == 1) {$.magnificPopup.close();}
	  	try{
		  	var manstat = parseInt($("#mandatestatus").val());
		  	if (manstat < 0){
		  		popalert("Please select the Mandate Status");
		  	}else{
		  		
		  			
		  		$.post(SecSv + "/Admin/listing_admin_worker.jsp?a=mstat&id=" + id + "&mandatestatus=" + encodeURIComponent(manstat)  + "&confirmed=" + confirmed, $("#mstatform").serialize(), function(data) {
		  		$("#mandatestatstat .fa").hide();
					if (data.result == 'ok' ){  
						if (confirmed == 0){
							$.magnificPopup.open({
								  items: {
								    src: '<div class="white-popup" style="font-size:16px;text-align:center;">' + data.message + '</div>', // can be a HTML string, jQuery object, or CSS selector
								    type: 'inline'
								  }
							});
						}else{ 
							$('#paidinfo').slideUp(500);
							$("#mandatestatstat .fa-check-circle").show();
							$("#manupdatenotes").html(data.message);
							$('.statuschangeinfo').hide();	
							
							
						}
						
			   	 	}else if (data.result == 'signin' ){ 
			   	 		popSI(e);$("#mandatestatstat .fa-times").show();	
			   	 	}else{	popalert(data.message);$("#mandatestatstat .fa-times").show();}
			   	});
		  	}
	  	}catch(e){popalert("Error occurred, please try again.");}

  }
  
  
  function setAgent(e){
	  
	  //alert(LocationMarker.getPosition().lat());

	  	$("#agentstat .fa").hide();
	  	$("#agentstat .fa-cog.fa-spin").css('display', 'inline-block');
	  	var agent = $("#agentselect").val();
	  	var facilitator = $("#facilitatorselect").val();

		$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=agt&id=" + id + "&agent=" + encodeURIComponent(agent) + "&facilitator=" + encodeURIComponent(facilitator)   , function(data) {  	
			$("#agentstat .fa").hide();
			if (data.result == 'ok' ){  
				$("#agentstat .fa-check-circle").show();
	   	 	}else if (data.result == 'signin' ){ 
	   	 		popSI(e);$("#agentstat .fa-times").show();	
	   	 	}else{	popalert(data.message);$("#agentstat .fa-times").show();}
	   	});
	  	

  }
  
  function setFacByAgent(e){
	  
	  //alert(LocationMarker.getPosition().lat());

	  	$("#agentstat .fa").hide();
	  	$("#agentstat .fa-cog.fa-spin").css('display', 'inline-block');
	  	var agent = $("#agentselect").val();
	  	var facilitator = $("#facilitatorselect").val();

		$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=facbyagt&id=" + id + "&agent=" + encodeURIComponent(agent) + "&facilitator=" + encodeURIComponent(facilitator)   , function(data) {  	
			$("#agentstat .fa").hide();
			if (data.result == 'ok' ){  
				$("#agentstat .fa-check-circle").show();
	   	 	}else if (data.result == 'signin' ){ 
	   	 		popSI(e);$("#agentstat .fa-times").show();	
	   	 	}else{	popalert(data.message);$("#agentstat .fa-times").show();}
	   	});
	  	

  }   
  

  
  function setPropLocation(e){
	  //alert(LocationMarker.getPosition().lat());
	  if (LocationMarker == null || $(LocationMarker).length == 0){
		  popalert("Go to the location of the property first by entering the address or a nearby address in the input box, above.");  
	  }else{
		  	$("#locstat .fa").hide();
		  	$("#locstat .fa-cog").css('display', 'inline-block');
			$.getJSON(SecSv + "/Admin/listing_admin_worker.jsp?a=loc&id=" + id + "&lat=" + LocationMarker.getPosition().lat() + "&lng=" + LocationMarker.getPosition().lng() , function(data) {  	
				$("#locstat .fa").hide();
				if (data.result == 'ok' ){  
					$("#locstat .fa-check-circle").show();
		   	 	}else if (data.result == 'signin' ){ popSI(e);$("#locstat .fa-times").show();	}else{	popalert(data.message);$("#locstat .fa-times").show();}
		   	});
		
	  }
	  
  }
  

  function convertArrayOfObjectsToCSV(args) {
      var result, ctr, keys, columnDelimiter, lineDelimiter, data;

      data = args.data || null;
      if (data == null || !data.length) {
          return null;
      }

      columnDelimiter = args.columnDelimiter || ',';
      lineDelimiter = args.lineDelimiter || '\n';

      keys = Object.keys(data[0]);

      result = '';
      result += keys.join(columnDelimiter);
      result += lineDelimiter;

      data.forEach(function(item) {
          ctr = 0;
          keys.forEach(function(key) {
              if (ctr > 0) result += columnDelimiter;

              result += item[key];
              ctr++;
          });
          result += lineDelimiter;
      });

      return result;
  }

  function downloadCSV(args) {
      var data, filename, link;

      var csv = convertArrayOfObjectsToCSV({
          data: csvData
          //,columnDelimiter: '	'
          
      });
      if (csv == null) return;

      filename = args.filename || 'export.csv';

      if (!csv.match(/^data:text\/csv/i)) {
          csv = 'data:text/csv;charset=utf-8,' + csv;
      }
      data = encodeURI(csv);

      link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
  }
  
  function downloadGraphData(args, csvDataInput) {
      var data, filename, link;
      var csv = convertArrayOfObjectsToCSV({
          data: csvDataInput
      });
      if (csv == null) return;

      filename = args.filename || 'export.csv';

      if (!csv.match(/^data:text\/csv/i)) {
          csv = 'data:text/csv;charset=utf-8,' + csv;
      }
      data = encodeURI(csv);
      link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
  }
  
  function UpdateLead(theform, e){
			var el = $(e.target);
			var origElVal = $(el).val();
			var leadformdiv = $(el).closest('.detailscontent');
			var lid = $(el).data("lid");
			$(el).val("...");
			$.post(SecSv + leadprospectWorker , $(theform).serialize(), function(data) {
				//alert(data.result);
				$(el).val(origElVal);
				if (data.result == 'ok' ){   	

					if (data.message.length > 15){
						popalert(data.message, "processedok");
					}else{
						popok(data.message, "processedok");
					}
					

					refreshLead(lid);
					
					//update status
					var statusEl = $('#detcont-' + lid).closest('.leadholder').find('.leadstatus'); 
					$(statusEl).removeClass();
					$(statusEl).addClass('leadstatus').addClass(data.statusClass);
					$(statusEl).html(data.statusDesc);
					
		   	 	}else if (data.result == 'signin' ){   
		   	 		popSI(e);
		   	 	}else{
		   	 		
					$(leadformdiv).find('.editleadstatus div').removeClass('hide');
					$(leadformdiv).find('.editleadstatus div').addClass('hide');
					$(leadformdiv).find('.editleadstatus .leadupfail').addClass('active');
					$(leadformdiv).find('.editleadstatus .leadupfail').html(data.message);
					$(leadformdiv).find('.editleadstatus').slideDown('fast');
		   	 		
		   	 	}
		    });
			
		  
  }
  
  
  function ChangeViewing(theform, el, e){
	  
		var orightml =  $(el).html();
		var aid = $(el).data("aid");
		var lid = $(el).data("lid");
		var stat = $(el).closest('.statusformwrap').find('.actstatussel').val();
		$(el).html("<i id='idspinner' class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
		
		e.preventDefault();
		
		if (confirm('Are you sure you want to change this viewing ?')) {
		
			$.post(SecSv + leadprospectWorker , $(theform).serialize(), function(data) {
				
				$(el).html(orightml);
				
				if (data.result == 'ok' ){   
				
					$.magnificPopup.close();
					popok("Changed OK", "processedok", 500);
					refreshLead(lid);
					//update status
					var statusEl = $('#detcont-' + lid).closest('.leadholder').find('.leadstatus'); 
					$(statusEl).removeClass();
					$(statusEl).addClass('leadstatus').addClass(data.statusClass);
					$(statusEl).html(data.statusDesc);
					
		   	 	}else if (data.result == 'signin' ){   
		   	 		popSI(e);
		   	 	}else{
		   	 		
					poperm(data.message);
		   	 		
		   	 	}
		    });
			
		}else{
			$(el).html(orightml);
		}
		

  }
  
  
  function getMessageTemplate(el, e){
	  
	  	e.preventDefault();
	  
		var orightml =  $(el).html();
		var theform = e.target.form;
		var aid = $(el).data("aid");
		var prospectid = $(el).data("prospectid");
		
		$(el).html("<i id='idspinner' class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i>");
		
		$.post(SecSv + leadprospectWorker , $(theform).serialize(), function(data) {
			
			$(el).html(orightml);
			
			if (data.result == 'ok' ){   
			
				$.magnificPopup.close();
				//popok(data.message, "processedok", 500);
				$("#actMessageForm" + aid).html(data.InsHtml);
				fitLead(prospectid);

	   	 	}else if (data.result == 'signin' ){   
	   	 		popSI(e);
	   	 		
	   	 	}else{
				popalert(data.message);
	   	 		
	   	 	}
			
			$(el).html(orightml);
	    });
		
		return false;
		

}
  
  function sendProspectMessage(el,e){
	  e.preventDefault();
		var orightml =  $(el).html();
		var theform = e.target.form;
		var aid = $(el).data("aid");
		var prospectid = $(el).data("prospectid");
		var ph = $("#use_phone_" + aid).val();
		var message = $("#note_" + aid).val();
		var messageType = $("#message_template_" + aid).val();
		if (ph == null || ph == '' || isNaN(ph)){
			popalert("Select the phone number");
		}else{
			
			// note the click as an event
			$.getJSON(SecSv + leadprospectWorker + "?action=logWASend&id=" + prospectid + "&aid=" + aid + "&messageType=" + messageType, function(data) {  
				// no need to do anything
		   	});
			
			var phConv = ph.substring(1, ph.length);
			var URL = "https://web.whatsapp.com/send?phone=+27" + phConv + "&text=" + encodeURIComponent(message);
			if (isMob){
				var URL = "https://wa.me/=27" + phConv + "?text=" + encodeURIComponent(message);
			}
			
			window.open(URL, '_blank').focus();
		}
		return false;
	  
  }
  
  
  function AddNewNote(theform, e){
	  
		var el = $(e.target);
		var origElVal = $(el).val();
		var lid = $(theform).find('.hdnlid').val();
		$(el).val("...");
		
		$.post(SecSv + leadprospectWorker, $(theform).serialize(), function(data) {
			$(el).val(origElVal);
			if (data.result == 'ok' ){   	
				$.magnificPopup.close();
				popok("Added", "processedok", 500);
				refreshLead(lid);
				//update status
				var statusEl = $('#detcont-' + lid).closest('.leadholder').find('.leadstatus'); 
				$(statusEl).removeClass();
				$(statusEl).addClass('leadstatus').addClass(data.statusClass);
				$(statusEl).html(data.statusDesc);
				
	   	 	}else if (data.result == 'signin' ){   
	   	 		popSI(e);
	   	 	}else{
	   	 		
				$(theform).find('.editleadstatus div').removeClass('hide');
				$(theform).find('.editleadstatus div').addClass('hide');
				$(theform).find('.editleadstatus .leadupfail').addClass('active');
				$(theform).find('.editleadstatus .leadupfail').html(data.message);
				$(theform).find('.editleadstatus').slideDown('fast');
	   	 		
	   	 	}
	    });
	    
		
	  
}
  
  

  	function AddNewActivity(theform, e){
	  
		var el = $(e.target);
		var origElVal = $(el).val();
		var lid = $(theform).find('.hdnlid').val();
		$(el).val("...");
		
		$(theform).find('.editleadstatus div').removeClass('hide');
		$(theform).find('.editleadstatus div').addClass('hide');
		$(theform).find('.editleadstatus .leadupfail').removeClass('active');
		$(theform).find('.editleadstatus .leadupfail').html("");
		$(theform).find('.editleadstatus').slideUp('fast');
		
		$.post(SecSv + leadprospectWorker , $(theform).serialize(), function(data) {
			$(el).val(origElVal);
			if (data.result == 'ok' ){   	
				$.magnificPopup.close();
				popok("Added", "processedok", 500);
				refreshLead(lid);
				
	   	 	}else if (data.result == 'signin' ){   
	   	 		popSI(e);
	   	 	}else{
	   	 		
				$(theform).find('.editleadstatus div').removeClass('hide');
				$(theform).find('.editleadstatus div').addClass('hide');
				$(theform).find('.editleadstatus .leadupfail').addClass('active');
				$(theform).find('.editleadstatus .leadupfail').html(data.message);
				$(theform).find('.editleadstatus').slideDown('fast');
	   	 		
	   	 	}
	    });
	    
		
	  
  	}
  
  
  
  
  

  

  function UpateActivity(lid,aid ){

		var note = $("#act-note-" + aid).val();
		
		$.getJSON(SecSv + leadprospectWorker + "?action=updactivitynote&id=" + lid + "&aid=" + aid + "&note=" + encodeURIComponent(note), function(data) {  
			if (data.result == 'ok' ){  
				refreshLead(lid);
	   	 	}else if (data.result == 'signin' ){ 
	   	 		popSI();
	   	 	}else{	
	   	 		popalert(data.message);
	   	 	}
			
	   	});  

	}
  
  
  function refreshLead(lid){
	 
	  $("#resultsholder").css("height", "auto");
	  
	  
		$('#detcont-' + lid).html("<div class='spinnr'><i class='fa fa-cog fa-spin fa-1x fa-fw margin-bottom'></i></div>");
		
		$.get(leadPage + "?id=" + lid + "&ts=" + new Date().getTime(), function(data) {
			if (data.indexOf("GotLeadUISEF32F") > 0){
				$('#detcont-' + lid).html(data);
				$('#detcont-' + lid).closest('.leadholder').find('.leadsummary').html($('#detcont-' + lid + ' .leadsummrefresh').html());
				$('#detcont-' + lid + ' .leadsummrefresh').html('');
				select2subs("subsel-" + lid);		
				fitLead(lid);
			}else if (data.indexOf("Door.co - Sign In") > 0){popSI();}else{
				poperm("Error occurred: Couldn't get info - please try again.");
			}
			
		});
	  
  }
  
  function fitLead(lid){ 
	  
	$("#resultsholder").css("height", "auto");
	var leadbottom =  $('#detcont-' + lid ).offset().top + $('#detcont-' + lid ).height();
	var nvtop = $('#navdiv').offset().top;
	var resholderbottom = $("#resultsholder").offset().top + $("#resultsholder").height();
	if (leadbottom > (nvtop - 100)){
		var newnvtop = $("#resultsholder").height() + (leadbottom - nvtop + 100);
		$("#resultsholder").css("height", newnvtop + "px");
	}
  }
  
 function AgentChange(oldInt, newInt, oldExt, newExt, updateLeadFunction){
	 
	 //alert(oldInt + ":" +  newInt + ":" + oldExt + ":" + newExt );
	 try{
		 if(isNaN(newInt) && isNaN(newExt)){ // no entries for new agent & external
			 updateLeadFunction();
		 }else{
			if(oldInt == '0' && oldExt == '0'  ){
					 updateLeadFunction();
			 }else{
					 if(oldInt == newInt && oldExt == newExt){
						 updateLeadFunction();
					 }else{
						 if(confirm("NOTE:\nIf you re-assign the lead to another agent, any associated listing will be re-assigned to the new agent as well.\nDo you wish to proceed?")){updateLeadFunction();}
					 }
		 	}
	 	}
	 }catch(e){return false;}
	 
	 
	 
 } 
 
 function RefershListingExposureStats(leadId, activityId){
	 $.getJSON(SecSv + leadprospectWorker + '?action=getRepricingData&id=' + leadId , function(data) { 
		 if (data.result == 'ok' ){  
			 $('#a' + activityId + 'listStats').html(data.message);
		} 	
	});
 }
 
 
 function changeOfferStatus(e,id,stat,makeBackup){

	  	var buttn = e.target;
	  	$(buttn).html("processing...");
		$.getJSON(SecSv + "/Admin/offer_worker.jsp?a=changeOfferStatus&id=" + id + "&newStatus=" + stat + "&makeBackup=" + makeBackup, function(data) {  	
			$("#sellerstat .fa").hide();
			if (data.result == 'ok' ){  
				$(buttn).hide();
				if (data.goToPage != null && data.goToPage != ''){
					if (data.message != null && data.message != ''){alert(data.message);}
					window.location.href = data.goToPage;
				}
				
	   	 	}else if (data.result == 'signin' ){ popSI(e);$("#sellerstat .fa-times").show();	
	   	 	}else{	popalert(data.message);$(buttn).html("FAILED!");}
	   	});
	
}   
 
 
 
function showOfferChangeForm(ev,ofid){
	$(ev.target).hide();
	$('#offerPrice' + ofid ).hide();
	$('#offerChange' + ofid).slideDown(500);

	
}


function changeOfferPrice(ev,ofid){
	var buttn = ev.target;
	$(buttn).html("processing...");
	
	if (confirm("Are you sure you wish to change the offer price ?\nNOTE the buyer and seller will NOT be notified.")){
	  	$(buttn).html("processing...");
		$.getJSON(SecSv + "/Admin/offer_worker.jsp?a=changeOfferPrice&id=" + ofid + "&newPrice=" + $('#offerPriceIn' + ofid ).val(), function(data) {  	
			if (data.result == 'ok' ){  
				$(buttn).hide();
				//$('#offerPrice' + ofid).html(data.message);
				$('#offerChange' + ofid).html(data.message);

				
	   	 	}else if (data.result == 'signin' ){ popSI(e);	
	   	 	}else{	popalert(data.message);$(buttn).html("FAILED!");}
	   	});
		
		//$('#offerPrice' + ofid ).show();
		//$('#offerChange' + ofid).hide();
	}else{
		$('#offerPrice' + ofid ).show();
		$('#offerChange' + ofid).hide();
	}

	
}


function setToEmail(el){
	var emailEl = $(el).closest('.emailSendForm').find('.email-to');
	var existingVal = $(emailEl).val();
	var newVal =  $(el).html();
	if (!existingVal.endsWith(newVal) && (!existingVal.startsWith(newVal)) && (existingVal.indexOf(", " + newVal + ",") < 0)){
		$(emailEl).val(existingVal + ", " +newVal);
	}
	$(emailEl).val($(emailEl).val().trim());
	if ($(emailEl).val().length > 1 && $(emailEl).val().substring(0, 2) == ', '){
		$(emailEl).val($(emailEl).val().substring(2, $(emailEl).val().length));
	}
	
			



	
}
 
  