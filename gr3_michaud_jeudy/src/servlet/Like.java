package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.DBObject;

import services.ErrorService;
import services.SuccessService;
import bd.BDException;
import bd.Session;

public class Like extends HttpServlet {
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doGet(request,response);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		response.setContentType( " text / plain " );
		PrintWriter out = response.getWriter ();

		String idPost=request.getParameter("id_post");
		String token=request.getParameter("token");


		if(idPost == null || token == null ){
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
			ErrorService.serviceRefused(1000, e.getMessage());
			return;
		}

		DBObject o=services.Comments.like(token, idPost);
		if(o ==null){
			out.println(ErrorService.serviceRefused(-2,"echec like"));
			return;
		}

		JSONObject obj= new JSONObject();
		try {
			obj.put("like", o);
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}


		try {
			if(obj != null && obj.get("like") != null){
				try {
					obj.put("status", "OK");
				} catch (JSONException e) {
					e.printStackTrace();
					out.println(ErrorService.serviceRefused(-2,"echec like"));
				}
				out.println(obj);
			}
			else
				out.println(ErrorService.serviceRefused(-2,"echec like"));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			out.println(ErrorService.serviceRefused(-2,"echec like"));
		}

	}

}
