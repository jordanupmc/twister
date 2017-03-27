package services;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

import bd.BDException;
import bd.DBStatic;
import bd.Database;
import bd.Session;
import bd.UserTools;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
public class Search {
	

	
	public static List<DBObject> searchPost(String token, int[] author_id, String query) throws BDException{
		List<DBObject> list= new ArrayList<DBObject>();
		try {
		
		
			
			Mongo m =new Mongo(DBStatic.mongohost,DBStatic.mongo_port);
			DB db= m.getDB(DBStatic.mysqldb);
			DBCollection collection = db.getCollection("comments");
			BasicDBObject request = new BasicDBObject();
			
			
			request.put("author_id", new BasicDBObject("$in", author_id));
			request.put("post",Pattern.compile(query,Pattern.CASE_INSENSITIVE));					
			list=collection.find(request).toArray();
			
			
		}catch(UnknownHostException e){
			e.printStackTrace();
			return null;
		}catch(PatternSyntaxException pse){
			throw new BDException("Query mauvais format "+pse);
		}
		
		return list;
		
	}

}
