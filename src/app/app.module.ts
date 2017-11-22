import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { MainCreateDemandeComponent } from './main-create-demande/main-create-demande.component';
import { MainListDemandesComponent } from './main-list-demandes/main-list-demandes.component';
import { MainListReglementsComponent } from './main-list-reglements/main-list-reglements.component';
import { MainListLitigesComponent } from './main-list-litiges/main-list-litiges.component';
import { MainParcComponent } from './main-parc/main-parc.component';
import { MainEspaceKdoComponent } from './main-espace-kdo/main-espace-kdo.component';
import { MainTableauxBordComponent } from './main-tableaux-bord/main-tableaux-bord.component';
import { MainUtilisateurComponent } from './main-utilisateur/main-utilisateur.component';
import { MainContactComponent } from './main-contact/main-contact.component';
import { MainLogOutComponent } from './main-log-out/main-log-out.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MainSimulationDemandeComponent } from './main-simulation-demande/main-simulation-demande.component';





@NgModule({
  declarations: [
    AppComponent,
    MainCreateDemandeComponent,
    MainListDemandesComponent,
    MainListReglementsComponent,
    MainListLitigesComponent,
    MainParcComponent,
    MainEspaceKdoComponent,
    MainTableauxBordComponent,
    MainUtilisateurComponent,
    MainContactComponent,
    MainLogOutComponent,
    LoginComponent,
    AccueilComponent,
    MainSimulationDemandeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
