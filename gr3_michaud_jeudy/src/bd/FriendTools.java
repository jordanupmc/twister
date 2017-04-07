package bd;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class FriendTools {
	
	public static JSONObject getFriendList(int id) throws BDException{
		JSONObject f=new JSONObject();
		JSONObject l=new JSONObject();
		
		JSONArray friendList =new JSONArray();
		try{
			
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();
			
			
			String query = "SELECT `to` FROM Friends WHERE `from`=?";

			PreparedStatement pstmt = c.prepareStatement(query);
			pstmt.setInt(1, id);
			
			ResultSet rs=pstmt.executeQuery();
			
			while(rs.next()){
				
				friendList.put(getFriend(id,rs.getInt(1)));
				
			}
			l.put("friendList", friendList);
			
			rs.close();
			pstmt.close();
			c.close();
		
		}catch(Exception e){
			throw new BDException("Echec getFriendList "+e.getMessage());
		}
		return l;
	}
	
	
	public static JSONObject getFriendList(String token) throws BDException{
//		JSONObject f=new JSONObject();
//		JSONObject l=new JSONObject();
		int moi;
	//	JSONArray friendList =new JSONArray();
		try{
	
			moi=Session.getIdUser(token);
			return getFriendList(moi);
//			Class.forName("com.mysql.jdbc.Driver").newInstance();
//			Connection c = Database.getMySQLConnection();
//			
//			
//			String query = "SELECT `to` FROM Friends WHERE `from`=?";
//
//			PreparedStatement pstmt = c.prepareStatement(query);
//			pstmt.setInt(1, moi);
//			
//			ResultSet rs=pstmt.executeQuery();
//			
//			while(rs.next()){
//				
//				friendList.put(getFriend(token,rs.getInt(1)));
//				
//			}
//			l.put("friendList", friendList);
//			
//			rs.close();
//			pstmt.close();
//			c.close();
		
		}catch(Exception e){
			throw new BDException("Echec getFriendList "+e.getMessage());
		}
	//	return l;
	}
	
	public static JSONObject getFriend(int id1, int id) throws BDException{
		JSONObject f=new JSONObject();
		try{	
			
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();
			
			if(!isFriend(id1,id)){
				c.close();
				return f;
			}
			
			String query = "SELECT nom,prenom,id,login FROM USER WHERE id=?";

			PreparedStatement pstmt = c.prepareStatement(query);
			pstmt.setInt(1, id);

			
			ResultSet rs = pstmt.executeQuery();

			
			if (rs.next()){
				f.put("nom", rs.getString(1));
				f.put("prenom", rs.getString(2));
				f.put("id", rs.getString(3));
				f.put("login", rs.getString(4));
			}
				
			rs.close();
			pstmt.close();
			c.close();
	
		}catch(Exception e){
			throw new BDException("Echec getFriend "+ e.getMessage());
		}
		return f;
	}
	
	public static JSONObject getFriend(String token, int id) throws BDException{
		JSONObject f=new JSONObject();
		try{	
			
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();
			
			if(!isFriend(token,id)){
				c.close();
				return f;
			}
			
			String query = "SELECT nom,prenom,id,login FROM USER WHERE id=?";

			PreparedStatement pstmt = c.prepareStatement(query);
			pstmt.setInt(1, id);

			
			ResultSet rs = pstmt.executeQuery();

			
			if (rs.next()){
				f.put("nom", rs.getString(1));
				f.put("prenom", rs.getString(2));
				f.put("id", rs.getString(3));
				f.put("login", rs.getString(4));
			}
				
			rs.close();
			pstmt.close();
			c.close();
	
		}catch(Exception e){
			throw new BDException("Echec getFriend "+ e.getMessage());
		}
		return f;
	}
	
	public static boolean createFriend(String token, int id) throws BDException{
		try{
			int moi=Session.getIdUser(token);
			if(moi == -1 )
				throw new BDException("Pas connecter");
			
			
			if(UserTools.userExists(id) && id!=moi && !isFriend(token, id)){
				Class.forName("com.mysql.jdbc.Driver").newInstance();
				Connection c = Database.getMySQLConnection();

				String query = "INSERT INTO `Friends`(`from`, `to`) VALUES (?,?)";
				PreparedStatement pstmt = c.prepareStatement(query);
				
				pstmt.setInt(1,moi);
				pstmt.setInt(2, id);

				pstmt.executeUpdate();
							
				pstmt.close();
				c.close();
				
				return true;
			}
		}catch(Exception e){
			throw new BDException("Echec creation friend "+e.getMessage());
		}
		return false;
	}
	
	public static boolean isFriend(int id1,int id) throws BDException{

		try{
			//int moi=Session.getIdUser(token);
//			if(moi == -1 )
//				throw new BDException("Pas connecter");
//			
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();


			String query = "SELECT * FROM Friends WHERE `from`=? AND `to`=?";
			PreparedStatement pstmt = c.prepareStatement(query);
		
			pstmt.setInt(1,id1);
			pstmt.setInt(2, id);
			
			ResultSet rs = pstmt.executeQuery();
			
			if(rs.next()){
				rs.close();
				pstmt.close();
				c.close();
			
				return true;
			}
			
			rs.close();
			pstmt.close();
			c.close();
			
			return false;

		}catch(Exception e){
			throw new BDException(e.getMessage());
		}
		
	}
	
	public static boolean isFriend(String token,int id) throws BDException{

		try{
			int moi=Session.getIdUser(token);
			if(moi == -1 )
				throw new BDException("Pas connecter");
			
			return isFriend(moi, id);
//			Class.forName("com.mysql.jdbc.Driver").newInstance();
//			Connection c = Database.getMySQLConnection();
//
//
//			String query = "SELECT * FROM Friends WHERE `from`=? AND `to`=?";
//			PreparedStatement pstmt = c.prepareStatement(query);
//		
//			pstmt.setInt(1,moi);
//			pstmt.setInt(2, id);
//			
//			ResultSet rs = pstmt.executeQuery();
//			
//			if(rs.next()){
//				rs.close();
//				pstmt.close();
//				c.close();
//			
//				return true;
//			}
//			
//			rs.close();
//			pstmt.close();
//			c.close();
			
			//return false;

		}catch(Exception e){
			throw new BDException(e.getMessage());
		}
		
	}
	
	public static boolean deleteFriend(String token, int id) throws BDException{
		try{
			int moi=Session.getIdUser(token);
			if(moi == -1 )
				throw new BDException("Pas connecter");
			
			
			if(UserTools.userExists(id)  && isFriend(token, id)){
				Class.forName("com.mysql.jdbc.Driver").newInstance();
				Connection c = Database.getMySQLConnection();

				String query = "DELETE FROM `Friends` WHERE `from`=? AND `to`=?";
				PreparedStatement pstmt = c.prepareStatement(query);

				pstmt.setInt(1,moi);
				pstmt.setInt(2, id);
				pstmt.executeUpdate();
				
				pstmt.close();
				c.close();
							
				return true;
			}
		}catch(Exception e){
			throw new BDException("Echec creation friend"+e.getMessage());
		}
		return false;
		
	}
	
	
}
