function makeSettingsPanel(){
	$("#cont_message > ul").empty();
	$("#post_message").empty();
	var s="<div class=\"message\" id=\"settings\">"+
	"<h1>Vos informations</h1>"+
	"<p id=\"current_login\"></p>"+
	"<p id=\"current_nom\"></p>"+
	"<p id=\"current_prenom\"></p><hr>"+
	"<h1>Modifier votre profil</h1>"+
	"<form action=\"javascript:(function(){return;}())\" method=\"post\" onsubmit=\"javascript:editUser()\">"+
	"<label for=\"nom\">Nom</label><input id=\"nom\" name=\"nom\" placeholder=\"Entrez un nouveau nom\" type=\"text\" value=''>"+
	"<br><label for=\"prenom\">Prénom</label><input id=\"prenom\" name=\"prenom\" placeholder=\"Entrez un nouveau prénom\" type=\"text\" value=''>"+
	"<br><button type=\"submit\">Modifier</button>"+
	"</form>"+
	"</div>";
	$("#cont_message > ul").after(s);
	$("#settings").css("border-bottom","none");
	getUserInfo();
}

function getUserInfo(){
	$.ajax({
		type:"POST",
		url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/getUserInfo",
		data: "token="+env.token+"&login="+env.fromLogin,
		dataType:"json",
		success: function(result){
			if(result.status =='OK'){
				$("#current_prenom").text("Prénom:  "+result.prenom);
				$("#current_nom").text("Nom:  "+result.nom);
				$("#current_login").text("Login:  "+result.login);

			}else if(result.code == 1000){
				makeConnectionPanel();
			}else if(result.code != undefined){
				swal("Erreur", "Erreur interne", "error");
			}
			},
			error: function(jqXHR,textStatus,errTHrown){
				swal("Erreur", "Erreur interne", "error");
			}
		});
}
function editUser(){
	var nom=$("#nom").val();
	var prenom=$("#prenom").val();
	var d="token="+env.token+"&id_user="+env.fromId;
	var re=/^[a-zA-Z]+$/;
	var err=0;

	if(nom == undefined && prenom == undefined){
		return;
	}
	if(nom != undefined){
		nom=nom.trim();
		if(nom.length !=0 && re.test(nom))
			d+="&nom="+nom;
		else
			err++;
	}
	if(prenom != undefined){
		prenom=prenom.trim();
		if(prenom.length != 0 && re.test(prenom))
			d+="&prenom="+prenom;
		else
			err++
	}
	if(err == 2){
		swal("Erreur", "Vérifiez vos modifications", "error");
		return;
	}
	$("#nom").val('');
	$("#prenom").val('');

	$.ajax({
		type:"POST",
		url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/editUser",
		data: d,
		dataType:"json",
		success: function(result){
			if(result.status =='OK'){
				swal("Modifier !", "Votre profil a bien été supprimé", "success");
				getUserInfo();
			}else if(result.code == 1000){
				makeConnectionPanel();
			}else if(result.code != undefined){
				swal("Erreur", "Erreur interne", "error");
			}
				//console.log(env.msg[id].likes);
			},
			error: function(jqXHR,textStatus,errTHrown){
				swal("Erreur", "Erreur interne", "error");
			}
		});


}