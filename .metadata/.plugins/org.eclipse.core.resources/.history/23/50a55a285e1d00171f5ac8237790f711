package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

<<<<<<< HEAD
=======
import org.json.JSONException;
import org.json.JSONObject;

>>>>>>> 8830f688f9ee2e84c32c4f3e3380a9b1b304f315
import bd.BDException;
import bd.Session;
import services.ErrorService;
import services.SuccessService;

public class AddComment extends HttpServlet {
	protected void doPost(HttpServletRequest request,
			 HttpServletResponse response) throws ServletException, IOException {
		 doGet(request,response);
	}
	
	 protected void doGet(HttpServletRequest request,
			 HttpServletResponse response) throws ServletException, IOException {

		 response.setContentType( " text / plain " );
		 PrintWriter out = response.getWriter ();
		 
		 String com=request.getParameter("text");
		 String token=request.getParameter("token");

		 String idPost=request.getParameter("id_post");
		 
		 if(idPost == null || token == null || com == null){
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
<<<<<<< HEAD
		 
		 if(services.Comments.comment(token, com, idPost))
			 out.println(SuccessService.serviceSuccess("comment ajouter avec success"));
		 else
			 out.println(ErrorService.serviceRefused(-2,"echec ajout du commentaire"));
=======
		 JSONObject obj= new JSONObject();
		 try {
			obj.put("comments",services.Comments.comment(token, com, idPost));
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		 
		 try {
			if(obj != null && obj.get("comments") !=null ){
				 try {
						obj.put("status", "OK");
					} catch (JSONException e) {
						e.printStackTrace();
						 out.println(ErrorService.serviceRefused(-2,"echec ajout du commentaire"));
					}
				 out.println(obj);
			 }
			else
				 out.println(ErrorService.serviceRefused(-2,"echec ajout du commentaire"));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			 out.println(ErrorService.serviceRefused(-2,"echec ajout du commentaire"));
		}
>>>>>>> 8830f688f9ee2e84c32c4f3e3380a9b1b304f315
		 
		 
	 }

}
