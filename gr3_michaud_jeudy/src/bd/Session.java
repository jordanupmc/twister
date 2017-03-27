package bd;

import java.sql.*;
import java.util.Date;
import java.util.UUID;

import org.json.JSONObject;
public class Session {

	public static JSONObject insertSession(int id_user, boolean b)
			throws BDException {
		String session = "";
		// Boolean b ert à dire si tu es root ou pas
		JSONObject j=new JSONObject();
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();
			Statement st = c.createStatement();
			
			boolean r = true;
			int token = UUID.randomUUID().hashCode();
			
			String queryH = "SELECT token FROM session WHERE token = \""+ token + "\";";
			ResultSet res = st.executeQuery(queryH);
			
			
			//res.previous();
			
			while (r) {
				token = UUID.randomUUID().hashCode();
				
				if (res.next())
					r = true;
				else
					r = false;
			
				res.beforeFirst(); //Retour au debut
			}

			String query = "Insert into session (token,id_user) VALUES (\"" + token + "\",\""+ id_user + "\")";
			st.executeUpdate(query);
			st.close();
			c.close();
			
			j.put("token",token);
			j.put("id", id_user);
		
		} catch (Exception e) {
			System.out.println(e);
			throw new BDException("echec insertion session ");
		}
		return j;
	}
	
	public static int getIdUser(String token)
			throws BDException {
		int id=-1;
		try {
			
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();
			Statement st = c.createStatement();

			String queryH = "SELECT id_user FROM session WHERE token = "+ token + ";";
			ResultSet res = st.executeQuery(queryH);

			if(res.next())
				id=res.getInt(1);
			else
				id=-1;

			res.close();
			st.close();
			c.close();


		}catch(Exception e){
			e.printStackTrace();
			throw new BDException("echec recuperation ID user");
		}

		return id;
	}
	
	public static boolean checkToken(String token)
			throws BDException{
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();
			Statement st = c.createStatement();

			String querTimestampyH = "SELECT timestamp FROM session WHERE token = "+ token + ";";
			ResultSet res = st.executeQuery(querTimestampyH);
			
			Timestamp time;
			if(res.next())
				time=res.getTimestamp(1);
			else
				return false;
			
			Timestamp current = new Timestamp(System.currentTimeMillis());
			
			Date t= current;
			
			long b= t.getTime(); 
			
			t=time;
			long bdd=t.getTime();
			
			
			if(b-bdd > 60*1000*30){
				return false;
			}
			
			res.close();
			st.close();
			c.close();

				
			
		}catch(Exception e){
			throw new BDException("Echec checkToken");
		}
		return true;
	}

	public static void deleteToken(String token) throws BDException{
		// TODO Auto-generated method stub
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();
			
			String query = "DELETE FROM session WHERE token=?";

			PreparedStatement pstmt = c.prepareStatement(query);
			pstmt.setInt(1, Integer.parseInt(token));
			
			pstmt.executeUpdate();
		
			pstmt.close();
			c.close();

		}catch(Exception e){
			throw new BDException("Echec suppression token"+e.getMessage());
		}
	}
	
	public static void updateToken(String token)  throws BDException{
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();
			
			String query = "UPDATE `session` SET `timestamp`=NOW() WHERE token=?";

			PreparedStatement pstmt = c.prepareStatement(query);
			pstmt.setInt(1, Integer.parseInt(token));
			
			pstmt.executeUpdate();
		
			pstmt.close();
			c.close();

		}catch(Exception e){
			throw new BDException("Echec update token"+e.getMessage());
		}
	}
	
	

}
