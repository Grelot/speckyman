/***********************************************************************************************************************************************************************************

	CANVAS

***********************************************************************************************************************************************************************************/

var canvas = {}; // Canvas comprenant des fonctions de resize automatique et divers
var ctx; // Variable de contexte

var painter = []; // Liste des canvas secondaires
var pnt = []; // Liste des ctx secondaires

/******************************************************************************

	OCANVAS

******************************************************************************/


// generate an object Canvas
function OCanvas(name, width, height, pos, align)
{
	this.size = { width : 0, height : 0 }; // real size
	this.name = name; // name of the Canvas
	this.width = width; // Maximal size
	this.height = height;
	this.ratio = width / height;
	
	var canv = document.createElement("canvas"); // Create a new canvas
	canv.id = name;
	canv.class = "canvas";
	canv.width = width;
	canv.height = height;
	canv.style.position = "absolute";

	switch(name)
	{
		case "L" : {
			canv.style.transform = "matrix3d(1.05,0,0.00,0.0002,0.00,0.949,0.00,0,0,0,1,0,0,0,0,1)"; // rotateY(20deg)";
			canv.style.zIndex = 2;
		}; break;

		case "R" : {
			canv.style.transform = "matrix3d(1.05,0,0.00,-0.0002,0.00,0.949,0.00,0,0,0,1,0,0,0,0,1)"; // "rotateY(-20deg)";
			canv.style.zIndex = 3;
		}; break;

		case "BG" : {
			canv.style.zIndex = -1000;
			canv.style.backgroundColor = "#030310";
		}; break;
	}

	document.body.appendChild(canv); // On ajoute le canvas au body
	this.main = document.getElementById(name); // On indique au canvas quel est son support physique
	this.main.oncontextmenu = new Function("return false"); // On supprime le clic droit

	if ( name == "main" )
	{
		ctx = this.main.getContext("2d"); // On donne sa bonne valeur au contexte
		ctx.imageSmoothingEnabled = false;
		window.addEventListener("resize", function() { canvas.resize(); }, false); // On affecte le resize à l'écran
	}
	else
	{
		pnt[name] = this.main.getContext("2d"); // On donne sa bonne valeur au contexte
		pnt[name].imageSmoothingEnabled = false;
		window.addEventListener("resize", function() { painter[name].resize(); }, false); 
	}

	this.resize();
}

/******************************************************************************

	OCanvas.RESIZE

******************************************************************************/


// Dynamically resize a canva
OCanvas.prototype.resize = function()
{
	var size = { width : window.innerWidth, height : window.innerHeight }; // Taille finale du canvas
	var delta = { width : window.innerWidth, height : window.innerHeight }; // Taille réelle de l'écran
	delta.ratio = delta.width / delta.height; // On récupère le nouveau ratio de l'écran

	size.width = delta.width * ( this.width / 1920 ); // On récupère sa taille par rapport à la taille totale possible
	size.height = ( size.width / this.ratio );

	var max = delta.height * this.height / 1080;
	if ( size.height > max ) // Si le canvas est plus grand que la taille maximale qu'on lui autorise
	{
		size.height = max;
		size.width = size.height * this.ratio;
	}

	if ( size.height > delta.height ) // Si le canvas est plus haut que l'écran
	{
		size.height = delta.height;
		size.width = size.height * this.ratio;
	}

	this.size.width = size.width;
	this.size.height = size.height;

	this.main.style.width = size.width;
	this.main.style.height = size.height;

	switch (this.name) // Pour le décalage
	{
		case "main" : case "BG" : {
			this.main.style.marginLeft = (window.innerWidth - size.width) / 2;
			this.main.style.marginTop = (window.innerHeight - size.height) / 2;
		}; break;

		case "L" : {
			this.main.style.marginLeft = (window.innerWidth / 2) - size.width - canvas.size.width/2;
			this.main.style.marginTop = (window.innerHeight - size.height) / 2;
		}; break;

		case "R" : {
			this.main.style.marginLeft = (window.innerWidth / 2) + canvas.size.width/2;
			this.main.style.marginTop = (window.innerHeight - size.height) / 2;
		}; break;
	}
};

/******************************************************************************************************************************************************************************

	OCanvas.DESTROY

*******************************************************************************************************************************************************************************/

// remove a canva
OCanvas.prototype.destroy = function()
{
	var clear = document.getElementById(this.name);
	document.body.removeChild(clear);
}

/******************************************************************************************************************************************************************************

	PRERENDER

*******************************************************************************************************************************************************************************/

function PreRender(width, height, renderFunction)
{
	var buffer = document.createElement("canvas");
	var ctxTemp = buffer.getContext("2d");
	ctxTemp.imageSmoothingEnabled = false;
	buffer.width = width;
	buffer.height = height;

	renderFunction( ctxTemp );
	return buffer;
}

/******************************************************************************************************************************************************************************

	RequestAnimFrame

*******************************************************************************************************************************************************************************/

window.requestAnimFrame = ( function() // Fonction d'animation de la boucle de gameplay
{
	return  window.requestAnimationFrame    ||
	window.webkitRequestAnimationFrame 	||
	window.mozRequestAnimationFrame    	||
	window.oRequestAnimationFrame      	||
	window.msRequestAnimationFrame     	||
	function(callback)
	{
		window.setTimeout(callback, 1000 / 60);
	};
})();