/***********************************************************************************************************************************************************************************

	PRELOAD

***********************************************************************************************************************************************************************************/

var load = {};
var img = new Array(); // Liste contenant toutes les images
load.nbImage = 0; // Le nombre d'images à charger correspond au nombre d'images envoyées dans la liste
load.nbLoaded = 0; // Nombre d'images chargées parmis la liste
load.isLoading = new Array();

load.preload = function(liste) // On fait un preloader qui charge toutes les images avant le jeu
{
	for ( var type in liste ) // Pour chaque dossier d'images dans la liste
	{
		load.nbImage += liste[type].length; // On ajoute au nombre d'images à charger chaque liste d'images
		img[type] = new Array(); // On ajoute le dossier à la liste des images
	}

	var size = 10;
	var ligne = 20;
	ctx.fillStyle = "white";
	for ( var index = 0; index < this.nbImage; index++ )
	{
		var x = index % ligne;
		var y = Math.floor(index / ligne);
		ctx.fillRect(canvas.width/2 - ligne * size + x * size*2, canvas.height/2 + 200 + y * size*2, size, size);
	}

	ctx.fillStyle = "cyan";

	for ( var type in liste ) // Pour chaque dossier d'images dans la liste
	{
		for ( var i in liste[type] ) // On va récupérer chaque image
		{
			var link = liste[type][i]; // Pour simplifier le code

			img[type][link] = new Image(); // On indique qu'on va créer une image
			img[type][link].onload = function() 
			{
				// console.log( load.isLoading[this.id].lien + " : " + img[load.isLoading[this.id].type][load.isLoading[this.id].lien].complete);
				var x = load.nbLoaded % ligne;
				var y = Math.floor(load.nbLoaded / ligne);
				ctx.fillRect(canvas.width/2 - ligne * size + x * size*2, canvas.height/2 + 200 + y * size*2, size, size);

				load.nbLoaded++; // Chaque image qui se charge décrémente le nombre de celles à charger
				if ( load.nbLoaded == load.nbImage ) // Une fois que toutes les images sont chargées
				{
					load.animation = null; // On supprime ensuite l'animation de chargement
					
					game.init("img"); // On initialise alors le jeu
				}				
			}
			
			img[type][link].src = "ressources/images/" + type + "/" + link + ".png"; // On lui ajoute son lien src
			var tmp = i + load.nbImage - liste[type].length;
			img[type][link].id = tmp;
			load.isLoading[tmp] = { type : type, lien : link };
		}
	}
	if ( load.nbImage == 0 ) { game.init("img"); } // Si jamais il n'y a aucune image à charger
}
