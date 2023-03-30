import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularAspectContainerModule } from 'angular-aspect-container';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularAspectContainerModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
