
function conexion(form){
	var login = form.login.value;
	var pass = form.pass.value;
	if(verifFormConnexion(login , pass)){
		connecte(login, pass);
	}
}

function verifFormConnexion(login, password){
	if(login.length==0){
		funcError("login obligatoire");
	}
	
	if(password.length<8){
		funcError("Mot de passe trop court");
	}
	if(login.length > 20){
			funcError("login trop long");
	}
	
}
		
function funcError(msg){
	var msgBox = "<div id=\"msgErrConnexiion\">" + msg + "</div>";
	var oldMsg = $("#msgErrConnexiion");
	console.log($("form"));
	if(oldMsg.length == 0){
		$("form").prepend(msgBox);
	}
	else{
		oldMsg.replaceWith(msgBox);
	}
	// $("#msgErrConnexiion").css({"color":red});
}



function connecte(login, password){
	console.log(login+"  "+password);
	var idUser=78;
	var key=232323;
	if(!noConnection){

	}else{
		responseConnexion({"key":key,"id":idUser,"login":login,"follows":[2]});
	}
}

function responseConnexion(rep){
	if(rep.erreur == undefined){
		env.key = rep.key;
		env.id = rep.id;
		env.login = rep.login;
		env.follows = new set();
		for(var i = 0; i < rep.follows.length; i++){
			env.follows.add(rep.follows[i]);
	
		}
		if(noConnection){
			if(follows[rep.id] == undefinned){
				follows[rep.id] = new set();
			}
			for(var i = 0; rep.follows.length; i++){
				follows[rep.id].add(rep.follows[i]);
			}
		}
		makeMainPanel(rep.id, rep.login);
	}else{
		funcError(rep.erreur);
	}
}

function makeConnexionPanel(){
	$("head").append("<link href=\"connexion.css\" rel=\"stylesheet\" type=\"text/css\"/>");
	var s ="</head>";
	s+="\n<p> <img src=\"image/logo.png\" alt=\"Smiley face\"></p>";
	s+="\n<div class=\"login\">";
	s+="\n<form method=\"post\">";
	s+="\n<input name=\"user\" placeholder=\"Login\" required=\"required\" type=\"text\">";
	s+="\n<input name=\"password\" placeholder=\"Password\" required=\"required\"";
	s+="\ntype=\"password\">";
	s+="\n<button type=\"submit\" class=\"btn btn-primary btn-block btn-large\">Login</button>";
	s+="\n<a href=\"LoginPage.html\">  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Vous n'avez pas de compte?</a>";
	s+="\n</form>";
	s+="\n</div>";
	s+="\n<footer>";
	s+="\n<p>Posted  by :   gr3_jeud_mich</p>";
	s+="\n</footer>";
	var res = document.getElementById("body");
	res.innerHTML=s;
	// $("body").html(s);
	// return s;
}



function revival(key, value){
	if(key==="erreur" && value!==0)
		return {key:value};
	if(value.comments!==undefined)
		return (new Message(value._id.inc, value.auteur, value.texte, value.date, value.comments));
	if(value.text!==undefined)
		return (new Comment(value._id.inc, value.auteur, value.texte, value.date));
	if(key==="date")
		return (new Date());
	return (value);
}






function makeConnexionPanel(){
	var s = "<header>\n<img src=\"image/logo.png\" alt=\"\">\n<form action=\"javascript:(function(){return;}())\">\n<input type=\"text\" name=\"search\" placeholder=\"Chercher...\">\n<input type=\"image\" src=\"image/Search-48.png\" alt=\"err\">\n</form>\n<div >\n<a href=\"LoginPage.html\"><img id=\"logout\" src=\"image/logout.png\" alt=\"\"></a>\n</div>\n</header>";
	var res = document.getElementById("corps");
        res.innerHTML=s;
		
}


function makeEnregistrementPanel(){
	var s ="";
    
	var res = document.getElementById("corps");
        res.innerHTML=s; 	
}




function makeMainPanel(fromId, fromLogin, query){
	
	if(fromId===undefined){
		fromId=-1;
	}
	env.fromId=fromId;
	
	if(fromLogin===undefined){
		fromLogin="";
	}
	env.fromLogin=fromLogin;
	if(query===undefined){
		query="";
	}
	env.query=query;
	env.mgs=[];
	Console.by(env.fromLogin);
	
	if(env.fromId<0)
		var s = "Mon actualité HTML";
	else{
		if (env.fromId===env.id){
			var s="Ma page HTML";
		}
		else{
			if(env.follows[env.id].has(env.fromId)){
				var s="Page de l'ami HTML + bouton ne plus suivre";
			}
			else{
				var s="Page de la personne (qui n'est pas encore mon ami) + bouton suivre";
			}
		}
	}
	
	$("body").html(s);
}


Commentaire.prototype.getHtml=function(){
	var s = "<div id=\"Commentaire_"+this.id+"\" class=\"commentaire\">\n";
	s += "\t\t<div class=\"auteur\">"+this.auteur.login+"</div>\n";
	s += "\t\t<div class=\"texte\">"+this.texte+"</div>\n";
	s += "\t\t<div class=\"date\">"+this.date+"</div>\n\t</div>\n";
	return s;
}

var mon_message = new Message(14, {"id":23,"login":"Jordan"}, "blabla", new Date());

function revival(key,value){
	if(value != undefined ){
		return new Message(value.id,value.auteur,value.texte,value.date,value.comments);
	}
	else if(value.comments != undefined){
		return  new Message(value.id, value.auteur, value.texte, value.date, value.comments);;
	}else if(value.text != undefined){
		var c = new Commentaire(value.id, value.auteur, value.texte, value.date);
		return c;
	}else if(key =='date'){
		return new Date(value);
	}else{
		return value;
	}
}



function init(){
	env = new Object();
	env.noConnection = true;
	document.getElementsByTagName('body')[0].innerHTML = makeMainPanel(1,1,'');
}


function makeMainPanel(fromId, fromLogin, query){
	env.msg = [];
	env.minId = -1;
	env.maxId = -1;
	env.fromId = fromId;
	env.fromLogin =fromLogin;
	env.query = query;

	if(fromId == undefined){
		env.fromId = -1;
	}
	if(fromLogin == undefined){
		env.fromLogin = -1;
	}

	console.log(env.fromLogin);

	var s="";
	s+="\n<p> <img src=\"image/logo.png\" alt=\"Smiley face\"></p>";
	s+="\n<div class=\"login\">";
	s+="\n<form method=\"post\">";
	s+="\n<input name=\"user\" placeholder=\"Login\" type=\"text\">";
	s+="\n<input name=\"password\" placeholder=\"Password\" ";
	s+="\ntype=\"password\">";
	s+="\n<button type=\"submit\" class=\"btn btn-primary btn-block btn-large\">Login</button>";
	s+="\n<a href=\"LoginPage.html\">  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Vous n'avez pas de compte?</a>";
	s+="\n</form>";
	s+="\n</div>";
	s+="\n<footer>";
	s+="\n<p>Posted  by :   gr3_jeud_mich</p>";
	s+="\n</footer>";

	
	return s;
}




