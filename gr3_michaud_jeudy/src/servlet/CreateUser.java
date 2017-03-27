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
 
/**
 * Servlet implementation class HelloWorld
 */
@SuppressWarnings("serial")
public class CreateUser extends HttpServlet {
 
 /**
 * Default constructor.
 */
 public CreateUser() {
 }
 protected void doPost(HttpServletRequest request,
		 HttpServletResponse response) throws ServletException, IOException {
	 doGet(request,response);
}
 /*
 * This method will handle all GET request.
 */
 protected void doGet(HttpServletRequest request,
 HttpServletResponse response) throws ServletException, IOException {
	 
 	response.setContentType( " application / json " );
 	String prenom=request.getParameter("prenom");
 	String nom=request.getParameter("nom");

 	String login=request.getParameter("login");
 	String mdp=request.getParameter("password");

	PrintWriter out = response.getWriter ();
	
 	if(prenom==null || nom==null || login==null || mdp==null){
 		  out.println(ErrorService.serviceRefused(-1,"au moins un param est null"));
 		  return;
 	}
 	
 	JSONObject obj= services.User.createUser(prenom, nom, login, mdp);
 	
 	out.print(obj);
 	
 }
}
 
