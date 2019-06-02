/***********************************************************************************************************************************************************************************

	FPS
	
***********************************************************************************************************************************************************************************/

var FPS = {};

FPS.active = true; 	// Pour déterminer si on doit afficher ou non le framerate
FPS.frames = 0; 		// Nombre de frames écoulées avant dernière mise à jour du timer
FPS.last = 0;		// Date de la dernière vérification des FPS
FPS.byFrame = false;	// Bloque la boucle animate frame par frame

FPS.step = { init : 0, frames : 0 };
FPS.steps = new Array(); 	// Liste du temps entre chaque étape

FPS.draw = { fps : 0, animate : 0, render : 0 }; 						// Conservation des valeurs pour l'affichage
FPS.timer = { total : 0, start : 0, mid : 0, end : 0, animate : 0, render : 0 }; 	// Temps retenus

/***********************************************************************************************************************************************************************************

	FPS.CALL

***********************************************************************************************************************************************************************************/

FPS.call = function()
{
	this.animate(); 					// Quoi qu'il arrive, on fait toujours le calcul
	if ( this.active ) { this.render(); }		// En revanche, on affiche le FPS que lorsque désiré

	if ( KEY("F", false) )
	{
		this.active = this.active == true ? false : true;
	}

	if ( KEY("CTRL", false) )
	{
		this.byFrame = this.byFrame == true ? false : true;
	}
}

FPS.OverFrame = function()
{
	
}

/***********************************************************************************************************************************************************************************

	FPS.NEWSTEP

***********************************************************************************************************************************************************************************/

FPS.NewStep = function(name)
{
	var condition = false;
	var time = new Date().getTime();
	if ( name == "INIT" ) 	
	{ 
		this.step.frames++;
		this.step.init = time;

		if ( this.step.frames > 20 )	{ condition = true; }
		else 					{ return; }
	}
	
	var length = this.steps.length;
	for ( var i = 0; i < length; i++ )
	{
		var s = this.steps[i];

		if ( condition )
		{
			s.total = s.timer / this.step.frames;
			s.timer = 0;
		}
		else if ( s.name == name )
		{
			s.timer += time - this.step.init;
			this.step.init = time;
			return;
		}
	}

	if ( condition )
	{
		this.step.frames = 1;
	}
	else
	{
		this.steps.push( { name : name, total : 0, timer : time - this.step.init, color : new Color("random") } );	
	}
}

/***********************************************************************************************************************************************************************************

	FPS.ANIMATE

***********************************************************************************************************************************************************************************/

FPS.animate = function()
{
	this.timer.end = new Date().getTime(); // A partir du moment où l'on rentre dans le calcul du FPS, on récupère le temps en cours

	this.frames++; 							// On indique que l'on a traversé une frame de plus
	this.timer.animate += this.timer.mid - this.timer.start; 	// On ajoute la durée de cette boucle animate
	this.timer.render += this.timer.end - this.timer.mid;	// On ajoute la durée de cette boucle render
	this.timer.total += this.timer.end - this.timer.start; 	// On ajoute au temps total la durée de cette boucle

	if ( new Date().getTime() - this.last > 1000 ) // Si cela fait plus de 1000 frames que l'on a calculé le FPS
	{
		this.draw.fps = Math.floor( 1000 / ( this.timer.total / this.frames ) ); 		// Valeur finale du FPS
		this.draw.animate = Math.floor( this.timer.animate / this.frames ); 	// Temps d'execution de l'animate
		this.draw.render = Math.floor( this.timer.render / this.frames ); 	// Temps d'execution du render

		// console.log( "Frames : " + this.frames + " / FPS : " + this.timer.total + " / Animate : " + this.timer.animate + " / Render : " + this.timer.render );

		if ( this.draw.animate > 20 )
		{
			console.log("ANIMATE LAG");
		}
		if ( this.draw.render > 20 )
		{
			console.log("RENDER LAG");
		}

		this.frames = 0; // On remet alors les variables à 0
		this.timer.animate = 0;
		this.timer.render = 0;
		this.timer.total = 0;
		this.last = new Date().getTime(); // On met à jour la dernière fois qu'on a calculé le FPS
	}
}

/***********************************************************************************************************************************************************************************

	FPS.RENDER

***********************************************************************************************************************************************************************************/

FPS.render = function()
{
	var CTX = game.type == "Shmup" ? pnt["L"] : ctx;
	var dX = game.type == "Shmup" ? 530 - 240 : 0;

	// On dessine le fond de l'affichage du FPS
	CTX.globalAlpha = 1;
	CTX.fillStyle = "black";
	CTX.fillRect(dX, 0, 240, 100);

	CTX.textAlign = "left";
	CTX.textBaseline = "alphabetic";

	// Puis les valeurs associées
	CTX.fillStyle = "blue";
	CTX.font = "110px Consolas Black";
	CTX.fillText( this.draw.fps, dX + 30, 85, 50, 50 );		// FPS

	CTX.fillStyle = "red";
	CTX.font = "40px Consolas Black";
	CTX.fillText( this.draw.render, dX + 100, 42, 50, 50 ); 	// Boucle RENDER (en ms)

	CTX.fillStyle = "white";
	CTX.fillText( this.draw.animate, dX + 100, 85, 50, 50 ); 	// Boucle ANIMATE (en ms)

	// Changement
	CTX = game.type == "Shmup" ? pnt["R"] : ctx;

	// Affichage de chaque step
	dX = ( game.type == "Shmup" ? 240 : 1920 ) - 240;
	CTX.fillStyle = "black";
	CTX.fillRect( dX, 0, 240, 40 + 30 * this.steps.length );
	CTX.font = "25px Consolas Black";

	var length = this.steps.length;
	for ( var i = 0; i < length; i++ )
	{
		var s = this.steps[i];
		CTX.fillStyle = s.color.convert();

		var value = Math.round( 100 * math.Pourcent( s.total, 33 ) ) / 100;
		CTX.fillText( value, dX + 10, 40 + (30*i), 200, 40 );
		CTX.fillText( s.name, dX + 80, 40 + (30*i), 200, 40 );
	}
}