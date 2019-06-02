/***********************************************************************************************************************************************************************************

	INIT

***********************************************************************************************************************************************************************************/

var game = {}; // Objet contenant tout le jeu

game.paused = false; // Pour mettre le jeu en pause
game.loaded = false; // Pour déterminer si on peut lancer le jeu ou non
game.gravity = 1.3; // Gravité appliquée au jeu
game.type = "Profile"; // Profile ou Shmup
game.loaded = { sound : false, img : false };
game.players = 0; // Nombre de joueurs à un instant T

var FILES = {}; // Liste des fichiers à charger
FILES.loading = 0;
FILES.toLoad = 0;

var O = new Array(); // Liste contenant tous les objets du jeu
var CAMERA;
var PLAYER; // Variable du joueur
var LD; // Level design

O["CHAR"] = new Array(); // ENEMY
O["ALLY"] = new Array(); // Player + alliés
O["OBJECT"] = new Array(); // Tout ce qui est interactif
O["FX"] = new Array(); // Explosion, impacts

/***********************************************************************************************************************************************************************************

	Game.INIT

***********************************************************************************************************************************************************************************/
// Once all scripts are loaded, initialise the game
game.init = function(type) 
{
	if ( type == "sound" ) 	{ this.loaded.sound = true; }
	if ( type == "img" ) 	{ this.loaded.img = true; }

	if ( !this.loaded.sound || !this.loaded.img )
		{ return; }

	LoadPolice();
	CONVERT(JSONTEST);
	TACHYON = new Tachyon();

	CAMERA = new Camera("PLAYER");
	game.Transition(game.type);

	FPS.timer.last = new Date().getTime(); // Initialisation du calcul du FPS
	game.loop(); // Une fois que tout est chargé, on lance la boucle de gameplay
}

/***********************************************************************************************************************************************************************************

	Game.LOOP

***********************************************************************************************************************************************************************************/

game.loop = function() // Boucle de gameplay
{
	requestAnimFrame(game.loop); // Fonction permettant de générer une boucle de gameplay fonctionnelle en fonction du framerate

	if ( FPS.byFrame )
	{
		if ( INPUT.key["SHIFT"] )			{ INPUT.key["SHIFT"] = false; }
		else if ( !INPUT.key["W"] )			{ FPS.call(); return; }
	}

	FPS.timer.start = new Date().getTime(); // On récupère le temps de début de boucle

	// Checker que le gamepad en chaque position est inchangée
	// Si le gamepad n'existe pas, l'ajouter au tableau
	// Aller ensuite checker tous les gamepads

	INPUT.INIT();
	GP.INIT();
	GP.CHECK();

	game.animate();

	if ( KEY("Y", false) ) { game.Transition(game.type == "Profile" ? "Shmup" : "Profile"); }

	FPS.timer.mid = new Date().getTime(); // On récupère le temps avant la boucle render

	game.render(); // Boucle de rendu

	FPS.call(); // Puis on va calculer le FPS
}

/***********************************************************************************************************************************************************************************

	Game.TRANSITION

***********************************************************************************************************************************************************************************/

game.Transition = function(type) // Transition de Profile à Shmup
{
	game.type = type;
	this.Clean();

	INPUT.INIT(true);

	switch ( game.type )
	{
		case "Profile" : {
			canvas = new OCanvas("main", 1920, 1080);

			CAMERA.type = "Profile";
			LD = new Torus();

			O["SYSTEM"].push( new SystemQ( { x : canvas.width/2, y : canvas.height/2 }, "Dust" ) );

			/*
			O["LIGHT"].push( new PLight( { x : 400, y : 350 }, "Flamme") );
			O["LIGHT"].push( new PLight( { x : 1800, y : 350 }, "Flamme") );
			*/

			// MAJLIGHTS();

		}; break;


	}
}

/***********************************************************************************************************************************************************************************

	Game.CLEAN

***********************************************************************************************************************************************************************************/

game.Clean = function()
{
	PLAYER = null;
	game.players = 0;
	SPAWN.active = false;
	GP.gamepads = [ null, null, null, null ];
	CAMERA = new Camera("PLAYER");
	INPUT.player = -1;

	for ( var type in O )			// On supprime tous les objets
	{
		O[type] = new Array();
	}

	for ( var index in painter )		// On supprime tous les canvas
	{
		painter[index].destroy();
	}
	painter = [];
	canvas.destroy();
}
