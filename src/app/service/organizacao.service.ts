import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organizacao } from '../models/organizacao.model';

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

  findOrganizacoesDiretamenteSubordinadas(idOrg: string): Observable<Organizacao[]> {
    return this.http.get<Organizacao[]>(`${this.endpoint}/${idOrg}/subordinadas`);
  }

  findOrganizacoesSubordinadas(idOrg: string): Observable<Organizacao[]> {
    return this.http.get<Organizacao[]>(`${this.endpoint}/${idOrg}/subordinadas`);
  }



}
