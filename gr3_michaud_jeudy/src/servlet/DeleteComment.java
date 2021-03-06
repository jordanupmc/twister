package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import services.ErrorService;
import bd.BDException;
import bd.Session;

import com.mongodb.DBObject;

public class DeleteComment extends HttpServlet {

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doGet(request,response);
	}
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		response.setContentType( "text / plain"  );
		String token=request.getParameter("token");
		String id_post=request.getParameter("id_post");
		String id_com=request.getParameter("id_com");

		PrintWriter out = response.getWriter ();

		if(token==null || id_post==null || id_com ==null){
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

		DBObject obj= services.Comments.removeCommentByToken(id_post, id_com,token);

		if(obj == null)
			out.println(ErrorService.serviceRefused(-2,"Impossible de supprimer le commentaire"));
		else
			out.print(obj);

	}
}
