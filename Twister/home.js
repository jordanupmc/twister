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
	s+="<span>\n<b><a href=\"\">"+this.auteur.login+"</a></b>\n"
	s+="<span class=\"dateMessage\">"+this.date+"</span>\n</span>\n"
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
	s+= "<li> <p> <b>"+this.auteur.login+"</b> "+emojione.shortnameToImage(this.post)+"</p> <p class=\"dateComment\">"+this.date+"</p> </li>"
	
	return s;
}

function Like(id, auteur, date){
	this.id=id;
	this.auteur=auteur;
	this.date=date;
}

Like.prototype.getHtml=function(){
	var s = "";
	return s;
}


function revival(key,value){
	// if(value != undefined ){
	// 	return new Message(value.id,value.auteur,value.texte,value.date,value.comments);
	// }
	// else
	if(value.comments != undefined){
		return  new Message(value.id, value.auteur, value.post, value.date, value.comments, value.likes);;
	}else if(value.post != undefined){
		var c = new Commentaire(value.id, value.auteur, value.post, value.date);
		return c;
	}else if(value.auteur != undefined){
		return new Like(value.id, value.auteur, value.date);
	}else if(key =='date'){
		return new Date(value).toLocaleDateString();
	}else{
		return value;
	}
}

function getMessageFooter(id, comLength, likeLength, isLike){
	var s="";
	
	s += "<div class=\"message_footer\">"
    s += "<a href=\"javascript:(function(){return;}())\" onclick=\"javascript:switchImgLike("+id+")\"><img id=\"like_"+id+"\" ";
    
    if(!isLike)
		s+="\" src=\"image/like.png\""
	else
		s+="\" src=\"image/likeFill.png\"";
    s+=" alt=\"\"></a> <p id=\"cpt_like_"+id+"\" class=\"message_like\">"+likeLength+"</p>";
  
    s += "<a href=\"javascript:(function(){return;}())\" onclick=\"javascript:developpeMessage("+id+")\"><img src=\"image/message-bubble.png\" alt=\"\"></a><p class=\"message_comment\">"+comLength+"</p>";
    s +=  "</div>\n";
    return s;
}

function setVirtualMessage(){
	
	localdb = [];
	follows = [];
	var user1 = {"id":1, "login":"papa"};
	var user2 = {"id":2, "login":"maman"};
	var user3 = {"id":3, "login":"fils"};
	var user4 = {"id":4, "login":"popa"};
	var user5 = {"id":5, "login":"pipa"};
	var user6 = {"id":6, "login":"pupa"};
	var user7 = {"id":7, "login":"pypa"};
	var user8 = {"id":8, "login":"pepa"};
	var user9 = {"id":9, "login":"mamo"};
	var user10= {"id":10, "login":"mami"};
	var user11= {"id":11, "login":"kiri"};
	var user12= {"id":12, "login":"kou"};

	follows[1] = new Set();
	follows[1].add(2);
	follows[1].add(3);
	follows[1].add(4);
	follows[2] = new Set();
	follows[2].add(4);
	follows[2].add(5);
	follows[2].add(6);
	follows[2].add(7);
	follows[2].add(8);
	follows[2].add(9);
	follows[2].add(1);
	follows[5] = new Set();
	follows[5].add(1);
	follows[5].add(10);
	follows[5].add(11);
	follows[8] = new Set();
	follows[8].add(4);
	follows[8].add(5);
	follows[8].add(9);
	follows[8].add(3);

	
	var mon_commentaire1 = new Commentaire(1, user4, "je like", new Date());
	var mon_commentaire2 = new Commentaire(2, user5 ,"first", new Date());
	var mon_commentaire3 = new Commentaire(3, user3 ," loin de moi l'idée de graver dans le marbre de tailler dans une écorce d'arbre loin de moi l'idée de suggérer que je m'en moque que je n'en ai rien à faire que guère je ne m'en soucie loin de moi ces folies mais je m'échine depuis octobre et pourquoi donc depuis début octobre même et qui m'aime me suive depuis octobre depuis ce même dernier octobre le trois du mois je crois depuis ce temps-là depuis trois mois depuis trois mois et une semaine je m'échine ailleurs et le très long texte n'a pas avancé d'un poil pas beaucoup sans doute est-ce mon côté velléitaire qui ne cesse de me jouer des tours et les méandres du très long texte se sont figés comme une gelée le long des parois d'un bocal de verre et je vitupère contre mes essais éphémères mon tempérament affreusement velléitaire et ce teint d'albâtre qui n'est pas le mien comme je voudrais qu'il fût d'albâtre ou d'ébène ou autrement même sans métaphore mais au moins qu'il ait quelque tenue que mon visage sans retenue puisse soudain passer pour un tissu une pierre un songe soit en quelque sorte un tableau fasse tableau mais ce n'est pas le cas même ce mot albâtre jeté au visage jeté tout à trac sur la page en haut de page ce mot me défigure ne me figure pas ne me représente pas ne figure rien de ce que je suis de ce que je pense être et je suis encore et toujours circonspect dans le doute et ce mot n'apporte rien aucune réponse et donc toujours je me jette à la figure ces", new Date());
	
	var like1 = new Like(1, user5 ,new Date());
	var like2 = new Like(2, user1 ,new Date());

	localdb[0] = new Message(1, user1,"C’est comme ça qu’il se voyait à cette époque. Un peu rebelle envers ce monde. L’informatique l’avait aidé à s’enfermer un peu plus dans cet état. Il était devenu doué d’une logique à toute épreuve et d’une intelligence remarquable, mais surtout, il était devenu insociable. Avec l’âge, le besoin de trouver l’âme sœur avait pris le dessus et il avait été un peu obligé de rencontrer des gens, de parler avec eux. Très difficile au début, il avait réussi à vaincre ces préjugés. Il avait accepté la lenteur d’esprit des autres ainsi que leur manque de logique.", new Date());
	localdb[1] = new Message(2, user2,"loin de moi l'idée de graver dans le marbre de tailler dans une écorce d'arbre loin de moi l'idée de suggérer que je m'en moque que je n'en ai rien à faire que guère je ne m'en soucie loin de moi ces folies mais je m'échine depuis octobre et pourquoi donc depuis début octobre même et qui m'aime me suive depuis octobre depuis ce même dernier octobre le trois du mois je crois depuis ce temps-là depuis trois mois depuis trois mois et une semaine je m'échine ailleurs et le très long texte n'a pas avancé d'un poil pas beaucoup sans doute est-ce mon côté velléitaire qui ne cesse de me jouer des tours et les méandres du très long texte se sont figés comme une gelée le long des parois d'un bocal de verre et je vitupère contre mes essais éphémères mon tempérament affreusement velléitaire et ce teint d'albâtre qui n'est pas le mien comme je voudrais qu'il fût d'albâtre ou d'ébène ou autrement même sans métaphore mais au moins qu'il ait quelque tenue que mon visage sans retenue puisse soudain passer pour un tissu une pierre un songe soit en quelque sorte un tableau fasse tableau mais ce n'est pas le cas même ce mot albâtre jeté au visage jeté tout à trac sur la page en haut de page ce mot me défigure ne me figure pas ne me représente pas ne figure rien de ce que je suis de ce que je pense être et je suis encore et toujours circonspect dans le doute et ce mot n'apporte rien aucune réponse et donc toujours je me jette à la figure ces", new Date(),[mon_commentaire1, mon_commentaire2]);
	localdb[2] = new Message(3, user1,"OH ", new Date());
	localdb[3] = new Message(4, user1,"MAMA", new Date());
	localdb[4] = new Message(5, user1,"#:flame::flame: :flame: :flame::flame: :flame: :flame:", new Date());
	localdb[5] = new Message(6, user3,"yep", new Date(),[ mon_commentaire3], [like1, like2]);	
}

function init(){
	env = new Object();
	env.noConnection = true;
	setVirtualMessage();
	document.getElementsByTagName('body')[0].innerHTML = makeMainPanel(1,"papa",'');
	completeMessages();
	//makeEnregistrementPanel();
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

	var s="";
	//getFromLocaldb(env.from, env.minId, env.maxId, 10);
	s+="<header> <img src=\"image/logo.png\" alt=\"\"><form action=\"javascript:(function(){return;}())\">"+
	"<input type=\"text\" name=\"search\" placeholder=\"Chercher...\">"+
      "<input type=\"image\" src=\"image/Search-48.png\" alt=\"err\">"+
    "</form>"+ 
    "<div >"+
      "<a href=\"LoginPage.html\"><img id=\"logout\" src=\"image/logout.png\" alt=\"\"></a>"+
    "</div>"+
  "</header>"+

  "<div id=\"container\">"+
   "<aside>"+
     "<h1> Statistiques </h1>"+
     "<ul>"+
       "<li>Followers: 400</li>"+
       "<li>Following: 400</li>"+
       "<li>Like: 1000</li>"+
       "<li>Twist: 900</li>"+
     "</ul>"+
   "</aside>"+

   "<section>"+
    "<h1> Message </h1>"+
    "<div id=\"post_message\">"+
     "<form action=\"javascript:(function(){return;}())\"  onsubmit=\"newPost()\" >"+
      "<input type=\"submit\" value=\"+\">"+
     "<input type=\"text\" name=\"comments\" id=\"post_new\" placeholder=\"Composez un nouveau Twist...\" required>"+
    "</form>"+
  "</div>"+

  "<div id=\"cont_message\">"+
  	"<ul>";

	

	// if(env.fromId == -1){
	// 	s+= "<body>\n</body>";
	// }
	// else{
	// 	s+=;

	return s;
}

function completeMessages(){
	if(!env.noConnection){
		//to do
	}
	else{
		var tab = getFromLocaldb(env.fromId, -1, env.minId, 10);
		completeMessagesReponse(JSON.stringify(tab));
	}
}

function completeMessagesReponse(reponse){
	var tab = JSON.parse(reponse, revival);
	console.log(tab);
	var lastId = undefined;

	for(var i =0; i < tab.length; i++){
		$("#cont_message > ul").append(tab[i].getHtml());

		env.msg[tab[i].id] = tab[i];
		if(tab[i].id > env.maxId){
			env.maxId = tab[i].id;
		}
		if((env.maxId < 0) || (tab[i].id < env.minId)){
			env.minId = tab[i].id;
		}
		lastId = tab[i].id;
	}
	$("#message_"+lastId).css("border-bottom","none");
}


function getFromLocaldb(from, minId, maxId, nbMax){
	var tab = [];
	var nb = 0;
	var f = undefined;
	
	if(from >= 0){ //**************************************************REVOIR LE FROM*********************************************
		f = follows[from];
		if(f==undefined){
			f = new Set();
		}
	}

	for(var i = localdb.length-1; i >= 0 ; i--){
		if((nbMax >= 0) && (nb >= nbMax)){
			break;
		}
		if(localdb[i] == undefined){
			continue;
		}
		if((maxId < 0) || (localdb[i].id < maxId) && (localdb[i].id > minId)){
			if((f==undefined)||(localdb[i].auteur.id == from)||(f.has(localdb[i].auteur.id))){
				tab.push(localdb[i]);
				nb++;
			}
		}
	}
	return tab;
}

function getMessageFooterComment(id, comLength, likeLength, isLike){/// TODO  --************--------->  les nb LIKE
	var s= "<div class=\"message_footer_comment\">\n"
	+"<a href=\"javascript:(function(){return;}())\" onclick=\"javascript:switchImgLike("+id+")\"><img id=\"like_"+id;
	if(!isLike)
		s+="\" src=\"image/like.png\""
	else
		s+="\" src=\"image/likeFill.png\""

	s+= " alt=\"\"></a> <p id=\"cpt_like_"+id+"\" class=\"message_like\">"+likeLength+"</p>"
	+"<a href=\"javascript:(function(){return;}())\" onclick=\"javascript:hideComments("+id+")\" class=\"showCommentButton\">Cacher</a>"
	if(comLength>0 )  /// ********* FIXER A 10 en prod
		s+="<a href=\"javascript:(function(){return;}())\" class=\"showCommentButton\"> Voir plus</a>"

	s+="</div>"
	return s;
}

function getFormComment(id){
	return "<form action=\"javascript:(function(){return;}())\" onsubmit=\"newComment("+id+")\">"
        +"<input style=\"display:inline-block;\" id=\"comment_new_"+id+"\" type=\"text\" placeholder=\"entrez un commentaire...\" required>"
        +"<input  style=\"display:inline-block;\" type=\"submit\">" 
      +"</form>";
}

function hideComments(id){
	var m =env.msg[id];	

	$("#message_"+id+" > .liste_message_comment").empty();
	$("#message_"+id+" > .message_footer_comment").remove();

	$("#message_"+id+" > form").remove();

	$("#message_"+id).append(getMessageFooter(id,m.comments.length,m.likes.length, findAuteurLike(m.likes)!=-1));

}

//Change l'img de like
function switchImgLike(id){
	var m =env.msg[id];	
	var src=$("#like_"+id).attr("src");
	setLikeCpt(id);

	if(src=="image/like.png")
		src="image/likeFill.png";
	else
		src="image/like.png";

	$("#like_"+id).attr("src",src);

	

}
//Modifie l'affichage du cpt de like
function setLikeCpt(id){

	var findId=findAuteurLike(env.msg[id].likes);

	if(findId==-1){
		env.msg[id].likes.push(new Like( env.msg[id].likes.length, {"login":env.login, "id":env.fromId} ,new Date()));
	}
	else{
    	env.msg[id].likes.splice(findId,1);
	}
	$("#cpt_like_"+id).text(env.msg[id].likes.length);

}

function findAuteurLike(tab){
	for( i=tab.length-1; i>=0; i--) {
    		if( tab[i].auteur.id == env.fromId) 
    			return i;
	}
	return -1;
}

function developpeMessage(id){ 
	var m =env.msg[id];	
	
	$("#message_"+id+" > .message_footer").remove();

	$("#message_"+id+" > .liste_message_comment").before(getMessageFooterComment(id, m.comments.length, m.likes.length, findAuteurLike(m.likes)!=-1));

	for(var i = 0; i < m.comments.length ; i++){
		var c= m.comments[i];
		$("#message_"+id+" > .liste_message_comment").append(m.comments[i].getHtml());
	}
	$("#message_"+id).append(getFormComment(id));

}

function newComment(id){
	var texte=$("#comment_new_"+id).val();
	$("#comment_new_"+id).val("");
	
	if(!env.noConnection){

	}else{
		newComment_response(id,JSON.stringify(new Commentaire(env.msg[id].comments.length+1
			, {"id": env.fromId, "login":env.fromLogin}, texte ,new Date())))
	}
}
function newComment_response(id, rep){
	var com=JSON.parse(rep,revival);
	if(com != undefined && com.erreur == undefined){
		var el=$("#message_"+id+" > .liste_message_comment");
		el.append(com.getHtml());

		env.msg[id].comments.push(com);

		if(!env.noConnection){

		}
		else{

		}
	}
}

function newPost(){
	var texte=$("#post_new").val();
	$("#post_new").val("");
	if(!env.noConnection){

	}else{
		
		newPost_response(JSON.stringify(new Message(env.msg.length, {"id":env.fromId,"login":env.fromLogin}, texte, new Date())));
	}
}

function newPost_response(rep){
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





