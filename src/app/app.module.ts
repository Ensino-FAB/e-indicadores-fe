import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule } from 'keycloak-angular';
import { authProviderBuilder } from '../auth/lib/providers/auth.provider';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseWrapperModule } from './shared/components/base-wrapper/base-wrapper.module';

const authProvider = authProviderBuilder({
  url: environment.KEYCLOAK_URL,
  realm: environment.KEYCLOAK_REALM,
  clientId: environment.KEYCLOAK_CLIENT_ID
});
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BaseWrapperModule,
    KeycloakAngularModule
  ],
  providers: [
    authProvider,
    { provide: 'INDICADORES_API_ENDPOINT', useValue: environment.INDICADORES_API_URL },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
