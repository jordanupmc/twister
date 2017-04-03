package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import bd.BDException;
import bd.Session;
import services.ErrorService;

public class GetFriendList extends HttpServlet {
	protected void doPost(HttpServletRequest request,
			 HttpServletResponse response) throws ServletException, IOException {
		 doGet(request,response);
	}
	
	protected void doGet(HttpServletRequest request,
			 HttpServletResponse response) throws ServletException, IOException {
				 
			 	response.setContentType( "text / plain"  );
			 	String token=request.getParameter("token");
			 	PrintWriter out = response.getWriter ();
				
			 	if(token==null  ){
			 		 out.println(ErrorService.serviceRefused(-1,"erreur arguments"));
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
				
			 	JSONObject obj= services.Friend.getFriendList(token);
			 	out.print(obj);
			 	
			 }
}
