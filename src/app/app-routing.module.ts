import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from './page/accueil/accueil.component';
import {LoginComponent} from './page/login/login.component';
import {RegisterComponent} from './page/register/register.component';
import {AnnonceComponent} from './page/annonce/annonce.component';
import {CreerAnnonceComponent} from './page/creer-annonce/creer-annonce.component';
import {AuthGuard} from './guard/auth.guard';
import {CompteComponent} from './page/compte/compte.component';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import {AdminGuard} from './guard/admin.guard';
import {GestAbonneComponent} from './page/dashboard/gest-abonne/gest-abonne.component';
import {GestCategorieComponent} from './page/dashboard/gest-categorie/gest-categorie.component';
import {TestComponent} from './test/test/test.component';
import {ProfilComponent} from './page/profil/profil.component';
import {GestAnnonceComponent} from './page/dashboard/gest-annonce/gest-annonce.component';
import {Page404Component} from './page/page404/page404.component';
import {GestAdminComponent} from './page/dashboard/gest-admin/gest-admin.component';
import {ReclamationComponent} from './page/dashboard/reclamation/reclamation.component';
import {WelcomeComponent} from './page/dashboard/welcome/welcome.component';
import {MessagesComponent} from './page/messages/messages.component';
import {ResultatsComponent} from './page/accueil/resultats/resultats.component';
import {BienvenueComponent} from './page/accueil/bienvenue/bienvenue.component';
import {Resultats2Component} from './page/accueil/resultats2/resultats2.component';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full' },
  {path: '', component: AccueilComponent}
  //   children : [
  //     {path: '', redirectTo: 'accueil', pathMatch: 'full' },
  //     {path: 'accueil' , component: BienvenueComponent },
  //     {path: 'c/:cat', component: Resultats2Component , children : [
  //         {path: 'sc/:scat', component: ResultatsComponent}
  //       ]}
  // ]}
  ,
  {path: 'recherche/:motCle', component: AccueilComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'annonces/:id' , component: AnnonceComponent, canActivate: [AuthGuard]},
  {path: 'profil/:username' , component: ProfilComponent},
  {path: 'creerAnnonce' , component: CreerAnnonceComponent, canActivate: [AuthGuard]},
  {path: 'MonCompte' , component: CompteComponent, canActivate: [AuthGuard]},
  {path: 'Messages' , component: MessagesComponent, canActivate: [AuthGuard]},
  {path: 'Dashboard' , component: DashboardComponent, canActivate: [AdminGuard],
    children : [
      {path: '', redirectTo: 'welcome', pathMatch: 'full' },
      {path: 'welcome' , component: WelcomeComponent },
      {path: 'GestionAdmins' , component: GestAdminComponent },
      {path: 'GestionAbonnes' , component: GestAbonneComponent },
      {path: 'GestionCategories' , component: GestCategorieComponent },
      {path: 'GestionAnnnoces' , component: GestAnnonceComponent },
      {path: 'TraiterReclamations' , component: ReclamationComponent },

    ]},
  { path: 'test', component: TestComponent },
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


