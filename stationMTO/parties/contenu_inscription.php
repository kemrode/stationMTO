<div class="elementContainer  padding">
            <div class="signUpWindow body border">
                <h3 class="nameSignUp SU">Fiche d'inscription</h3>
                <div class="SU">
                    <label for="name">Nom: </label>
                    <input type="text" id="name" name="name">
                </div>
                <div class="SU">
                    <label for="surname">Prénom: </label>
                    <input type="text" id="surname" name="surname">
                </div>
                <div class="SU">
                    <label for="city">Ville: </label>
                    <input type="text" id="city" name="city">
                </div>
                <div class="SU">
                    <label for="mailAddress">e-mail: </label>
                    <input type="text" id="mailAddress" name="mailAddress">
                </div>
                <div class="SU">
                    <label for="pwd">Mot de Passe: </label>
                    <input type="password" id="pwd" name="pwd">
                </div>
                <div class="SU">
                    <label for="pwdVerif">Vérifiez votre mot de passe: </label>
                    <input type="password" id="pwdVerif" name="pwdVerif">
                </div>
                <div id="cgu">
                    <input type="checkbox" id="cguCheckbox" name="cgu" value="true">
                    <label for="cgu">J'accepte les <a href="termes.php">termes</a> et conditions générales d'utilisation.</label>
                </div>
                <div id="submitBTN">
                    <button class="submitBTN">Envoyer</button>
                </div>
            </div>
        </div>
        
        <script src="parties/js/logInRequest.js"></script>