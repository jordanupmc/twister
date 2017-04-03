function ScrollMessage(token){
 

 if($(window).scrollTop() == $(document).height() - $(window).height()){
  $.ajax({
    type:"POST",
    url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/listMessage",
    data:"token"=+token,
    dataType:"json",
    success: function(result){
      if(result.status=="KO"){
        err1.text("Message Error : "+result.textError);     
      }else{
        env.messages=result.messages;
        env.token=token;
              //makeMainPanel(env.id, env.login);
            }
          },
          error: function(jqXHR,textStatus,errTHrown){
            console.log(textStatus);
          }
        });
}
}