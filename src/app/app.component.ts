import { environment } from './../environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  indicadoresEndpoint: string = environment.INDICADORES_FRONT_URL;
  title = 'Gestão de indicadores';
}
