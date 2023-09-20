package glider;

import org.apache.commons.lang3.StringUtils;

import java.util.LinkedHashMap;
import java.util.List;


public class FormUtils {


    Common common = null;
    LocalMeta lm = null;


    public FormUtils() {

        common = new Common();
        lm = new LocalMeta();

    }


    public String getYesNoToggle(String name, String heading, String value, String errorMessage, String subText) {

        StringBuffer r = new StringBuffer();
        try {


            String errorClass = "";
            if (!"".equals(common.nnt(errorMessage))) {
                errorClass = "attention";
            }

            String subTextHtml = "";
            if (!"".equals(common.nnt(subText))) {
                subTextHtml = "<span class='offinf'>" + subText + "</span>";
            }

// value should only be 0 or 1 - null is assumed to be 
            if (value == null || value.trim().toLowerCase().equals("null") || value.trim().equals("") || value.trim().toLowerCase().equals("false")) {
                value = "0";
            } else if (value.trim().toLowerCase().equals("true")) {
                value = "1";
            }

            String toggleOnStyle = "";
            String toggleOffStyle = "";
            if ("1".equals(value)) {
                toggleOnStyle = "display:block;";
                toggleOffStyle = "display:none;";
            } else {
                toggleOnStyle = "display:none;";
                toggleOffStyle = "display:block;";
            }

            r.append("<div class='adldfieldhld'>");
//r.append("<h2 class='leadfieldhead'>&nbsp;</h2>");
            r.append("<div class='intextwrap togglewrap halfWidth compuls " + errorClass + "'>");


            r.append("<div class='togglefield'>");
            r.append("<input class='toggleInput' type='hidden' value='" + value + "' name='" + name + "' id='" + name + "'>");
            r.append("<span class='togglefieldTag'>" + heading + "</span>");
            r.append("<span class='togglefieldIcon'>" + "<i class='fa fa-toggle-on' aria-hidden='true' style='" + toggleOnStyle + "'></i><i class='fa fa-toggle-off' aria-hidden='true' style='" + toggleOffStyle + "'></i>" + "</span>");
            r.append("</div>");


            r.append("</div>");
            r.append(subTextHtml);
            r.append("<div class='AdInputInfo'><span class='aperm'>" + common.nnt(errorMessage) + "</span></div>");
            r.append("</div>");


        } catch (Exception e) {
            common.Logit("Exception in getTextInput for name:" + name + " value:" + value);
            e.printStackTrace();
            r = new StringBuffer();
        }

        return r.toString();

    }


    public String getTextInput(String name, String heading, String value, String placeholder, String errorMessage, String subText,
                               int fieldType, int maxLength) {

        StringBuffer r = new StringBuffer();
        try {
/**
 fieldType
 0 normal
 1 currency
 2 date
 **/

            String maxLengthHtml = "";
            if (maxLength > 0) {
                maxLengthHtml = " maxlength='" + maxLength + "'";
            }

            String errorClass = "";
            if (!"".equals(common.nnt(errorMessage))) {
                errorClass = "attention";
            }

            String subTextHtml = "";
            if (!"".equals(common.nnt(subText))) {
                subTextHtml = "<span class='offinf'>" + subText + "</span>";
            }

            String fieldTypeHtml = "text";
            if (fieldType == 2) {
                fieldTypeHtml = "date";
            }

            String currencyHtml = "";
            if (fieldType == 1) {
                currencyHtml = "<span class='currency'>R</span>";
            }

            if (value == null || value.trim().toLowerCase().equals("null")) {
                value = "";
            }


            r.append("<div class='adldfieldhld'>");
            r.append("<h2 class='leadfieldhead'>" + heading + "</h2>");
            r.append("<div class='intextwrap compuls " + errorClass + "'>");
            r.append(currencyHtml + "<input type='" + fieldTypeHtml + "' value='" + value + "' name='" + name + "' id='" + name + "' class='currencyinput'" + maxLengthHtml + ">");
            r.append("</div>");
            r.append(subTextHtml);
            r.append("<div class='AdInputInfo'><span class='aperm'>" + common.nnt(errorMessage) + "</span></div>");
            r.append("</div>");


        } catch (Exception e) {
            common.Logit("Exception in getTextInput for name:" + name + " value:" + value);
            e.printStackTrace();
            r = new StringBuffer();
        }

        return r.toString();

    }


    public String getTextBoxInput(String name, String heading, String value, String errorMessage, String subText) {

        StringBuffer r = new StringBuffer();
        try {


            String errorClass = "";
            if (!"".equals(common.nnt(errorMessage))) {
                errorClass = "attention";
            }

            String subTextHtml = "";
            if (!"".equals(common.nnt(subText))) {
                subTextHtml = "<span class='offinf'>" + subText + "</span>";
            }


            r.append("<div class='adldfieldhld'>");
            r.append("<h2 class='leadfieldhead'>" + heading + "</h2>");
            r.append("<div class='intextwrap compuls " + errorClass + "'>");
            r.append("<textarea name='" + name + "' id='" + name + "'>" + value + "</textarea>");
            r.append("</div>");
            r.append(subTextHtml);
            r.append("<div class='AdInputInfo'><span class='aperm'>" + common.nnt(errorMessage) + "</span></div>");
            r.append("</div>");


        } catch (Exception e) {
            common.Logit("Exception in getTextBoxInput for name:" + name + " value:" + value);
            e.printStackTrace();
            r = new StringBuffer();
        }

        return r.toString();

    }


    public String getSelectInput(String name, String heading, String value, List<String> listValues, String errorMessage, String subText) {

        return getSelectInput(name, heading, value, listValues, errorMessage, subText, false);

    }

    public String getSelectInput(String name, String heading, String value, List<String> listValues, String errorMessage, String subText, boolean hasSelectRequest) {


        LinkedHashMap<String, String> values = new LinkedHashMap<String, String>();
        for (String option : listValues) {
            values.put(option, option);
        }
        return getSelectInput(name, heading, value, values, errorMessage, subText, hasSelectRequest);

    }


    public String getSelectInput(String name, String heading, String value, LinkedHashMap<String, String> values, String errorMessage, String subText) {
        return getSelectInput(name, heading, value, values, errorMessage, subText, false);
    }


    public String getSelectInput(String name, String heading, String value, LinkedHashMap<String, String> values, String errorMessage, String subText, boolean hasSelectRequest) {

        StringBuffer r = new StringBuffer();
        try {

            value = common.nnt(value);

            String errorClass = "";
            if (!"".equals(common.nnt(errorMessage))) {
                errorClass = "inerr";
            }

            String subTextHtml = "";
            if (!"".equals(common.nnt(subText))) {
                subTextHtml = "<span class='offinf'>" + subText + "</span>";
            }


            r.append("<div class='adldfieldhld'>");
            r.append("<h2 class='leadfieldhead'>" + heading + "</h2>");
            r.append("<div class='selwrap " + errorClass + "'>");
            r.append("<select name='" + name + "' id='" + name + "'>");

            StringBuffer options = new StringBuffer();
            boolean gotEmptyStringAsOtion = false;

            for (String key : values.keySet()) {

                options.append("<option value='" + key + "'");
                if (key.equals("" + value)) {
                    options.append(" selected ");
                }
                if ("".equals(key)) {
                    gotEmptyStringAsOtion = true;
                }
                options.append(">" + values.get(key) + "</option>");

            }
            // hasSelectRequest means teh select list already has a 'Select...' at the top
            if (!hasSelectRequest && !gotEmptyStringAsOtion) {
                r.append("<option value=''>Select...</option>");
            }
            r.append(options);
            r.append("</select>");
            r.append("</div>");
            r.append(subTextHtml);
            r.append("<div class='AdInputInfo'><span class='aperm'>" + common.nnt(errorMessage) + "</span></div>");
            r.append("</div>");


        } catch (Exception e) {
            common.Logit("Exception in getSelectInput for name:" + name + " value:" + value);
            e.printStackTrace();
            r = new StringBuffer();
        }

        return r.toString();

    }


    public String getTextDisplay(String editLink, String heading, String value) {

        return getTextDisplay(editLink, heading, value, null, null);

    }

    public String getTextDisplay(String editLink, String heading, String value, String errorMessage, String subText) {

        StringBuffer r = new StringBuffer();
        try {


            String errorClass = "";
            if (!"".equals(common.nnt(errorMessage))) {
                errorClass = "inerr";
            }

            String subTextHtml = "";
            if (!"".equals(common.nnt(subText))) {
                subTextHtml = "<span class='offinf'>" + subText + "</span>";
            }

            String editLinkHTML = "";
            if (!"".equals(common.nnt(editLink))) {
                editLinkHTML = "<span class='inwraptext changeoptval'><a target='_blank' href='" + editLink + "'><i class='fa fa-pencil-square-o tooltip tooltipstered' aria-hidden='true'></i></a></span>";
            }

            r.append("<div class='infoboxct'>");
            r.append("<label class='listinlabel adminFormCls'>" + heading + "</label>");
            r.append("<div class='oofrindrop compuls' style=''><span class='inwraptext'>" + value + "</span>");
            r.append(editLinkHTML);
            r.append("</div>");
            r.append(subTextHtml);
            r.append("<div class='adminErrorInfo'><span class='adErrorString'>" + common.nnt(errorMessage) + "</span></div>");
            r.append("</div>");

        } catch (Exception e) {
            common.Logit("Exception in getTextDisplay for name:" + heading + " value:" + value);
            e.printStackTrace();
            r = new StringBuffer();
        }

        return r.toString();

    }

    public String getSeparator() {
        return "<div class='sepr'></div>";
    }


    public String validateURLField(boolean compulsory, int maxLength, String value, String fieldName) {

        String r = "";

        try {

            if (value == null || value.trim().length() == 0) {

                if (compulsory) {
                    r = "Enter a value for " + fieldName + ".";
                }

            } else {
                if (nnt(value).length() > maxLength) {
                    r += fieldName + " must be less than " + maxLength + " characters.";
                } else {
                    if (!common.isValidHTTPURL(value)) {
                        r += fieldName + " is not a valide URL.";
                    }
                }
            }

        } catch (Exception e) {
            r = "Error validating field " + fieldName + ".";
            common.Logit("Exception in validateStringField, field " + fieldName + ":" + value);
            e.printStackTrace();
        }

        return r;
    }


    public String validateStringField(boolean compulsory, int maxLength, String value, String fieldName) {

        String r = "";

        try {

            if (value == null || value.trim().length() == 0) {

                if (compulsory) {
                    r = "Enter a value for " + fieldName + ".";
                }

            } else {
                if (nnt(value).length() > maxLength) {
                    r += fieldName + " must be less than " + maxLength + " characters.";
                }
            }

        } catch (Exception e) {
            r = "Error validating field " + fieldName + ".";
            common.Logit("Exception in validateStringField, field " + fieldName + ":" + value);
            e.printStackTrace();
        }

        return r;
    }


    public String validateList(boolean compulsory, String value, String fieldName, String[][] allowableValues) {

        String r = "";

        try {
            if (value == null || value.trim().length() == 0) {

                if (compulsory) {
                    r = "Enter a value for " + fieldName + ".";
                }

            } else {
                boolean found = false;

                for (String[] allVal : allowableValues) {
                    if (value.equals(allVal[0])) {
                        found = true;
                    }
                }

                if (!found) {
                    r += "Invalid option selected for " + fieldName;
                }
            }

        } catch (Exception e) {
            r = "Error validating field " + fieldName + ".";
            common.LogAndNotifyMailOnly("Exception in validateList, field " + fieldName + ":" + value);
            e.printStackTrace();
        }

        return r;
    }


    public String validateLongField(boolean greaterthanZero, String value, String fieldName) {

        // compulsory denotes non-zero

        String r = "";

        try {
            if (value == null || value.trim().length() == 0) {

                r = "Enter a value for " + fieldName + ".";

            } else {
                long longValue = 0l;
                try {
                    longValue = new Long(value.trim()).longValue();
                } catch (Exception ex) {
                    r += "Enter a value for " + fieldName + ".";
                }

                if (longValue == 0) {
                    r += "Enter a value for " + fieldName + ".";
                }
            }

        } catch (Exception e) {
            r = "Error validating field " + fieldName + ".";
            common.Logit("Exception validateLongField, field " + fieldName + ":" + value);
            e.printStackTrace();
        }

        return r;


    }


    public String validateIntegerField(boolean greaterthanZero, String value, String fieldName) {

        // compulsory denotes non-zero

        String r = "";

        try {
            if (value == null || value.trim().length() == 0) {

                r = "Enter a value for " + fieldName + ".";

            } else {
                int intValue = 0;
                try {
                    intValue = new Integer(value.trim()).intValue();
                } catch (Exception ex) {
                    r += "Enter a value for " + fieldName + ".";
                }

                if (intValue == 0) {
                    r += "Enter a value for " + fieldName + ".";
                }
            }

        } catch (Exception e) {
            r = "Error validating field " + fieldName + ".";
            common.Logit("Exception validateIntegerField, field " + fieldName + ":" + value);
            e.printStackTrace();
        }

        return r;


    }


    public String validateDoubleField(boolean notZero, String value, String fieldName) {

        // compulsory denotes non-zero

        String r = "";

        try {

            if (value == null || value.trim().length() == 0) {

                r = "Enter a value for " + fieldName + ".";

            } else {
                double doubleValue = 0.0d;

                try {
                    doubleValue = new Double(value.trim()).doubleValue();
                } catch (Exception ex) {
                    r += "Enter a valid value for " + fieldName + ".";
                }

                if (doubleValue == 0.00d) {
                    if (notZero) {
                        r += "Value for " + fieldName + " must be non-zero.";
                    }
                }
            }

        } catch (Exception e) {
            r = "Error validating field " + fieldName + ".";
            common.Logit("Exception in validateDoubleField, field " + fieldName + ":" + value);
            e.printStackTrace();
        }

        return r;


    }


    public String validateBooleanField(String value, String fieldName) {

//compulsory denotes non-zero

        String r = "";

        try {
            if (!"0".equals(value) && !"1".equals(value)) {

                r += "Enter a valid value for " + fieldName + ".";

            }

        } catch (Exception e) {
            r = "Error validating field " + fieldName + ".";
            common.Logit("Exception in validateBooleanField, field " + fieldName + ":" + value);
            e.printStackTrace();
        }

        return r;

    }

    public String nnt(String value) {
        if (value == null) {
            value = "";
        }
        return value.trim();
    }


    public String isIntMoreThanZero(String sTestStr) { // returns null if its not an int or long, otherwise the number as a string
        String sFinal = null;
        try {

            if (sTestStr != null && sTestStr.trim().length() > 0 &&
                    StringUtils.containsOnly(sTestStr.trim(), "0123456789") && !"0".equals(sTestStr.trim())) {
                long lv = new Long(sTestStr.trim()).longValue();
                sFinal = "" + lv;
            }

            return sFinal;

        } catch (Exception e) {
            common.Logit("Exception in isIntMoreThanZero for :" + sTestStr);
            e.printStackTrace();
            return null;
        }
    }


    public boolean parseBoolean(String value) {

        boolean r = false;
        if ("1".equals(value) || "true".equalsIgnoreCase(value)) {
            r = true;
        }

        return r;


    }


}
