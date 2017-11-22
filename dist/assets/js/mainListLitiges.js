var ctrl_DataGridLitiges = app.controller('ctrlDataGridListLitiges',
	function($rootScope,$scope,$http,$compile){
		if(!$scope.accessListeLitiges)
			$scope.deconnexion();
		$rootScope.showSidebarRight = true;
		var req = {
			method	: 'POST',
			url		: urlServer+'/apiLease/litiges/index.php',
			headers	: {'Content-Type': undefined},
			params	: {
				luser: $rootScope.user_login,
				puser: $rootScope.user_password,
				view: 'litigesTiers',
	            id_apporteur: $scope.demandeDemandeur.apporteur.id_tiers
			}
		};

		$rootScope.loading = true;
		$http(req).then(function(dataJson){
			// TODO gérer les erreur avec  dataJson.data.erreur
			$scope.data = dataJson.data.data;
			var btnhtml = '<jsontablelitiges data="data"></jsontablelitiges> ';
			var temp = $compile(btnhtml)($scope);
			angular.element(document.getElementById('datasLitiges')).append(temp);
			$rootScope.loading = false;
		}, function(){});

	}
);

ctrl_DataGridLitiges.filter('startFrom', function() {
    return function(input, start) {
        start = +start; 
        return input.slice(start);
    }
});

ctrl_DataGridLitiges.directive('jsontablelitiges', function($rootScope,$timeout) {
	return {
		restrict : 'E',
		transclude : true,
		scope : {
			data : '='
		},
		templateUrl : 'jsonTableLitiges.html',
		link : function(scope, element, attrs, controllers) {
			scope.table = {
				pagination : {
					actualRange : "10",
					actualPage : "1",
					range : ["5","10","30","50","100"]
				},
				search : {},
				order : {
					key : undefined,
					reverse : false
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
