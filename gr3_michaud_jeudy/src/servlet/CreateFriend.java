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

public class CreateFriend extends HttpServlet {
	protected void doPost(HttpServletRequest request,
			 HttpServletResponse response) throws ServletException, IOException {
		 doGet(request,response);
	}
	protected void doGet(HttpServletRequest request,
			 HttpServletResponse response) throws ServletException, IOException {
				 
			 	response.setContentType( " application / json " );
			 	String token=request.getParameter("token");
			 	String id=request.getParameter("id");
			 	PrintWriter out = response.getWriter ();
				
			 	if(token==null || id==null ){
			 		  out.println(ErrorService.serviceRefused(-1,"au moins un param est null"));
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
			 	
			 	JSONObject obj= services.Friend.createFriend(token, Integer.parseInt(id));
			 	out.print(obj);
			 	
			 }

}
