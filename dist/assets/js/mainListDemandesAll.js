var ctrl_DataGridDossierAll = app.controller('ctrlDataGridDossierAll',
	function($rootScope,$scope,$http,$compile,$routeParams) {
		if(!$scope.accessVisualiserDemandeFinancement)
			$scope.deconnexion();
		$rootScope.showSidebarRight = true;
		// $scope.activeTab = 1;
		// console.log($routeParams.tabindex);
		// console.log($scope.activeTab);
		// console.log($rootScope.activeTab);
		// console.log($rootScope.$state);
		// $scope.activeTab = 1;
		if ($routeParams.tabindex) 
		{
			// $scope.activeTab = $routeParams.tabindex;
			// console.log(jQuery('#mainListDemandes-tabs li:eq('+($routeParams.tabindex-1)+') a'));
			jQuery('#mainListDemandes-tabs li:eq('+($routeParams.tabindex-1)+') a').click();
		}

    function filtreAllDossiers(){
        var req = {
          method: 'POST',
          url: urlServer+'/apiLease/dossiers/index.php',
          headers: {
            'Content-Type': undefined
          },
          params: { luser: $rootScope.user_login,
                puser: $rootScope.user_password,
                view: 'VAll',
                idDossier: $scope.searchDossiers.idDossier,
                nomClient: $scope.searchDossiers.nomClient,
                dateCreateStart: $scope.searchDossiers.dateCreateStart,
                dateCreateEnd: $scope.searchDossiers.dateCreateEnd,
                id_apporteur: $scope.demandeDemandeur.apporteur.id_tiers
          }
        };
        $rootScope.loading = true;
        $http(req).then(successPost, errorPost);
    };
    
    function successPost(dataJson){
       
        $scope.data = dataJson.data;
        var eltDossiersAll = angular.element(document.getElementsByTagName('jsontabledossierall'));
        eltDossiersAll.remove();
        var btnhtml = '<jsontabledossierall data="data"></jsontabledossierall>';
        var temp = $compile(btnhtml)($scope);
        angular.element(document.getElementById('datasDossiersAll')).append(temp);


        $rootScope.loading = false;
         
    };
    function errorPost(){
    };
    
    // Filtrer la liste des dossiers
    $scope.searchDossiers =  {idDossier: null, nomClient: null, dateCreateStart: null, dateCreateEnd: null};
    $scope.search2FiltreDossiers = function(){  
        
       $rootScope.searchDossiers.idDossier = $scope.searchDossiers.idDossier; 
       $rootScope.searchDossiers.nomClient = $scope.searchDossiers.nomClient;
       $rootScope.searchDossiers.dateCreateStart = $scope.searchDossiers.dateCreateStart;
       $rootScope.searchDossiers.dateCreateEnd = $scope.searchDossiers.dateCreateEnd;
       
       // Modifier les données de la grid
       // Mise à jour des datas
       filtreAllDossiers();
    };
    
    // Par défaut afficher les datas 
    //filtreAllDossiers();
    
  }
);

ctrl_DataGridDossierAll.filter('startFrom', function() {
    return function(input, start) {
        start = +start; 
        return input.slice(start);
    }
});
        
ctrl_DataGridDossierAll.directive('jsontabledossierall', function($rootScope,$timeout) {
	return {
		restrict : 'E',
		transclude : true,
		scope : {
			data : '='
		},
		templateUrl : 'jsonTableDossierAtt.html',
		link : function(scope, element, attrs, controllers) {
			scope.table = {
				pagination : {
					actualRange : "10",
					actualPage : "1",
					range : ["5","10","30","50","100"]
				},
				search : {},
				order : {
					key : 'Date_demande',
					reverse : true
				},
				head : {values : []},
				body : {values : []}
			};
				
			scope.math = window.Math;
			scope.table.body.values = scope.data;

			scope.order = function(key) {
				scope.table.order.key = key;
				scope.table.order.reverse = !scope.table.order.reverse;
			};

			scope.page = function(direction, force) {
				var max = Math.ceil(scope.table.body.values.length / scope.table.pagination.actualRange);
				var next = +scope.table.pagination.actualPage + direction;
				var actual = scope.table.pagination.actualPage;
				scope.table.pagination.actualPage = (force)? ((direction === -1)? 1 : max) : ((next > 0 && next <= max)? next : actual);
			};
                        
                        
                        // Lancement de la fenêtre d'information d'un dossier
                        scope.viewInfoDossierList = function(idDossier){
							$rootScope.idDossier = null;
							$timeout(function(){
								$rootScope.idDossier = idDossier;
							}, 500);
                        };
                        scope.nameFieldViewInfoDossier = 'N_etude';

                        try {
            				angular.forEach(scope.data, function(object, index) {
            					angular.forEach(object, function(objectValue, objectKey) {
									scope.table.head.values.push({value : objectKey, lib : libelleAccentue(objectKey), typeData : typageData(objectKey,objectValue)})
            					});
            					throw Error();
            				});
                        } catch(e) {
                            // anything
                        }
		}
	};
}); 