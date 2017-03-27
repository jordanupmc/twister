package servlet;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import services.Operation;
 
/**
 * Servlet implementation class HelloWorld
 */
public class Application extends HttpServlet {
 
 /**
 * Default constructor.
 */
 public Application() {
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
	String s=request.getParameter("op");
	out.println(Operation.calcul(a,b,s));
 }
}
 