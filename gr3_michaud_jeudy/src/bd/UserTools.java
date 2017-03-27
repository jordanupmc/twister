package bd;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.json.JSONObject;

import com.mysql.jdbc.Blob;

public class UserTools {

	public static boolean userExists(String login) throws BDException{
		boolean isExist=false;
		try{
		
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c=Database.getMySQLConnection();
		
			
			String query ="SELECT * FROM USER WHERE login='"+login+"';";
			Statement st =c.createStatement();
			ResultSet rs= st.executeQuery(query);
			
			if(rs.next())
				isExist=true;
			else
				isExist=false;
			
			rs.close();
			st.close();
			c.close();
			
		}catch(Exception e){
			System.out.println(e);
			throw new BDException("echec recuperation user");
		}
		return isExist;
	}

	public static JSONObject connect(String login, String password) throws BDException{
		/*
		 * INSERT DANS SESSION ( DANS tt les cas creation de compte ou connexion ) 
		 *  METTRE UNIQUE(login) DANS USER
		 */
		int id=-1;
		if(checkPassword(login,password)){
			id=getIdUser(login);
		}
		if(id==-1)
			throw new BDException("login ou password incorrect");

		return Session.insertSession(id, false);
	}

	
	public static boolean checkPassword(String login, String password)
			throws BDException {
		boolean isOK = false;
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();
			//Statement st = c.createStatement();
			
		    byte[] byteContent = password.getBytes();
		    java.sql.Blob blob =  c.createBlob();//Where connection is the connection to db object. 
		    blob.setBytes(1, byteContent);
			
		    //System.out.println(password);
		    String query = "SELECT * FROM USER WHERE login=? AND password=? ;";
			
			PreparedStatement pstmt = c.prepareStatement(query);
			pstmt.setString(1, login);
		    pstmt.setString(2,password);
		    
			//String query = "SELECT * FROM USER WHERE login=\"" + login+ "\" and password=" + password + "\";";
			
		    
		    ResultSet rs = pstmt.executeQuery();

			if (rs.next())
				isOK = true;
			else
				isOK = false;

			rs.close();
			pstmt.close();
			c.close();

		} catch (Exception e) {
			System.out.println(e);
			throw new BDException("echec verification password-user");
		}

		return isOK;
	}
	
	
	public static int getIdUser(String login) throws BDException {
		int id = 0;
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();
			Statement st = c.createStatement();
			String query = "SELECT id FROM USER WHERE login='" + login + "';";
			ResultSet rs = st.executeQuery(query);
			
			if(rs.next())
				id=rs.getInt(1);
			else
				id=-1;
			
			rs.close();
			st.close();
			c.close();

		} catch (Exception e) {
			System.out.println(e);
			throw new BDException("echec recuperation id-user");
		}
		return id;
	}
	
	public static boolean insertUser(String prenom, String nom, String login, String password) throws BDException{
		try {
			
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();
	//		Statement st = c.createStatement();
			
			String query = "INSERT INTO USER(login,password,nom,prenom) VALUES(?,?,?,?)";
			
			PreparedStatement pstmt = c.prepareStatement(query);
			pstmt.setString(1, login);
			pstmt.setString(2, password);
			pstmt.setString(3, nom);
			pstmt.setString(4,prenom);
			
			pstmt.executeUpdate();
			
			pstmt.close();
			c.close();
			
		}catch(Exception e){
			throw new BDException("Echec creation d'un user"+e);
		}
		return true;
	}
	
	public static boolean userExists(int id) throws BDException{
		boolean isExist=false;
		try{
		
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c=Database.getMySQLConnection();
		
			
			String query = "SELECT * FROM USER WHERE id=?";
			
			PreparedStatement pstmt = c.prepareStatement(query);
			pstmt.setInt(1, id);
			ResultSet rs= pstmt.executeQuery();
			
			if(rs.next())
				isExist=true;
			else
				isExist=false;
			
			rs.close();
			pstmt.close();
			c.close();
			
		}catch(Exception e){
			System.out.println(e);
			throw new BDException("echec recuperation user");
		}
		return isExist;
	}

	public static boolean logout(String token) throws BDException{
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Connection c = Database.getMySQLConnection();
			
			String query = "DELETE FROM session WHERE token=?";

			PreparedStatement pstmt = c.prepareStatement(query);
			pstmt.setString(1,token);
			pstmt.executeUpdate();
			
			pstmt.close();
			c.close();
		
		}catch(Exception e){
			throw new BDException("Echec deconnexion");
		}
		return true;
	}
	//TODO 
	//CHOIX connexion multiple ou pas ? 
	// logout en fonction du choix
}
