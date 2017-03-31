function makeConnectionPanel(){
	var s="";
	s="<div id=\"connecting\"> <p style=\"color:red\" id=\"errMsg\"></p>"
	+"<p> <img src=\"image/logo.png\" alt=\"Smiley face\"></p>"
	+"<div class=\"login\">"
	+"<form action=\"javascript:(function(){return;}())\" method=\"post\" onsubmit=\"javascript:ConnectionLogin()\">"
	+"<input id=\"logIN\" name=\"login\" placeholder=\"Login\" required type=\"text\" value=''>"
	+"<input id=\"pass\" name=\"pass\" placeholder=\"Password\" required type=\"password\">"
	+"<button type=\"submit\" class=\"btn btn-primary btn-block btn-large\">Login</button>"
	+"<a href=\"javascript:void(0);\" onclick=\"javascript:makeEnregistrementPanel()\">  &nbsp;Vous n'avez pas de compte?</a>"
	+"</form>"
	+"</div>\n</div>"
	var res = document.getElementsByTagName('body')[0];   
	res.innerHTML=s;
	//$('body').html(s);
	
}


function ConnectionLogin(){
	var lg=$("#logIN");
	var password1=$("#pass");
	var err=$("#errMsg");
	var noFail = true;



	if( lg.val()==undefined){
		err.text("Login trop court");
		noFail = false;

	}
	if( lg.length==undefined){
		err.text("Login INDEFINI");
		noFail = false;

	}
	if( password1.val().length<4){
		err.text("Mot de passe trop court");
		noFail = false;

	}
	if(noFail){
		Connectex(lg.val(),password1.val());
	}

}

function Connectex(login,password){
	var err1=$("#errMsg");
	$.ajax({
		type:"POST",
		url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/login",
		data:"login="+login+"&password="+password,
		dataType:"json",
		success: function(result){
			if(result.status=="KO"){
				err1.text("Message Error : "+result.textError);
				console.log("code error : "+result.code);
				console.log("Message Error : "+result.textError);

			}else{
				env.token=result.token;
          		makeMainPanel(result.id, result.login);
			}
		},
		error: function(jqXHR,textStatus,errTHrown){
			console.log(textStatus);
		}
	});
}







