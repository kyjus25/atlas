import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CreateTypeComponent} from './pages/create-type/create-type.component';
import {CreateFieldComponent} from './pages/create-field/create-field.component';


const routes: Routes = [
  {path: 'create/type/content', component: CreateTypeComponent, data: {type: 'content'}},
  {path: 'create/type/singleton', component: CreateTypeComponent, data: {type: 'singleton'}},
  {path: 'create/field', component: CreateFieldComponent},
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
