package services;

import org.json.JSONException;
import org.json.JSONObject;

public class ErrorService {
	public ErrorService(){
		
	}
	
	public static JSONObject serviceRefused(int code, String msg) {
		JSONObject o=new JSONObject();
		try {
			o.put("status","KO");
			o.put("code", code);
			o.put("textError", msg);
			return o;
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
	}
}
