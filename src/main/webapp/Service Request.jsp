<%@page import="glider.FormUtils" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<jsp:useBean id="comm" scope="page" class="glider.Common"/>

<%
    String contextPath = request.getContextPath();
    //change header variables
    String sHeadFileIncludes = "<head>";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='" + contextPath + "/resources/styles/admin.css?" + "' rel='stylesheet' />";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='" + contextPath + "/resources/styles/admin_forms.css?" + "' rel='stylesheet' />";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='" + contextPath + "/resources/styles/addons.css?" + "' rel='stylesheet' />";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='" + contextPath + "/resources/styles/custom.css?" + "' rel='stylesheet' />";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='" + contextPath + "/resources/styles/style.css?" + "' rel='stylesheet' />";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='" + contextPath + "/resources/styles/css.css?" + "' rel='stylesheet' />";
    sHeadFileIncludes = sHeadFileIncludes + "<link href='" + contextPath + "/resources/styles/font-awesome.min.css?" + "' rel='stylesheet' />";
    sHeadFileIncludes = sHeadFileIncludes + "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\">\n";

    sHeadFileIncludes = sHeadFileIncludes + "<script src=\"https://code.jquery.com/jquery-3.6.0.min.js\"></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='" + contextPath + "/resources/js/custom.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='" + contextPath + "/resources/js/admin.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='" + contextPath + "/resources/js/addons.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='" + contextPath + "/resources/js/all.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='" + contextPath + "/resources/js/plupload.full.min.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='" + contextPath + "/resources/js/user.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='" + contextPath + "/resources/js/jquery-1.11.3.min.js?" + "'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "<script type='text/javascript' src='" + contextPath + "/resources/js/jquery.plupload.queue.min.js' charset='UTF-8'></script>";
    sHeadFileIncludes = sHeadFileIncludes + "</head>";

    StringBuffer str = new StringBuffer();
    str.append(sHeadFileIncludes);
    out.print(str);
    String sError = "";
    String objectName = "Service Request";
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
    admin.ServiceRequest serviceRequest = new admin.ServiceRequest();
    String actionButtonTitle = "Save";

    glider.FormUtils formUtils = new FormUtils();

    String sPageTitle = "";
    if (id != null && serviceRequest.get(id)) {

        sPageTitle = "Edit " + objectName;

    } else {

        sPageTitle = "Add " + objectName;
        actionButtonTitle = "Add";

    }


    boolean bIsAuthorised = true;
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
    String firstName = comm.nnt(request.getParameter("firstName"));
    String lastName = comm.nnt(request.getParameter("lastName"));
    String phone = comm.nnt(request.getParameter("phone"));
    String address1 = comm.nnt(request.getParameter("address1"));
    String address2 = comm.nnt(request.getParameter("address2"));
    String city = comm.nnt(request.getParameter("city"));
    String state = comm.nnt(request.getParameter("state"));
    String zipcode = comm.nnt(request.getParameter("zipcode"));
    String isTransactionManaged = comm.nnt(request.getParameter("isTransactionManaged"));
    String clientPhoneNumber = comm.nnt(request.getParameter("clientPhoneNumber"));
    String mlsListingNumber = comm.nnt(request.getParameter("mlsListingNumber"));
    String userType = comm.nnt(request.getParameter("userType"));
    String propertyPrice = comm.nnt(request.getParameter("propertyPrice"));
    String propertyArea = comm.nnt(request.getParameter("propertyArea"));
    String bedroomCount = comm.nnt(request.getParameter("bedroomCount"));
    String bathroomCount = comm.nnt(request.getParameter("bathroomCount"));
    String yearBuilt = comm.nnt(request.getParameter("yearBuilt"));
    String propertySize = comm.nnt(request.getParameter("propertySize"));
    String otherInfo = comm.nnt(request.getParameter("otherInfo"));
    String commissionPercentage = comm.nnt(request.getParameter("commissionPercentage"));
    String contactFirstName = comm.nnt(request.getParameter("contactFirstName"));
    String contactLastName = comm.nnt(request.getParameter("contactLastName"));
    String contactEmail = comm.nnt(request.getParameter("contactEmail"));
    String contactPhoneNumber = comm.nnt(request.getParameter("contactPhoneNumber"));
    String isReferred = comm.nnt(request.getParameter("isReferred"));
    String referralAgentName = comm.nnt(request.getParameter("referralAgentName"));
    String referralFirm = comm.nnt(request.getParameter("referralFirm"));
    String referralFee = comm.nnt(request.getParameter("referralFee"));
    String isLeadReferral = comm.nnt(request.getParameter("isLeadReferral"));
    String leadReferralType = comm.nnt(request.getParameter("leadReferralType"));

    String usernameError = "";
    String first_nameError = "";
    String last_nameError = "";
    String phoneError = "";
    String address1Error = "";
    String address2Error = "";
    String cityError = "";
    String stateError = "";
    String zipcodeError = "";
    String isTransactionManagedError = "";
    String clientPhoneNumberError = "";
    String mlsListingNumberError = "";
    String userTypeError = "";
    String propertyPriceError = "";
    String propertyAreaError = "";
    String bedroomCountError = "";
    String bathroomCountError = "";
    String yearBuiltError = "";
    String propertySizeError = "";
    String otherInfoError = "";
    String commissionPercentageError = "";
    String contactFirstNameError = "";
    String contactLastNameError = "";
    String contactEmailError = "";
    String contactPhoneNumberError = "";
    String isReferredError = "";
    String referralAgentNameError = "";
    String referralFirmError = "";
    String referralFeeError = "";
    String isLeadReferralError = "";
    String leadReferralTypeError = "";

    if (serviceRequest != null) {
        String er = "";
        if (bIsAuthorised) {

            if (request.getParameter("act") == null && id != null) { // just viewing

                if (serviceRequest != null && serviceRequest.getId() > 0) {

                    sPageTitle = serviceRequest.getFirstName() + " " + serviceRequest.getLastName();

                    if (inactive) {
                        sPageTitle = "<span style='text-decoration:line-through;'>" + serviceRequest.getFirstName() + " " + serviceRequest.getLastName() + " (Inactive)</span>";
                    }

                    username = comm.nnt(serviceRequest.getEmail()).trim();
                    firstName = comm.nnt(serviceRequest.getFirstName()).trim();
                    lastName = comm.nnt(serviceRequest.getLastName()).trim();
                    phone = comm.nnt(serviceRequest.getPhone()).trim();
                    address1 = comm.nnt(serviceRequest.getAddress1());
                    address2 = comm.nnt(serviceRequest.getAddress2());
                    city = comm.nnt(serviceRequest.getCityName());
                    state = comm.nnt(serviceRequest.getStateName());
                    zipcode = comm.nnt(serviceRequest.getZipcode());
                    isTransactionManaged = comm.nnt("" + serviceRequest.isTransactionManaged()).trim();
                    clientPhoneNumber = comm.nnt(serviceRequest.getClientPhoneNumber());
                    mlsListingNumber = comm.nnt(serviceRequest.getMlsId());
                    userType = comm.nnt(serviceRequest.getUserType());
                    propertyPrice = comm.nnt(String.valueOf(serviceRequest.getPropertyPrice()));
                    propertyArea = comm.nnt(String.valueOf(serviceRequest.getPropertyArea()));
                    bedroomCount = comm.nnt(serviceRequest.getBedroomCount());
                    bathroomCount = comm.nnt(serviceRequest.getBathroomCount());
                    yearBuilt = comm.nnt(String.valueOf(serviceRequest.getBuiltYear()));
                    propertySize = comm.nnt(String.valueOf(serviceRequest.getPropertySize()));
                    otherInfo = comm.nnt(serviceRequest.getOtherInfo());
                    commissionPercentage = comm.nnt(serviceRequest.getCommissionPercentage());
                    contactFirstName = comm.nnt(serviceRequest.getContactFirstName());
                    contactLastName = comm.nnt(serviceRequest.getContactLastName());
                    contactEmail = comm.nnt(serviceRequest.getContactEmail());
                    contactPhoneNumber = comm.nnt(serviceRequest.getContactPhoneNumber());
                    isReferred = comm.nnt("" + serviceRequest.isReferred()).trim();
                    referralAgentName = comm.nnt(serviceRequest.getReferralAgentName());
                    referralFirm = comm.nnt(serviceRequest.getReferralFirm());
                    referralFee = comm.nnt(serviceRequest.getReferralFee());
                    isLeadReferral = comm.nnt("" + serviceRequest.isLeadReferral()).trim();
                    leadReferralType = comm.nnt(serviceRequest.getLeadReferralType());

                } else {
                    id = null; // kill any chance of updating
                    serviceRequest = null;
                }

            } else if ((id == null && "add".equals(request.getParameter("act"))) || // adding
                    ("update".equals(request.getParameter("act")))                // updating

            ) {

                String validationErrors = "";

                usernameError = comm.nnt(serviceRequest.setUsername(username));
                first_nameError = comm.nnt(serviceRequest.setFirstName(firstName));
                last_nameError = comm.nnt(serviceRequest.setLastName(lastName));
                phoneError = comm.nnt(serviceRequest.setPhone(phone));
                address1Error = comm.nnt(serviceRequest.setAddress1(address1));
                address2Error = comm.nnt(serviceRequest.setAddress2(address2));
                cityError = comm.nnt(serviceRequest.setCity(city));
                stateError = comm.nnt(serviceRequest.setState(state));
                zipcodeError = comm.nnt(serviceRequest.setZipcode(zipcode));
                isTransactionManagedError = comm.nnt("" + serviceRequest.setTransactionManaged(isTransactionManaged)).trim();
                clientPhoneNumberError = comm.nnt(serviceRequest.setClientPhoneNumber(clientPhoneNumber, serviceRequest.isTransactionManaged()));
                mlsListingNumberError = comm.nnt(serviceRequest.setMlsListingNumber(mlsListingNumber));
                userTypeError = comm.nnt(serviceRequest.setUserType(userType));
                propertyPriceError = comm.nnt(serviceRequest.setPropertyPrice(propertyPrice));
                propertyAreaError = comm.nnt(serviceRequest.setPropertyArea(propertyArea));
                bedroomCountError = comm.nnt(serviceRequest.setBedroomCount(bedroomCount));
                bathroomCountError = comm.nnt(serviceRequest.setBathroomCount(bathroomCount));
                yearBuiltError = comm.nnt(serviceRequest.setYearBuilt(yearBuilt));
                propertySizeError = comm.nnt(serviceRequest.setPropertySize(propertySize));
                otherInfoError = comm.nnt(serviceRequest.setOtherInfo(otherInfo));
                commissionPercentageError = comm.nnt(serviceRequest.setCommissionPercentage(commissionPercentage));
                contactFirstNameError = comm.nnt(serviceRequest.setContactFirstName(contactFirstName));
                contactLastNameError = comm.nnt(serviceRequest.setContactLastName(contactLastName));
                contactEmailError = comm.nnt(serviceRequest.setContactEmail(contactEmail));
                contactPhoneNumberError = comm.nnt(serviceRequest.setContactPhoneNumber(contactPhoneNumber));
                isReferredError = comm.nnt(serviceRequest.setReferred(isReferred));
                referralAgentNameError = comm.nnt(serviceRequest.setReferralAgentName(referralAgentName, serviceRequest.isReferred()));
                referralFirmError = comm.nnt(serviceRequest.setReferralFirm(referralFirm, serviceRequest.isReferred()));
                referralFeeError = comm.nnt(serviceRequest.setReferralFee(referralFee, serviceRequest.isReferred()));
                isLeadReferralError = comm.nnt(serviceRequest.setLeadReferral(isLeadReferral));
                leadReferralTypeError = comm.nnt(serviceRequest.setLeadReferralType(leadReferralType, serviceRequest.isLeadReferral()));

                // special validation
                if (!serviceRequest.isReferred()) {
                    referralAgentNameError = "";
                    referralFirmError = "";
                    referralFeeError = "";
                }
                if (!serviceRequest.isLeadReferral()) {
                    leadReferralTypeError = "";
                }
                if (!serviceRequest.isTransactionManaged()) {
                    clientPhoneNumberError = "";
                }


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

                validationErrors = usernameError + first_nameError + last_nameError + phoneError + address1Error + address2Error + cityError +
                        stateError + zipcodeError + isTransactionManagedError + clientPhoneNumberError + mlsListingNumberError + userTypeError + propertyPriceError + propertyAreaError +
                        bedroomCountError + bathroomCountError + yearBuiltError + propertySizeError + otherInfoError + commissionPercentageError +
                        contactFirstNameError + contactLastNameError + contactEmailError + contactPhoneNumberError + isReferredError + referralAgentNameError + referralFirmError +
                        referralFeeError + isLeadReferralError + leadReferralTypeError;


                if (id == null && "add".equals(request.getParameter("act"))) {    // adding

                    // adding

                    if ("".equals(validationErrors)) {

                        long newId = serviceRequest.Create("99", serviceRequest);
                        if (newId > 0l) {
                            serviceRequest.setId("" + newId);
                            id = "" + newId;
                        } else {
                            sError = "Unable to create " + objectName + ", please try again.";
                        }

                        if ("".equals(sError)) {

//                            if (serviceRequest.update(me.getId())) {
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

                            if (serviceRequest.update(id)) {

                                response.sendRedirect(contextPath + "/" + objectName + ".jsp?id=" + id + "&prOk=1");

                            } else {

                                sError = "Unable to update the " + objectName + ", please try again.";
                                comm.LogAndNotifyMailOnly("Unable to update " + objectName + " for " + id);
                            }

                        }

                    } else {
                        sError = "Error validating 1 or more fields - see below:";
                    }


                } // end action type

            }

        } // end if authorised

    } // serviceRequest is not null

%>
<% try { %>

<div class="leadlisthlder" id="adminPage" style="background:white;">

    <div class="pghead">
        <h1><%= sPageTitle %>
        </h1>
    </div>

    <FORM METHOD="POST" NAME="ADDPROP" ACTION='${pageContext.request.contextPath}/<%= objectName %>.jsp'
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
                                OK<BR><a href='${pageContext.request.contextPath}/<%= objectName %>s.jsp'
                                         style='color:white;'>Go
                                    to <%= objectName %>s</a></div>
                            <%

                            } else if (addedOK) {

                            %>
                            <div class="leadupok"><i class="fa fa-check-circle-o" aria-hidden="true"></i>&nbsp;&nbsp;ADDED
                                OK<BR><a href='${pageContext.request.contextPath}/<%= objectName %>s.jsp'
                                         style='color:white;'>Go
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
                            formElements.append(comm.nnt(formUtils.getHeadingDiv(1, "Property Information")));
                            formElements.append(comm.nnt(formUtils.getTextInput("username", "Agent Email <span class=\"red-text\">*</span>", username, null, usernameError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("firstName", "Agent First Name <span class=\"red-text\">*</span>", firstName, null, first_nameError, null, 0, 100)));
                            formElements.append(comm.nnt(formUtils.getTextInput("lastName", "Agent Last Name <span class=\"red-text\">*</span>", lastName, null, last_nameError, null, 0, 100)));
                            formElements.append(comm.nnt(formUtils.getTextInput("phone", "Phone Number <span class=\"red-text\">*</span>", phone, null, phoneError, null, 0, 20)));
                            formElements.append(comm.nnt(formUtils.getTextInput("address1", "Property Address <span class=\"red-text\">*</span>", address1, null, address1Error, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("address2", "Apartment, suite, etc", address2, null, address2Error, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("city", "City", city, null, cityError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("state", "State", state, null, stateError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("zipcode", "Zipcode", zipcode, null, zipcodeError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getRadioInput("isTransactionManaged", "Do you want transaction management on this transaction ?", isTransactionManaged, formUtils.populateYesNoOptions(), isTransactionManagedError, null)));
                            formElements.append(comm.nnt(formUtils.getTextInput("clientPhoneNumber", "Client Phone Number <span class=\"red-text\">*</span>", clientPhoneNumber, null, clientPhoneNumberError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("mlsListingNumber", "MLS Listing Number", mlsListingNumber, null, mlsListingNumberError, null, 0, 25)));
                            formElements.append(comm.nnt(formUtils.getRadioInput("userType", "Who are you representing ?  <span class=\"red-text\">*</span>", userType, formUtils.populateUserTypeOptions(), userTypeError, null)));
                            formElements.append(comm.nnt(formUtils.getTextInput("propertyPrice", "Price of property <span class=\"red-text\">*</span>", propertyPrice, null, propertyPriceError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("propertyArea", "Approximate square feet of property <span class=\"red-text\">*</span>", propertyArea, null, propertyAreaError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("bedroomCount", "Number of Bedrooms", bedroomCount, null, bedroomCountError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("bathroomCount", "Number of Bathrooms", bathroomCount, null, bathroomCountError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("yearBuilt", "Estimated Year Built", yearBuilt, null, yearBuiltError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("propertySize", "Estimated Property Size", propertySize, null, propertySizeError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextBoxInput("otherInfo", "Any other information?", otherInfo, otherInfoError, null)));
                            formElements.append(comm.nnt(formUtils.getHeadingDiv(1, "Payroll Information")));
                            formElements.append(comm.nnt(formUtils.getTextInput("commissionPercentage", "Your Commission %  <span class=\"red-text\">*</span>", commissionPercentage, null, commissionPercentageError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("contactFirstName", "First Name <span class=\"red-text\">*</span>", contactFirstName, null, contactFirstNameError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("contactLastName", "Last Name <span class=\"red-text\">*</span>", contactLastName, null, contactLastNameError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("contactEmail", "Email <span class=\"red-text\">*</span>", contactEmail, null, contactEmailError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("contactPhoneNumber", "Phone Number <span class=\"red-text\">*</span>", contactPhoneNumber, null, contactPhoneNumberError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getHeadingDiv(1, "Referral Information")));
                            formElements.append(comm.nnt(formUtils.getRadioInput("isReferred", "Was this a referral from another agent?  <span class=\"red-text\">*</span>", isReferred, formUtils.populateYesNoOptions(), isReferredError, null)));
                            formElements.append(comm.nnt(formUtils.getTextInput("referralAgentName", "Referring Agent Name <span class=\"red-text\">*</span>", referralAgentName, null, referralAgentNameError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("referralFirm", "Referring Firm <span class=\"red-text\">*</span>", referralFirm, null, referralFirmError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getTextInput("referralFee", "Referral Fee <span class=\"red-text\">*</span>", referralFee, null, referralFeeError, null, 0, 255)));
                            formElements.append(comm.nnt(formUtils.getRadioInput("isLeadReferral", "Was this a lead referral?  <span class=\"red-text\">*</span>", isLeadReferral, formUtils.populateYesNoOptions(), isLeadReferralError, null)));
                            formElements.append(comm.nnt(formUtils.getRadioInput("leadReferralType", "Lead Referral  <span class=\"red-text\">*</span>", leadReferralType, formUtils.populateLeadReferralOptions(), leadReferralTypeError, null)));

                            out.print(formElements);


                        %>

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




