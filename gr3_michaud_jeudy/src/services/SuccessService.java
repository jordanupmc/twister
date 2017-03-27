package services;

import org.json.JSONException;
import org.json.JSONObject;

public class SuccessService {
	public SuccessService(){
		
	}
	
	public static JSONObject serviceSuccess(String msg) {
		JSONObject o=new JSONObject();
		try {
			o.put("status","OK");
			o.put("textSuccess", msg);
			return o;
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
	}
}
