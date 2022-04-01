var block = document.getElementById("block"); //Récupération du block
var hole = document.getElementById("hole"); //Récupération du trou
var character = document.getElementById("character"); //Récupération du personnage
var jumping = 0; 
var counter = 0;

//Permet de changer la hauteur du trou aléatoirement (maths.random())
hole.addEventListener('animationiteration', () => {
    var random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
    counter++;
    document.getElementById("score").innerHTML = counter;
});

//Définit l'interval dans lequel le personnage peut passer sans perdre 
setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    
    if(jumping==0){  //Si le personnage ne saute pas
        character.style.top = (characterTop+3)+"px"; //La hauteur du personnage diminue (il tombe) 
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500-characterTop);

    //Affiche la fin du jeu si le personnage sort de la zone
    if((characterTop>480)||((blockLeft<20)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
        alert("Game over. Score: "+(counter-1)); //Affiche le message de fin et le score
        character.style.top = 100 + "px"; //Reset la position du personnage
        counter=-1; //Reset le score
    }
},10);

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        jump();
    }
}
//Permet de sauter (fonction se déclenche au clic sur la page -> dans index html)
function jump(){
    jumping = 1; //Déclare que le personnage est en train de sauter
    let jumpCount = 0;
    //Définit la hauteur de saut
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-5)+"px"; //Change la hauteur du personnage
        }
        if(jumpCount>20){
            clearInterval(jumpInterval); 
            jumping=0;
            jumpCount=0;
        }
        jumpCount++; //Augmente le compteur de saut
    },10);
}