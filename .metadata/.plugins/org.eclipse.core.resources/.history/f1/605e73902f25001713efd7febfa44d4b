package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import services.ErrorService;
import bd.BDException;
import bd.Session;

public class GetUserInfo extends HttpServlet {

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doGet(request,response);
	}
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		response.setContentType( "text / plain"  );
		String token=request.getParameter("token");
		String login=request.getParameter("login");

		PrintWriter out = response.getWriter ();

		if(token==null || login == null){
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

		JSONObject obj= services.User.getUser(login);
		
		if(obj == null)
			out.println(ErrorService.serviceRefused(-2,"Impossible de supprimer le commentaire"));
		else
			out.print(obj);

	}
}
