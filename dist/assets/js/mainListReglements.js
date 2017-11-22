var ctrl_DataGridReglements = app.controller('ctrlDataGridListReglements',
	function($rootScope,$scope,$http,$compile){
		if(!$scope.accessListeReglements)
			$scope.deconnexion();
		$rootScope.showSidebarRight = true;
		var req = {
			method	: 'POST',
			url		: urlServer+'/apiLease/reglements/index.php',
			headers	: {'Content-Type': undefined},
			params	: {
				luser: $rootScope.user_login,
				puser: $rootScope.user_password,
				view: 'reglementsTiers',
	            id_apporteur: $scope.demandeDemandeur.apporteur.id_tiers
			}
		};

		$rootScope.loading = true;
		$http(req).then(function(dataJson){
			// TODO Gerer les erreurs // {erreur: false, commentaire: "", data}
			$scope.data = dataJson.data.data;
			var btnhtml = '<jsontablereglements data="data"></jsontablereglements> ';
			var temp = $compile(btnhtml)($scope);
			angular.element(document.getElementById('datasReglements')).append(temp);
			$rootScope.loading = false;
		}, function(){});

	}
);


ctrl_DataGridReglements.filter('startFrom', function() {
    return function(input, start) {
        start = +start; 
        return input.slice(start);
    }
});

ctrl_DataGridReglements.directive('jsontablereglements', function($rootScope,$timeout) {
	return {
		restrict : 'E',
		transclude : true,
		scope : {
			data : '='
		},
		templateUrl : 'jsonTableReglements.html',
		link : function(scope, element, attrs, controllers) {
			scope.table = {
				pagination : {
					actualRange : "10",
					actualPage : "1",
					range : ["5","10","30","50","100"]
				},
				search : {},
				order : {
					key : 'Date_reglement',
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
