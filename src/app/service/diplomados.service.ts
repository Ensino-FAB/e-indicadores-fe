import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Diplomado } from '../models/diplomado.model';

@Injectable({
  providedIn: 'root'
})
export class DiplomadosService {

  constructor(protected http: HttpClient) { }

  private endpoint = `${environment.INDICADORES_API_URL}/diplomados`;

  removeEmptyFields(data: any): void {
    if (!data) {
      return;
    }

    Object.keys(data).forEach(
      (key) =>
        (data[key] === null ||
          data[key] === '' ||
          data[key] === undefined ||
          data[key].length === 0) &&
        delete data[key]
    );
  }

  buildHttpParams(data: any): HttpParams {
    let params = new HttpParams();
    if (!data) {
      return params;
    }

    Object.keys(data).forEach(
      (key) => {
        params = params.append(key, data[key]);
      }
    );

    return params;
  }

  findAllDiplomados(idOrg: string, capacitacaoid: string): Observable<Diplomado[]> {
    const params = this.buildHttpParams({ capacitacaoid });

    return this.http.get<Diplomado[]>(`${this.endpoint}/curso/organizacao/${idOrg}`, { params })
    .pipe(take(1));
  }
}
