package servlet;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
/**
 * Servlet implementation class HelloWorld
 */
@SuppressWarnings("serial")
public class Addition extends HttpServlet {
 
 /**
 * Default constructor.
 */
 public Addition() {
 }
 
 /*
 * This method will handle all GET request.
 */
 protected void doGet(HttpServletRequest request,
 HttpServletResponse response) throws ServletException, IOException {
	 
 	response.setContentType( " text / plain " );
	PrintWriter out = response.getWriter ();
	
	int a= Integer.parseInt(request.getParameter("a"));
	int b= Integer.parseInt(request.getParameter("b"));
	
	out.println(a+b );
 }
}
 