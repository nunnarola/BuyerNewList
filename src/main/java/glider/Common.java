package glider;

import java.util.LinkedHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Common {
    public static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"; // A basic regular expression for email validation
    public static final String PHONE_NUMBER_REGEX = "^(\\d{10}|\\(\\d{3}\\)\\s?\\d{3}-\\d{4}|\\d{3}-\\d{3}-\\d{4})$";
    public static final String YEAR_PATTERN = "^\\d{4}$";

    public Common() {
    }

    public void LogAndNotifyMailOnly(String value) {

    }

    public boolean isValidEmailAddress(String value) {
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(value);
        return matcher.matches();
    }

    public boolean isValidPhNum(String value) {
        Pattern pattern = Pattern.compile(PHONE_NUMBER_REGEX);
        Matcher matcher = pattern.matcher(value);
        return matcher.matches();
    }

    public void Logit(String value) {

    }

    public String nnt(String value) {
        return value;
    }

    public boolean isValidHTTPURL(String value) {
        return false;
    }

    public void LogAndNotify(String value) {

    }

    public String isIntMoreThanZero(String brokerageId) {
        //:Todo provie implementation
        return brokerageId;
    }

    public LinkedHashMap<String, String> convertArrayToHashMap(String[][] array) {
        LinkedHashMap<String, String> hashMap = new LinkedHashMap<>();

        for (String[] row : array) {
            // Assuming each row has at least two elements (name and phone, for example)
            if (row.length >= 2) {
                String key = row[0]; // Assuming the first column is the key (e.g., Brokerage Name)
                String value = row[1]; // Assuming the second column is the value (e.g., Phone Number)
                hashMap.put(key, value);
            }
        }

        return hashMap;
    }
}
