// Retourne une valeur d'un tableau
//  libelle = getItemFromTab($scope.utilisateur.listePeriodicite,'id_lov',12,'lib_long'); // Mensuel
function getItemFromTab(leTableau,leChampCritere,laValeurCritere,leChampSouhaite) {
	var champRetour = '';
	var bChercher = true;
	angular.forEach(leTableau, function(userObject, index){
		if(bChercher)
		{
			if (userObject[leChampCritere] == laValeurCritere){
				champRetour = userObject[leChampSouhaite];
				bChercher = false;
			}
		}
	});
	return champRetour;
};

