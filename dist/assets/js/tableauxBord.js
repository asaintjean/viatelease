  
  //*******************************************************************************************************************************//
  //
  //        Tableaux de bord
  //
  //*******************************************************************************************************************************//

var ctrl_states_accueil = app.controller('ctrlStatesAccueil',
  function($rootScope, $scope,$http) {
	$rootScope.showSidebarRight = true;
	// Show Tableau de bord
	$scope.showTDBs = function(){
        if($scope.showTBConcret == 'show' || $scope.showTBAccept == 'show' || $scope.showTBLitiges == 'show'|| $scope.showTBProduction == 'show') {
        	return true;
        }else{
        	return false;
        }
    }
	$scope.showTableauxBord = function(){
		// Nb Tableau à visionner
		$scope.nbTableau2Show = 0;
		$scope.nbTableauSlide2 = 0;
		$scope.slide1=false; 
		
		if(!$scope.accessVisualiserTableauxBord)
			return false;

		//console.log('------------------'+new Date()+'----');
		// logger($scope.dataTBConcret,'scope.dataTBConcret','TBConcret:');
		// logger($scope.dataTBRepart,'scope.dataTBRepart','TBRepart:');
		// logger($scope.dataTBProduction,'scope.dataTBProduction','dataTBProduction:');
		// logger($scope.dataTBAccept,'scope.dataTBAccept','dataTBAccept:');
		// logger($scope.dataTBLitiges,'scope.dataTBLitiges','dataTBLitiges:');

		  if($scope.showTBConcret && $scope.dataTBConcret && $scope.accessTableauDossiersConcretisation) $scope.nbTableau2Show ++;
		  if($scope.showTBAccept  && $scope.dataTBAccept  && $scope.accessTableauDossiersAcceptations)   $scope.nbTableau2Show ++;
		  if($scope.showTBProduction  && $scope.dataTBProduction  && $scope.accessTableauDossiersProduction)    
		  {
			  $scope.nbTableau2Show ++;
			  $scope.nbTableauSlide2 ++;
		  }
		  if($scope.showTBLitiges && $scope.dataTBLitiges && $scope.accessTableauDossiersLitiges)
		  {
			  $scope.nbTableau2Show ++;
			  $scope.nbTableauSlide2 ++;
		  }
		  
		  // On inverse le slide, pour avoir les 2 tableaux du 2eme slide visible
		  // if($scope.nbTableau2Show == 3 && $scope.nbTableauSlide2 == 2)
		  if($scope.nbTableauSlide2 == 2)  // a 4 tableux l'ordre est également inversé
			$scope.slide1=true;
// console.log('Tableaux de bords : Nb à voir='+$scope.nbTableau2Show+' Nb 2eme Slide='+$scope.nbTableauSlide2)
// console.log(' '+$scope.nbTableauSlide2+' / '+$scope.nbTableau2Show)
	}
	
	
	$scope.$watch('dataTBProduction', function(newVal, oldVal){
		// console.log('* WATCH dataTBProduction * '+newVal);	
		$scope.showTableauxBord();
	},true);
	/*
	$scope.$watch('dataTBRepart', function(newVal, oldVal){
		// console.log('* WATCH dataTBRepart * '+newVal);	
		$scope.showTableauxBord();
	},true);
	*/
	$scope.$watch('dataTBAccept', function(newVal, oldVal){
		// console.log('* WATCH dataTBAccept * '+newVal);	
		$scope.showTableauxBord();
	},true);
	$scope.$watch('dataTBLitiges', function(newVal, oldVal){
		// console.log('* WATCH dataTBLitiges * '+newVal);	
		$scope.showTableauxBord();
	},true);
	$scope.$watch('dataTBConcret', function(newVal, oldVal){
		// console.log('* WATCH dataTBConcret * '+newVal);	
		$scope.showTableauxBord();
	},true);

    // Production sur 3 ans
    $scope.loadStatesProduction = function(){
		$rootScope.loading = true;
        var reqLoadStateProduction = {
          method: 'POST',
          url: urlServer+'/apiLease/states/index.php',
          headers: {
            'Content-Type': undefined
          },
          params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  cmd: 'S5',
  	            id_apporteur: $scope.demandeDemandeur.apporteur.id_tiers
          }
        };
        $http(reqLoadStateProduction).then(successPostLoadStatesProduction, errorPostLoadStatesProduction);
    }

    function successPostLoadStatesProduction(dataJson){
    	$rootScope.loading = false;
		
 	   $scope.erreur = dataJson.data.erreur;

 		if($scope.erreur)
 		{
 			$rootScope.erreurRetour={
 					'erreur':$scope.erreur,
 					'commentaire':dataJson.data.commentaire
 					};
 			$rootScope.Ui.turnOn('modalErreur');
 		}
 		
        // Labels
        $scope.labelsTBProduction= dataJson.data.labels;
        // Series
        $scope.seriesTBProduction = dataJson.data.series;
        // datas
        $scope.dataTBProduction = dataJson.data.datas;
        // titre
        $scope.titreTBProduction = dataJson.data.titre;
        // Show graph
        $scope.showTBProduction = dataJson.data.show;

    };
    function errorPostLoadStatesProduction(){};    
    
    // Encours répartition
    $scope.loadStatesRepart = function(){
		$rootScope.loading = true;
        var reqLoadStateRepart = {
          method: 'POST',
          url: urlServer+'/apiLease/states/index.php',
          headers: {
            'Content-Type': undefined
          },
          params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  cmd: 'S3',
  	            id_apporteur: $scope.demandeDemandeur.apporteur.id_tiers
          }
        };
        $http(reqLoadStateRepart).then(successPostLoadStatesRepart, errorPostLoadStatesRepart);
    }
    function successPostLoadStatesRepart(dataJson){
		$rootScope.loading = false;
       // Labels
	   
	   
	   $scope.erreur = dataJson.data.erreur;
	   $scope.erreurInfo = dataJson.data.commentaire;
// console.log($scope.erreur,' erreur ','erreur:');
// console.log($scope.erreurInfo,' erreurInfo ','erreurInfo:');
	   
       $scope.labelsTBRepart = dataJson.data.labels;
       // Series
       $scope.dataTBRepart = dataJson.data.datas;
// logger($scope.dataTBRepart,' succes LoadStatesRepart ','datas:');
       // titre
       $scope.titreTBRepart = dataJson.data.titre;
       // Show graph
       $scope.showTBRepart = dataJson.data.show;

    };
    function errorPostLoadStatesRepart(){};

    // Concrétisation
    $scope.loadStatesConcret = function(){ 
		$rootScope.loading = true;
        var reqLoadStateConcret = {
          method: 'POST',
          url: urlServer+'/apiLease/states/index.php',
          headers: {
            'Content-Type': undefined
          },
          params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  cmd: 'S1',
  	            id_apporteur: $scope.demandeDemandeur.apporteur.id_tiers
          }
        };
        $http(reqLoadStateConcret).then(successPostLoadStatesConcret, errorPostLoadStatesConcret);
    }
    function successPostLoadStatesConcret(dataJson){
		$rootScope.loading = false;
	   $scope.erreur = dataJson.data.erreur;
	   $scope.erreurInfo = dataJson.data.commentaire;
// console.log($scope.erreur,' erreur ','erreur:');
// console.log($scope.erreurInfo,' erreurInfo ','erreurInfo:');
		
		
       // Labels
       $scope.labelsTBConcret= dataJson.data.labels;
       // Series
       $scope.dataTBConcret = dataJson.data.datas;
// logger($scope.dataTBConcret,' succes LoadStatesConcret ','datas:');	   
       // titre
       $scope.titreTBConcret = dataJson.data.titre;
       // Show graph
       $scope.showTBConcret = dataJson.data.show;

    };
    function errorPostLoadStatesConcret(){};
    
    // Acceptation
    $scope.loadStatesAccept = function(){ 
		$rootScope.loading = true;
        var reqLoadStateAccept = {
          method: 'POST',
          url: urlServer+'/apiLease/states/index.php',
          headers: {
            'Content-Type': undefined
          },
          params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  cmd: 'S2',
  	            id_apporteur: $scope.demandeDemandeur.apporteur.id_tiers
          }
        };
        $http(reqLoadStateAccept).then(successPostLoadStatesAccept, errorPostLoadStatesAccept);
    }
    function successPostLoadStatesAccept(dataJson){
		$rootScope.loading = false;
		
	   $scope.erreur = dataJson.data.erreur;
	   
// console.log($scope.erreur,' erreur ','erreur:');
// console.log($scope.erreurInfo,' erreurInfo ','erreurInfo:');

		if($scope.erreur)
		{
			$rootScope.erreurRetour={
					'erreur':$scope.erreur,
					'commentaire':dataJson.data.commentaire
					};
			$rootScope.Ui.turnOn('modalErreur');
		}
		
       // Labels
       $scope.labelsTBAccept= dataJson.data.labels;
       // Series
       $scope.seriesTBAccept = dataJson.data.series;
       // datas
       $scope.dataTBAccept = dataJson.data.datas;
// logger($scope.dataTBAccept,' succes LoadStatesAccept ','datas:');	   
       // titre
       $scope.titreTBAccept = dataJson.data.titre;
       // Show graph
       $scope.showTBAccept = dataJson.data.show;

    };
    function errorPostLoadStatesAccept(){};
   
    // Litiges
    $scope.loadStatesLitiges = function(){ 
		$rootScope.loading = true;
        var reqLoadStateLitiges = {
          method: 'POST',
          url: urlServer+'/apiLease/states/index.php',
          headers: {
            'Content-Type': undefined
          },
          params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  cmd: 'S4',
  	            id_apporteur: $scope.demandeDemandeur.apporteur.id_tiers
          }
        };
        $http(reqLoadStateLitiges).then(successPostLoadStatesLitiges, errorPostLoadStatesLitiges);
    }
    function successPostLoadStatesLitiges(dataJson){
		$rootScope.loading = false;
		
	   $scope.erreur = dataJson.data.erreur;
	   $scope.erreurInfo = dataJson.data.commentaire;
// console.log($scope.erreur,' erreur ','erreur:');
// console.log($scope.erreurInfo,' erreurInfo ','erreurInfo:');

		
       // Labels
       $scope.labelsTBLitiges= dataJson.data.labels;
       // Series
       $scope.seriesTBLitiges = dataJson.data.series;
       // datas
       $scope.dataTBLitiges = dataJson.data.datas;
// logger($scope.dataTBLitiges,' succes LoadStatesLitiges ','datas:');	
       // titre
       $scope.titreTBLitiges = dataJson.data.titre;
       // Show graph
       $scope.showTBLitiges = dataJson.data.show;
    };
    function errorPostLoadStatesLitiges(){};

		
	// Concrétisation
	  $scope.showTBConcret = true;
	  $scope.dataTBConcret = {};
	  if($scope.accessTableauDossiersConcretisation)
		$scope.loadStatesConcret();
	  
	  // Acceptation
	  $scope.showTBAccept = true;
	  $scope.dataTBAccept = {};
	  if($scope.accessTableauDossiersAcceptations)
		  $scope.loadStatesAccept();

	  // Production
	  $scope.showTBProduction = true;
	  $scope.dataTBProduction = {};
	  if($scope.accessTableauDossiersProduction)
		$scope.loadStatesProduction();
	  
	  // Litiges
	  $scope.showTBLitiges = true;
	  $scope.dataTBLitiges = {};
	  if($scope.accessTableauDossiersLitiges)
		  $scope.loadStatesLitiges();
	  
	  // Show 
	  $scope.showTDBs();
	  
	  // Show Tableaux de bords page d'accueil
	  $scope.showTableauxBord();
	  
/*
	  
	  if(!$scope.dataTBConcret)
		console.log('VRAI if(!$scope.dataTBConcret)');
	  if($scope.dataTBConcret)
		console.log('VRAI if($scope.dataTBConcret)');

	  if(!$scope.dataTBRepart)
		console.log('VRAI if(!$scope.dataTBRepart)');
	  if($scope.dataTBRepart)
		console.log('VRAI if($scope.dataTBRepart)');
*/
	  
		  
	// console.log('       Concret  Accept Repart  Litiges');
	// console.log('show   '+$scope.showTBConcret+' + '+$scope.showTBAccept+' + '+$scope.showTBRepart+' + '+$scope.showTBLitiges);
	// console.log('access '+$scope.accessTableauDossiersConcretisation+' + '+$scope.accessTableauDossiersAcceptations+' + '+$scope.accessTableauDossiersRepartition+' + '+$scope.accessTableauDossiersLitiges);
	// console.log('DONNES '+$scope.dataTBConcret+' + '+$scope.dataTBAccept+' + '+$scope.dataTBRepart+' + '+$scope.dataTBLitiges);
	
	 
  
  //*******************************************************************************************************************************//
  //    Fin tableau de bord
  //*******************************************************************************************************************************//
  });
  
  
  