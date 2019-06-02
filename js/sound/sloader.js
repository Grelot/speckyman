var SOUND = {};
var SLIST = new Array();

SOUND.nbSound = 0;
SOUND.nbLoaded = 0;
SOUND.isLoading = new Array();

SOUND.preload = function(liste) // On fait un preloader qui charge toutes les images avant le jeu
{
	for ( var type in liste ) // Pour chaque dossier d'images dans la liste
	{
		SOUND.nbSound += liste[type].length; // On ajoute au nombre d'images à charger chaque liste d'images
		SLIST[type] = new Array(); // On ajoute le dossier à la liste des images

		for ( var i in liste[type] ) // On va récupérer chaque image
		{
			var link = liste[type][i]; // Pour simplifier le code
			SLIST[type][link] = new Audio(); // On indique qu'on va créer une image
			SLIST[type][link].src = "ogg/" + type + "/" + link + ".mp3"; // On lui ajoute son lien src
			SLIST[type][link].load();

			var tmp = i + SOUND.nbSound - liste[type].length;
			SLIST[type][link].id = tmp;
			SOUND.isLoading[tmp] = { type : type, lien : link };

			SLIST[type][link].oncanplaythrough = function() 
			{
				// console.log( load.isLoading[SOUND.id].lien + " : " + img[load.isLoading[SOUND.id].type][load.isLoading[SOUND.id].lien].complete);
				SOUND.nbLoaded++; // Chaque image qui se charge décrémente le nombre de celles à charger
				if ( SOUND.nbLoaded == SOUND.nbSound ) // Une fois que toutes les images sont chargées
				{
					game.init("sound"); // On initialise alors le jeu
				}
			}
		}
	}

	if ( SOUND.nbSound == 0 ) 	{ game.init("sound"); } // S'il n'y a aucun son à charger
}