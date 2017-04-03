package servlet;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import services.ErrorService;

/**
 * Servlet implementation class HelloWorld
 */
@SuppressWarnings("serial")
public class Login extends HttpServlet {

	/**
	 * Default constructor.
	 */
	public Login() {
		
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

		response.setContentType( "text / plain" );


	 	String login=request.getParameter("login");
	 	String mdp=request.getParameter("password");
	 	
	 	JSONObject obj=services.User.login(login, mdp);
	 	
	 	
	 	PrintWriter out = response.getWriter ();
		out.print(obj);

	}

}