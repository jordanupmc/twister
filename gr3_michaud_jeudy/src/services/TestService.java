package services;

import java.net.UnknownHostException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import bd.BDException;
import bd.DBStatic;
import bd.FriendTools;
import bd.Session;
import bd.UserTools;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;

public class TestService {
	public static void main(String [] args) {

		//Comments.createInverseIndex();
	//Comments.showIndex();
		//System.out.println(Comments.countPost("20"));
		//System.out.println(Comments.countLike("20"));
	//	System.out.println(services.User.login("popo","pupu"));
		
		System.out.println(Comments.countPost("4"));
		
	}
}
