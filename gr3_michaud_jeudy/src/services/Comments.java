package services;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.bson.BSONObject;
import org.bson.types.ObjectId;

import bd.BDException;
import bd.DBStatic;
import bd.Database;
import bd.FriendTools;
import bd.Session;
import bd.UserTools;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONException;
import org.json.JSONObject;
public class Comments {

	public static boolean insertMessage(String token,String message){
		int author_id;
		try {
			
			Mongo m =new Mongo(DBStatic.mongohost,DBStatic.mongo_port);
			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection collection = db.getCollection("comments");
			BasicDBObject request = new BasicDBObject();
			
			GregorianCalendar calendar = new GregorianCalendar();
			Date today= calendar.getTime();
			
			author_id=Session.getIdUser(token);
			
			if(author_id==-1){
				return false;
			}
			
			request.put("author_id", author_id);
			request.put("login", UserTools.getLogin(author_id+""));

			request.put("post", message);
			request.put("date", today);
			request.put("comments", new BasicDBList());
			
			
			collection.insert(request);
			
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		} catch (BDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		
		return true;
		
	}
	
	public static DBObject comment(String token,String message, String msgId){
		int author_id;
		try {
			
			Mongo m =new Mongo(DBStatic.mongohost,DBStatic.mongo_port);
			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection collection = db.getCollection("comments");
			BasicDBObject request = new BasicDBObject();
			BasicDBObject mess = new BasicDBObject();
		
			//List<BasicDBObject> comments = new ArrayList<BasicDBObject>();
	
			GregorianCalendar calendar = new GregorianCalendar();
			Date today= calendar.getTime();
			
			author_id=Session.getIdUser(token);
			
			if(author_id==-1){
				return null;
			}
			
			request.put("author_id", author_id);
			request.put("login", UserTools.getLogin(author_id+""));
						
			
			request.put("post", message);
			request.put("date", today);
			request.put("_id",new ObjectId());
			
			//comments.add(request);
			
			mess.put("comments", request);
			
			collection.update(
					 new BasicDBObject("_id", new ObjectId(msgId))
					,
					new BasicDBObject("$push", mess)
					);
			
			return request;
			
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		} catch (BDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
		
	}
	//Like et Dislike
	public static DBObject like(String token, String msgId){
		Mongo m;
		int author_id;
		try {
			m = new Mongo(DBStatic.mongohost,DBStatic.mongo_port);
			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection collection = db.getCollection("comments");
			
			BasicDBObject request = new BasicDBObject();
			BasicDBObject mess = new BasicDBObject();
	
			GregorianCalendar calendar = new GregorianCalendar();
			Date today= calendar.getTime();
			
			
			author_id=Session.getIdUser(token);
			
			request.put("author_id", author_id);
			request.put("date", today);
		
			mess.put("like", request);
			
			if(author_id==-1){
				return null;
			}
			
			if(isLike(author_id+"", msgId)){ //Dislike
				BasicDBObject tmp = new BasicDBObject(
						"like", new BasicDBObject("author_id", author_id));
				
				collection.update(new BasicDBObject("_id", new ObjectId(msgId)),
						new BasicDBObject("$pull", tmp));
				request.put("state",1);
			}else{ //Like
			collection.update(
					new BasicDBObject("_id", new ObjectId(msgId))
					,
					new BasicDBObject("$push", mess)
					);
				request.put("state",0);
			}
			
			return request;
			
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (BDException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		
		
		return null;
		
	}
	public static boolean isLike(String author_id, String com_id){
		Mongo m;
		try {
			m = new Mongo(DBStatic.mongohost,DBStatic.mongo_port);
			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection collection = db.getCollection("comments");
			
			BasicDBObject request = new BasicDBObject();
			BasicDBObject request2 = new BasicDBObject();
			
			request.put("like.author_id", author_id);
			request2.put("_id", new ObjectId(com_id));
			
			System.out.println(request);
			
			BasicDBList or = new BasicDBList();
			or.add(request);
			or.add(request2);
			
			DBObject query = new BasicDBObject("$and", or);

			System.out.println(collection.find(query));
			DBObject db2 = collection.findOne(request2);
			
			if(db2 != null){
				
				
				BasicDBList likes = (BasicDBList)  db2.get("like");
				if(likes == null)
					return false;
				BasicDBObject[] likeArr = likes.toArray(new BasicDBObject[0]);
				
				for(BasicDBObject l: likeArr){
					System.out.println(l.getString("author_id"));
					if(l.getInt("author_id")==Integer.parseInt(author_id))
						return true;
				}
			}

		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}catch(IllegalArgumentException iea){
			return false;
		}
		
		return false;
	}
	
	
	public static boolean isExist(String id){
		Mongo m;
		try {
			m = new Mongo(DBStatic.mongohost,DBStatic.mongo_port);
			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection collection = db.getCollection("comments");
			BasicDBObject request = new BasicDBObject();
			
			request.put("_id", new ObjectId(id));
			if(collection.findOne(request) != null)
				return true;
			else
				return false;
			
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}catch(IllegalArgumentException iea){
			return false;
		}
	}
//	public static JSONObject getMessageById(String id){
//		Mongo m;
//		try {
//			m = new Mongo(DBStatic.mongohost,DBStatic.mongo_port);
//			DB db= m.getDB(DBStatic.mysqldb);
//			DBCollection collection = db.getCollection("comments");
//			BasicDBObject request = new BasicDBObject();
//			
//			request.put("_id", new ObjectId(id));
//			
//			return Comments.dbObjectToComments(collection.findOne(request));
//		} catch (UnknownHostException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return null;
//		}catch(IllegalArgumentException iea){
//			return null;
//		}
//	
//	}
	public static DBObject getMessageByIdDB(String id){
		Mongo m;
		try {
			m = new Mongo(DBStatic.mongohost,DBStatic.mongo_port);
			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection collection = db.getCollection("comments");
			BasicDBObject request = new BasicDBObject();
			
			request.put("_id", new ObjectId(id));
			
			return collection.findOne(request);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}catch(IllegalArgumentException iea){
			return null;
		}
	
	}
	
//	public static JSONObject dbObjectToComments(DBObject o){
//		JSONObject r=new JSONObject();
//		try{
//			r.put("id", o.get("_id"));
//			r.put("author_id", o.get("author_id"));
//			r.put("post", o.get("post"));
//			r.put("date", o.get("date"));
//		}catch(Exception e){
//			
//		}
//		//System.out.println(r);
//		return r;
//	}
	
//	public static JSONArray dbObjectToComments(List<DBObject> l){
//		JSONObject r=new JSONObject();
//		JSONArray ar=new JSONArray();
//	
//		try{
//			for(DBObject o: l){
//				r.put("id", o.get("_id"));
//				r.put("author_id", o.get("author_id"));
//				r.put("post", o.get("post"));
//				r.put("date", o.get("date"));
//				
//				ar.put(r);
//		
//			}
//		}catch(Exception e){
//			
//		}
//		//System.out.println(r);
//		return ar;
//	}
//	
//	
	
	public static List<DBObject> getListMessage(String token, int author_id,
			String maxid, String minid ,int nb) throws BDException{
		try {	
			
			Mongo m =new Mongo(DBStatic.mongohost,DBStatic.mongo_port);
			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection collection = db.getCollection("comments");
			BasicDBObject request = new BasicDBObject();
			BasicDBList or = new BasicDBList();
			BasicDBList and = new BasicDBList();
		
			if(author_id != -1){
				JSONObject flist= FriendTools.getFriendList(author_id);
				JSONArray arr=flist.getJSONArray("friendList");
				
				for(int i=0; i<arr.length(); i++){
					or.add(new BasicDBObject("author_id", arr.getJSONObject(i).getInt("id")));
					// System.out.println(or);
				}
				if(Session.getIdUser(token) == author_id )
					or.add(new BasicDBObject("author_id", author_id));
				
				if(!or.isEmpty())
					request.put("$or",or);
				
				if(!maxid.equals("-1"))
					and.add(new BasicDBObject("_id", new BasicDBObject("$lt",new ObjectId(maxid))));
				if( !minid.equals("-1"))
					and.add(new BasicDBObject("_id", new BasicDBObject("$gt",new ObjectId(minid))));
				//System.out.println(and);
				//and.add(new BasicDBObject("$or", or));
				
				if(!and.isEmpty())
					request.put("$and", and);
//				System.out.println(request);
				
			}else{
				return null;
			}
			//Voir si request vide retourne TOUT
			
			if(nb == -1)
				return collection.find(request).sort(new BasicDBObject("_id",-1)).toArray();
			
			return collection.find(request).sort(new BasicDBObject("_id",-1)).limit(nb).toArray();
			
			
		}catch(UnknownHostException e){
			e.printStackTrace();
			return null;
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		
		
	}
}