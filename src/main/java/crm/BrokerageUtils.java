package crm;


import java.util.LinkedHashMap;
import glider.Common;
import glider.DbBean;


public class BrokerageUtils {
	
	

	private DbBean db = null;
	private Common common = null;


	
	
	
	public BrokerageUtils() {

		common = new Common();
		db = new DbBean();

		
	}
	


public String[][] GetBrands(){	

try{   
	

	 String sSQL = "{CALL get_brands()}";
	 Object[] ObSQL = new Object[0];
	 return db.PreparedSQLSelect(sSQL, ObSQL);
		 
	   
   
}catch(Exception e){
	common.LogAndNotify("Exception in GetBrands."  );
	e.printStackTrace();
	return null;
}
   
}
	


public String[][] GetBrokerages(){	

try{   
	

	 String sSQL = "{CALL get_brokerages()}";
	 Object[] ObSQL = new Object[0];
	 return db.PreparedSQLSelect(sSQL, ObSQL);
		 
	   
   
}catch(Exception e){
	common.LogAndNotify("Exception in GetBrokerages."  );
	e.printStackTrace();
	return null;
}
   
}


public String[][] GetTeams(String brokerageId){	
String[][] sD = null;
try{   
	
	 if (common.isIntMoreThanZero(brokerageId) != null){
		 
		 brokerageId = brokerageId.trim();
		 

		 String sSQL = "{CALL get_teams(?)}";
		 
		 Object[] ObSQL = {new Long(brokerageId)};
		 sD = db.PreparedSQLSelect(sSQL, ObSQL);
		 
	   
   }else{
		 common.LogAndNotifyMailOnly("Couldn't get GetTeams for prospectId brokerageId:" + brokerageId );
   }
   	
   
}catch(Exception e){
	common.LogAndNotify("Exception in GetTeams for brokerageId:" + brokerageId );
	e.printStackTrace();
	sD = null;
}
return sD;
   
}


public String[][] GetAllTeams(){	
String[][] sD = null;
try{   
	
		 String sSQL = "{CALL get__all_teams()}";
		 Object[] ObSQL = {};
		 sD = db.PreparedSQLSelect(sSQL, ObSQL);
		 
   
}catch(Exception e){
	common.LogAndNotify("Exception in GetAllTeams" );
	e.printStackTrace();
	sD = null;
}
return sD;
   
}


private LinkedHashMap <String,String> USStates  = null; 

public LinkedHashMap <String,String> getUsaStates(){
	
	if (USStates == null) {
		
		USStates = new LinkedHashMap<String,String>();
		USStates.put("AL","Alabama");
		USStates.put("AK","Alaska");
		USStates.put("AZ","Arizona");
		USStates.put("AR","Arkansas");
		USStates.put("AS","American Samoa");
		USStates.put("CA","California");
		USStates.put("CO","Colorado");
		USStates.put("CT","Connecticut");
		USStates.put("DE","Delaware");
		USStates.put("DC","District of Columbia");
		USStates.put("FL","Florida");
		USStates.put("GA","Georgia");
		USStates.put("GU","Guam");
		USStates.put("HI","Hawaii");
		USStates.put("ID","Idaho");
		USStates.put("IL","Illinois");
		USStates.put("IN","Indiana");
		USStates.put("IA","Iowa");
		USStates.put("KS","Kansas");
		USStates.put("KY","Kentucky");
		USStates.put("LA","Louisiana");
		USStates.put("ME","Maine");
		USStates.put("MD","Maryland");
		USStates.put("MA","Massachusetts");
		USStates.put("MI","Michigan");
		USStates.put("MN","Minnesota");
		USStates.put("MS","Mississippi");
		USStates.put("MO","Missouri");
		USStates.put("MT","Montana");
		USStates.put("NE","Nebraska");
		USStates.put("NV","Nevada");
		USStates.put("NH","New Hampshire");
		USStates.put("NJ","New Jersey");
		USStates.put("NM","New Mexico");
		USStates.put("NY","New York");
		USStates.put("NC","North Carolina");
		USStates.put("ND","North Dakota");
		USStates.put("MP","Northern Mariana Islands");
		USStates.put("OH","Ohio");
		USStates.put("OK","Oklahoma");
		USStates.put("OR","Oregon");
		USStates.put("PA","Pennsylvania");
		USStates.put("PR","Puerto Rico");
		USStates.put("RI","Rhode Island");
		USStates.put("SC","South Carolina");
		USStates.put("SD","South Dakota");
		USStates.put("TN","Tennessee");
		USStates.put("TX","Texas");
		USStates.put("TT","Trust Territories");
		USStates.put("UT","Utah");
		USStates.put("VT","Vermont");
		USStates.put("VA","Virginia");
		USStates.put("VI","Virgin Islands");
		USStates.put("WA","Washington");
		USStates.put("WV","West Virginia");
		USStates.put("WI","Wisconsin");
		USStates.put("WY","Wyoming");
		
	}
	return USStates;
	
}
	

}



