package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.DBObject;

import services.Comments;
import services.ErrorService;
import bd.BDException;
import bd.Session;

public class GetStatsUser extends HttpServlet {
	protected void doPost(HttpServletRequest request,
			 HttpServletResponse response) throws ServletException, IOException {
		 doGet(request,response);
	}
	
	 protected void doGet(HttpServletRequest request,
			 HttpServletResponse response) throws ServletException, IOException {

		 response.setContentType( " text / plain" );
		 PrintWriter out = response.getWriter ();
		 
		 String token=request.getParameter("token");
		 String from=request.getParameter("from");
		 
		 boolean f;
		 
		 int id=0;
		 
		 try{
			 id=Integer.parseInt(from); //JUST CHECK IF from est bien un entier
		 }catch(NumberFormatException e){
			 out.println(ErrorService.serviceRefused(-1,"Param null"));
			 return;
		 }
		 
		 if(token==null || from == null){
			 out.println(ErrorService.serviceRefused(-1,"Param null"));
			 return;
		 }

		 try {
			 if(!Session.checkToken(token)){
				 out.println(ErrorService.serviceRefused(1000,"Token obsolete"));
				 Session.deleteToken(token);
				 return;

			 }
			 Session.updateToken(token);
		 } catch (BDException e) {
			 // TODO Auto-generated catch block
			 out.println(ErrorService.serviceRefused(1000,e.getMessage()));
			 return;
		 }
		 JSONObject obj=new JSONObject();
		 try {
			 DBObject tmp=Comments.countLike(from);
			 DBObject tmp2=Comments.countPost(from);
			 
			 JSONObject o1 =new JSONObject();
			 JSONObject o2 =new JSONObject();
			 if(tmp == null){
				 o1.put("id", new JSONArray());
				 o1.put("nb", 0);
				 obj.put("like",o1);
			 }else
				 obj.put("like",tmp); 
			
			if(tmp2 == null){
				 o2.put("id", new JSONArray());
				 o2.put("nb", 0);
				 obj.put("post",o2);
			 }else
				 obj.put("post",tmp2); 
			 
			obj.put("status","OK");
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			out.println(ErrorService.serviceRefused(1000,e.getMessage()));
			return;
		}
		 out.println(obj);
		 
	 }
}
