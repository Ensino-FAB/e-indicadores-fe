import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Organizacao, OrganizacaoSearch } from '../models/organizacao.model';
import { Pageable } from '../models/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizacaoService {

  constructor(protected http: HttpClient) { }

  private endpoint = `${environment.INDICADORES_API_URL}/organizacao`;

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

  findOrganizacoesDiretamenteSubordinadas(idOrg: string): Observable<Organizacao[]> {
    return this.http.get<Organizacao[]>(`${this.endpoint}/${idOrg}/subordinadas`);
  }

  findOrganizacoesSubordinadas(idOrg: string): Observable<Organizacao[]> {
    return this.http.get<Organizacao[]>(`${this.endpoint}/${idOrg}/subordinadas`);
  }

  findAll(search: OrganizacaoSearch): Observable<Pageable<Organizacao>> {
    this.removeEmptyFields(search);
    const params = this.buildHttpParams(search);

    return this.http.get<Pageable<Organizacao>>(`${this.endpoint}`, {params}).pipe(take(1));
  }


}
