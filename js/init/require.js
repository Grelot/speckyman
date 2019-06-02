/*****************************************************************************

`require.js` records and launches all the JS scripts

*****************************************************************************/

/******************************************************************************
FUNCTIONS
******************************************************************************/

var start = function()
{
	canvas = new OCanvas("main", 1920, 1080);
	load.loading();
	SOUND.loading();
}


// Load all the scripts before launching game
function initScript(dossier, scripts, init)
{
	var scriptsDone = 0; // no load script
	var callback = function() // once script is loaded, run the following function
	{
		scriptsDone++;
		if ( scriptsDone == scripts.length )
		{
			init(); // once all scripts are loaded, run init() 
		}
		else
		{
			callScript(dossier, scripts, scriptsDone, callback);
		}
	}

	callScript(dossier, scripts, scriptsDone, callback);
}


// create object script
function callScript(dossier, scripts, index, callback)
{
	var script = document.createElement("script"); // create balise "script"
	script.id = scripts[index];
	script.setAttribute("src", "./" + dossier + scripts[index] + ".js");
	script.onload = callback;
	script.type = "text/javascript";

	document.body.appendChild(script); // add script to the head
}


/******************************************************************************
MAIN
******************************************************************************/


// list of all JS scripts to record and launch to run the game
initScript( "js/", [

/******************************************************************************
	INIT
*/
		"init/canvas",
		"init/preload",
		"init/loading",
		"init/fps",
		"init/init",

/******************************************************************************
	CHARACTERS
*/

		"player/pplayer",
		"player/panimation",

/******************************************************************************
	LEVEL DESIGN
*/
		// "4 - Spawn/SPAWN",			// Gestion du spawn
		// "4 - Level/TORUS",
		// "4 - Level/SALLE",
		// "4 - Level/SLIST",

/******************************************************************************
	SOUNDS
*/
		"sound/sloader",
		"sound/sbank",
		"sound/sfile"

	],
	start
);
