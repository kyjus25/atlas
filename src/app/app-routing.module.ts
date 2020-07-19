import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CreateTypeComponent} from './pages/create-type/create-type.component';
import {CreateFieldComponent} from './pages/create-field/create-field.component';
import {LoginComponent} from './pages/login/login.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'create/content', component: CreateTypeComponent, data: {type: 'content'}},
  {path: 'create/content/:id', component: CreateTypeComponent, data: {type: 'content'}},
  {path: 'create/singleton', component: CreateTypeComponent, data: {type: 'singleton'}},
  {path: 'create/singleton/:id', component: CreateTypeComponent, data: {type: 'singleton'}},
  {path: 'create/content/field', component: CreateFieldComponent, data: {type: 'content'}},
  {path: 'create/content/:id/field', component: CreateFieldComponent, data: {type: 'content'}},
  {path: 'create/singleton/field', component: CreateFieldComponent, data: {type: 'singleton'}},
  {path: 'create/singleton/:id/field', component: CreateFieldComponent, data: {type: 'singleton'}},
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
