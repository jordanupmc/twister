function makeConnectionPanel(){
	var s=""
	+"<div id=\"connecting\"> <p id=\"errMsg\"  style=\"visibility:hidden\"></p>"
	+"<p> <img src=\"image/logo.png\" alt=\"Smiley face\"></p>"
	+"<div class=\"login\">"
	+"<form action=\"javascript:(function(){return;}())\" method=\"post\" onsubmit=\"javascript:ConnectionLogin()\">"
	+"<input id=\"logIN\" name=\"login\" placeholder=\"Login\" required type=\"text\" value=''>"
	+"<input id=\"pass\" name=\"pass\" placeholder=\"Password\" required type=\"password\">"
	+"<button type=\"submit\" class=\"btn btn-primary btn-block btn-large\">Login</button>"
	+"<a href=\"javascript:void(0);\" onclick=\"javascript:makeEnregistrementPanel()\"> Vous n'avez pas de compte?</a>"
	+"</form>"
	+"<div id=\"spinner2\"style=\"visibility:hidden\"></div>\n<p id=\"charge\"  style=\"visibility:hidden\"></p>"
	+"</div>\n</div>"

	var res = document.getElementsByTagName('body')[0];   
	res.innerHTML=s;
	
}


function ConnectionLogin(){
	var lg=$("#logIN");
	var password1=$("#pass");
	var err=$("#errMsg");
	var noFail = true;
	$("#charge").text("Chargement...");


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
	if(VerifChamp(lg)){
		err.text("Login : Caractères spéciaux interdit");
		noFail = false;
	}

	if(noFail){
		Connectex(lg.val(),password1.val());
	}else{
		document.getElementById('errMsg').style.visibility = "visible";;
	}
	
}

function Connectex(login,password){
	document.getElementById('spinner2').style.visibility = "visible";
	document.getElementById('charge').style.visibility = "visible";
	var err1=$("#errMsg");
	$.ajax({
		type:"POST",
		url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/login",
		data:"login="+login+"&password="+password,
		dataType:"json",
		success: function(result){
			document.getElementById('charge').style.visibility = "hidden";
			document.getElementById('spinner2').style.visibility = "hidden";
			if(result.status=="KO"){
				err1.text("Message Error : "+result.textError);
				document.getElementById('errMsg').style.visibility = "visible";
			}else{
				
				env.token=result.token;
				if(result.friends.status == "OK"){
					env.friends=result.friends.friendList;

					if(env.friends == null || env.friends == undefined)
						env.friends=[];
				}
				
				makeMainPanel(result.id, result.login);
			}
		},
		error: function(jqXHR,textStatus,errTHrown){
			err1.text("Erreur interne ");
		}
	});
}







function VerifChamp(champ) {
	var exp=new RegExp("^[a-zA-Z0-9]{3,8}$","g");
	if ( exp.test(champ)) {
		return true;
	}else{
		return false; 
	}
}