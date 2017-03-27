function makeConnectionPanel(){
	var s="<p style=\"color:red\" id=\"errMsg\"></p>"
	+"<p> <img src=\"image/logo.png\" alt=\"Smiley face\"></p>"
	+"<div class=\"login\">"
	+"<form action=\"javascript:(function(){return;}())\" method=\"get\" onsubmit=\"javascript:ConnectionLogin()\">"
	+"<input id=\"login\" name=\"login\" placeholder=\"Login\" required type=\"text\" value=''>"
	+"<input id=\"pass\" name=\"pass\" placeholder=\"Password\" required type=\"password\">"
	+"<button type=\"submit\" class=\"btn btn-primary btn-block btn-large\">Login</button>"
	+"<a href=\"LoginPage.html\">  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Vous n'avez pas de compte?</a>"
	+"</form>"
	+"</div>"
	var res = document.getElementsByTagName('body')[0];   
	res.innerHTML=s;
	//$('body').html(s);
	
}

function ConnectionLogin(){
	var lg=$("#login");
	var password1=$("#pass");
	var err=$("#errMsg");

	console.log(lg.val());
	console.log(password1.val());

	if( lg.val()==undefined){
		err.text("Login trop court");
	}
	if( lg.length==undefined){
		err.text("Login INDEFINI");
	}
	if( password1.val()<8){
		err.text("Mot de passe trop court");
	}
	  Connectex(lg.val(),password1.val());

}

function Connectex(login,password){
	$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/login",
			data:"login="+login+"&password="+password,
			dataType:"json",
			success: function(result){
				//GERER les codes d'err
				console.log(result.status+" "+result.textError)

			},
			error: function(jqXHR,textStatus,errorThrown) {
				console.log(textStatus);
			}
			});
}







