<%@page import="glider.FormUtils" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<jsp:useBean id="comm" scope="page" class="glider.Common"/>
<%--<%@ include file="/include/headvars.jsp" %>--%>
<%

    //change header variables
    String sHeadFileIncludes = "<head>";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='/resources/styles/admin.css?" + "' rel='stylesheet' />";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='/resources/styles/admin_forms.css?" + "' rel='stylesheet' />";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='/resources/styles/addons.css?" + "' rel='stylesheet' />";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='/resources/styles/style.css?" + "' rel='stylesheet' />";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='/resources/styles/css.css?" + "' rel='stylesheet' />";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='/resources/styles/font-awesome.min.css?" + "' rel='stylesheet' />";

    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='/resources/js/admin.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='/resources/js/addons.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='/resources/js/all.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='/resources/js/plupload.full.min.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='/resources/js/user.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='/resources/js/jquery-1.11.3.min.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='/resources/js/jquery.plupload.queue.min.js' charset='UTF-8'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "</head>";

    StringBuffer str = new StringBuffer();
    str.append(sHeadFileIncludes);
    out.print(str);

    boolean bNeedAuth = true;   //page needs authentication
    boolean bRememberedIsOK = false;
    boolean bShowLogoinTB = true;
    boolean bShowFooterContact = false;


    String sError = "";
    String objectName = "Agent";
    String objectNames = "Agent";
    boolean updatedOK = false;
    boolean addedOK = false;
    boolean inactive = false;


    if ("1".equals(request.getParameter("prOk"))) {
        updatedOK = true;
    }
    if ("2".equals(request.getParameter("prOk"))) {
        addedOK = true;
    }

    boolean deletedOK = false;
    if ("1".equals(request.getParameter("delOk"))) {
        deletedOK = true;
    }


    String id = comm.isIntMoreThanZero(request.getParameter("id"));
    admin.Agent theObject = new admin.Agent();
    String actionButtonTitle = "Save";

    glider.FormUtils formUtils = new FormUtils();

    crm.BrokerageUtils utils = new crm.BrokerageUtils();

//    String[][] brokeragesArray = utils.GetBrokerages();
//    java.util.LinkedHashMap<String, String> brokerages = comm.convertArrayToHashMap(brokeragesArray);

//    String[][] teamsArray = utils.GetAllTeams();
//    java.util.LinkedHashMap<String, String> teams = comm.convertArrayToHashMap(teamsArray);


//    java.util.LinkedHashMap<String, String> UsStates = utils.getUsaStates();
//    String[][] mlsList = sess.getSystemList("mls");

    String sPageTitle = "";
    if (id != null && theObject.get(id)) {

        sPageTitle = "Edit " + objectName;

    } else {

        sPageTitle = "Add " + objectName;
        actionButtonTitle = "Add";

    }


    boolean bIsAuthorised = false;
    boolean bMustBeSecure = true;


//    if (bMustBeSecure && bProd && !request.isSecure()) {
//        if (!bSentRedir) {
//            response.sendRedirect(sSecureServer + request.getRequestURI());
//            bSentRedir = true;
//        }
//    }
//
//    if (sUserId != null && uUser != null && (bIsAuth || bIsRemembered)) {
//
//        if (uUser.hasRole("Admin") || uUser.hasRole("AgentAdmin")) {
//
//            bIsAuthorised = true;
//
//        }
//
//    }


    String username = comm.nnt(request.getParameter("username"));
    String first_name = comm.nnt(request.getParameter("first_name"));
    String last_name = comm.nnt(request.getParameter("last_name"));
    String phone = comm.nnt(request.getParameter("phone"));
    String middle_name = comm.nnt(request.getParameter("middle_name"));
    String locked = comm.nnt(request.getParameter("locked"));
    String image_url = comm.nnt(request.getParameter("image_url"));
    String fusion_id = comm.nnt(request.getParameter("fusion_id"));
    String crm_id = comm.nnt(request.getParameter("crm_id"));
    String tax_no = comm.nnt(request.getParameter("tax_no"));
    String ffc = comm.nnt(request.getParameter("ffc"));
    String ppra_role = comm.nnt(request.getParameter("ppra_role"));
    String latitude = comm.nnt(request.getParameter("latitude"));
    String longitude = comm.nnt(request.getParameter("longitude"));
    String bio = comm.nnt(request.getParameter("bio"));
    String linkedInLink = comm.nnt(request.getParameter("linkedInLink"));
    String fbLink = comm.nnt(request.getParameter("fbLink"));
    String twitterLink = comm.nnt(request.getParameter("twitterLink"));
    String instaLink = comm.nnt(request.getParameter("instaLink"));
    String tiktokLink = comm.nnt(request.getParameter("tiktokLink"));
    String qualifications = comm.nnt(request.getParameter("qualifications"));
    String languagesSpoken = comm.nnt(request.getParameter("languagesSpoken"));
    String eaziAwards = comm.nnt(request.getParameter("eaziAwards"));
    String prequalLink = comm.nnt(request.getParameter("prequalLink"));
    String ffcDocLink = comm.nnt(request.getParameter("ffcDocLink"));
    String teamId = comm.nnt(request.getParameter("teamId"));
    String brokerageId = comm.nnt(request.getParameter("brokerageId"));
    String education = comm.nnt(request.getParameter("education"));
    String address = comm.nnt(request.getParameter("address"));


    String usernameError = "";
    String first_nameError = "";
    String last_nameError = "";
    String phoneError = "";
    String middle_nameError = "";
    String lockedError = "";
    String image_urlError = "";
    String fusion_idError = "";
    String crm_idError = "";
    String tax_noError = "";
    String ffcError = "";
    String ppra_roleError = "";
    String latitudeError = "";
    String longitudeError = "";
    String bioError = "";
    String linkedInLinkError = "";
    String fbLinkError = "";
    String twitterLinkError = "";
    String instaLinkError = "";
    String tiktokLinkError = "";
    String qualificationsError = "";
    String languagesSpokenError = "";
    String eaziAwardsError = "";
    String prequalLinkError = "";
    String ffcDocLinkError = "";
    String teamIdError = "";
    String brokerageIdError = "";
    String educationError = "";
    String addressError = "";


    if (theObject != null) {
        String er = "";
        if (bIsAuthorised) {

            if (request.getParameter("act") == null && id != null) { // just viewing

                if (theObject != null && theObject.getId() > 0) {

                    if (theObject.isLocked()) {
                        inactive = true;
                    }

                    sPageTitle = theObject.getFirstName() + " " + theObject.getLastName();

                    if (inactive) {
                        sPageTitle = "<span style='text-decoration:line-through;'>" + theObject.getFirstName() + " " + theObject.getLastName() + " (Inactive)</span>";
                    }

                    username = comm.nnt(theObject.getUsername()).trim();
                    first_name = comm.nnt(theObject.getFirstName()).trim();
                    last_name = comm.nnt(theObject.getLastName()).trim();
                    phone = comm.nnt(theObject.getPhone()).trim();
                    middle_name = comm.nnt(theObject.getMiddleName()).trim();
                    locked = comm.nnt("" + theObject.isLocked()).trim();
                    image_url = comm.nnt(theObject.getImage_url()).trim();
                    fusion_id = comm.nnt(theObject.getFusion_id()).trim();
                    crm_id = comm.nnt(theObject.getCrm_id()).trim();
                    tax_no = comm.nnt(theObject.getTax_no()).trim();
                    ffc = comm.nnt(theObject.getFfc()).trim();
                    ppra_role = comm.nnt(theObject.getPpra_role()).trim();
                    latitude = comm.nnt("" + theObject.getLatitude()).trim();
                    longitude = comm.nnt("" + theObject.getLongitude()).trim();
                    bio = comm.nnt(theObject.getBio()).trim();
                    linkedInLink = comm.nnt(theObject.getLinkedInLink()).trim();
                    fbLink = comm.nnt(theObject.getFbLink()).trim();
                    twitterLink = comm.nnt(theObject.getTwitterLink()).trim();
                    instaLink = comm.nnt(theObject.getInstaLink()).trim();
                    tiktokLink = comm.nnt(theObject.getTiktokLink()).trim();
                    qualifications = comm.nnt(theObject.getQualifications()).trim();
                    languagesSpoken = comm.nnt(theObject.getLanguagesSpoken()).trim();
                    eaziAwards = comm.nnt(theObject.getEaziAwards()).trim();
                    prequalLink = comm.nnt(theObject.getPrequalLink()).trim();
                    ffcDocLink = comm.nnt(theObject.getFfcDocLink()).trim();
                    teamId = comm.nnt("" + theObject.getTeamId()).trim();
                    brokerageId = comm.nnt("" + theObject.getBrokerageId()).trim();
                    education = comm.nnt(theObject.getEducation()).trim();
                    address = comm.nnt(theObject.getAddress()).trim();


                } else {
                    id = null; // kill any chance of updating
                    theObject = null;
                }

            } else if ((id == null && "add".equals(request.getParameter("act"))) || // adding
                    ("update".equals(request.getParameter("act")))                // updating

            ) {

                String validationErrors = "";

                usernameError = comm.nnt(theObject.setUsername(username));
                first_nameError = comm.nnt(theObject.setFirstName(first_name));
                last_nameError = comm.nnt(theObject.setLastName(last_name));
                phoneError = comm.nnt(theObject.setPhone(phone));
                middle_nameError = comm.nnt(theObject.setMiddleName(middle_name));
                lockedError = comm.nnt(theObject.setLocked(locked));
                image_urlError = comm.nnt(theObject.setImage_url(image_url));
                fusion_idError = comm.nnt(theObject.setFusion_id(fusion_id));
                crm_idError = comm.nnt(theObject.setCrm_id(crm_id));
                tax_noError = comm.nnt(theObject.setTax_no(tax_no));
                ffcError = comm.nnt(theObject.setFfc(ffc));
                ppra_roleError = comm.nnt(theObject.setPpra_role(ppra_role));
                latitudeError = comm.nnt(theObject.setLatitude(latitude));
                longitudeError = comm.nnt(theObject.setLongitude(longitude));
                bioError = comm.nnt(theObject.setBio(bio));
                linkedInLinkError = comm.nnt(theObject.setLinkedInLink(linkedInLink));
                fbLinkError = comm.nnt(theObject.setFbLink(fbLink));
                twitterLinkError = comm.nnt(theObject.setTwitterLink(twitterLink));
                instaLinkError = comm.nnt(theObject.setInstaLink(instaLink));
                tiktokLinkError = comm.nnt(theObject.setTiktokLink(tiktokLink));
                qualificationsError = comm.nnt(theObject.setQualifications(qualifications));
                languagesSpokenError = comm.nnt(theObject.setLanguagesSpoken(languagesSpoken));
                eaziAwardsError = comm.nnt(theObject.setEaziAwards(eaziAwards));
                prequalLinkError = comm.nnt(theObject.setPrequalLink(prequalLink));
                ffcDocLinkError = comm.nnt(theObject.setFfcDocLink(ffcDocLink));
                teamIdError = comm.nnt(theObject.setTeamId(teamId));
                brokerageIdError = comm.nnt(theObject.setBrokerageId(brokerageId));
                educationError = comm.nnt(theObject.setEducation(education));
                addressError = comm.nnt(theObject.setAddress(address));

//                // special validation
//                if (comm.isIntMoreThanZero(teamId) != null && comm.isIntMoreThanZero(brokerageId) != null) {
//
//                    // check team belongs to brokerage
//                    Team team = new Team();
//                    if (team.get(teamId)) {
//                        if (!brokerageId.equals("" + team.getBrokerageId())) {
//                            teamIdError = "This Team doesn't belong to the Brokerage.";
//                        }
//                    } else {
//                        teamIdError = "Error checking if this Team doesn't belongs to the Brokerage.";
//
//                    }
//
//                }

                validationErrors = usernameError + first_nameError + last_nameError + phoneError + middle_nameError + lockedError + image_urlError +
                        fusion_idError + crm_idError + tax_noError + ffcError + ppra_roleError + latitudeError + longitudeError + bioError +
                        linkedInLinkError + fbLinkError + twitterLinkError + instaLinkError + tiktokLinkError + qualificationsError +
                        languagesSpokenError + eaziAwardsError + prequalLinkError + ffcDocLinkError + teamIdError + brokerageIdError + educationError +
                        addressError;


                if (id == null && "add".equals(request.getParameter("act"))) {    // adding

                    // adding

                    if ("".equals(validationErrors)) {

//                        long newId = theObject.Create(me.getId(), username);
//                        if (newId > 0l) {
//                            theObject.setId("" + newId);
//                            id = "" + newId;
//                        } else {
//                            sError = "Unable to create " + objectName + ", please try again.";
//                        }

                        if ("".equals(sError)) {


                            theObject.setActivated("1");  // enable the user account

//                            if (theObject.update(me.getId())) {
//
//                                response.sendRedirect(lm.GetSecureServer() + "/Admin/" + objectName + ".jsp?id=" + id + "&prOk=2");
//
//                            } else {
//
//                                sError = "Unable to update the " + objectName + ", please try again.";
//                                comm.LogAndNotifyMailOnly("Unable to update " + objectName + " for " + id);
//                            }
                        }

                    } else {
                        sError = "Error validating 1 or more fields - see below:";
                    }

                } else if ("update".equals(request.getParameter("act"))) {


                    if ("".equals(validationErrors)) {

                        // final validation put in sError
                        // sError = ... Not used

                        if ("".equals(sError)) {

//                            if (theObject.update(me.getId())) {
//
//                                response.sendRedirect(lm.GetSecureServer() + "/Admin/" + objectName + ".jsp?id=" + id + "&prOk=1");
//
//                            } else {
//
//                                sError = "Unable to update the " + objectName + ", please try again.";
//                                comm.LogAndNotifyMailOnly("Unable to update " + objectName + " for " + id);
//                            }

                        }

                    } else {
                        sError = "Error validating 1 or more fields - see below:";
                    }


                } // end action type

            }

        } // end if authorised

    } // theObject is not null

%>
<%--<%@ include file="/include/header.jsp" %>--%>
<% try { %>

<div class="leadlisthlder" id="adminPage" style="background:white;">


    <%--    <% if (bIsAuthorised) {--%>
    <%--        if (theObject != null) {--%>

    <%--    %>--%>

    <div class="pghead">
        <h1><%= sPageTitle %>
        </h1>
    </div>

    <FORM METHOD="POST" NAME="ADDPROP" ACTION='/Admin/<%= objectName %>.jsp'
          autocomplete="off" id="leadentryform" accept-charset="ISO-8859-1">
        <div id="resultsholder" class='leadtypep' style="margin-top:0px;padding-bottom:50px;float:left;">

            <div id="leadlistholder" style="padding-top:30px;">

                <div>

                    <div class='addleadpopform'>

                        <% if (id == null) { %>
                        <input type="hidden" name="act" value="add">
                        <%} else { %>
                        <input type="hidden" name="id" value="<%=id%>">
                        <input type="hidden" name="act" value="update">
                        <%} %>
                        <div class="editleadstatus" <% if (!"".equals(sError) || updatedOK || addedOK) {
                            out.print(" style='display:inline-block;'");
                        }%>>

                            <%
                                if (updatedOK) {

                            %>
                            <div class="leadupok"><i class="fa fa-check-circle-o" aria-hidden="true"></i>&nbsp;&nbsp;UPDATE
                                OK<BR><a href='/Admin/<%= objectName %>s.jsp' style='color:white;'>Go
                                    to <%= objectName %>s</a></div>
                            <%

                            } else if (addedOK) {

                            %>
                            <div class="leadupok"><i class="fa fa-check-circle-o" aria-hidden="true"></i>&nbsp;&nbsp;ADDED
                                OK<BR><a href='/Admin/<%= objectName %>s.jsp' style='color:white;'>Go
                                    to <%= objectName %>s</a></div>
                            <%

                            } else {

                            %>
                            <div class="leadupfail"><%=sError %>
                            </div>
                            <%
                                }%>


                        </div>
                        <%
                            StringBuffer formElements = new StringBuffer();

                            formElements.append(comm.nnt(formUtils.getTextInput("username", "Email Address", username, null, usernameError, null, 0, 45)));
                            formElements.append(comm.nnt(formUtils.getTextInput("first_name", "First Name", first_name, null, first_nameError, null, 0, 100)));
                            formElements.append(comm.nnt(formUtils.getTextInput("last_name", "Last Name", last_name, null, last_nameError, null, 0, 100)));
                            formElements.append(comm.nnt(formUtils.getTextInput("phone", "Phone Number", phone, null, phoneError, null, 0, 20)));
                            formElements.append(comm.nnt(formUtils.getTextInput("middle_name", "Middle Name", middle_name, null, middle_nameError, null, 0, 45)));


//formElements.append(comm.nnt(formUtils.getTextInput("image_url", "Image url", image_url, null, image_urlError, null, 0, 125 )));
                            formElements.append(comm.nnt(formUtils.getTextInput("fusion_id", "MLS Id", fusion_id, null, fusion_idError, null, 0, 25)));
                            formElements.append(comm.nnt(formUtils.getTextInput("crm_id", "Crm Id ", crm_id, null, crm_idError, null, 0, 18)));
                            formElements.append(comm.nnt(formUtils.getTextInput("tax_no", "Tax no", tax_no, null, tax_noError, null, 0, 25)));

                            formElements.append(comm.nnt(formUtils.getTextInput("ppra_role", "Professional Title", ppra_role, null, ppra_roleError, null, 0, 50)));
                            formElements.append(comm.nnt(formUtils.getTextInput("latitude", "Latitude", latitude, null, latitudeError, null, 0, 8)));
                            formElements.append(comm.nnt(formUtils.getTextInput("longitude", "Longitude", longitude, null, longitudeError, null, 0, 8)));
                            formElements.append(comm.nnt(formUtils.getTextInput("bio", "Bio", bio, null, bioError, null, 0, 99999999)));
                            formElements.append(comm.nnt(formUtils.getTextInput("linkedInLink", "LinkedIn Link", linkedInLink, null, linkedInLinkError, null, 0, 100)));
                            formElements.append(comm.nnt(formUtils.getTextInput("fbLink", "Facebook Link", fbLink, null, fbLinkError, null, 0, 100)));
                            formElements.append(comm.nnt(formUtils.getTextInput("twitterLink", "Twitter Link", twitterLink, null, twitterLinkError, null, 0, 100)));
                            formElements.append(comm.nnt(formUtils.getTextInput("instaLink", "Instagram Link", instaLink, null, instaLinkError, null, 0, 100)));
                            formElements.append(comm.nnt(formUtils.getTextInput("tiktokLink", "Tiktok Link", tiktokLink, null, tiktokLinkError, null, 0, 100)));
                            formElements.append(comm.nnt(formUtils.getTextInput("education", "Education", education, null, educationError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("qualifications", "Qualifications", qualifications, null, qualificationsError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("ffc", "License No.", ffc, null, ffcError, null, 0, 25)));
                            formElements.append(comm.nnt(formUtils.getTextInput("ffcDocLink", "License Link", ffcDocLink, null, ffcDocLinkError, null, 0, 100)));
                            formElements.append(comm.nnt(formUtils.getTextInput("languagesSpoken", "Languages Spoken", languagesSpoken, null, languagesSpokenError, null, 0, 100)));
                            formElements.append(comm.nnt(formUtils.getTextInput("eaziAwards", "Awards", eaziAwards, null, eaziAwardsError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("prequalLink", "Prequal Link", prequalLink, null, prequalLinkError, null, 0, 100)));

                            //formElements.append(comm.nnt(formUtils.getSelectInput("brokerageId", "Brokerage", brokerageId, brokerages, brokerageIdError, null, false)));
                            //formElements.append(comm.nnt(formUtils.getSelectInput("teamId", "Team", teamId, teams, teamIdError, null, false)));


                            formElements.append(comm.nnt(formUtils.getTextInput("address", "Home Address (not publicly visible)", address, null, addressError, null, 0, 255)));

                            formElements.append(comm.nnt(formUtils.getYesNoToggle("locked", "Lock Account", locked, lockedError, null)));

                            out.print(formElements);


                        %>


                        <% /*** Change these items ***
                         *** The picture is uploaded to the loud but only associated to this record when agent object is saved ***/

                            String imageType = "person";  // must mtach handling in ProfilePicLoader servlet
                            String imageURLInputId = "image_url";
                            String currentImageValue = image_url;
                            String imageError = image_urlError;

                        %>


                        <%
                            String imageErrorStyle = "attention";
                            if ("".equals(comm.nnt(imageError))) {
                                imageErrorStyle = "";
                            }
                        %>
                        <input type="hidden" value="<%= currentImageValue %>" name="<%= imageURLInputId %>"
                               id="<%= imageURLInputId %>">
                        <div class="adldfieldhld imageErrorStyle <%= imageErrorStyle %>" id="profphothold">
                            <div class='infobox'>
                                <div class='infoboxhdr'>
                                    <h2>Photo</h2>
                                </div>
                                <%--                                <% boolean bGotPic = false;--%>
                                <%--                                    // verified status. 1 Uploaded manually, 2 is using facebook photo 0 got nothing--%>
                                <%--                                    String sImageURL = lm.GetCloudFrontPrefix() + "/images_static/dot.png";--%>

                                <%--                                    if (!"".equals(comm.nnt(image_url))) {--%>
                                <%--                                        bGotPic = true;--%>
                                <%--                                        if (image_url.indexOf("http") == 0) {--%>
                                <%--                                            sImageURL = image_url;--%>
                                <%--                                        } else {--%>
                                <%--                                            sImageURL = lm.GetProfilePrefix() + image_url + ".jpg";--%>
                                <%--                                        }--%>
                                <%--                                    }--%>


                                <%--                                %>--%>
                                <div class='infoboxct' id="agentPhoto">

                                    <div class='profpicprsnt '>

                                        <div class="formfldwrap" id="profladdph">
                                            <label class="listinlabel">PHOTO</label>
                                            <div class='verval'>

                                                <div id='profpic'>
                                                    <%--                                                    <img src=<%=sImageURL %>--%>
                                                    <%--                                                        <% if(!bGotPic){out.print(" style='display:none;'");}%>>--%>
                                                    <%--                                                    <span class="prfldholder"--%>
                                                    <%--                                                            <% if (bGotPic) {--%>
                                                    <%--                                                                out.print(" style='display:none;'");--%>
                                                    <%--                                                            }%>><i--%>
                                                    <%--                                                            class='fa fa-user' aria-hidden='true'></i></span>--%>
                                                </div>
                                                <span class="chgpg" id="chpcbt" onclick="showpicloadr();">Upload</span>
                                                <%--                                                <span class="chgpg" id="delpcbt"--%>
                                                <%--                                                      onclick="quickDelPic('<%= imageURLInputId %>');" <%--%>
                                                <%--                                                    if (!bGotPic) {--%>
                                                <%--                                                        out.print(" style='display:none;'");--%>
                                                <%--                                                    }%>>Delete</span>--%>
                                            </div>
                                            <%--                                            <span class="upok" style="display: inline-block;" id="profpires"><i--%>
                                            <%--                                                    class='fa fa-check-circle' aria-hidden='true'--%>
                                            <%--                                                    <% if (!bGotPic) {--%>
                                            <%--                                                        out.print(" style='display:none;'");--%>
                                            <%--                                                    }%>></i></span>--%>
                                            <div id="profpicloader">
                                                <div class='picloadcontainer'>
									<span id="picloadbtncont" class='loadbttncontainer'>
										<div id='addfilesbuttn' class='addfilesbuttn'>
											<i class="fa fa-file-image-o" aria-hidden="true"></i>Add Pic
										</div>
									</span>
                                                    <div class='addfilesep'>or</div>
                                                    <div id='uploader' class='uploadcontainer'>
                                                        <p>Your browser doesn't have Flash, Silverlight or HTML5
                                                            support.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="AdInputInfo">
                                                <span class='aperm'></span>
                                            </div>
                                        </div>

                                        <%--                                        <%@ include file="/include/blok_photoup.jsp" %>--%>


                                    </div>

                                </div>

                            </div>
                            <div class="AdInputInfo"><span class="aperm"><%= imageError %></span></div>
                        </div>


                        <div class='adldfieldhld'>
                            <div class='addleadpopbtnwrap'>
                                <input type="submit" name="sendbutt" value="<%= actionButtonTitle %>"
                                       class="leadpopbtn">
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    </FORM>
    <%--    <%--%>

    <%--            } else {--%>
    <%--                sMessage = "<div class='repnauth' style='color:red;'>Unable to get " + objectName + " Data.</div>";--%>
    <%--                out.print(sMessage);--%>
    <%--            }--%>
    <%--        } else {--%>
    <%--            sMessage = "<div class='repnauth' style='color:red;'>You are not authorised to view this page.</div>";--%>
    <%--            out.print(sMessage);--%>
    <%--        } %>--%>

</div>


<%
} catch (Exception e) {
%>
<div class="pghead"><h1>Ooops!!</h1></div>
<div class='sellcontt'>
    <div class='nwsninwelc'>
        <p class='emphp'>Sorry! Something unexpected has happened...</p>
        <p class='emphp'>Our technical team has been notified of the error, but in the meantime, please try again.</p>
    </div>
</div>

<%
        comm.LogAndNotifyMailOnly("Exception occurred processing " + request.getRequestURL() + "\n" + e);
    }
%>


<%--<%@ include file="/include/footer.jsp" %>--%>


