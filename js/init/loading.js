/***********************************************************************************************************************************************************************************

	Load.LOADING

load a list of files

***********************************************************************************************************************************************************************************/

load.loading = function() // Liste des images à charger
{
	var liste = new Array();

	liste["characters"] = [
		"costa_walk"
	];

	liste["backgrounds"] = [
		"paris_street"
	];

	load.preload(liste); // On charge ensuite toutes les images retenues
}
