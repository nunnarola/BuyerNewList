package admin;


import glider.Common;
import glider.DbBean;
import glider.FormUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Sha256Hash;

public class Agent {

    private long id = 0l;
    private String username = null;
    private String first_name = null;
    private String last_name = null;
    private String phone = null;
    private String middle_name = null;
    private boolean locked = false;
    private boolean activated = false;
    private String google_id = null;
    private boolean email_ver = false;
    private boolean mobile_ver = false;
    private boolean id_doc_ver = false;
    private boolean pic_ver = false;
    private String image_url = null;
    private String fusion_id = null;
    private String crm_id = null;
    private String tax_no = null;
    private String ffc = null;
    private String ppra_role = null;
    private double latitude = 0.00d;
    private double longitude = 0.00d;
    private String updated = null;
    private long updated_by = 0l;
    private String bio = null;
    private String linkedInLink = null;
    private String fbLink = null;
    private String twitterLink = null;
    private String instaLink = null;
    private String tiktokLink = null;
    private String qualifications = null;
    private String languagesSpoken = null;
    private String eaziAwards = null;
    private String prequalLink = null;
    private String ffcDocLink = null;
    private long teamId = 0l;
    private long brokerageId = 0l;
    private String education = null;
    private String address = null;


    Common common = new Common();
    FormUtils formUtils = new FormUtils();
    DbBean db = null;

    public Agent() {
    }

    public Agent(String agentId) {
        get(agentId);
    }

    // Setters and Getters

    public long getId() {
        return id;
    }

    public String setUsername(String value) {
        String r = formUtils.validateStringField(true, 45, value, "Username");
        if ("".equals(r)) {
            if (common.isValidEmailAddress(value)) {
                this.username = value;
            } else {
            }
        }
        return r;
    }

    public String getUsername() {
        return username;
    }

    public String setFirstName(String value) {
        String r = formUtils.validateStringField(true, 100, value, "First Name");
        if ("".equals(r)) {
            this.first_name = value;
        }
        return r;
    }

    public String getFirstName() {
        return first_name;
    }

    public String setLastName(String value) {
        String r = formUtils.validateStringField(true, 100, value, "Last Name");
        if ("".equals(r)) {
            this.last_name = value;
        }
        return r;
    }

    public String getLastName() {
        return last_name;
    }

    public String setPhone(String value) {
        String r = formUtils.validateStringField(true, 20, value, "Phone");
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

    public String setMiddleName(String value) {
        String r = formUtils.validateStringField(false, 255, value, "Middle Name");
        if ("".equals(r)) {
            this.middle_name = value;
        }
        return r;
    }

    public String getMiddleName() {
        return middle_name;
    }

    public String setGoogleId(String value) {
        String r = formUtils.validateStringField(false, 45, value, "Google ID");
        if ("".equals(r)) {
            this.google_id = value;
        }
        return r;
    }

    public String getGoogleId() {
        return google_id;
    }


    public String setLocked(String value) {
        System.out.println("setlocked value:" + value + ":" + this.locked);
        String r = formUtils.validateBooleanField(value, "Locked");
        if ("".equals(r)) {
            this.locked = "1".equals(value);
        }
        System.out.println("setlocked value:" + value + ":" + this.locked);
        return r;
    }

    public boolean isLocked() {
        return locked;
    }

    public String setActivated(String value) {
        String r = formUtils.validateBooleanField(value, "Activated");
        if ("".equals(r)) {
            this.activated = "1".equals(value);
        }
        return r;
    }

    public boolean isActivated() {
        return activated;
    }

    public String setEmailVerification(String value) {
        String r = formUtils.validateBooleanField(value, "Email Verification");
        if ("".equals(r)) {
            this.email_ver = "1".equals(value);
        }
        return r;
    }

    public boolean isEmailVerified() {
        return email_ver;
    }

    public String setMobileVerification(String value) {
        String r = formUtils.validateBooleanField(value, "Mobile Verification");
        if ("".equals(r)) {
            this.mobile_ver = "1".equals(value);
        }
        return r;
    }

    public boolean isMobileVerified() {
        return mobile_ver;
    }

    public String setIDDocVerification(String value) {
        String r = formUtils.validateBooleanField(value, "ID Doc Verification");
        if ("".equals(r)) {
            this.id_doc_ver = "1".equals(value);
        }
        return r;
    }

    public boolean isIDDocVerified() {
        return id_doc_ver;
    }

    public String setPicVerification(String value) {
        String r = formUtils.validateBooleanField(value, "Pic Verification");
        if ("".equals(r)) {
            this.pic_ver = "1".equals(value);
        }
        return r;
    }

    public boolean isPicVerified() {
        return pic_ver;
    }


    public String getImage_url() {
        return image_url;
    }

    public String setImage_url(String value) {
        String r = formUtils.validateStringField(true, 125, value, "Image");
        if ("".equals(r)) {
            this.image_url = value;
        }
        return r;
    }

    public String getFusion_id() {
        return fusion_id;
    }

    public String setFusion_id(String value) {
        String r = formUtils.validateStringField(true, 25, value, "MLS ID");
        if ("".equals(r)) {
            this.fusion_id = value;
        }
        return r;
    }

    public String getCrm_id() {
        return crm_id;
    }

    public String setCrm_id(String value) {
        String r = formUtils.validateStringField(false, 18, value, "CRM ID");
        if ("".equals(r)) {
            this.crm_id = value;
        }
        return r;
    }

    public String getTax_no() {
        return tax_no;
    }

    public String setTax_no(String value) {
        String r = formUtils.validateStringField(true, 25, value, "Tax Number");
        if ("".equals(r)) {
            this.tax_no = value;
        }
        return r;
    }

    public String getFfc() {
        return ffc;
    }

    public String setFfc(String value) {
        String r = formUtils.validateStringField(true, 25, value, "License No.");
        if ("".equals(r)) {
            this.ffc = value;
        }
        return r;
    }

    public String getPpra_role() {
        return ppra_role;
    }

    public String setPpra_role(String value) {
        String r = formUtils.validateStringField(true, 50, value, "Professional Title");
        if ("".equals(r)) {
            this.ppra_role = value;
        }
        return r;
    }

    public double getLatitude() {
        return latitude;
    }

    public String setLatitude(String value) {
        String r = formUtils.validateDoubleField(false, value, "Latitude");
        if ("".equals(r)) {
            this.latitude = Double.parseDouble(value);
        }
        return r;
    }

    public double getLongitude() {
        return longitude;
    }

    public String setLongitude(String value) {
        String r = formUtils.validateDoubleField(false, value, "Longitude");
        if ("".equals(r)) {
            this.longitude = Double.parseDouble(value);
        }
        return r;
    }

    public String getUpdated() {
        return updated;
    }

    public String setUpdated(String value) {
        String r = formUtils.validateStringField(true, 18, value, "Updated");
        if ("".equals(r)) {
            this.updated = value;
        }
        return r;
    }

    public long getUpdatedBy() {
        return updated_by;
    }

    // Setters
    public String setId(String value) {
        String r = formUtils.validateLongField(false, value, "ID");
        if ("".equals(r)) {
            this.id = Long.parseLong(value);
        }
        return r;
    }

    public String getBio() {
        return bio;
    }

    public String setBio(String value) {
        String r = formUtils.validateStringField(true, 999999, value, "Bio");
        if ("".equals(r)) {
            this.bio = value;
        }
        return r;
    }

    public String getLinkedInLink() {
        return linkedInLink;
    }

    public String setLinkedInLink(String value) {
        String r = formUtils.validateURLField(false, 100, value, "LinkedIn Link");
        if ("".equals(r)) {
            this.linkedInLink = value;
        }
        return r;
    }


    public String getFbLink() {
        return fbLink;
    }

    public String setFbLink(String value) {
        String r = formUtils.validateURLField(false, 100, value, "Facebook Link");
        if ("".equals(r)) {
            this.fbLink = value;
        }
        return r;
    }

    public String getTwitterLink() {
        return twitterLink;
    }

    public String setTwitterLink(String value) {
        String r = formUtils.validateURLField(false, 100, value, "Twitter Link");
        if ("".equals(r)) {
            this.twitterLink = value;
        }
        return r;
    }

    public String getInstaLink() {
        return instaLink;
    }

    public String setInstaLink(String value) {
        String r = formUtils.validateURLField(false, 100, value, "Instagram Link");
        if ("".equals(r)) {
            this.instaLink = value;
        }
        return r;
    }

    public String getTiktokLink() {
        return tiktokLink;
    }

    public String setTiktokLink(String value) {
        String r = formUtils.validateURLField(false, 100, value, "Tiktok Link");
        if ("".equals(r)) {
            this.tiktokLink = value;
        }
        return r;
    }

    public String getQualifications() {
        return qualifications;
    }

    public String setQualifications(String value) {
        String r = formUtils.validateStringField(true, 255, value, "Qualifications");
        if ("".equals(r)) {
            this.qualifications = value;
        }
        return r;
    }

    public String getLanguagesSpoken() {
        return languagesSpoken;
    }

    public String setLanguagesSpoken(String value) {
        String r = formUtils.validateStringField(true, 100, value, "Languages Spoken");
        if ("".equals(r)) {
            this.languagesSpoken = value;
        }
        return r;
    }

    public String getEaziAwards() {
        return eaziAwards;
    }

    public String setEaziAwards(String value) {
        String r = formUtils.validateStringField(false, 255, value, "Awards");
        if ("".equals(r)) {
            this.eaziAwards = value;
        }
        return r;
    }

    public String getPrequalLink() {
        return prequalLink;
    }

    public String setPrequalLink(String value) {
        String r = formUtils.validateURLField(false, 100, value, "Prequal Link");
        if ("".equals(r)) {
            this.prequalLink = value;
        }
        return r;
    }

    public String getFfcDocLink() {
        return ffcDocLink;
    }

    public String setFfcDocLink(String value) {
        String r = formUtils.validateURLField(false, 100, value, "License Link");
        if ("".equals(r)) {
            this.ffcDocLink = value;
        }
        return r;
    }

    public long getTeamId() {
        return teamId;
    }

    public String setTeamId(String value) {
        String r = formUtils.validateLongField(true, value, "Team ID");
        if ("".equals(r)) {
            this.teamId = Long.parseLong(value);
        }
        return r;
    }

    public long getBrokerageId() {
        return brokerageId;
    }

    public String setBrokerageId(String value) {
        String r = formUtils.validateLongField(true, value, "Brokerage ID");
        if ("".equals(r)) {
            this.brokerageId = Long.parseLong(value);
        }
        return r;
    }

    public String getEducation() {
        return education;
    }

    public String setEducation(String value) {
        String r = formUtils.validateStringField(false, 255, value, "Education");
        if ("".equals(r)) {
            this.education = value;
        }
        return r;
    }

    public String getAddress() {
        return address;
    }

    public String setAddress(String value) {
        String r = formUtils.validateStringField(true, 255, value, "Address");
        if ("".equals(r)) {
            this.address = value;
        }
        return r;
    }


    public boolean get(String agentId) {
        boolean r = false;
        try {
            if (formUtils.isIntMoreThanZero(agentId) != null) {
                if (db == null) {
                    db = new DbBean();
                }


                String sGetData = "select id, username, first_name, last_name, phone, middle_name, locked, activated, google_id, email_ver, "
                        + "mobile_ver, id_doc_ver, pic_ver, image_url, fusion_id, crm_id, tax_no, ffc, ppra_role, latitude, longitude, updated, "
                        + "updated_by, bio, linkedInLink, fbLink, twitterLink, instaLink, tiktokLink, qualifications, languagesSpoken, "
                        + "eaziAwards, prequalLink, ffcDocLink, teamId, brokerageId, education, address "
                        + "from user where id = ?";
                Object[] ObSQL = {agentId};
                String[][] sD = db.PreparedSQLSelect(sGetData, ObSQL);


                if (sD != null && sD.length > 0) {


                    this.id = new Long(sD[0][0]).longValue();
                    this.username = sD[0][1];
                    this.first_name = sD[0][2];
                    this.last_name = sD[0][3];
                    this.phone = sD[0][4];
                    this.middle_name = sD[0][5];
                    this.locked = formUtils.parseBoolean(sD[0][6]);
                    this.activated = formUtils.parseBoolean(sD[0][7]);
                    this.google_id = sD[0][8];
                    this.email_ver = formUtils.parseBoolean(sD[0][9]);
                    this.mobile_ver = formUtils.parseBoolean(sD[0][10]);
                    this.id_doc_ver = formUtils.parseBoolean(sD[0][11]);
                    this.pic_ver = formUtils.parseBoolean(sD[0][12]);
                    this.image_url = sD[0][13];
                    this.fusion_id = sD[0][14];
                    this.crm_id = sD[0][15];
                    this.tax_no = sD[0][16];
                    this.ffc = sD[0][17];
                    this.ppra_role = sD[0][18];
                    this.latitude = new Double(sD[0][19]).doubleValue();
                    this.longitude = new Double(sD[0][20]).doubleValue();
                    this.updated = sD[0][21];
                    this.updated_by = new Long(sD[0][22]).longValue();
                    this.bio = sD[0][23];
                    this.linkedInLink = sD[0][24];
                    this.fbLink = sD[0][25];
                    this.twitterLink = sD[0][26];
                    this.instaLink = sD[0][27];
                    this.tiktokLink = sD[0][28];
                    this.qualifications = sD[0][29];
                    this.languagesSpoken = sD[0][30];
                    this.eaziAwards = sD[0][31];
                    this.prequalLink = sD[0][32];
                    this.ffcDocLink = sD[0][33];
                    this.teamId = Long.parseLong(sD[0][34]);
                    this.brokerageId = Long.parseLong(sD[0][35]);
                    this.education = sD[0][36];
                    this.address = sD[0][37];

                    r = true;
                }
            }
        } catch (Exception e) {
            common.Logit("Exception in getAgent for agentId:" + agentId);
            e.printStackTrace();
        }
        return r;
    }

    public boolean update(String uid) {
        boolean bOk = false;
        try {
            if (formUtils.isIntMoreThanZero(uid) != null) {
                String sSQL = " update user set " +
                        " username = ?, " +
                        " first_name = ?, " +
                        " last_name = ?, " +
                        " phone = ?, " +
                        " middle_name = ?, " +
                        " locked = ?, " +
                        " activated = ?, " +
                        " google_id = ?, " +
                        " email_ver = ?, " +
                        " mobile_ver = ?, " +
                        " id_doc_ver = ?, " +
                        " pic_ver = ?, " +

                        " image_url = ?, fusion_id = ?, crm_id = ?, tax_no = ?, ffc = ?, ppra_role = ?, " +
                        " latitude = ?, longitude = ?, bio = ?, linkedInLink = ?, fbLink = ?, " +

                        "twitterLink = ?, " +
                        "instaLink = ?, " +
                        "tiktokLink = ?, " +
                        "qualifications = ?, " +
                        "languagesSpoken = ?, " +
                        "eaziAwards = ?, " +
                        "prequalLink = ?, " +
                        "ffcDocLink = ?, " +
                        "teamId = ?, " +
                        "brokerageId = ?, " +
                        "education = ?, " +
                        "address = ?, " +

                        " updated = now(), updated_by = ? " +
                        " where id = ? ";

                Object[] ObSQL = {
                        this.username,
                        this.first_name,
                        this.last_name,
                        this.phone,
                        this.middle_name,
                        this.locked,
                        this.activated,
                        this.google_id,
                        this.email_ver,
                        this.mobile_ver,
                        this.id_doc_ver,
                        this.pic_ver,

                        this.image_url,
                        this.fusion_id,
                        this.crm_id,
                        this.tax_no,
                        this.ffc,
                        this.ppra_role,
                        this.latitude,
                        this.longitude,
                        this.bio,
                        this.linkedInLink,
                        this.fbLink,

                        this.twitterLink,
                        this.instaLink,
                        this.tiktokLink,
                        this.qualifications,
                        this.languagesSpoken,
                        this.eaziAwards,
                        this.prequalLink,
                        this.ffcDocLink,
                        this.teamId,
                        this.brokerageId,
                        this.education,
                        this.address,

                        uid,
                        this.id
                };

                bOk = db.PreparedSQLUpIns(sSQL, ObSQL);
                Audit(this.id);
            }
        } catch (Exception e) {
            common.Logit("Exception in updateAgentInDatabase for agent id:" + this.id);
            e.printStackTrace();
            return false;
        }
        return bOk;
    }


    public long Create(String uid, String username) {
        long bid = -1l;
        try {
            if (formUtils.isIntMoreThanZero(uid) != null) {
                if (db == null) {
                    db = new DbBean();
                }


                // Now hash the plain-text password with the random salt and multiple
                // iterations and then Base64-encode the value (requires less space than Hex):

                RandomNumberGenerator rng = new SecureRandomNumberGenerator();
                Object salt = rng.nextBytes();
                String sSaltString = salt.toString();
                sSaltString = sSaltString.replaceAll("'", "b");

                String generatedPassword = StringUtils.left(java.util.UUID.randomUUID().toString(), 15);
                String hashedPasswordBase64 = new Sha256Hash(generatedPassword, sSaltString, 1024).toBase64();

                String user_pub_key = StringUtils.left(java.util.UUID.randomUUID().toString() + java.util.UUID.randomUUID().toString(), 100);
                user_pub_key = sSaltString.replaceAll("'", "b");

                String sql = "insert into user (created, updated, updated_by, password,salt,user_pub_key) " +
                        " values (now(), now(), " + uid.trim() + ", '" + hashedPasswordBase64 + "', '" + sSaltString + "', '" + user_pub_key + "') ";

                System.out.println("sql:" + sql);

                bid = db.SQLIns(sql);
            }
        } catch (Exception e) {
            common.Logit("Exception in CreateAgentRecordInDatabase for uid:" + uid);
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


    // Getters a
}
