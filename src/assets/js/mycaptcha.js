   //Created / Generates the captcha function    
    function DrawCaptcha()
    {
    	var canvas = document.getElementById("myCanvas");

    	//alert(canvas);
    	/*if(canvas==null){}else{*/
    		var ctx = canvas.getContext("2d");
    	/*}*/
    	
    	
    	var img = document.getElementById("captcha");
    	//alert(img);
    	ctx.drawImage(img, 0, 0);
    	ctx.font = "italic 40pt Calibri";
    	ctx.fillStyle = 'LightCoral'; //'silver';

        
        var chars = "0Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0Kk1Ll2Mm3Nn4Oo5Pp6Qq7Rr8Ss9Tt0Uu1Vv2Ww3Xx4Yy5Zz";
        var string_length = 7;
        captchastring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            captchastring += chars.substring(rnum, rnum + 1);
        }
        
        ctx.fillText(captchastring,10,50);
        document.getElementById("txtCaptchamodalLostPassword").value = Crypt(captchastring)
    }


    

    
    // Validate the Entered input aganist the generated security code function   
    function ValidCaptcha(){
        var str1 = removeSpaces(unCrypt(document.getElementById('txtCaptchamodalLostPassword').value));
        //var str1 = removeSpaces(document.getElementById('myCanvas').value);
        var str2 = removeSpaces(document.getElementById('txtInput').value);
        
        if(str1 == str2){
        	//document.getElementById('testFermer').innerHTML='<button class="close" ui-turn-off="modalLostPassword">XXX</button>';
        	//grecaptcha.render("captcha1", {sitekey: "6LeN9SkUAAAAAOCiuTsjrqePJo5l954je9hsf8Mh", theme: "light"});

        	document.getElementById('mymod').style.display='block';

        	//return '<div class="modal-body"> <div class="content"><label>Login*</label><input class="form-control" ng-model="lostpasswordLogin" name="login" type="text" required /><p>Merci de saisir votre <b>login</b>, vous recevrez par mail votre nouveau mot de passe.</p></div><div class="modal-footer"><button class="pull-left btn btn-primary btn-large" ng-click="sendLostPasswordRequest()"><i class="fa fa-check" aria-hidden="true"></i> Envoyer la demande</button>	 <button ui-turn-off="modalLostPassword" class="btn btn-primary"><i class="fa fa-times" aria-hidden="true"></i> Annuler</button></div> </div>';
        	// return 1;
        	 
        	
/*
    	    if(document.getElementById('BtnAnnuler') == null ){
            	var btn = document.createElement("BUTTON");
            	btn.setAttribute("id", "BtnAnnuler");
            	btn.setAttribute("class", "btn btn-primary");
            	btn.setAttribute("ui-turn-off", "modalLostPassword");
            	
            	
           	 	var i = document.createElement("I");
           	 	var t = document.createTextNode("Annuler");
           	 	i.appendChild(t);
            	i.setAttribute("class", "fa fa-times");
            	i.setAttribute("aria-hidden", "true");
            	
            	
            	btn.appendChild(i);
            	btn.appendChild(t);
            	document.getElementById("myDIV").appendChild(btn);
    	    }
*/
        	
        	

        	
        	 return '<p><i>Captcha ok</i></p>';
        
        }else
        	{

        	 return '<p><i>Saisie erronée</i></p>';
        	}
        
        
       
        
    }

    // Remove the spaces from the entered and generated code
    function removeSpaces(string)
    {
        return string.split(' ').join('');
    }
    
    function Crypt(mycaptchastring) // fonction de cryptage
    {
      //var key = document.getElementById('key').value; //on récupère la clé dans la zone de texte
      //var input = document.getElementById('input').value; //on récupère le message dans la zone de texte
    	
      var key= 'secret';
      var input =mycaptchastring;
      var longueur = input.length; //on récupère la longueur du message
      while (key.length < input.length){ //tant que la clé est trop courte, on la rallonge
          key = key + key;
      }
      var currentchar = 0; //adresse du caractère en cour de traitement
      var result = ""; //résultat
      var crypted; //Valeur  ASCII du caractère crypté
      while (currentchar<longueur){ //Tant que l'on a pas atteint la fin de la chaîne
          crypted = input.charCodeAt(currentchar) + key.charCodeAt(currentchar); // Valeur ASCII caractère crypté = Valeur ASCII caractère message+Valeur ASCII caractère clé
          if (crypted>127){ //si valeur obtenue est supérieure à 127, on lui retire 127 pour rester dans la table accéptée
              crypted = crypted - 127;
          }
          result = result + String.fromCharCode(crypted); // Ajout du caractère crypté à la chaine résultat
          currentchar = currentchar + 1;//On avance de 1 dans le traitement de la chaine
      }
      //document.getElementById('result').value = result; //on affiche le résultat dans la zone de texte
      //alert("Finis");
      return result;
    }
    
      function unCrypt(mycryptedcaptchastring) // fonction de décryptage
    {
      //var key = document.getElementById('key').value; 
      //var input = document.getElementById('input').value;
      var key= 'secret';
      var input = mycryptedcaptchastring;
      var longueur = input.length;
      while (key.length < input.length){
          key = key + key;
      }
      var currentchar = 0;
      var result = "";
      var uncrypted;
      while (currentchar<longueur){
          uncrypted = input.charCodeAt(currentchar) - key.charCodeAt(currentchar);
          if (uncrypted<0){
              uncrypted = uncrypted + 127;
          }
          result = result + String.fromCharCode(uncrypted);
          currentchar = currentchar + 1;
      }
      //document.getElementById('result').value = result;
      //alert("Finis");
      return result;
    }