package admin;

import glider.Common;
import glider.DbBean;
import glider.FormUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ServiceRequest {
    private long id = 0l;
    private String email = null;
    private String firstName = null;
    private String lastName = null;
    private String phone = null;
    private boolean isTransactionManaged;
    private String address1;
    private String address2;
    private String cityName;
    private String stateName;
    private String zipcode;
    private String clientPhoneNumber;
    private String mlsId;
    private String userType;
    private double propertyPrice;
    private double propertyArea;
    private String bedroomCount;
    private String bathroomCount;
    private int builtYear;
    private int propertySize;
    private String otherInfo;
    private String commissionPercentage;
    private String contactFirstName;
    private String contactLastName;
    private String contactEmail;
    private String contactPhoneNumber;
    private boolean isReferred;
    private String referralAgentName;
    private String referralFirm;
    private String referralFee;
    private boolean isLeadReferral;
    private String leadReferralType;

    Common common = new Common();
    FormUtils formUtils = new FormUtils();
    DbBean db = null;

    public long getId() {
        return id;
    }

    public String setId(String value) {
        String r = formUtils.validateLongField(false, value, "ID");
        if ("".equals(r)) {
            this.id = Long.parseLong(value);
        }
        return r;
    }

    public String setUsername(String value) {
        String r = formUtils.validateStringField(true, 45, value, "Agent Email");
        if ("".equals(r)) {
            if (common.isValidEmailAddress(value)) {
                this.email = value;
            } else {
                r = "Agent Email address is Invalid";
            }
        }
        return r;
    }

    public String getEmail() {
        return email;
    }

    public String setFirstName(String value) {
        String r = formUtils.validateStringField(true, 100, value, "Agent First Name");
        if ("".equals(r)) {
            this.firstName = value;
        }
        return r;
    }

    public String getFirstName() {
        return firstName;
    }

    public String setLastName(String value) {
        String r = formUtils.validateStringField(true, 100, value, "Agent First Name");
        if ("".equals(r)) {
            this.lastName = value;
        }
        return r;
    }

    public String getLastName() {
        return lastName;
    }

    public String setPhone(String value) {
        String r = formUtils.validateStringField(true, 20, value, "Phone Number");
        if ("".equals(r)) {
            if (common.isValidPhNum(value)) {
                this.phone = value;
            } else {
                r = "Enter a valid Phone Number.";
            }
        }
        return r;
    }

    public String getPhone() {
        return phone;
    }

    public boolean isTransactionManaged() {
        return isTransactionManaged;
    }

    public String setTransactionManaged(String setTransactionManaged) {
        System.out.println("setTransactionManaged value:" + setTransactionManaged + ":" + this.isTransactionManaged);
        String r = formUtils.validateBooleanField(setTransactionManaged, "is Transaction Managed");
        if ("".equals(r)) {
            this.isTransactionManaged = "1".equals(setTransactionManaged);
        }
        System.out.println("setTransactionManaged value:" + setTransactionManaged + ":" + this.isTransactionManaged);
        return r;
    }

    public String getAddress1() {
        return address1;
    }

    public String setAddress1(String address1) {
        String r = formUtils.validateStringField(true, 255, address1, "Property Address");
        if ("".equals(r)) {
            this.address1 = address1;
        }
        return r;
    }

    public String getAddress2() {
        return address2;
    }

    public String setAddress2(String address2) {
        String r = formUtils.validateStringField(false, 255, address2, "Apartment, suite, etc");
        if ("".equals(r)) {
            this.address2 = address2;
        }
        return r;
    }

    public String getCityName() {
        return cityName;
    }

    public String setCity(String city) {
        String r = formUtils.validateStringField(true, 45, city, "City");
        if ("".equals(r)) {
            this.cityName = city;
        }
        return r;
    }

    public String getStateName() {
        return stateName;
    }

    public String setState(String state) {
        String r = formUtils.validateStringField(true, 45, state, "State");
        if ("".equals(r)) {
            this.stateName = state;
        }
        return r;
    }

    public String getZipcode() {
        return zipcode;
    }

    public String setZipcode(String zipcode) {
        String r = formUtils.validateStringField(false, 5, zipcode, "Zipcode");
        if ("".equals(r)) {
            this.zipcode = zipcode;
        }
        return r;
    }

    public String getClientPhoneNumber() {
        return clientPhoneNumber;
    }

    public String setClientPhoneNumber(String clientPhoneNumber, boolean isTransactionManaged) {
        if (!isTransactionManaged) {
            this.clientPhoneNumber = "";
            return "";
        }
        String r = formUtils.validateStringField(true, 20, clientPhoneNumber, "Client Phone Number");
        if ("".equals(r)) {
            if (common.isValidPhNum(clientPhoneNumber)) {
                this.clientPhoneNumber = clientPhoneNumber;
            } else {
                r = "Enter a valid Phone Number.";
            }
        }
        return r;
    }

    public String getMlsId() {
        return mlsId;
    }

    public String setMlsListingNumber(String mlsListingNumber) {
        String r = formUtils.validateStringField(false, 20, mlsListingNumber, "MLS Listing Number");
        if ("".equals(r)) {
            this.mlsId = mlsListingNumber;
        }
        return r;
    }

    public String getUserType() {
        return userType;
    }

    public String setUserType(String userType) {
        String r = formUtils.validateStringField(true, 45, userType, "User type");
        if ("".equals(r)) {
            this.userType = userType;
        }
        return r;
    }

    public double getPropertyPrice() {
        return propertyPrice;
    }

    public String setPropertyPrice(String propertyPrice) {
        String r = formUtils.validateDoubleField(true, propertyPrice, "Property price");
        if ("".equals(r)) {
            this.propertyPrice = Double.parseDouble(propertyPrice);
        }
        return r;
    }

    public double getPropertyArea() {
        return propertyArea;
    }

    public String setPropertyArea(String propertyArea) {
        String r = formUtils.validateDoubleField(true, propertyArea, "Property Area");
        if ("".equals(r)) {
            this.propertyArea = Double.parseDouble(propertyArea);
        }
        return r;
    }

    public String getBedroomCount() {
        return bedroomCount;
    }

    public String setBedroomCount(String bedroomCount) {
        String r = formUtils.validateIntegerField(false, bedroomCount, "Number of Bedrooms");
        if ("".equals(r)) {
            this.bedroomCount = bedroomCount;
        }
        return r;
    }

    public String getBathroomCount() {
        return bathroomCount;
    }

    public String setBathroomCount(String bathroomCount) {
        String r = formUtils.validateIntegerField(false, bathroomCount, "Number of Bathrooms");
        if ("".equals(r)) {
            this.bathroomCount = bathroomCount;
        }
        return r;
    }

    public int getBuiltYear() {
        return builtYear;
    }

    public String setYearBuilt(String yearBuilt) {
        String r = formUtils.validateIntegerField(false, yearBuilt, "Estimated Year Built");
        if ("".equals(r)) {
            Pattern pattern = Pattern.compile(common.YEAR_PATTERN);
            Matcher matcher = pattern.matcher(yearBuilt);
            if (matcher.matches()) {
                this.builtYear = Integer.parseInt(yearBuilt);
            } else {
                r = "Enter a valid Estimated Year Built.";
            }

        }
        return r;
    }

    public long getPropertySize() {
        return propertySize;
    }

    public String setPropertySize(String propertySize) {
        String r = formUtils.validateIntegerField(false, propertySize, "Property Size");
        if ("".equals(r)) {
            this.propertySize = Integer.parseInt(propertySize);
        }
        return r;
    }

    public String getOtherInfo() {
        return otherInfo;
    }

    public String setOtherInfo(String otherInfo) {
        String r = formUtils.validateStringField(false, 255, userType, "Any Other Information");
        if ("".equals(r)) {
            this.otherInfo = otherInfo;
        }
        return r;
    }

    public String getCommissionPercentage() {
        return commissionPercentage;
    }

    public String setCommissionPercentage(String commissionPercentage) {
        String r = formUtils.validateDoubleField(true, commissionPercentage, "Commission Percentage");
        if ("".equals(r)) {
            this.commissionPercentage = commissionPercentage;
        }
        return r;
    }

    public String getContactFirstName() {
        return contactFirstName;
    }

    public String setContactFirstName(String contactFirstName) {
        String r = formUtils.validateStringField(true, 45, contactFirstName, "Contact First Name ");
        if ("".equals(r)) {
            this.contactFirstName = contactFirstName;
        }
        return r;
    }

    public String getContactLastName() {
        return contactLastName;
    }

    public String setContactLastName(String contactLastName) {
        String r = formUtils.validateStringField(true, 45, contactLastName, "Contact Last Name ");
        if ("".equals(r)) {
            this.contactLastName = contactLastName;
        }
        return r;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public String setContactEmail(String contactEmail) {
        String r = formUtils.validateStringField(true, 45, contactEmail, "Title Company Email ID");
        if ("".equals(r)) {
            if (common.isValidEmailAddress(contactEmail)) {
                this.contactEmail = contactEmail;
            } else {
                r = "Title Company Email ID is Invalid";
            }
        }
        return r;
    }

    public String getContactPhoneNumber() {
        return contactPhoneNumber;
    }

    public String setContactPhoneNumber(String contactPhoneNumber) {
        String r = formUtils.validateStringField(true, 20, contactPhoneNumber, "Title Company Phone Number");
        if ("".equals(r)) {
            if (common.isValidPhNum(contactPhoneNumber)) {
                this.contactPhoneNumber = contactPhoneNumber;
            } else {
                r = "Enter a valid Title Company Phone Number";
            }
        }
        return r;
    }

    public boolean isReferred() {
        return isReferred;
    }

    public String setReferred(String referred) {
        System.out.println("isReferred value:" + referred + ":" + this.isReferred);
        String r = formUtils.validateBooleanField(referred, "is Referred");
        if ("".equals(r)) {
            this.isReferred = "1".equals(referred);
        }
        System.out.println("isReferred value:" + referred + ":" + this.isReferred);
        return r;
    }

    public String getReferralAgentName() {
        return referralAgentName;
    }

    public String setReferralAgentName(String referralAgentName, boolean isReferred) {
        if (!isReferred) {
            this.referralAgentName = "";
            return "";
        }
        String r = formUtils.validateStringField(true, 45, referralAgentName, "Referred Agent Name ");
        if ("".equals(r)) {
            this.referralAgentName = referralAgentName;
        }
        return r;
    }

    public String getReferralFirm() {
        return referralFirm;
    }

    public String setReferralFirm(String referralFirm, boolean isReferred) {
        if (!isReferred) {
            this.referralFirm = "";
            return "";
        }
        String r = formUtils.validateStringField(true, 45, referralFirm, "Referred Firm ");
        if ("".equals(r)) {
            this.referralFirm = referralFirm;
        }
        return r;
    }

    public String getReferralFee() {
        return referralFee;
    }

    public String setReferralFee(String referralFee, boolean isReferred) {
        if (!isReferred) {
            this.referralFee = "0";
            return "";
        }
        String r = formUtils.validateStringField(true, 255, referralFee, "Referral Fee");
        if ("".equals(r)) {
            this.referralFee = referralFee;
        }
        return r;
    }

    public boolean isLeadReferral() {
        return isLeadReferral;
    }

    public String setLeadReferral(String leadReferral) {
        System.out.println("setTransactionManaged value:" + leadReferral + ":" + this.isLeadReferral);
        String r = formUtils.validateBooleanField(leadReferral, "isLeadReferral");
        if ("".equals(r)) {
            this.isLeadReferral = "1".equals(leadReferral);
        }
        System.out.println("setTransactionManaged value:" + leadReferral + ":" + this.isLeadReferral);
        return r;
    }

    public String getLeadReferralType() {
        return leadReferralType;
    }

    public String setLeadReferralType(String leadReferralType, boolean isLeadReferral) {
        if (!isLeadReferral) {
            this.leadReferralType = "";
            return "";
        }
        String r = formUtils.validateStringField(true, 255, leadReferralType, "Lead Referal Type");
        if ("".equals(r)) {
            this.leadReferralType = leadReferralType;
        }
        return r;
    }

    public boolean get(String serviceRequestId) {
        boolean r = false;
        try {
            if (formUtils.isIntMoreThanZero(serviceRequestId) != null) {
                if (db == null) {
                    db = new DbBean();
                }


                String sGetData = "select id, email, firstName, lastName, phoneNumber, address1, address2, cityName, stateName, zip, "
                        + "isTransactionManaged, clientPhoneNumber, mlsId, userType, propertyPrice, propertyArea, bedroomCount, bathroomCount, builtYear, " +
                        "propertySize, otherInfo, commissionPercentage, companyContactFirstname, companyContactLastname, companyContactEmail, companyContactPhoneNumber, " +
                        "isReferred, referralAgentName, referralFirm, referralFee,isLeadReferral,leadReferralName from serviceRequest where id = ?";
                Object[] ObSQL = {serviceRequestId};
                String[][] sD = db.PreparedSQLSelect(sGetData, ObSQL);


                if (sD != null && sD.length > 0) {


                    this.id = new Long(sD[0][0]).longValue();
                    this.email = sD[0][1];
                    this.firstName = sD[0][2];
                    this.lastName = sD[0][3];
                    this.phone = sD[0][4];
                    this.address1 = sD[0][5];
                    this.address2 = sD[0][6];
                    this.cityName = sD[0][7];
                    this.stateName = sD[0][8];
                    this.zipcode = sD[0][9];
                    this.isTransactionManaged = formUtils.parseBoolean(sD[0][10]);
                    this.clientPhoneNumber = sD[0][11];
                    this.mlsId = sD[0][12];
                    this.userType = sD[0][13];
                    this.propertyPrice = new Double(sD[0][14]).doubleValue();
                    this.propertyArea = new Double(sD[0][15]).doubleValue();
                    this.bedroomCount = sD[0][16];
                    this.bathroomCount = sD[0][17];
                    this.builtYear = new Integer(sD[0][18]).intValue();
                    this.propertySize = new Integer(sD[0][19]).intValue();
                    this.otherInfo = sD[0][20];
                    this.commissionPercentage = sD[0][21];
                    this.contactFirstName = sD[0][22];
                    this.contactLastName = sD[0][23];
                    this.contactEmail = sD[0][24];
                    this.contactPhoneNumber = sD[0][25];
                    this.isReferred = formUtils.parseBoolean(sD[0][26]);
                    this.referralAgentName = sD[0][27];
                    this.referralFirm = sD[0][28];
                    this.referralFee = sD[0][29];
                    this.isLeadReferral = formUtils.parseBoolean(sD[0][30]);
                    this.leadReferralType = sD[0][31];

                    r = true;
                }
            }
        } catch (Exception e) {
            common.Logit("Exception in getServiceRequest for serviceRequestId:" + serviceRequestId);
            e.printStackTrace();
        }
        return r;
    }

    public boolean update(String serviceRequestId) {
        boolean bOk = false;
        try {
            if (formUtils.isIntMoreThanZero(serviceRequestId) != null) {
                String sSQL = " update serviceRequest set " +
                        " email = ?, " +
                        " firstName = ?, " +
                        " lastName = ?, " +
                        " phoneNumber = ?, " +
                        " address1 = ?, " +
                        " address2 = ?, " +
                        " cityName = ?, " +
                        " stateName = ?, " +
                        " zip = ?, " +
                        " isTransactionManaged = ?, " +
                        " clientPhoneNumber = ?, " +
                        " mlsId = ?, " +

                        " userType = ?, propertyPrice = ?, propertyArea = ?, bedroomCount = ?, bathroomCount = ?, " +
                        " builtYear = ?, propertySize = ?, otherInfo = ?, commissionPercentage = ?, companyContactFirstname = ?, " +

                        "companyContactLastname = ?, " +
                        "companyContactEmail = ?, " +
                        "companyContactPhoneNumber = ?, " +
                        "isReferred = ?, " +
                        "referralAgentName = ?, " +
                        "referralFirm = ?, " +
                        "referralFee = ?, " +
                        "isLeadReferral = ?, " +
                        "leadReferralName = ?, " +
                        " updated = now(), updated_by = ? " +
                        " where id = ? ";

                Object[] ObSQL = {
                        this.email,
                        this.firstName,
                        this.lastName,
                        this.phone,
                        this.address1,
                        this.address2,
                        this.cityName,
                        this.stateName,
                        this.zipcode,
                        this.isTransactionManaged,
                        this.clientPhoneNumber,
                        this.mlsId,
                        this.userType,
                        this.propertyPrice,
                        this.propertyArea,
                        this.bedroomCount,
                        this.bathroomCount,
                        this.builtYear,
                        this.propertySize,
                        this.otherInfo,
                        this.commissionPercentage,
                        this.contactFirstName,
                        this.contactLastName,
                        this.contactEmail,
                        this.contactPhoneNumber,
                        this.isReferred,
                        this.referralAgentName,
                        this.referralFirm,
                        this.referralFee,
                        this.isLeadReferral,
                        this.leadReferralType,
                        99,
                        serviceRequestId
                };

                bOk = db.PreparedSQLUpIns(sSQL, ObSQL);
                //Audit(this.id);
            }
        } catch (Exception e) {
            common.Logit("Exception in updateServiceRequest for serviceRequestId:" + this.id);
            e.printStackTrace();
            return false;
        }
        return bOk;
    }


    public long Create(String uid, ServiceRequest serviceRequest) {
        long bid = -1l;
        try {
            if (formUtils.isIntMoreThanZero(uid) != null) {
                if (db == null) {
                    db = new DbBean();
                }

                String sql = "insert into serviceRequest (created, updated, updated_by,email, firstName, lastName, phoneNumber, address1," +
                        " address2, cityName, stateName, zip, isTransactionManaged, clientPhoneNumber, mlsId, userType, propertyPrice," +
                        " propertyArea, bedroomCount, bathroomCount, builtYear, propertySize, otherInfo, commissionPercentage, companyContactFirstname," +
                        " companyContactLastname, companyContactEmail, companyContactPhoneNumber, isReferred, referralAgentName, referralFirm," +
                        " referralFee,isLeadReferral,leadReferralName ) " +
                        " values (now(), now(), " + uid.trim() + ", '" + serviceRequest.getEmail() + "', '" + serviceRequest.getFirstName() + "', '" + serviceRequest.getLastName() + "', '"
                        + serviceRequest.getPhone() + "','" + serviceRequest.getAddress1() + "','" + serviceRequest.getAddress2() + "','" + serviceRequest.getCityName()
                        + "','" + serviceRequest.getStateName() + "','" + serviceRequest.getZipcode() + "'," + serviceRequest.isTransactionManaged() + ",'"
                        + serviceRequest.getClientPhoneNumber() + "','" + serviceRequest.getMlsId() + "','" + serviceRequest.getUserType() + "',"
                        + serviceRequest.getPropertyPrice() + "," + serviceRequest.getPropertyArea() + "," + serviceRequest.getBedroomCount() + ","
                        + serviceRequest.getBathroomCount() + "," + serviceRequest.getBuiltYear() + "," + serviceRequest.getPropertySize() + ",'"
                        + serviceRequest.getOtherInfo() + "'," + serviceRequest.getCommissionPercentage() + ",'" + serviceRequest.getContactFirstName() + "','"
                        + serviceRequest.getContactLastName() + "','" + serviceRequest.getContactEmail() + "','" + serviceRequest.getContactPhoneNumber() + "',"
                        + serviceRequest.isReferred + ",'" + serviceRequest.getReferralAgentName() + "','" + serviceRequest.getReferralFirm() + "',"
                        + serviceRequest.getReferralFee() + "," + serviceRequest.isLeadReferral + ",'" + serviceRequest.getLeadReferralType() + "')";

                System.out.println("sql:" + sql);

                bid = db.SQLIns(sql);
            }
        } catch (Exception e) {
            common.Logit("Exception in CreateServiceRequestRecordInDatabase for uid:" + uid);
            e.printStackTrace();
        }
        return bid;
    }


    public boolean Audit(long agentId) {
        boolean bRV = false;
        try {
            if (agentId > 0) {
                if (db == null) {
                    db = new DbBean();
                }
                String sSQL = "insert into audit_user select * from user where id = ?";
                Object[] ObSQL = {new Long(agentId)};

                if (!db.PreparedSQLUpIns(sSQL, ObSQL)) {
                    common.Logit("Failed to insert into audit_user for agentId: " + agentId);
                } else {
                    bRV = true;
                }
            }
        } catch (Exception e) {
            common.Logit("Exception in AuditAgent for agentId: " + agentId);
            e.printStackTrace();
        }
        return bRV;
    }
}
