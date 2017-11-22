// Filtre sur une liste de partenaire, le champ member
app.filter('partenaireMembre', function () {
    return function (items) {
        var filtered = [];
		angular.forEach(items, function(item, index){
			if(item.member==1) {
				filtered.push(item);
			}
		});		
        return filtered;
    };
});
// Permet d'afficher uniquement les droits d'un partenaire 
app.filter('partenaireDroit', function () {
    return function (items,id_tiers) {
        var filtered = [];
		angular.forEach(items, function(item, index){
			if(item.id_tiers==id_tiers && item.access==1) {
				filtered.push(item);
			}
		});		
        return filtered;
    };
});
// Permet d'afficher uniquement les droits d'un partenaire, à partir de l'ensemble des droits de l'utilisateur
app.filter('accessDroitsUsersTiers', function () {
    return function (items,lesDroitsTiers) {
        var filtered = [];
		angular.forEach(items, function(item, index){
			angular.forEach(lesDroitsTiers, function(unDroitTiers, indexDroit){
				//console.log("PUSH  filtered "+"("+ $scope.demandeDemandeur.apporteur.id_tiers+"?"+unDroitTiers.id_tiers+")"+"unDroitTiers:"+unDroitTiers.id_droits+"="+unDroitTiers.access);
				if(unDroitTiers.id_droits==item.id && unDroitTiers.access) {
					filtered.push(item);
				}
			});		
		});		
        return filtered;
    };
});
// Permet d'afficher uniquement les notification mails, à partir de l'ensemble des ServiceMail
app.filter('actifServiceMail', function () {
    return function (items,id_tiers) {
        var filtered = [];
		angular.forEach(items, function(item, index){
			// console.log("actifServiceMail "+"("+ item.id_tiers+"=="+id_tiers+")"+" && "+item.actif+") items:"+item.id_lov+"="+item.actif);
			if(item.id_tiers==id_tiers && item.actif) {
				filtered.push(item);
			}
		});		
        return filtered;
    };
});


// Controler des informations utilisateurs
var ctrl_MesUtilisateurs = app.controller('ctrlMesUtilisateurs',
  function($rootScope,$scope, $filter, items, $routeParams, $http) {
	$rootScope.showSidebarRight = true;

    $scope.utilisateur = $rootScope.utilisateur;
    // utilisateur.apporteurAffaires;
    // Grid des Utilisateurs
	$scope.mesUtilisateur = {};	

	// L'utilisateur encours création ou modification
	$scope.copyInfosUtilisateur = {};
	$scope.infosUtilisateur = {
          "id_contact": "0",
          "id_users": "0",
          "nom": "",
          "prenom": "",
          "login": "",
          "titre": "M",
          "position": "",
          "tel": "",
          "mobile": "",
          "fax": "",
          "email": "",
          "actif": true};
	// Les Utilisateurs
	/*
	$scope.mesUtilisateurs = [{
          "id_contact": "99",
          "nom": "Jeannot",
          "prenom": "Ronald",
          "login": "ronaldo",
          "titre": "M",
          "position": "INC",
          "tel": "0102030405",
          "mobile": "0602030405",
          "fax": "0902030405",
          "email": "r.jeannot@viatelease.fr",
          "actif": "1",
          "partenaires": [{
			"id_tiers" : "930",
			"nom" : "VIATELEASE",
			"primaire" : "1",
			"member" : "0",
			"groupe" : "0",
			"autorisation" : "0",
			"actif" : "1",
		  },{
			"id_tiers" : "4001074",
			"nom" : "FOLIATEAM",
			"primaire" : "1",
			"member" : "1",
			"groupe" : "1",
			"autorisation" : "0",
			"actif" : "1",
		  },
		  ]
        }];

    */
	
	/*
	$scope.mesUtilisateurs = $scope.utilisateur.mesUtilisateurs;
	$scope.mesDroitsUsersTiers = $scope.utilisateur.mesDroitsUsersTiers;
    $rootScope.mesUtilisateurs = $scope.mesUtilisateurs; // Permet de gérer les utilisateur dans le modal
	*/
	$scope.mesServiceMail = $scope.utilisateur.mesServiceMail;
    $rootScope.mesServiceMail = $scope.mesServiceMail; // Permet de gérer les ServiceMail dans le modal
	
    function addslashes(string) {
        return string.replace(/\\/g, '\\\\').
            replace(/\u0008/g, '\\b').
            replace(/\t/g, '\\t').
            replace(/\n/g, '\\n').
            replace(/\f/g, '\\f').
            replace(/\r/g, '\\r').
            replace(/'/g, '\\\'').
            replace(/"/g, '\\"');
    }
    
    // Submit du formulaire
  
	
	// Ouvrir la fenetre modal avec l'utilisateur
	$scope.openUtilisateur = function (id_contact) {
		//alert('id_contact += '+id_contact);
		$scope.infosUtilisateur.id_contact = id_contact;
		if(id_contact == 0)
		{
			$rootScope.infosUtilisateur = {
			  "id_contact": "0",
			  "id_users": "0",
			  "nom": "",
			  "prenom": "",
			  "login": "",
			  "titre": "M",
			  "position": "",
			  "tel": "",
			  "mobile": "",
			  "fax": "",
			  "email": "",
			  "actif": true};
			$rootScope.Ui.turnOn('infoUtilisateur');
		}
		else
		{
			
			angular.forEach($scope.utilisateur.mesUtilisateurs, function(userObject, index){
					if (userObject.id_contact == id_contact){
						$rootScope.infosUtilisateur = userObject;
						if(userObject.actif==1)
							$rootScope.infosUtilisateur.actif = true;
						else
							$rootScope.infosUtilisateur.actif = false;
						
						// Pour annuler les modifications
						$rootScope.userIndex = index;
						$rootScope.copyInfosUtilisateur = angular.copy($rootScope.infosUtilisateur);
					//alert('BRAVO userObject.id_contact == id_contact '+userObject.id_contact+' id_contact '+id_contact+' SOIT '+$scope.infosUtilisateur.id_contact+' '+$scope.infosUtilisateur.nom);
						$rootScope.Ui.turnOn('infoUtilisateur');
					}
			});
		}
	};

	// Ouvrir la fenetre modal pour confirmer la suppression d'un Utilisateur
	$scope.openSupprimerUtilisateur = function (id_contact) {
		if(id_contact > 0)
		{
			angular.forEach($scope.utilisateur.mesUtilisateurs, function(userObject, index){
				if (userObject.id_contact == id_contact){
					$rootScope.infosUtilisateur = userObject;
					if(userObject.actif==1)
						$rootScope.infosUtilisateur.actif = true;
					else
						$rootScope.infosUtilisateur.actif = false;

					$rootScope.userIndex = index;
					$rootScope.Ui.turnOn('modalSupprimerUtilisateur');
				}
			});			
		}
	};
	// Ouvrir la fenetre modal pour confirmer l'envoi du mot de passe d'un Utilisateur
	$scope.openEnvoyerPassword = function (id_contact) {
		$rootScope.resuEnvoyerPassword = {
			'erreur':-1,
			'commentaire':''
		}
		if(id_contact > 0)
		{
			angular.forEach($scope.utilisateur.mesUtilisateurs, function(userObject, index){
				if (userObject.id_contact == id_contact){
					$rootScope.infosUtilisateur = userObject;
					if(userObject.actif==1)
						$rootScope.infosUtilisateur.actif = true;
					else
						$rootScope.infosUtilisateur.actif = false;
					
					$rootScope.userIndex = index;
					$rootScope.Ui.turnOn('modalEnvoyerPassword');
				}
			});			
		}
	};
	
	


    $scope.listePeriodicite			= null;
    $scope.listeTitre			= null;
    $scope.listeFonction			= null;
    $scope.listeServiceMail			= null;

	// Sauvegarde des données de l'utilisateur, en cas d'erreur lors de la modification
    $scope.sauveInfoUser= {
		'titre_user': $scope.utilisateur.titre_user,
		'nom_user': $scope.utilisateur.nom_user,
		'prenom_user': $scope.utilisateur.prenom_user,
		'telephone_user': $scope.utilisateur.telephone_user,
		'mobile_user': $scope.utilisateur.mobile_user,
		'fax_user': $scope.utilisateur.fax_user,
		'email_user': $scope.utilisateur.email_user
	}
	$scope.copyInfoUser = angular.copy($scope.sauveInfoUser);
	
	
// Chargement de Periodicite
    function chargeListePeriodicite(){
        var reqSearchPeriodicite = {
          method: 'POST',
          url: urlServer+'/apiLease/lovs/index.php',
          headers: {
            'Content-Type': undefined
          },
          params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  view: 'allType',
                  type: 'periodicite',
                  champIndex: 'id_lov'
          }
        };
        $rootScope.loading = true;
        $http(reqSearchPeriodicite).then(successPostChargeListePeriodicite, errorPostChargeListePeriodicite);
    };
    function successPostChargeListePeriodicite(dataJson){
		$scope.erreur = dataJson.data.erreur;
		if($scope.erreur)
		{
			$rootScope.erreurRetour={
				'erreur':dataJson.data.erreur,
				'commentaire':dataJson.data.commentaire
			};
			$rootScope.Ui.turnOn('modalErreur');
			
		}
		else
		{
			
			
			//$scope.listePeriodicite = getTabeauAvecIndex(dataJson.data,'id_lov');
			// $scope.listePeriodicite = ;
			$scope.listePeriodicite = dataJson.data;
			$rootScope.listePeriodicite = $scope.listePeriodicite;
		}			 
		 
		 
         $rootScope.loading = false;
    };
    function errorPostChargeListePeriodicite(){
    };
	// Chargement de Titre
    function chargeListeTitre(){
        var reqSearchTitre = {
          method: 'POST',
          url: urlServer+'/apiLease/lovs/index.php',
          headers: {
            'Content-Type': undefined
          },
          params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  view: 'allType',
                  type: 'titre'
          }
        };
        $rootScope.loading = true;
        $http(reqSearchTitre).then(successPostChargeListeTitre, errorPostChargeListeTitre);
    };
    function successPostChargeListeTitre(dataJson){
		$scope.erreur = dataJson.data.erreur;
		if($scope.erreur)
		{
			$rootScope.erreurRetour={
				'erreur':dataJson.data.erreur,
				'commentaire':dataJson.data.commentaire
			};
			$rootScope.Ui.turnOn('modalErreur');
			
		}
		else
		{
			 $scope.listeTitre = dataJson.data;
			 $rootScope.listeTitre = $scope.listeTitre;
			 $rootScope.loading = false;
		}
    };
    function errorPostChargeListeTitre(){
    };
    // Chargement de fonction/position
    function chargeListeFonction(){
        var reqSearchFonction = {
          method: 'POST',
          url: urlServer+'/apiLease/lovs/index.php',
          headers: {
            'Content-Type': undefined
          },
          params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  view: 'allType',
                  type: 'fonction'
          }
        };
        $rootScope.loading = true;
        $http(reqSearchFonction).then(successPostChargeListeFonction, errorPostChargeListeFonction);
    };
    function successPostChargeListeFonction(dataJson){
		$scope.erreur = dataJson.data.erreur;
		if($scope.erreur)
		{
			$rootScope.erreurRetour={
				'erreur':dataJson.data.erreur,
				'commentaire':dataJson.data.commentaire
			};
			$rootScope.Ui.turnOn('modalErreur');
			
		}
		else
		{
			$scope.listeFonction = dataJson.data;
			$rootScope.listeFonction = $scope.listeFonction;
			$rootScope.loading = false;
		}
    };
    function errorPostChargeListeFonction(){
    };
	
	// Chargement de ServiceMail
    function chargeListeServiceMail(){
        var reqSearchServiceMail = {
          method: 'POST',
          url: urlServer+'/apiLease/lovs/index.php',
          headers: {
            'Content-Type': undefined
          },
          params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  view: 'allType',
                  type: 'ServiceMail'
          }
        };
        $rootScope.loading = true;
        $http(reqSearchServiceMail).then(successPostChargeListeServiceMail, errorPostChargeListeServiceMail);
    };
    function successPostChargeListeServiceMail(dataJson){
		$scope.erreur = dataJson.data.erreur;
		if($scope.erreur)
		{
			$rootScope.erreurRetour={
				'erreur':dataJson.data.erreur,
				'commentaire':dataJson.data.commentaire
			};
			$rootScope.Ui.turnOn('modalErreur');
			
		}
		else
		{		
			$scope.listeServiceMail = dataJson.data;
			$rootScope.listeServiceMail = $scope.listeServiceMail;
			$rootScope.loading = false;
		}
    };
    function errorPostChargeListeServiceMail(){
    };

	// Chargement des lovs
	chargeListePeriodicite();
	chargeListeTitre();
	chargeListeFonction();
	chargeListeServiceMail();
	
	$rootScope.infosErreur = '';
	$rootScope.infos = '';

	$scope.changeCivilite = function(uneCilivite) {
		$scope.utilisateur.titre_user=uneCilivite;
	}
	$scope.ModifCoordonnee = function(unChamp) {
		$rootScope.infos='';
		// Si le formulaire est modifié
		// Ou qu'on a cliqué pour la 1ere fois sur la civilité
// alert('unChamp.$modelValue:'+unChamp.$modelValue+'\nunChamp.$viewValue='+unChamp.$viewValue)		;

		if(unChamp.$valid && unChamp.$viewValue!='' && (unChamp.$dirty || unChamp.$name=='titre_user'))
		{
			var reqSearchModifCoordonnee = {
				method: 'POST',
				url: urlServer+'/apiLease/users/index.php',
				headers: {'Content-Type': undefined},
				params: { luser: $rootScope.user_login,
					puser: $rootScope.user_password,
					cmd: "modifCoordonnee",
					champ: unChamp.$name,
					value: unChamp.$viewValue
				}
			};
// loggerOne(unChamp,'unChamp','');
			switch (unChamp.$name) { 
				case 'titre_user': $rootScope.modificationChamp='Civilité'; break;
				case 'nom_user': $rootScope.modificationChamp='Nom'; break;
				case 'prenom_user': $rootScope.modificationChamp='Prénom'; break;
				case 'telephone_user': $rootScope.modificationChamp='Téléphone'; break;
				case 'mobile_user': $rootScope.modificationChamp='Mobile'; break;
				case 'fax_user': $rootScope.modificationChamp='Fax'; break;
				case 'email_user': $rootScope.modificationChamp='Email'; break;
				default: $rootScope.modificationChamp=unChamp.$name; break;
			}
			$rootScope.loading = true;
			$http(reqSearchModifCoordonnee).then(successPostModifCoordonnee, errorPostModifCoordonnee);
		}
    };
    function successPostModifCoordonnee(dataJson){
		$scope.erreur = dataJson.data.erreur;
		if($scope.erreur)
		{
			$rootScope.erreurRetour={
				'erreur':dataJson.data.erreur,
				'commentaire':dataJson.data.commentaire
			};
			$scope.infos='';
			$scope.infosErreur=dataJson.data.commentaire;

			// Annuler toutes les modifications liées à l'utilisateur
			$scope.utilisateur.titre_user = $scope.copyInfoUser.titre_user;
			$scope.utilisateur.nom_user = $scope.copyInfoUser.nom_user;
			$scope.utilisateur.prenom_user = $scope.copyInfoUser.prenom_user;
			$scope.utilisateur.telephone_user = $scope.copyInfoUser.telephone_user;
			$scope.utilisateur.mobile_user = $scope.copyInfoUser.mobile_user;
			$scope.utilisateur.fax_user = $scope.copyInfoUser.fax_user;
			$scope.utilisateur.email_user = $scope.copyInfoUser.email_user;
		
			
			$rootScope.Ui.turnOn('modalErreur');
			$rootScope.loading = false;
			
		}
		else
		{
			$scope.infosErreur='';
			$scope.infos='La modification du champ '+$rootScope.modificationChamp+' a bien été réalisée';
			$rootScope.msgInformation={
				'titre':'Modification réalisée.',
				'class':'text-success',
				'information':$scope.infos
			}
			
			// Ne pas afficher le modal en cas de sussès
			// $rootScope.Ui.turnOn('modalInformation');
			
			
			$rootScope.loading = false;
		}
    };
    function errorPostModifCoordonnee(){
		$rootScope.infos='';
		$rootScope.infosErreur='Erreur';
    };

	$scope.ModifCoordonnees = function(formCoordonnees) {
		$rootScope.infos='';
		$rootScope.infosErreur='';
		
		var msgError='';

		var lengthTel = formCoordonnees.telephone_user.$viewValue.length;
		var lengthMobile = formCoordonnees.mobile_user.$viewValue.length;
		var lengthFax = formCoordonnees.fax_user.$viewValue.length;

		// Verifiaction du formualire
		if(formCoordonnees.$dirty)
		{
			// Titre
			if($scope.utilisateur.titre_user=='')
				msgError+=' Merci de choisir la civilité';

			// Nom et prénom
			if(formCoordonnees.nom_user.$error.required)
				msgError+=' Merci de saisir le nom.';
			if(formCoordonnees.prenom_user.$error.required)
				msgError+=' Merci de saisir le prénom.';
			
			// Téléphone
			if(lengthTel<9 && lengthTel>0)
			{
				formCoordonnees.telephone_user.$error.minlength = true;
				msgError+=' Merci de saisir au moins 10 caractères pour le téléphone.';
			}
			else
				formCoordonnees.telephone_user.$error.minlength = false;

			// Mobile
			if(lengthMobile<9 && lengthMobile>0)
			{
				formCoordonnees.mobile_user.$error.minlength = true;
				msgError+=' Merci de saisir au moins 10 caractères pour le mobile.';
			}
			else
				formCoordonnees.mobile_user.$error.minlength = false;

			// Fax
			if(lengthFax<9 && lengthFax>0)
			{
				formCoordonnees.fax_user.$error.minlength = true;
				msgError+=' Merci de saisir au moins 10 caractères pour le fax.';
			}
			else
			{
				formCoordonnees.fax_user.$error.minlength = false;
			}
			
			// Au moins un numéro téléphone ou mobile
			if(formCoordonnees.telephone_user.$error.auMoins)
				msgError+=' Merci de saisir au moins un numéro de téléphone ou de mobile.';
			
			// Email
			if(formCoordonnees.email_user.$error.required)
				msgError+=' Merci de saisir un email.';
			if(formCoordonnees.email_user.$invalid)
				msgError+=' Merci de saisir un email valide.';
			/*
			if(formCoordonnees.email_user.$dirty)
				msgError+=' L\'email a été modifié.';
			*/

		}
		$scope.msgError = msgError;
		if(msgError!='')
		{
			$rootScope.infos='';
			formCoordonnees.$invalid = true;
			formCoordonnees.$valid = false;
			return false;
		}
		

	
		// Si le formulaire est modifié
		// Ou qu'on a cliqué pour la 1ere fois sur la civilité

		if(formCoordonnees.$valid && formCoordonnees.$dirty)
		{
			var reqModifCoordonnees = {
				method: 'POST',
				url: urlServer+'/apiLease/users/index.php',
				headers: {'Content-Type': undefined},
				params: { luser: $rootScope.user_login,
					puser: $rootScope.user_password,
					cmd: "modifCoordonnees",
					titre_user: $scope.utilisateur.titre_user,
					nom_user: $scope.utilisateur.nom_user,
					prenom_user: $scope.utilisateur.prenom_user,
					telephone_user: $scope.utilisateur.telephone_user,
					mobile_user: $scope.utilisateur.mobile_user,
					fax_user: $scope.utilisateur.fax_user,
					email_user: $scope.utilisateur.email_user,
					ancien_email_user: $scope.copyInfoUser.email_user
				}
			};

			$rootScope.loading = true;
			$http(reqModifCoordonnees).then(successPostModifCoordonnees, errorPostModifCoordonnees);
			
			formCoordonnees.$dirty = false;
		}
    };
    function successPostModifCoordonnees(dataJson){
		$scope.erreur = dataJson.data.erreur;
		if($scope.erreur)
		{
			$rootScope.erreurRetour={
				'erreur':dataJson.data.erreur,
				'commentaire':dataJson.data.commentaire
			};
			$scope.infos='';
			$scope.infosErreur=dataJson.data.commentaire;

			// Annuler toutes les modifications liées à l'utilisateur
			$scope.utilisateur.titre_user = $scope.copyInfoUser.titre_user;
			$scope.utilisateur.nom_user = $scope.copyInfoUser.nom_user;
			$scope.utilisateur.prenom_user = $scope.copyInfoUser.prenom_user;
			$scope.utilisateur.telephone_user = $scope.copyInfoUser.telephone_user;
			$scope.utilisateur.mobile_user = $scope.copyInfoUser.mobile_user;
			$scope.utilisateur.fax_user = $scope.copyInfoUser.fax_user;
			$scope.utilisateur.email_user = $scope.copyInfoUser.email_user;
		
			
			$rootScope.Ui.turnOn('modalErreur');
			$rootScope.loading = false;
			
		}
		else
		{
			$scope.infosErreur='';
			$scope.infos='La modification a bien été réalisée';
			$rootScope.msgInformation={
				'titre':'Modification réalisée.',
				'class':'text-success',
				'information':$scope.infos
			}
			
			// Ne pas afficher le modal en cas de sussès
			// $rootScope.Ui.turnOn('modalInformation');
			
			
			$rootScope.loading = false;
		}
    };
    function errorPostModifCoordonnees(){
		$rootScope.infos='';
		$rootScope.infosErreur='Erreur';
    };

	
	$scope.msgError='';

  
  
	$scope.$watch('utilisateur.telephone_user', function(newValue, oldValue){
		$scope.utilisateur.telephone_user = $filter('telephoneFR')(newValue);		
	});
	$scope.$watch('utilisateur.fax_user', function(newValue, oldValue){
		$scope.utilisateur.fax_user = $filter('telephoneFR')(newValue);
	});
	$scope.$watch('utilisateur.mobile_user', function(newValue, oldValue){
		$scope.utilisateur.mobile_user = $filter('telephoneFR')(newValue);
	});	
	
		
  }
  

);


/*
app.filter('partenaireMembre', function () {
  return function (items) {
    return items.filter(function (item) {
	if(item.member>0)
	  return true;
	else
	  return false;
    });
  };
});

*/

var ctrl_SupprimerUtilisateur = app.controller('ctrlSupprimerUtilisateur',
	function($rootScope, $scope, items, $routeParams, $http) {

		// Supprimer utilisateur
		$scope.supprimerUtilisateur = function (id_contact) {
			
			angular.forEach($scope.utilisateur.mesUtilisateurs, function(userObject, index){
				if (userObject.id_contact == id_contact){
					var reqDeleteUser = {
						method: 'POST',
						url: urlServer+'/apiLease/users/index.php',
						headers: {'Content-Type': undefined},
						params: { luser: $rootScope.user_login,
							puser: $rootScope.user_password,
							cmd: "deleteUser",
							contact_id: $scope.infosUtilisateur.id_contact,
							users_id: $scope.infosUtilisateur.id_users
						}
					};

					$rootScope.userIndex = index;
					$rootScope.loading = true;
					$http(reqDeleteUser).then(successPostSupprimerUtilisateur, errorPostSupprimerUtilisateur);
				}
			});
			//$rootScope.Ui.turnOff('modalSupprimerUtilisateur');
		};
		function successPostSupprimerUtilisateur(dataJson){
			
			
			$scope.erreurRetour = dataJson.data;
			$scope.erreur = dataJson.data.erreur;
			$rootScope.loading = false;
			if($scope.erreur)
			{
				$rootScope.Ui.turnOn('modalSupprimerUtilisateur');
			}
			else // Il n'y a pas d'erreur
			{
				$scope.utilisateur.mesUtilisateurs[$rootScope.userIndex].actif=0;
				$scope.utilisateur.mesUtilisateurs[$rootScope.userIndex].actif_contact=0;
				$scope.utilisateur.mesUtilisateurs[$rootScope.userIndex].actif_utilisateur=0;
				
				$rootScope.Ui.turnOn('modalSupprimerUtilisateur');
				
				// TODO Fermer la fenêtre si pas d'erreur
			}

			
			// logger($scope.erreurRetour,'erreurRetour','eRetour');
			/*
			if($scope.erreur)
			{
		  alert('  est OK ');
				// $rootScope.erreurRetour={
					// 'erreur':dataJson.data.erreur,
					// 'commentaire':dataJson.data.commentaire
				// };
			}
			else
			{
				
		 alert('  est KO ');
//			$scope.copyInfosUtilisateur = angular.copy($scope.infosUtilisateur);
			// $scope.infosUtilisateur = dataJson.data;
			}
			*/

		
			
			
		};
		function errorPostSupprimerUtilisateur(dataJson){
			 $rootScope.loading = false;
		};	
		
	}
);

var ctrl_EnvoyerPassword = app.controller('ctrlEnvoyerPassword',
	function($rootScope, $scope, items, $routeParams, $http) {

		// Envoyer mot de passe
		$scope.envoyerPassword = function (login) {
			$rootScope.loading = true;

			var reqEnvoyerPassword = {
			  method: 'POST',
			  url: urlServer+'/apiLease/users/index.php',
			  headers: {
				'Content-Type': undefined
			  },
			  params: { 
					luser: $rootScope.user_login,
					puser: $rootScope.user_password,
					cmd: 'sendMailUser',
					login: login
				}
			};
			$rootScope.loading = true;
			$http(reqEnvoyerPassword).then(successPostEnvoyerPassword, errorPostEnvoyerPassword);
		};
		function successPostEnvoyerPassword(dataJson){
			
			// Renvoi l'erreur (la réponse) au modal
			$rootScope.resuEnvoyerPassword = dataJson.data;
			$rootScope.loading = false;
		};
		function errorPostEnvoyerPassword(){
			//alert('envoyer Password Erreur TU ES UN MAUVAIS' + dataJson);
			$rootScope.loading = false;
		};		
	
	
		
	}
);


var ctrl_ModalUtilisateur = app.controller('ctrlModalUtilisateur',
	function($rootScope, $scope, $filter, items, $routeParams, $http) {

		$rootScope.showSidebarRight = true;

  
		// Gestion des erreurs clients
		// Gestion des erreurs clients
		$scope.msgError='';
		$scope.$watch(function() {
			var msgError='';
			if($scope.formUtilisateur.$dirty)
			{
				if($scope.infosUtilisateur.titre=='')
					msgError+=' Merci de choisir la civilité';

				// Controle sur le champ fonction/position
				if(typeof($scope.formUtilisateur.position)!=="undefined")
				{
					if($scope.formUtilisateur.position.$error.required)
					{
						msgError+=' Merci de saisir une fonction dans la liste déroulante';
					}
					else
					{
						// la valeur de la fonction/position doit etre dans la liste déroulante
						var laFonctionExiste = false;
						angular.forEach($scope.listeFonction, function(fctObject, index){
							if (fctObject.lib_short == $scope.formUtilisateur.position.$viewValue){
								laFonctionExiste = true;
							}
						});
						
						if(!laFonctionExiste)
						{
							msgError+=' Merci de sélectionner une fonction dans la liste déroulante';
							$scope.formUtilisateur.position.$error.required=true;
							$scope.formUtilisateur.position.$invalid=true;
						}
					}
				}
				
				// Nom
				if(typeof($scope.formUtilisateur.nom)!=="undefined")
				{
					if($scope.formUtilisateur.nom.$error.required)
						msgError+=' Merci de saisir le nom.';
					if($scope.formUtilisateur.prenom.$error.required)
						msgError+=' Merci de saisir le prénom.';
				}
				
				// Téléphone
				if(typeof($scope.formUtilisateur.tel)!=="undefined")
				{
					if($scope.formUtilisateur.tel.$error.minlength)
						msgError+=' Merci de saisir au moins 10 caractères pour le téléphone.';
					if($scope.formUtilisateur.tel.$error.auMoins)
						msgError+=' Merci de saisir au moins un numéro de téléphone ou de mobile.';
				}
				
				// Mobile
				if(typeof($scope.formUtilisateur.mobile)!=="undefined")
				{
					$scope.formUtilisateur.mobile.$invalid=false;
					$scope.formUtilisateur.mobile.$valid=true;
					if($scope.formUtilisateur.mobile.$error.minlength)
					{
						msgError+=' Merci de saisir au moins 10 caractères pour le mobile.';
						$scope.formUtilisateur.mobile.$invalid=true;
						$scope.formUtilisateur.mobile.$valid=false;
					}
				}
				
				// Fax
				if(typeof($scope.formUtilisateur.fax)!=="undefined")
				{
					if($scope.formUtilisateur.fax.$error.minlength)
						msgError+=' Merci de saisir au moins 10 caractères pour le fax.';
				}
				
				// Email
				if(typeof($scope.formUtilisateur.email)!=="undefined")
				{
					if($scope.formUtilisateur.email.$error.required)
						msgError+=' Merci de saisir un email.';
					if($scope.formUtilisateur.email.$invalid)
						msgError+=' Merci de saisir un email valide.';
				}

			}

			$scope.msgError = msgError;
// console.log('AVANT invalid :'+$scope.formUtilisateur.$invalid+' VALID :'+$scope.formUtilisateur.$valid);
			if(msgError!='')
			{
				$scope.formUtilisateur.$invalid = true;
				$scope.formUtilisateur.$valid = false;
			}
			else
			{
				$scope.formUtilisateur.$valid = true;
				$scope.formUtilisateur.$invalid = false;
			}
			
// console.log('     invalid :'+$scope.formUtilisateur.$invalid+' VALID :'+$scope.formUtilisateur.$valid+' MODIF:'+$scope.formUtilisateur.$dirty+ ' return msgError='+msgError);

		});
  
  
	
	$scope.$watch('infosUtilisateur.tel', function(newValue, oldValue){
		if(typeof($scope.formUtilisateur.tel)!=="undefined")
		{
			if(newValue.length<9 && newValue.length>0)
			{
				$scope.formUtilisateur.tel.$error.minlength = true;
				//$scope.msgError +=' Merci de saisir au moins 10 caractères pour le téléphone.';
			}
			else
				$scope.formUtilisateur.tel.$error.minlength = false;
		}

		$scope.infosUtilisateur.tel = $filter('telephoneFR')(newValue);
		
	});
	$scope.$watch('infosUtilisateur.fax', function(newValue, oldValue){
		$scope.infosUtilisateur.fax = $filter('telephoneFR')(newValue);
	});
	$scope.$watch('infosUtilisateur.mobile', function(newValue, oldValue){
		$scope.infosUtilisateur.mobile = $filter('telephoneFR')(newValue);
		if(typeof($scope.formUtilisateur.mobile)!=="undefined")
		{
			if(newValue.length<9 && newValue.length>0)
				$scope.formUtilisateur.mobile.$error.minlength = true;
			else
				$scope.formUtilisateur.mobile.$error.minlength = false;
		}
	});
	
	
	
		// Activer tous les droits de l'utilisateur en cours
		$scope.activerTousLesDroits = function(id_tiers){
			angular.forEach($scope.infosUtilisateur.droitsUsersTiers, function(unDroitTiers, indexDroit){
				if(id_tiers==unDroitTiers.id_tiers)
				{
					unDroitTiers.access=true;
					$scope.formUtilisateur.$dirty = true;
				}
			});		
		}
		// Supprimer tous les droits de l'utilisateur en cours
		$scope.supprimerTousLesDroits = function(id_tiers){
			angular.forEach($scope.infosUtilisateur.droitsUsersTiers, function(unDroitTiers, indexDroit){
				if(id_tiers==unDroitTiers.id_tiers)
				{
					unDroitTiers.access=false;
					$scope.formUtilisateur.$dirty = true;
				}
			});					
		}
		
		// Fermer le formulaire (sans valider le formulaire)
		$rootScope.closeConfirm = function(reponse){
			if(reponse) // Fermer sans sauvegarder
			{
				$rootScope.Ui.turnOff('modalConfirm');
				if($scope.infosUtilisateur.id_contact>0) { // Modification
					angular.forEach($rootScope.utilisateur.mesUtilisateurs, function(userObject, index){
							if (userObject.id_contact == $scope.infosUtilisateur.id_contact){
								$rootScope.infosUtilisateur = $rootScope.copyInfosUtilisateur;
								$rootScope.utilisateur.mesUtilisateurs[index] = $rootScope.copyInfosUtilisateur;
								$rootScope.Ui.turnOff('infoUtilisateur');
							}
					});
				}
				else // Création
				{
					$rootScope.Ui.turnOff('infoUtilisateur');
					
				}
				// $rootScope.Ui.turnOff('infoUtilisateur');
			}
			else // Ne pas fermer le modal utilisateur
			{
				$rootScope.Ui.turnOff('modalConfirm');
				$rootScope.Ui.turnOn('infoUtilisateur');
			}
		};
		$scope.reset = function(dirty){
			if(dirty){ // Le formulaire a été modifié
				$rootScope.msgConfirm={
						"titre":"Quitter la fenêtre sans sauvegarder.",
						"question":"Etes-vous sûr de vouloir quitter cette fenêtre sans sauvegarder les modifications ?"
				};
				
				$rootScope.Ui.turnOn('modalConfirm');
			}
			else // Le formulaire n'a pas été modifié
			{
				$rootScope.Ui.turnOff('infoUtilisateur');
			}
		};
			
		// Submit du formulaire
		$scope.modifierUtilisateur = function(){
			$rootScope.loading = true;
			
			$scope.infosUtilisateur.cmdUser='createUtilisateur';
			if($scope.infosUtilisateur.id_contact > 0)
                  $scope.infosUtilisateur.cmdUser='updateUtilisateur';
				
//alert('On est dans modifierUtilisateur '+ $scope.infosUtilisateur.login+' id=' + $scope.infosUtilisateur.id_contact + ' mode:'+$scope.infosUtilisateur.cmdUser);

			var actif=0;
			if($scope.infosUtilisateur.actif)
				actif=1;
				
			//alert('scope.infosUtilisateur.actif = '+$scope.infosUtilisateur.actif+ ' => '+actif);
			$scope.infosUtilisateur.actif = actif;
			var reqModifUser = {
				method: 'POST',
				url: urlServer+'/apiLease/users/index.php',
				headers: {'Content-Type': undefined},
				params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  cmd: $scope.infosUtilisateur.cmdUser,
                  contact_id: $scope.infosUtilisateur.id_contact,
                  contact_nom: $scope.infosUtilisateur.nom,
                  contact_prenom: $scope.infosUtilisateur.prenom,
                  utilisateur_login: $scope.infosUtilisateur.login,
                  contact_email: $scope.infosUtilisateur.email,
                  contact_titre: $scope.infosUtilisateur.titre,
                  contact_fonction: $scope.infosUtilisateur.position,
                  contact_tel: $scope.infosUtilisateur.tel,
                  contact_mobile: $scope.infosUtilisateur.mobile,
                  contact_fax: $scope.infosUtilisateur.fax,
                  contact_actif: actif,
                  users_id: $scope.infosUtilisateur.id_users,
                  contact_date_naissance: $scope.infosUtilisateur.date_naissance,
				  }
			};
			
			$http(reqModifUser).then(successPostModifierUtilisateur, errorPostModifierUtilisateur);
			
			//alert('Merci nous allons TRAITER les infos de '+$scope.infosUtilisateur.id_contact+' login '+$scope.infosUtilisateur.login);
			
			//$rootScope.Ui.turnOff('infoUtilisateur');
			//$rootScope.loading = false;
			return false;
		}
		function successPostModifierUtilisateur(dataJson){
		 	// Ajouter un utilisateur
			if($scope.infosUtilisateur.cmdUser=="createUtilisateur")
			{
				$scope.erreur = dataJson.data.erreur;
				if($scope.erreur)
				{
					$rootScope.erreurRetour={
						'erreur':dataJson.data.erreur,
						'commentaire':dataJson.data.commentaire
					};
					
					$rootScope.Ui.turnOff('infoUtilisateur');
					$rootScope.Ui.turnOn('modalErreur');
					
				}
				else
				{
					// $rootScope.Ui.turnOn('modalConfirm');
					$scope.infosUtilisateur = dataJson.data;
					$rootScope.utilisateur.mesUtilisateurs.unshift($scope.infosUtilisateur);
					
					// Afin d'annuler les droits ou les autres modifications après la création
					$rootScope.copyInfosUtilisateur = angular.copy($scope.infosUtilisateur);

					// Les droitsUsersTiers
					// TODO : 
					//  - Soit ouvrir à nouveau la fenetre avec les droits en mode modification
					//  - Soit mettre à jour directement
					// $rootScope.Ui.turnOff('infoUtilisateur');
					
					// Rendre le formulaire 'comme modifi�' ainsi le bouton 'Sauvegarder' appara�tra
					formUtilisateur.$dirty = true;
				}
			}
			else // Mise à jour des droits d'accès
			{
				//alert('modifierDroitsUsersTiers '+$scope.infosUtilisateur.droitsUsersTiers);
				$scope.erreur = dataJson.data.erreur;
				if($scope.erreur)
				{
					$rootScope.erreurRetour={
						'erreur':dataJson.data.erreur,
						'commentaire':dataJson.data.commentaire
					};
					
					// Annuler les modifications
					$scope.utilisateur.mesUtilisateurs[$rootScope.userIndex]=$rootScope.copyInfosUtilisateur;
					
					$rootScope.Ui.turnOff('infoUtilisateur');
					$rootScope.Ui.turnOn('modalErreur');
					
				}
				else
				{
					modifierDroitsUsersTiers($scope.infosUtilisateur.droitsUsersTiers);
					modifierTiersContact($scope.infosUtilisateur.partenaires);
					modifierServiceMail($scope.infosUtilisateur.serviceMail);
				}
			}
			 $rootScope.loading = false;
			/*
			// TODO : Mettre à jour le contact_id
			//$scope.items.splice($scope.mesUtilisateurs.length, 1);
			*/
 
			 
			 
			 
		};
		function errorPostModifierUtilisateur(){ 	
			//$scope.msgSend = false;
		};  


	

		// Ajouter/Modifier les droits utilisateurs tiers
		function modifierDroitsUsersTiers(droitsUsersTiers){
			$rootScope.loading = true;
			
			if($scope.infosUtilisateur.id_contact > 0)
//alert('On est dans modifierDroitsUsersTiers '+ $scope.infosUtilisateur.login+' id=' + $scope.infosUtilisateur.id_contact + ' mode:'+$scope.infosUtilisateur.cmdUser);
//alert('en ARGUMENT droitsUsersTiers '+ angular.toJson(droitsUsersTiers));
//alert('avec le scope.infosUtilisateur.droitsUsersTiers '+ $scope.infosUtilisateur.droitsUsersTiers);

			var reqModifDroitsUsersTiers = {
				method: 'POST',
				url: urlServer+'/apiLease/users/index.php',
				headers: {'Content-Type': undefined},
				params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  cmd: "modifierDroitsUsersTiers",
                  lesDroits: angular.toJson(droitsUsersTiers)
				  }
			};
			
			$http(reqModifDroitsUsersTiers).then(successPostModifierDroitsUsersTiers, errorPostModifierDroitsUsersTiers);
			
			// alert('Merci nous allons Mettre à jours les DroitsUsersTiers les infos de '+$scope.infosUtilisateur.id_contact+' login '+$scope.infosUtilisateur.login);
			
			//$rootScope.loading = false;
			return false;
		}
		function successPostModifierDroitsUsersTiers(dataJson){
			 $rootScope.loading = false;
			
			// Mise à jour des droits d'accès
			$scope.erreur = dataJson.data.erreur;
			if($scope.erreur)
			{
				$rootScope.erreurRetour={
					'erreur':dataJson.data.erreur,
					'commentaire':dataJson.data.commentaire
				};
				
				// Annuler les modifications - Uniquement les droitsUsersTiers
				//$scope.utilisateur.mesUtilisateurs[$rootScope.userIndex]=$rootScope.copyInfosUtilisateur;
				$scope.utilisateur.mesUtilisateurs[$rootScope.userIndex].droitsUsersTiers=$rootScope.copyInfosUtilisateur.droitsUsersTiers;
				
				$rootScope.Ui.turnOff('infoUtilisateur');
				$rootScope.Ui.turnOn('modalErreur');
				
			}
			
			
			
			$rootScope.Ui.turnOff('infoUtilisateur');
			$rootScope.loading = false;			 
		};
		function errorPostModifierDroitsUsersTiers(){ 	
			//$scope.msgSend = false;
			 // alert('ATTENTION la BDD est KO pour '+$scope.infosUtilisateur.login + " " + $scope.infosUtilisateur.cmdUser);
		};  

		// Ajouter/Modifier les ServiceMail
		function modifierServiceMail(serviceMail){
			$rootScope.loading = true;
			
			if($scope.infosUtilisateur.id_contact > 0)
			{
				
				var reqModifServiceMail = {
					method: 'POST',
					url: urlServer+'/apiLease/users/index.php',
					headers: {'Content-Type': undefined},
					params: { luser: $rootScope.user_login,
					  puser: $rootScope.user_password,
					  cmd: "modifierServiceMail",
					  serviceMail: angular.toJson(serviceMail)
					  }
				};
				
				$http(reqModifServiceMail).then(successPostModifierServiceMail, errorPostModifierServiceMail);
			}
			
			// alert('Merci nous allons Mettre à jours les ServiceMail les infos de '+$scope.infosUtilisateur.id_contact+' login '+$scope.infosUtilisateur.login);
			
			//$rootScope.loading = false;
			return false;
		}
		function successPostModifierServiceMail(dataJson){
			 //$scope.msgSend = true;
			 // alert('BRAVO la BDD est OK pour successPostModifierServiceMail '+$scope.infosUtilisateur.login + " " + $scope.infosUtilisateur.cmdUser);
			$scope.erreur = dataJson.data.erreur;
			if($scope.erreur)
			{
				$rootScope.erreurRetour={
					'erreur':dataJson.data.erreur,
					'commentaire':dataJson.data.commentaire
				};
				
				// Annuler les modifications - Uniquement les services Mail
				// $scope.utilisateur.mesUtilisateurs[$rootScope.userIndex]=$rootScope.copyInfosUtilisateur;
				$scope.utilisateur.mesUtilisateurs[$rootScope.userIndex].serviceMail=$rootScope.copyInfosUtilisateur.serviceMail;
				
				$rootScope.Ui.turnOff('infoUtilisateur');
				$rootScope.Ui.turnOn('modalErreur');
				
			}
			
			$rootScope.Ui.turnOff('infoUtilisateur');
			$rootScope.loading = false;			 
		};
		function errorPostModifierServiceMail(){ 	
			//$scope.msgSend = false;
			 // alert('ATTENTION la BDD est KO pour '+$scope.infosUtilisateur.login + " " + $scope.infosUtilisateur.cmdUser);
		};  

		
		
		// Ajouter/Modifier les membres tiers
		function modifierTiersContact(partenaires){
			$rootScope.loading = true;
			
			if($scope.infosUtilisateur.id_contact > 0)
			var reqModifTiersContact = {
				method: 'POST',
				url: urlServer+'/apiLease/users/index.php',
				headers: {'Content-Type': undefined},
				params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  cmd: "modifierTiersContact",
                  lesTiersContacts: angular.toJson(partenaires)
				  }
			};
			
			$http(reqModifTiersContact).then(successPostModifierTiersContact, errorPostModifierTiersContact);
			
			// alert('Merci nous allons Mettre à jours les TiersContact les infos de '+$scope.infosUtilisateur.id_contact+' login '+$scope.infosUtilisateur.login);
			
			//$rootScope.loading = false;
			return false;
		}
		function successPostModifierTiersContact(dataJson){
			 $rootScope.loading = false;
			$scope.erreur = dataJson.data.erreur;
			if($scope.erreur)
			{
				$rootScope.erreurRetour={
					'erreur':dataJson.data.erreur,
					'commentaire':dataJson.data.commentaire
				};
				
				// Annuler les modifications - Uniquement les partenaires
				// $scope.utilisateur.mesUtilisateurs[$rootScope.userIndex]=$rootScope.copyInfosUtilisateur;
				$scope.utilisateur.mesUtilisateurs[$rootScope.userIndex].partenaires=$rootScope.copyInfosUtilisateur.partenaires;
				
				$rootScope.Ui.turnOff('infoUtilisateur');
				$rootScope.Ui.turnOn('modalErreur');
				
			}			
			$rootScope.Ui.turnOff('infoUtilisateur');
			$rootScope.loading = false;			 
		};
		function errorPostModifierTiersContact(){ 	
			//$scope.msgSend = false;
			 // alert('ATTENTION la BDD est KO pour '+$scope.infosUtilisateur.login + " " + $scope.infosUtilisateur.cmdUser);
		};  
		
	}
);