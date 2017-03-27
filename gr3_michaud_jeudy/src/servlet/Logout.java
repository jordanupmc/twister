package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import services.ErrorService;

public class Logout extends HttpServlet{
	public Logout() {

	}
	protected void doPost(HttpServletRequest request,
			 HttpServletResponse response) throws ServletException, IOException {
		 doGet(request,response);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		response.setContentType( "text / plain" );

		PrintWriter out = response.getWriter ();
		String token=request.getParameter("token");

		if(token ==null){
			 out.println(ErrorService.serviceRefused(-1,"Param null"));
		}
		JSONObject obj=services.User.logout(token);
		
		
		out.print(obj);

	}
}
