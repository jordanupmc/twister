package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import bd.BDException;
import bd.Session;

import com.mongodb.DBObject;

import services.Comments;
import services.ErrorService;

public class ListMessage extends HttpServlet {
	protected void doPost(HttpServletRequest request,
			 HttpServletResponse response) throws ServletException, IOException {
		 doGet(request,response);
	}
	
	 protected void doGet(HttpServletRequest request,
			 HttpServletResponse response) throws ServletException, IOException {

		 response.setContentType( " application / json " );
		 PrintWriter out = response.getWriter ();
		 String token=request.getParameter("token");
		 int id=0;
		 try{

			 id=Integer.parseInt(request.getParameter("id"));

		 }catch(NumberFormatException e){
			 out.println(ErrorService.serviceRefused(-1,"Param null"));
			 return;
		 }


		 if(token==null){
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


		 List<DBObject> list;
		 JSONObject obj=new JSONObject();

		 try {
			 list = Comments.getListMessage(token, id);

			 if(list == null){
				 obj.put("messages", new JSONArray());
				 return;
			 }
			 
			 obj.put("messages", list);
			 
		 }catch (JSONException e) {
			 // TODO Auto-generated catch block
			 e.printStackTrace();
			 out.println(ErrorService.serviceRefused(10000,"Erreur inconnu "+e));
			 return;
		 }catch (BDException e1) {
			 // TODO Auto-generated catch block
			 e1.printStackTrace();
			 out.println(ErrorService.serviceRefused(1000,e1.getMessage()));
		 }
		 out.print(obj);
	 }

}
