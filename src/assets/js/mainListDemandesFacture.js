var ctrl_DataGridDossierFacture = app.controller('ctrlDataGridDossierFacture',
	function($rootScope,$scope,$http,$compile){
		if(!$scope.accessVisualiserDemandeFinancement)
			$scope.deconnexion();
		$rootScope.showSidebarRight = true;
		var req = {
			method	: 'POST',
			url		: urlServer+'/apiLease/dossiers/index.php',
			headers	: {'Content-Type': undefined},
			params	: {
				luser: $rootScope.user_login,
				puser: $rootScope.user_password,
				view: 'V5',
	            id_apporteur: $scope.demandeDemandeur.apporteur.id_tiers
			}
		};

		$rootScope.loading = true;
		$http(req).then(function(dataJson){
			$scope.data = dataJson.data;
			var btnhtml = '<jsontabledossierfacture data="data"></jsontabledossierfacture> ';
			var temp = $compile(btnhtml)($scope);
			angular.element(document.getElementById('datasDossiersFacture')).append(temp);
			$rootScope.loading = false;
		}, function(){});
	}
);

ctrl_DataGridDossierFacture.filter('startFrom', function() {
    return function(input, start) {
        start = +start; 
        return input.slice(start);
    }
});

ctrl_DataGridDossierFacture.directive('jsontabledossierfacture', function($rootScope,$timeout) {
	return {
		restrict : 'E',
		transclude : true,
		scope : {
			data : '='
		},
		templateUrl : 'jsonTableDossierFacture.html',
		link : function(scope, element, attrs, controllers) {
			scope.table = {
				pagination : {
					actualRange : "10",
					actualPage : "1",
					range : ["5","10","30","50","100"]
				},
				search : {},
				order : {
					key : 'Date_de_mise_en_loyer',
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
                        scope.nameFieldViewInfoDossier = 'N_Dossier';

                        try {
            				angular.forEach(scope.data, function(object, index) {
            					angular.forEach(object, function(objectValue, objectKey) {
            						scope.table.head.values.push({value : objectKey, lib : libelleAccentue(objectKey), typeData : typageData(objectKey,objectValue)});
            					});
            					throw Error();
            				});
                        } catch(e) {
                            // anything
                        }
		}
	};
});