///////////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
// canvas & windows
var canvas = document.getElementById('game');
canvas.width=window.innerWidth
canvas.height=window.innerHeight
//canvas.width=640
//canvas.height=360
console.log(canvas.width)

var context = canvas.getContext('2d');
var gameStarted = false;
var keys = [];
var friction = 0.8; 
var gravity = 0.98;
var completed = false; //game over

///////////////////////////////////////////////////////////////////////////////
// clear canvas
function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

// include a js file in a js file
function include(filename)
{
	var head = document.getElementsByTagName('head')[0];	
	script = document.createElement('script');
	script.src = filename;
	script.type = 'text/javascript';	
	head.appendChild(script)
}

///////////////////////////////////////////////////////////////////////////////
// child scripts to include to main.js
listSrcScripts=[
// load images ressources
"src/load_images.js",
// load audio ressources
"src/load_audio.js",
// define MOB character sprite
"src/char_mob.js",
// world creation (static objects, platforms, background...)
"src/world_creation.js",
// world interaction rules (collision)
"src/world_interact.js",
// define PLAYER character sprite
"src/char_player.js",
// reset
"src/reset.js",
// game over
"src/game_over.js",
// what happend in the game at each frame
"src/loop.js",
// init a game
"src/start_game.js"
]
///////////////////////////////////////////////////////////////////////////////
// integrate child src js scripts to main program
for (var i = 0; i < listSrcScripts.length; i++) {
    include(listSrcScripts[i]);
    console.log(listSrcScripts[i])
}
///////////////////////////////////////////////////////////////////////////////
// display intro screen
function intro_screen(){

	document.body.addEventListener("keydown", function(event){

		if(event.keyCode == 13 && !gameStarted){
			startGame();
		}
		if(event.keyCode == 13 && completed){
			reset();
		}
		keys[event.keyCode] = true;

	});

	document.body.addEventListener("keyup", function(event){
		keys[event.keyCode] = false;
	});

	context.font = "120px Impact";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.fillText("SPECKYMAN", canvas.width/2, canvas.height/2);

	context.font = "20px Arial";
	context.fillText("Press Enter To Start", canvas.width/2, canvas.height/2 + 50);

}
intro_screen();



