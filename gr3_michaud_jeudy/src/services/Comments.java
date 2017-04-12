package services;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.regex.Pattern;

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
import com.mongodb.MapReduceCommand;
import com.mongodb.MapReduceOutput;
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

			if(collection.findOne( new BasicDBObject("_id", new ObjectId(msgId))) == null) //SI le msg existe utile si qqn supprime entre temps
				return null;

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

			//System.out.println(request);

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
	public static DBObject removeMessageByToken(String id, String token){
		try {
			int author_id=Session.getIdUser(token);
			if(author_id != -1 )
				return removeMessage(id, author_id+"");
		} catch (BDException e) {
			return null;
		}
		return null;

	}

	public static DBObject removeMessage(String id, String author_id){
		Mongo m;
		try {
			m = new Mongo(DBStatic.mongohost,DBStatic.mongo_port);
			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection collection = db.getCollection("comments");
			BasicDBObject request = new BasicDBObject();

			request.put("_id", new ObjectId(id));
			request.put("author_id", Integer.parseInt(author_id));

			int n=collection.remove(request).getN();
			if(n > 0){
				request.put("status", "OK");
				return request;
			}
			return null;

		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}catch(IllegalArgumentException iea){
			iea.printStackTrace();
			return null;
		}

	}
	public static DBObject removeCommentByToken(String msg_id, String com_id,String token){
		try {
			int author_id=Session.getIdUser(token);
			if(author_id != -1 )
				return removeComment(msg_id, com_id,author_id+"");
		} catch (BDException e) {
			return null;
		}
		return null;

	}
	
	
	public static DBObject removeComment(String msg_id, String com_id, String author_id){
		Mongo m;
		try {
			m = new Mongo(DBStatic.mongohost,DBStatic.mongo_port);
			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection collection = db.getCollection("comments");


			BasicDBObject tmp2 = new BasicDBObject();
			tmp2.put("_id", new ObjectId(com_id));
			tmp2.put("author_id", Integer.parseInt(author_id));
			
			BasicDBObject tmp = new BasicDBObject(
					"comments", tmp2);

			int n=collection.update(new BasicDBObject("_id", new ObjectId(msg_id)),
					new BasicDBObject("$pull", tmp)).getN();
			
			//int n=collection.remove(request).getN();
			if(n > 0){
				tmp2.put("status", "OK");
				return tmp2;
			}
			return null;

		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}catch(IllegalArgumentException iea){
			iea.printStackTrace();
			return null;
		}

	}

	public static List<DBObject> getListMessage(String token, int author_id,
			String maxid, String minid ,int nb, boolean friends) throws BDException{
		try {	

			Mongo m =new Mongo(DBStatic.mongohost,DBStatic.mongo_port);
			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection collection = db.getCollection("comments");
			BasicDBObject request = new BasicDBObject();
			BasicDBList or = new BasicDBList();
			BasicDBList and = new BasicDBList();

			if(author_id != -1){
				if(friends){
					JSONObject flist= FriendTools.getFriendList(author_id);
				
					JSONArray arr=flist.getJSONArray("friendList");
	
					for(int i=0; i<arr.length(); i++){
						or.add(new BasicDBObject("author_id", arr.getJSONObject(i).getInt("id")));
						// System.out.println(or);
					}
				}
				//if(Session.getIdUser(token) == author_id )
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

			}else{
				return null;
			}

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
	
//	"var words=text.match(new RegExp('\\\\w+','g')); 
	private static String map="function(){"+
			"var text=this.post;"+
			"var words=text.match(new RegExp('[^ ]+','g')); var tf={}; var id=this._id.str;"+
			"for(var i=0; words !=null && i<words.length; i++){"+
			"if(tf[words[i]] == null)"+
			"tf[words[i]]=1;"+
			"else{"+
			"tf[words[i]]+=1;}"+
			"for(w in tf){"+
			"var ret={};"+
			"ret[id]=tf[w];"+
			"emit(w,ret);"+
			"}"+
			"}"+
			"}";
//	private static String map="function() { "+
//			"emit(this.post,1);"+
//			"}";
	private static String reduce="function(key,values){"+
			"var ret={};"+
			"for(var i=0; i<values.length; i++){"+
			"for(var d in values[i])"+
			"ret[d] = values[i][d];"+
			"}"+
			"return ret;"+
			"}";
	private static String finalize="function(k, v){"+
			"var df= Object.keys(v).length;"+
			"for(d in v)"+
			"v[d]=v[d]*Math.log(N/df);"+
			"return v;"+
			"}";
	
	public static void createInverseIndex(){
		Mongo m;
		try {
			m = new Mongo(DBStatic.mongohost,DBStatic.mongo_port);

			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection coll = db.getCollection("comments");
			MapReduceCommand cmd = new MapReduceCommand(coll, map, reduce,"tfidf", MapReduceCommand.OutputType.REPLACE, null);
			cmd.setFinalize(finalize);
			BasicDBObject n =new BasicDBObject();
			n.put("N", coll.count());
			cmd.setScope(n);
			
			 MapReduceOutput out =coll.mapReduce(cmd);
			 System.out.println("OK");
			 int i=0;
			 try {
			        for (DBObject o : out.results()) {

			            System.out.println(o.toString());
			            i++;
			       }
			    } catch (Exception e) {
			        e.printStackTrace();
			    }    
			System.out.println(i);
			//System.out.println(db.getCollection("index").find());
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void showIndex(){
		Mongo m;
		try {
			m = new Mongo(DBStatic.mongohost,DBStatic.mongo_port);

			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection coll = db.getCollection("tfidf");
			DBCursor arr =  coll.find();
			for(DBObject a: arr)
				System.out.println(a);
	
			
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void testRSV(){
		Mongo m;
		try {
			m = new Mongo(DBStatic.mongohost,DBStatic.mongo_port);

			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection coll = db.getCollection("tfidf");
			getMessagesByQuery(coll, null,"jordan");
	
			
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public static List<BasicDBObject> getMessagesByQuery(DBCollection index, DBCollection docs, String query){
		
		String [] q=query.split(" ");
		HashSet<String> w =new HashSet<String>();
		for(String s:q){
			if(!w.contains(s))
				w.add(s);
		}
		
		HashMap<String, Double> scores = new HashMap<String, Double>();
		for(String s: w){
			BasicDBObject obj = new BasicDBObject();
			obj.put("_id", s);
			DBCursor cursor=index.find(obj);
			try{
				if(cursor.hasNext()){
					DBObject res=cursor.next();
					BasicDBList lights = (BasicDBList) res.get("value");
					List<DBObject> doc=(ArrayList<DBObject>)res.get("value");
					for(DBObject d: doc){
					
						String id = (String) d.keySet().toArray()[0];
						double val =Double.valueOf((String) d.get("w"));
						
						Double tmp = scores.get(id);
						tmp=(tmp==null) ? val : (tmp + val);
						scores.put(id, tmp);
					}
				}
			}finally{
				cursor.close();
			}
		}
		System.out.println(scores);
		return null;
	}
	
	
	
}