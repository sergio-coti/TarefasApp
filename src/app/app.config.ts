import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [

    /* habilitando o uso de rotas */
    provideRouter(routes),

    /* habilitando a biblioteca HttpClient */
    provideHttpClient(),

    /* habilitando a biblioteca de animações */
    provideAnimations()
  ]
};
