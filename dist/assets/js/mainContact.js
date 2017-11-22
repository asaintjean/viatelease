//Controler du formulaire de contact
var ctrl_Contact = app.controller('ctrlContactPrive',
  function($rootScope, $scope, items, $http) {
	
	$rootScope.showSidebarRight = true;
   
   // preparation du mail
	$scope.contact_nom = $rootScope.contact_nom;
	$scope.contact_prenom =$rootScope.contact_prenom;
	$scope.contact_email = $rootScope.contact_email;
	$scope.contact_tel =  $rootScope.contact_tel;
	$scope.contact_id = $rootScope.user_id;

	// Destinataire
	$scope.destinataire_email = null;

	// Information du message
	$scope.message_sujet = null;
	$scope.message_corps = null;

	
	
	
    $scope.showMe= false;
    $scope.msgSend = false;

    // Chargement des contacts (depuis la base de donn�es via la table siv.lov type=emailApiLease)
    chargeListEmail();
    /*
    $scope.lesContacts=[
              	      {id: 'service.commercial@viatelease.fr', name :'Service Commercial'},
            	      {id: 'adv@viatelease.fr', name: 'ADV (Administration Des Ventes'},
            	      {id: 'compta@viatelease.fr', name: 'Comptabilit�'},
            	      {id: 'recouvrement@viatelease.fr', name: 'Recouvrement'}
                        ];
    */
    function chargeListEmail(){
    	var reqSearchEmail = {
    			method: 'POST',
    			url: urlServer+'/apiLease/lovs/index.php',
    			headers: {
    				'Content-Type': undefined
    			},
    			params: { luser: $rootScope.user_login,
    				puser: $rootScope.user_password,
    				view: 'EmailContact',    				
    				type: 'emailApiLease'    				
    			}
    	};
    	$rootScope.loading = true;
    	$http(reqSearchEmail).then(successPostChargeListEmail, errorPostChargeListEmail);
    };
    function successPostChargeListEmail(dataJson){
    	$rootScope.loading = false;
    	$scope.lesContacts = dataJson.data;
    	$scope.leContact = $scope.lesContacts[0];  
    	$scope.destinataire_email = $scope.leContact.id;
    };
    function errorPostChargeListEmail(){
    };
    
    // Changement de destinataire
    $scope.changedContact=function(leContact){
    	if(leContact.id != $scope.lesContacts[0].id)
   		{
    		$scope.showMe= true;
    		$scope.destinataire_email = $scope.lesContacts[0].id + ';' + leContact.id;
   		}
    	else
    	{
    		$scope.showMe= false;
    		$scope.destinataire_email = $scope.lesContacts[0].id;
    	}
    }

    // Submit du formulaire
    $scope.contact = function(){
    	 
        // Envoyer les informations
        var reqSendEmailContact = {
          method: 'POST',
          url: urlServer+'/apiLease/sendEmail/index.php',
          headers: {
            'Content-Type': undefined
          },
          params: { luser: $rootScope.user_login,
                  puser: $rootScope.user_password,
                  cmd: 'sendMail',
                  contact_nom: $scope.contact_nom,
                  contact_prenom: $scope.contact_prenom,
                  contact_email: $scope.contact_email,
                  contact_tel: $scope.contact_tel,
                  contact_id: $scope.contact_id,
                  destinataire_email: $scope.destinataire_email,
                  message_sujet: $scope.message_sujet,
                  message_corps: $scope.message_corps,
				  typeCorrespondance: 'ContactPrive'
          }
        };
        $rootScope.loading = true;
        
        $http(reqSendEmailContact).then(successPostSendEmailContact, errorPostSendEmailContact);
        
        $scope.msgSend = true;
        
        //alert('Merci de nous avoir contacté!\nVotre demande à bien été prise en compte votre conseillé va traité votre demande.');
        $rootScope.Ui.turnOff('contact');
     };
    function successPostSendEmailContact(dataJson){
         $rootScope.loading = false;
         $scope.msgSend = true;
    };
    function errorPostSendEmailContact(){    	
    	$scope.msgSend = false;
    };
  }
);
