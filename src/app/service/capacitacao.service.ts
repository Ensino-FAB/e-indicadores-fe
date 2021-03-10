import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CapacitacaoSearchModel, Capacitacao } from '../models/capacitacao.model';
import { Pageable } from '../models/pageable.model'

@Injectable({
  providedIn: 'root'
})
export class CapacitacaoService {

  constructor(protected http: HttpClient) { }

  private endpoint = `${environment.INDICADORES_API_URL}/capacitacao`;

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

  findAllCapacitacao(search: CapacitacaoSearchModel): Observable<Pageable<Capacitacao>> {
    this.removeEmptyFields(search);
    const params = this.buildHttpParams(search);

    return this.http.get<any>(this.endpoint, { params }).pipe(take(1));
  }
}
