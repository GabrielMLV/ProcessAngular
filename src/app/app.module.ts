import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessComponent } from './process/process.component';
import { HttpClientModule } from '@angular/common/http';
import { EditProcessComponent } from './edit-process/edit-process.component';
import { NewProcessComponent } from './new-process/new-process.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProcessComponent,
    EditProcessComponent,
    NewProcessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
