import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AtlasService} from './shared/atlas.service';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ToolbarComponent} from './shared/toolbar/toolbar.component';
import {HeaderComponent} from './shared/header/header.component';
import {CreateTypeComponent} from './pages/create-type/create-type.component';
import {CreateFieldComponent} from './pages/create-field/create-field.component';
import {FormsModule} from '@angular/forms';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './pages/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import {WebsitesComponent} from './pages/websites/websites.component';
import {DialogModule} from 'primeng/dialog';
import {CreateContentComponent} from './pages/create-content/create-content.component';
import {ViewContentComponent} from './pages/view-content/view-content.component';
import {EditorModule} from 'primeng/editor';
import {CalendarModule, ColorPickerModule, DropdownModule, MultiSelectModule, SpinnerModule} from 'primeng/primeng';
import {MonacoEditorModule} from 'ngx-monaco-editor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToolbarComponent,
    HeaderComponent,
    CreateTypeComponent,
    CreateFieldComponent,
    WebsitesComponent,
    LoginComponent,
    CreateContentComponent,
    ViewContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputSwitchModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    TableModule,
    DialogModule,
    EditorModule,
    SpinnerModule,
    ColorPickerModule,
    DropdownModule,
    CalendarModule,
    MonacoEditorModule.forRoot(),
    MultiSelectModule,
  ],
  providers: [AtlasService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
