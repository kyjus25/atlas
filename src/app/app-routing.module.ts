import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CreateTypeComponent} from './pages/create-type/create-type.component';
import {CreateFieldComponent} from './pages/create-field/create-field.component';
import {LoginComponent} from './pages/login/login.component';
import {FrontendsComponent} from './pages/frontends/frontends.component';
import {CreateContentComponent} from './pages/create-content/create-content.component';
import {ViewContentComponent} from './pages/view-content/view-content.component';
import {MediaComponent} from './pages/media/media.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'frontends', component: FrontendsComponent},
  {path: 'media', component: MediaComponent},
  {path: 'content/:id/add', component: CreateContentComponent, data: {type: 'content'}},
  {path: 'content/:id/edit', component: CreateTypeComponent, data: {type: 'content'}},
  {path: 'content/:id', component: ViewContentComponent, data: {type: 'content'}},
  {path: 'singleton/:id/add', component: CreateContentComponent, data: {type: 'singleton'}},
  {path: 'singleton/:id/edit', component: CreateTypeComponent, data: {type: 'singleton'}},
  {path: 'singleton/:id', component: ViewContentComponent, data: {type: 'singleton'}},
  {path: 'content/new/edit/field', component: CreateFieldComponent, data: {type: 'content'}},
  {path: 'content/:id/edit/field', component: CreateFieldComponent, data: {type: 'content'}},
  {path: 'singleton/new/edit/field', component: CreateFieldComponent, data: {type: 'singleton'}},
  {path: 'singleton/:id/edit/field', component: CreateFieldComponent, data: {type: 'singleton'}},
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
