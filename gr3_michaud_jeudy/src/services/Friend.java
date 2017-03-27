package services;
import java.sql.Connection;
import java.sql.Statement;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import bd.BDException;
import bd.Database;

public class Friend {
	public static JSONObject getFriendList(String token){
		JSONObject j=new JSONObject();
		JSONObject friendList = null;
	
		try{
			friendList=bd.FriendTools.getFriendList(token);
		
			friendList.put("status","OK");
			
			
		}catch(JSONException je){
			return ErrorService.serviceRefused(100, je.getMessage());
		} catch (BDException e) {
			// TODO Auto-generated catch block
			return ErrorService.serviceRefused(1000, e.getMessage());
		}
		
		return friendList;
		
	}
	
	public static JSONObject getFriend(String token, int id){
		JSONObject j=new JSONObject();
		JSONObject friend;
		try{
			friend=bd.FriendTools.getFriend(token,id);
		
			j.put("status","OK");
			j.put("friend",friend);
			
		}catch(JSONException je){
			return ErrorService.serviceRefused(100, je.getMessage());
		} catch (BDException e) {
			// TODO Auto-generated catch block
			return ErrorService.serviceRefused(1000, e.getMessage());
		}
		
		return j;
	}
	
	public static JSONObject createFriend(String token, int id){
		JSONObject j=new JSONObject();
		
		try{
			if(bd.FriendTools.createFriend(token,id)){
		
				j.put("status","OK");
			}else{
				return ErrorService.serviceRefused(1000, "Erreur création de l'ami "+id);
			}
			
		}catch(JSONException je){
			return ErrorService.serviceRefused(100, je.getMessage());
		} catch (BDException e) {
			// TODO Auto-generated catch block
			return ErrorService.serviceRefused(1000, e.getMessage());
		}
		
		return j;
	}
	
	
	public static JSONObject deleteFriend(String token, int id){
		JSONObject j=new JSONObject();
	
		try{
			if(bd.FriendTools.deleteFriend(token,id)){
		
				j.put("status","OK");
			}else{
				return ErrorService.serviceRefused(6, "Erreur suppresion de l'ami"+id);
			}
			
		}catch(JSONException je){
			je.printStackTrace();
			return ErrorService.serviceRefused(100, je.getMessage());
		} catch (BDException e) {
			// TODO Auto-generated catch block
			return ErrorService.serviceRefused(1000, e.getMessage());
		}
		
		return j;
	}
	

	
	
	
}
