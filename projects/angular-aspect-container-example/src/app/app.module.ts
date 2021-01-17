import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularAspectContainerModule } from 'angular-aspect-container';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularAspectContainerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
