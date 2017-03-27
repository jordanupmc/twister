function makeEnregistrementPanel(){
	var s ="";    
	s="<p style=\"color:red\" id=\"errMsg\"></p>"
	+"<p> <img src=\"image/logo.png\" alt=\"Smiley face\"></p>"
      +"<div class=\"login\">"
    +"<form method=\"post\" onsubmit=\"enregistrement()\" action=\"javascript:(function(){return;}())\">"
     +"<input id=\"name\" name=\"Nom\" placeholder=\"Nom\" required type=\"text\">"
      +"<input id=\"prenom\"  name=\"prenom\" placeholder=\"Prenom\" required type=\"text\">"
      +"<input id=\"password1\"  name=\"password1\" placeholder=\"Password\" required=\"required\" type=\"password\">"
      +"<input id=\"password2\"  name=\"password2\" placeholder=\"Confirm Password\" required type=\"password\">"
      +"<button type=\"submit\" class=\"btn btn-primary btn-block btn-large\">Rejoindre</button>"
      +"<a href=\"LoginPage.html\"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Vous avez déjà un compte? </a>"
    +"</form>"
  +"</div>"

	var res = document.getElementsByTagName('body')[0]   
    res.innerHTML=s;
}

function enregistrement(){
	var nom=$("#name");
	var prenom=$("#prenom");
	var password1=$("#password1");
	var password2=$("#password2");

	var err=$("#errMsg");
	if( password2.val() != password1.val())
		err.text("Mot de passe différent");
	else
		err.text("");

	$.ajax({url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/login", success: function(result){
       console.log(result);
    }, error: function(argument) {
    	console.log(argument);
    }, type:"POST", data:"login=popo&password=pupu"});

}
