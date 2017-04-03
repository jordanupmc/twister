function makeEnregistrementPanel(){
  var s ="";    
  s="<div id=\"signUp\"> <p style=\"color:red\" id=\"errMsg\"></p>"
  +"<p> <img src=\"image/logo.png\" alt=\"Smiley face\"></p>"
  +"<div class=\"login\">"
  +"<form method=\"post\" onsubmit=\"enregistrement()\" action=\"javascript:(function(){return;}())\">"
  +"<input id=\"name\" name=\"Nom\" placeholder=\"Nom\" required type=\"text\">"
  +"<input id=\"prenom\"  name=\"prenom\" placeholder=\"Prenom\" required type=\"text\">"
  +"<input id=\"logIN\"  name=\"login\" placeholder=\"Login\" required type=\"text\">"
  +"<input id=\"password1\"  name=\"password1\" placeholder=\"Password\" required=\"required\" type=\"password\">"
  +"<input id=\"password2\"  name=\"password2\" placeholder=\"Confirm Password\" required type=\"password\">"
  +"<button type=\"submit\" class=\"btn btn-primary btn-block btn-large\">Rejoindre</button>"
  +"<a href=\"javascript:void(0);\" onclick=\"javascript:makeConnectionPanel()\"> Vous avez déjà un compte? </a>"
  +"</form>"
  +"</div>\n</div>"

  var res = document.getElementsByTagName('body')[0]   
  res.innerHTML=s;
}

function enregistrement(){

 var nom=$("#name");
 var prenom=$("#prenom");
 var login=$("#logIN");
 var password1=$("#password1");
 var password2=$("#password2");
 var noFail = true;
 var err=$("#errMsg");


 if( nom.val()==0){
  err.text("Nom trop court");
  noFail = false;
}

if( prenom.val()==0){
  err.text("Prenom trop court");
  noFail = false;

}

if( login.val()==0){
  err.text("Login trop court");
  noFail = false;
}

  // Aucune restriction sur la taille du mot de passe dans le servlet
  if( password1.val().length<4) {
    err.text("Mot de passe 1 trop court");
    noFail = false;
  }

  if( password2.val() !== password1.val()){
    err.text("Mot de passe différent");
    noFail = false;
  }

  if(noFail){

    Create(login.val(),password2.val(),nom.val(),prenom.val());
  }
  else{
   

  }
}

function Create(login, pass,nom, prenom){
  var err1=$("#errMsg");
  $.ajax({
    type: "POST",
    url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/createUser",
    data:"login="+login+"&password="+pass+"&nom="+nom+"&prenom="+prenom,
    dataType: "json",  
    success: function(r){
        if(r.status=="KO"){
          err1.text("Message Error : "+r.textError);
        }else{
          env.token=r.token;
          makeMainPanel(r.id,r.login);
        }
      },
      error: function(jqXHR,textStatus,errTHrown){
        console.log(textStatus);
      }

    });


}
