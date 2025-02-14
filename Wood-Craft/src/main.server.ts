import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ApplicationConfig } from '@angular/core';

const config: ApplicationConfig = {
  providers: [] // Add your providers here
};

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
