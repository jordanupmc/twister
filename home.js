function Message(id, auteur, texte, date, comments, likes){
	this.id=id;
	this.auteur=auteur;
	this.post=texte;
	this.date=date;

	if(comments==undefined){
		comments=[];
	}
	if(likes==undefined){
		likes=[];
	}
	this.comments=comments;
	this.likes=likes;
}

Message.prototype.getHtml=function(){

	var s = "<li class=\"message\" id=\"message_"+this.id+"\">\n"
	if(this.auteur.id != env.fromId)
		s+="<span>\n<b><a href=\"javascript:(function(){return;}())\" onclick=\"javascript:makeMainPanel('"+env.fromId+"','"+env.fromLogin+"','"+this.auteur.id+"','"+this.auteur.login+"','"+false+"')\">"+this.auteur.login+"</a></b>\n"
	else
		s+="<span>\n<b><a href=\"javascript:(function(){return;}())\" onclick=\"javascript:makeMainPanel('"+env.fromId+"','"+env.fromLogin+"')\">"+this.auteur.login+"</a></b>\n"
	
	s+="<span class=\"dateMessage\">"+parseDate(this.date)+"</span>\n</span>\n"
	s+="<p>"+emojione.shortnameToImage(this.post)+"</p>"
	s+=getMessageFooter(this.id, this.comments.length, this.likes.length, findAuteurLike(this.likes)!=-1 );
    s += "<ul class=\"liste_message_comment\">\n</ul>\n";

	s+="</li>"

	return s;
}

function Commentaire(id, auteur, texte, date){
	this.id=id;
	this.auteur=auteur;
	this.post=texte;
	this.date=date;
}

Commentaire.prototype.getHtml=function(){
	var s = "";
	if(this.auteur.id == env.fromId){
		s+= "<li id=\"comment_"+this.id+"\"> <p> <a  href=\"javascript:(function(){return;}())\" onclick=\"javascript:makeMainPanel('"+env.fromId+"','"+env.fromLogin+"')\" ><b>"+this.auteur.login+"</b></a> "+emojione.shortnameToImage(this.post)
		+"</p> <p class=\"dateComment\">"+parseDate(this.date)
		s+="<a href=\"javascript:(function(){return;}())\" onclick=\"javascript:removeComment('"+this.id+"')\" class=\"removePostButton\"><img src=\"image/delete-message.png\" alt=\"\"></a>\n"
	}
	else
		s+= "<li id=\"comment_"+this.id+"\"> <p> <a  href=\"javascript:(function(){return;}())\" onclick=\"javascript:makeMainPanel('"+env.fromId+"','"+env.fromLogin+"','"+this.auteur.id+"','"+this.auteur.login+"','"+false+"')\" ><b>"+this.auteur.login+"</b></a> "+emojione.shortnameToImage(this.post)
		+"</p> <p class=\"dateComment\">"+parseDate(this.date)
	s+= "</p><hr></li>"
	
	return s;
}

function Like(auteur, date){
	//this.id=id;
	this.author_id=auteur;
	this.date=date;
}

Like.prototype.getHtml=function(){
	var s = "";
	return s;
}


function revival(key,value){

	if(value.comments != undefined){
		return  new Message(value._id, {"id":value.author_id,"login": value.login}, value.post, value.date, value.comments, value.like);;
	}else if(value.post != undefined){
		return new Commentaire(value._id, {"id":value.author_id,"login": value.login}, value.post, value.date);
	}else if(value.auteur_id != undefined){
		return new Like(value.author_id, value.date);
	}else if(key =='date'){
		value=value.replace(/CEST/, '+0200');
		return new Date(value);
	
	}else{
		return value;
	}
}

/*function m(){
	var text=this.post;
	var words=text.match('/\w+/g');
	var tf={};

	for(var i=0; i<words.length; i++){
		if(tf[words[i]] == null)
			tf[words[i]]=1;
		else
			tf[words[i]]+=1;
		for(w in tf){
			var ret={};
			ret[id]=tf[w];
			emit(w,ret);
		}
	}
}
function r(key,values){
	var ret={};
	for(var i=0; i<values.length; i++){
		for(var d in values[i])
			ret[d] = values[i][d];
	}
	return ret;
}

function f(k, v){
	var df= Object.keys(v).length;
	for(d in v)
		v[d]=v[d]*Math.log(N/df);
	return v;
}*/

function parseDate(d){

	var now = new Date();
	var day_diff=Math.floor( now.getTime() / (3600*24*1000)) - Math.floor( d.getTime() / (3600*24*1000));;

	var diffMs = (now - d); 
	var diffHrs = Math.floor((diffMs % 86400000) / 3600000); 
	var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
	var diffSec= (now - d) / 1000;

	if(day_diff > 28)
		return d.toLocaleDateString();
	if(day_diff < 28 && day_diff > 1)
		return "il y a "+day_diff+" jours";
	if(day_diff == 1 )
		return "hier";
	if(diffHrs > 0)
		return "il y a "+diffHrs+" h";
	if(diffMins > 0)
		return "il y a "+diffMins+" min";
	if(diffSec < 10)
		return "à l'instant";
	if(diffSec > 10)
		return "il y a "+parseInt(diffSec,10)+" s";

	return d.toLocaleDateString();
}

function getMessageFooter(id, comLength, likeLength, isLike,src){
	var s="";
	
	s += "<div class=\"message_footer\">"
    s += "<a href=\"javascript:(function(){return;}())\" onclick=\"javascript:switchImgLike('"+id+"')\"><img id=\"like_"+id+"\" ";
    
    if(src == undefined){
	    if(!isLike)
			s+="\" src=\"image/like.png\""
		else
			s+="\" src=\"image/likeFill.png\"";
	}
	else
		s+="\" src=\""+src+"\""

    s+=" alt=\"\"></a> <p id=\"cpt_like_"+id+"\" class=\"message_like\">"+likeLength+"</p>";
  
    s += "<a href=\"javascript:(function(){return;}())\" onclick=\"javascript:developpeMessage('"+id+"')\"><img src=\"image/message-bubble.png\" alt=\"\"></a><p class=\"message_comment\">"+comLength+"</p>";
   
   	//if(env.fromId == env.msg[arrayObjectIndexOf(env.msg, id, "id")].auteur.id)
    if(env.fromId == env.msg[id].auteur.id)
    	s +=  " <a href=\"javascript:(function(){return;}())\" onclick=\"javascript:removeMessage('"+id+"')\" class=\"removePostButton\"><img src=\"image/delete-message.png\" alt=\"\"></a>\n"
    s+="</div>\n";
    return s;
}

function getMessageFooterComment(id, comLength, likeLength,isLike, src){/// TODO  --************--------->  les nb LIKE
	var s= "<div class=\"message_footer_comment\">\n"
	+"<a href=\"javascript:(function(){return;}())\" onclick=\"javascript:switchImgLike('"+id+"')\"><img id=\"like_"+id;
	
	if(src == undefined){
		if(!isLike)
			s+="\" src=\"image/like.png\""
		else
			s+="\" src=\"image/likeFill.png\"";
	}
	else
		s+="\" src=\""+src+"\""

	s+= " alt=\"\"></a> <p id=\"cpt_like_"+id+"\" class=\"message_like\">"+likeLength+"</p>"
	+"<a href=\"javascript:(function(){return;}())\" onclick=\"javascript:hideComments('"+id+"')\" class=\"showCommentButton\">Cacher</a>"
	/*
	if(comLength> 5 )  /// ********* Plus de 5 commentaires on montre un bouton 
		s+="<a href=\"javascript:(function(){return;}())\" class=\"showCommentButton\"> Voir tout</a>"
	*/
	s+="</div>"
	return s;
}
function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}
function deco(){
	$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/logout",
			data:"token="+env.token,
			dataType:"json",
			success: function(result){
				if(result.status =='OK'){
					env={};
					makeConnectionPanel();
				}
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				env={};
				makeConnectionPanel();
			}
		});
	localStorage.clear();
}


function init(){
	if (typeof localStorage !== 'undefined') {

	    try {
	        if(localStorage.getItem("env") != null){
	        	env= JSON.parse(localStorage.getItem("env"));
	        	env.noConnection = false;
	        	makeMainPanel(env.fromId, env.fromLogin);
	        	
	        	return;
	        }
	    } catch(e) {	
	    	console.log(e);	        
	    }
	}
	localStorage.clear();
	env = new Object();
	env.noConnection = false;
	makeConnectionPanel()
	

}


function makeMainPanel(fromId, fromLogin, toId, toLogin,wFriends ,query){
	env.msg = [];
	env.minId = -1;
	env.maxId = -1;
	env.fromId = fromId;
	env.fromLogin =fromLogin;
	env.query = query;
	env.limit=10; //TEMPORAIRE 
	env.toId=toId;
	env.toLogin=toLogin;

	if(fromId == undefined){
		env.fromId = -1;
	}
	if(fromLogin == undefined){
		env.fromLogin = -1;
	}

	if(toId == undefined){
		env.toId = -1;
	}
	if(toLogin == undefined){
		env.toLogin = -1;
	}

	if (typeof localStorage !== 'undefined') {
		localStorage.setItem("env",JSON.stringify(env));
		//console.log(localStorage.getItem("env"))
	}

	var s="";
	s+="<div id=\"main\"> <header> <a href=\"javascript:(function(){return;}())\" onclick=\"javascript:makeMainPanel('"+env.fromId+"','"+env.fromLogin+"')\" ><img src=\"image/logo.png\" alt=\"\"></a><form onsubmit=\"javascript:searchHead()\" action=\"javascript:(function(){return;}())\">"+
	"<input type=\"text\" id=\"inputSearch\" name=\"search\" placeholder=\"Recherchez sur Twister\">"+
      "<input type=\"image\" src=\"image/Search-48.png\" alt=\"err\">"+
    "</form>"+ 
    "<div >"+
      "<a href=\"javascript:(function(){return;}())\" onclick=\"javascript:deco()\" ><img id=\"logout\" src=\"image/logout.png\" alt=\"\"></a>"+
    "</div>"+
  "</header>"+

  "<div id=\"container\">"+
   "<aside>";
   	if(env.toId == -1)
     	s+="<h1> Mon Activités </h1>"
     else{
    
     	s+="<h1 id=\"activity\"> Activités de "+env.toLogin+" </h1>"
		if(findFriendId(env.friends) != -1)
			s+="<button id=\"follow\" type=\"button\" onclick=\"javascript:unfollow('"+env.toId+"')\">ne plus suivre</button>"
		else
			s+="<button id=\"follow\" type=\"button\" onclick=\"javascript:follow('"+env.toId+"')\">Suivre</button>"
	}
     s+="<ul>"+
       "<li>Abonnements "+env.friends.length+" </li>"+
       "<li>Abonnés "+env.friends.length+" </li><hr>"+
       "<li id=\"stat_like\"><a href=\"javascript:(function(){return;}())\" onclick=\"javascript:getListMsgById('like')\">J'aime </a></li>"+
        "<li id=\"stat_twist\"><a href=\"javascript:(function(){return;}())\" onclick=\"javascript:getListMsgById('post')\">Twist </a></li>"+
       "<li><a href=\"javascript:(function(){return;}())\">Paramètres</a></li>"+
     "</ul>"+
   "</aside>"+

   "<section>"+
    "<h1> Message </h1>";
    if(env.toId == -1){
    	s+="<div id=\"post_message\">"+
		     "<form action=\"javascript:(function(){return;}())\"  onsubmit=\"newPost()\" >"+
		      "<input type=\"submit\" value=\"+\">"+
		     "<input type=\"text\" name=\"comments\" id=\"post_new\" placeholder=\"Composez un nouveau Twist...\" required>"+
		    "</form>"+
		  "</div>"
	}
  	s+="<div id=\"cont_message\">"+
  	"<ul>\n</div>";

	document.getElementsByTagName('body')[0].innerHTML= s;
	if(env.toId == -1)
		getStat(env.fromId);
	else
		getStat(env.toId);
	completeMessages(wFriends);

}


function getStat(id){
	$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/getStatsUser",
			data:"token="+env.token+"&from="+id,
			dataType:"json",
			success: function(result){
				if(result.status =='OK'){
					console.log(result)
					statResponse(result);
				}
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				env={};
				makeConnectionPanel();
			}
		});
}

function statResponse(rep){
	env.stat_like=rep.like;
	env.stat_post=rep.post;

	$("#stat_twist > a").append(rep.post.nb);
	$("#stat_like > a").append(rep.like.nb);
}

function getListMsgById(code){
	if(code == undefined)
		return;
	var arr=[];

	if(code == 'post'){
		for(var i =0; i< env.stat_twist.length; i++)
			arr[i]="post_id="+env.stat_twist[i];
	}
	if(code == 'like'){
		for(var i =0; i< env.stat_like.length; i++)
			arr[i]="post_id="+env.stat_like[i];
	}

	if(arr.length != 0)
		$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/listMessage",
			data: "token="+env.token+"&from="+env.fromId+"&"+arr.join("&"),
			dataType:"json",
			success: function(result){
				if(result.code == 1000){
					localStorage.clear();
					makeConnectionPanel();
				}
				else
					completeMessagesReponse(JSON.stringify(result.messages));
				
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				localStorage.clear();
				makeConnectionPanel();
			}
		});
	


}
function completeMessages(wFriends){
	if(!env.noConnection){

		var s ="";
		if(env.toId == -1)
			s="token="+env.token+"&from="+env.fromId+"&id_min="+env.minId+"&id_max="+env.maxId+"&nb="+env.limit;
		else
			s="token="+env.token+"&from="+env.toId+"&id_min="+env.minId+"&id_max="+env.maxId+"&nb="+env.limit;

		if(wFriends!= undefined)
			s+="&friends="+wFriends

		$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/listMessage",
			data: s,
			dataType:"json",
			success: function(result){
				if(result.code == 1000){
					localStorage.clear();
					makeConnectionPanel();
				}
				else
					completeMessagesReponse(JSON.stringify(result.messages));
				
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				localStorage.clear();
				makeConnectionPanel();
			}
		});

	}
	else{
		var tab = getFromLocaldb(env.fromId, -1, env.minId, 10);
		completeMessagesReponse(JSON.stringify(tab));
	}
}

function searchHead(){
	var query=$('#inputSearch').val();
	if(query == undefined || query == null || query.trim().length == 0 || query.trim() == "" )
		return;
	
	var s="token="+env.token+"&from="+env.toId+"&id_min="+env.minId+"&id_max="+env.maxId+"&nb="+env.limit+"&query="+encodeURIComponent(query.trim());

	$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/listMessage",
			data: s,
			dataType:"json",
			success: function(result){
				if(result.code == 1000)
					makeConnectionPanel();
				else{
					completeSearchReponse(result.messages);
				}
				
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				makeConnectionPanel();
			}
		});

}

function scrollMessage(){

	$(function() {
		var $appeared = $('#appeared');
		$("#message_"+env.maxId).appear();
		$(document.body).on('appear', "#message_"+env.maxId, function(e, $affected) {

			$.ajax({
				type:"POST",
				url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/listMessage",
				data:"token="+env.token+"&from="+env.fromId+"&idmin=-1"+"&idmax="+env.minId+"&nb="+env.limit,
				dataType:"json",
				success: function(result){
					if(result.status=="KO"){
						makeConnectionPanel();
					}else{
						ScrollResponse(JSON.stringify(result.messages));

						
          }
      },
      error: function(jqXHR,textStatus,errTHrown){
      	console.log(textStatus);

      }
  });

		});


	});
}


function ScrollResponse(rep){
	var com=JSON.parse(rep,revival);
	if(com != undefined && com.erreur == undefined){
		var el=$("#cont_message > ul");
		
		for(var i=com.length-1; i>=0; i--){

			env.msg[com[i].id]=com[i];
			//env.msg.unshift(com[i]);

			el.append(com[i].getHtml());
			if( env.minId <0 || com[i].id < env.minId)
				env.minId=com[i].id;	

				break;		
		}

	}

}


function completeMessagesReponse(reponse){

	var tab = JSON.parse(reponse, revival);
	var lastId = undefined;

	//for(var i =tab.length-1; i >= 0; i--){
	env.maxId=tab[0].id;
	lastId=tab[tab.length-1].id;
	$("#cont_message > ul").empty();

	for(var i =0; i<tab.length; i++){
		
		env.msg[tab[i].id] = tab[i];
		//env.msg.push(tab[i]);
		$("#cont_message > ul").append(tab[i].getHtml());

		if(tab[i].id > env.maxId){
			env.maxId = tab[i].id;
		}

		//if((env.maxId < 0) || (tab[i].id < env.minId)){
		if((env.minId < 0) || (tab[i].id < env.minId)){
			env.minId = tab[i].id;
		}
		lastId = tab[i].id;
	}
	env.minId=lastId;
	$("#message_"+lastId).css("border-bottom","none");
	//console.log(Object.keys(env.msg));
}



function completeSearchReponse(rep){
	$("#cont_message > ul").empty();
	$("#post_message").empty();
	if(rep.length == 0)
		$("#cont_message > ul").append("<p>Pas de résultat</p>");
	else
		completeMessagesReponse(JSON.stringify(rep));

}

function getFormComment(id){
	return "<form action=\"javascript:(function(){return;}())\" onsubmit=\"newComment('"+id+"')\">"
        +"<input style=\"display:inline-block;\" id=\"comment_new_"+id+"\" type=\"text\" placeholder=\"entrez un commentaire...\" required>"
        +"<input  style=\"display:inline-block;\" type=\"submit\">" 
      +"</form>";
}

function hideComments(id){
	//var m =env.msg[arrayObjectIndexOf(env.msg, id, "id")];	
	var m =env.msg[id];

	var src=$("#like_"+id).attr("src");

	$("#message_"+id+" > .liste_message_comment").empty();
	$("#message_"+id+" > .message_footer_comment").remove();

	$("#message_"+id+" > form").remove();

	$("#message_"+id).append(getMessageFooter(id,m.comments.length,m.likes.length, false, src));

}

function developpeMessage(id){ 
	//var m =env.msg[arrayObjectIndexOf(env.msg, id, "id")];	
	var m =env.msg[id];
	var src=$("#like_"+id).attr("src");
	$("#message_"+id+" > .message_footer").remove();

	$("#message_"+id+" > .liste_message_comment").before(getMessageFooterComment(id, m.comments.length, m.likes.length, false,src));

	for(var i = 0; i < m.comments.length ; i++){
		var c= m.comments[i];
		$("#message_"+id+" > .liste_message_comment").append(m.comments[i].getHtml());
	}
	$("#message_"+id).append(getFormComment(id));

}

function switchImgLike(id){
	var m =env.msg[id];	
	var src=$("#like_"+id).attr("src");

	$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/like",
			data:"token="+env.token+"&id_post="+id,
			dataType:"json",
			success: function(result){
				if(result.status =='OK'){
					if(result.like.state == 1){ //DISLIKE
						env.msg[id].likes.splice(result.author_id,1);
						src="image/like.png";
					}else if(result.like.state == 0){ //LIKE
						env.msg[id].likes.push(new Like(result.author_id, result.date));
						src="image/likeFill.png";
					}
					$("#like_"+id).attr("src",src);
					$("#cpt_like_"+id).text(env.msg[id].likes.length);
				}else if(result.code == 1000){
					makeConnectionPanel();
				}
				//console.log(env.msg[id].likes);
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				makeConnectionPanel();
			}
	});

}


function findAuteurLike(tab){
	for( i=tab.length-1; i>=0; i--) {
    		if( tab[i].author_id == env.fromId) {
    			return i;
    		}
	}
	return -1;
}

function findFriendId(tab){
		for( i=tab.length-1; i>=0; i--) {
    		if( tab[i].id == env.toId) {
    			return i;
    		}
	}
	return -1;
}

function newComment(id){
	var texte=$("#comment_new_"+id).val();
	$("#comment_new_"+id).val("");
	
	texte=texte.trim();

	if(texte == "")
		return;
	

	if(!env.noConnection){
		$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/addComment",
			data:"token="+env.token+"&text="+encodeURIComponent(texte)+"&id_post="+id,
			dataType:"json",
			success: function(result){
				if(result.status =='OK'){
					refreshComment(id,JSON.stringify(result.comments));
				}else if(result.code == 1000){
					makeConnectionPanel();
				}
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				makeConnectionPanel();
			}
		});
	}else{
	//	newComment_response(id,JSON.stringify(new Commentaire(env.msg[id].comments.length+1
	//		, {"id": env.fromId, "login":env.fromLogin}, texte ,new Date())))
	}
}
function refreshComment(id, rep){
	
	var com=JSON.parse(rep,revival);
	if(com != undefined && com.erreur == undefined){
		var el=$("#message_"+id+" > .liste_message_comment");
		el.append(com.getHtml());

		//env.msg[arrayObjectIndexOf(env.msg, id, "id")].comments.push(com); // TODO A revoir
		env.msg[id].comments.push(com);
	}
}




function newPost(){
	var texte=$("#post_new").val();
	texte=texte.trim();

	if(texte ==""){
		$("#post_new").val("");
		return;
	}

	$("#post_new").val("");
	if(!env.noConnection){

		$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/insertMessage",
			data:"token="+env.token+"&post="+encodeURIComponent(texte),
			dataType:"json",
			success: function(result){
				
				if(result.code == 1000){
					makeConnectionPanel();
				}else
					refreshMessage();
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				makeConnectionPanel();
			}
		});

	}else{
		
	//	newPost_response(JSON.stringify(new Message(env.msg.length, {"id":env.fromId,"login":env.fromLogin}, texte, new Date())));
	}
}

function refreshMessage(rep){

	if(!env.noConnection){
		//console.log(env.maxId+" "+env.minId);
		$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/listMessage",
			data:"token="+env.token+"&from="+env.fromId+"&id_min="+env.maxId+"&id_max=-1"+"&nb=-1",
			dataType:"json",
			success: function(result){
					if(result.code == 1000){
						makeConnectionPanel();
					}
					else
						refreshResponse(JSON.stringify(result.messages));
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				makeConnectionPanel();
			}
		})

	}else{

		var com=JSON.parse(rep,revival);
		if(com != undefined && com.erreur == undefined){
			var el=$("#cont_message > ul");
			el.prepend(com.getHtml());
			
			env.msg.push(com);
			
			if(!env.noConnection){

			}
			else{
				localdb.push(com);
			}
		}
	}
}

function refreshResponse(rep){
	var com=JSON.parse(rep,revival);
	if(com != undefined && com.erreur == undefined){
		var el=$("#cont_message > ul");
		
		for(var i=com.length-1; i>=0; i--){

			env.msg[com[i].id]=com[i];
			//env.msg.unshift(com[i]);

			el.prepend(com[i].getHtml());

			if(com[i].id > env.maxId)
				env.maxId = com[i].id;
			if( env.minId <0 || com[i].id < env.minId)
				env.minId=com[i].id;			
		}

	}

}


function switchButtonFollow(code){
	$("#follow").remove();
	if(code == -1)
		$("#activity").after("<button id=\"follow\" type=\"button\" onclick=\"javascript:unfollow('"+env.toId+"')\">ne plus suivre</button>");
	else
		$("#activity").after("<button id=\"follow\" type=\"button\" onclick=\"javascript:follow('"+env.toId+"')\">Suivre</button>")
}

function follow(id){

	$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/createFriend",
			data:"token="+env.token+"&id="+id,
			dataType:"json",
			success: function(result){
				if(result.status == "OK"){
					switchButtonFollow(-1);
					env.friends[id]={"id":id,"login": env.toLogin};
				}else if(result.code == 1000){
					makeConnectionPanel();
				}
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				makeConnectionPanel();
			}
		})

}

function unfollow(id){

	$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/deleteFriend",
			data:"token="+env.token+"&id="+id,
			dataType:"json",
			success: function(result){
				if(result.status == "OK"){
					switchButtonFollow(0);
					for(var i=env.friends.length-1; i>=0; i--) {
				    	if( env.friends[i].id == id) {
				    		env.friends.splice(i,1);
				    		break;
				    	}
					}
				}else if(result.code == 1000){
					makeConnectionPanel();
				}
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				makeConnectionPanel();
			}
		})

}

function removeMessage(id){

	swal({
  title: "Êtes-vous sûr de vouloir supprimer ce message ?",
  text: "Vou n'aurez plus accès à ce message",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Supprimer",
  cancelButtonText:"Annuler",
  closeOnConfirm: false
},
function(){

	$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/deleteMessage",
			data:"token="+env.token+"&id_post="+id,
			dataType:"json",
			success: function(result){
				console.log(result);
				if(result.status == "OK"){
					result._id=result._id.$oid;
					swal("Supprimer !", "Votre message a bien été supprimé", "success");
					removeMsgResponse(result);
				}
				else{
			 		if(result.code == 1000)
						makeConnectionPanel();
					swal("Oops", "Erreur serveur !", "error");
					return;
				}
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				swal("Oops", "Erreur serveur !", "error");
				//makeConnectionPanel();
			}
		})

 
});

	/*if (!window.confirm("Êtes-vous sûr de vouloir supprimer définitivement ce message ?"))
		return;

	$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/deleteMessage",
			data:"token="+env.token+"&id_post="+id,
			dataType:"json",
			success: function(result){
				console.log(result);
				if(result.status == "OK"){
					result._id=result._id.$oid;
					removeMsgResponse(result);
				}
				else{
			 		if(result.code == 1000)
						makeConnectionPanel();
					return;
				}
				

			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				makeConnectionPanel();
			}
		})*/

}
function removeComment(id){

	swal({
  title: "Êtes-vous sûr de vouloir supprimer ce commentaire ?",
  text: "Vou n'aurez plus accès à ce commentaire",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Supprimer",
  cancelButtonText:"Annuler",
  closeOnConfirm: false
},
function(){
	var id_post;
	id_post=($("#comment_"+id).parent().parent()).attr('id');
	id_post=id_post.split("_")[1];
	
	$.ajax({
			type:"POST",
			url: "http://li328.lip6.fr:8280/gr3_michaud_jeudy/deleteComment",
			data:"token="+env.token+"&id_post="+id_post+"&id_com="+id,
			dataType:"json",
			success: function(result){
				console.log(result);
				if(result.status == "OK"){
					result._id=result._id.$oid;
					swal("Supprimer !", "Votre commentaire a bien été supprimé", "success");
					removeComResponse(result);
				}
				else{
			 		if(result.code == 1000)
						makeConnectionPanel();
					swal("Oops", "Erreur serveur !", "error");
					return;
				}
			},
			error: function(jqXHR,textStatus,errTHrown){
				console.log(textStatus);
				swal("Oops", "Erreur serveur !", "error");
				//makeConnectionPanel();
			}
		})

 
});
}

function removeComResponse(rep){
	var id_post;
	id_post=($("#comment_"+rep._id).parent().parent()).attr('id');
	id_post=id_post.split("_")[1];
	var ind=arrayObjectIndexOf(env.msg[id_post].comments, rep._id, "id");
	env.msg[id_post].comments.splice(ind,1);
	
	$("#comment_"+rep._id).remove();
}
function removeMsgResponse(rep){

	var arr=[];

	//env.msg est un objet => les clé sont des propriétés
	//On ne peut pas ce fier à l'ordre des propriétés d'un objet
	//Pas de propriété length sur les objet
	// => Compléxité pas terrible O(n)


	//On crée un tableau temporaire pour avoir une notion d'ordre
	for(var prop in env.msg){
		if(env.msg[prop] != undefined)
			arr.push([prop, env.msg[prop]])
	}
	
	//On trie par la date d'un message en DESC
	arr.sort(function(a, b) {
    	return b[1].date - a[1].date;
	});
 
	//Si il n'y a qu'un seul message 
 	if(rep._id == env.minId && rep._id == env.maxId){
 		env.minId=-1;
 		env.maxId=-1;
 	}

	//Si on supprime le message de le plus ancien et qu'il y a un autre message
	//On enleve la bordure au niveau du css
	//Et on met a jour minId
	if(rep._id == env.minId){
		if(arr.length > 1){
			env.minId=arr[arr.length-2][0];
			$("#message_"+arr[arr.length-2][1].id).css("border-bottom","none");
		}else
			env.minId=-1;
	}
	//Pareil pour maxId
	else if(rep._id == env.maxId){
		if(arr.length > 1)
			env.maxId=arr[1][1].id;
		else
			env.maxId=-1;
	}

	delete env.msg[rep._id];

	$("#message_"+rep._id).remove();
}

/*
Le plus d'abo
Select count(*) AS following,`from` FROM Friends GROUP BY `from` HAVING following >= MAX(following);
Le plus de follower
Select count(*) AS follower,`to` FROM Friends GROUP BY `to` HAVING follower >= MAX(follower);
*/