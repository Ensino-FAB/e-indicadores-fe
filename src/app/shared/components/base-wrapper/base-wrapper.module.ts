import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseWrapperComponent } from './base-wrapper.component';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

import { LoadingBarModule } from './../loading-bar/loading-bar.module';
import { LoadingBarService } from './../../services/loading-bar.service';

import { RequestInterceptor } from '../../interceptors/request-interceptor';
import { LoggingInterceptor } from './../../interceptors/logging-interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [BaseWrapperComponent],
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    LoadingBarModule,
    RouterModule,
    ToastModule,
  ],
  exports: [BaseWrapperComponent],
  providers: [
    MessageService,
    LoadingBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
  ],
})
export class BaseWrapperModule {}
