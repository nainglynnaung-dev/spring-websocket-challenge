import { Buffer } from 'buffer';
(window as any).global = window;   // fixes "global is not defined"




import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
