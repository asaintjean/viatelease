import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';

import { LoginComponent } from './login/login.component';
import { MainLogOutComponent } from './main-log-out/main-log-out.component';
import { MainContactComponent } from './main-contact/main-contact.component';

import { MainCreateDemandeComponent } from './main-create-demande/main-create-demande.component';
import { MainEspaceKdoComponent } from './main-espace-kdo/main-espace-kdo.component';
import { MainListDemandesComponent } from './main-list-demandes/main-list-demandes.component';

import { MainListLitigesComponent } from './main-list-litiges/main-list-litiges.component';
import { MainListReglementsComponent } from './main-list-reglements/main-list-reglements.component';
import { MainParcComponent } from './main-parc/main-parc.component';

import { MainTableauxBordComponent } from './main-tableaux-bord/main-tableaux-bord.component';
import { MainUtilisateurComponent } from './main-utilisateur/main-utilisateur.component';

import { MainSimulationDemandeComponent } from './main-simulation-demande/main-simulation-demande.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },

  { path: 'accueil', component: AccueilComponent},
  { path: 'login', component: LoginComponent},
  { path: 'mainContact', component: MainContactComponent},
  
  { path: 'mainCreateDemande', component: MainCreateDemandeComponent},
  { path: 'mainEspaceKDO', component: MainEspaceKdoComponent},
  { path: 'mainListDemandes', component: MainListDemandesComponent},
  
  { path: 'mainListLitiges', component: MainListLitigesComponent},
  { path: 'mainListReglements', component: MainListReglementsComponent},
  { path: 'mainParc', component: MainParcComponent},

  { path: 'mainTableauxBord', component: MainTableauxBordComponent},
  { path: 'mainUtilisateur', component: MainUtilisateurComponent},
  { path: 'mainLogOut', component: MainLogOutComponent},
  
  { path: 'mainSimulationDemande', component: MainSimulationDemandeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


