package servlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.DBObject;

import bd.BDException;
import bd.Session;
import services.ErrorService;

/**
 * Servlet implementation class HelloWorld
 */
@SuppressWarnings("serial")
public class Search extends HttpServlet {

	/**
	 * Default constructor.
	 */
	public Search() {
		
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
		String[] sf=request.getParameterValues("friend");
		String token=request.getParameter("token");
		String query=request.getParameter("query");
		List<DBObject> list;
		JSONObject obj=new JSONObject();
		PrintWriter out = response.getWriter ();
		
	 	if(token==null || query==null || sf==null ){
	 		  out.println(ErrorService.serviceRefused(-1,"au moins un param est null"));
	 		  return;
	 	}
		int [] friends =new int[sf.length];
		
		
		for(int i=0; i< friends.length; i++){
			friends[i]=Integer.parseInt(sf[i]);
		}
		
		
		try {
			if(!Session.checkToken(token)){
				 out.println(ErrorService.serviceRefused(1000,"Token obsolete"));
				 Session.deleteToken(token);
				 return;
			}
			Session.updateToken(token);
			
			list =services.Search.searchPost(token, friends, query);
			 if(list == null){
				 obj.put("search", new JSONArray());
				 return;
			 }
			 JSONArray listMsg=new JSONArray(list);
			 obj.put("search", listMsg);
			 out.println(obj);
			 
		} catch (BDException e) {
			 out.println(ErrorService.serviceRefused(1000,"Erreur recherche "+e));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			 out.println(ErrorService.serviceRefused(100,"Erreur JSON recherche "+e));
		}
		
			
		
	
		
	}

}