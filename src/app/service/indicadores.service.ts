import { Organizacao } from './../models/organizacao.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Indicador, IndicadorCreate } from '../models/indicador.model';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  constructor(protected http: HttpClient) { }

  private endpoint = `${environment.INDICADORES_API_URL}/indicador`;

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

  edit(idIndicador: string, indicadorCreate: IndicadorCreate): Observable<Indicador> {
    return this.http.put<Indicador>(`${this.endpoint}/${idIndicador}`, indicadorCreate);
  }
  create(indicadorCreate: IndicadorCreate): Observable<Indicador> {
    return this.http.post<Indicador>(this.endpoint, indicadorCreate);
  }

  delete(idIndicador: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/${idIndicador}`,);
  }

  findAllIndicadoresOrganizacao(idOrg: string): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(`${this.endpoint}/organizacao/${idOrg}`).pipe(take(1));
  }

  findAllIndicadoresOrganizacoesSubordinadas(cdOrg: string): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(`${this.endpoint}/organizacao/${cdOrg}/subordinadas`).pipe(take(1));
  }

  findAllIndicadoresByCursoOrganizacao(idOrg: string, idCurso: string): Observable<Indicador[]>{
    return this.http.get<Indicador[]>(`${this.endpoint}/filtro/organizacao/${idOrg}/curso/${idCurso}`).pipe(take(1));
  }

  findAllIndicadoresByCursoOrgSubordinada(cdOrg: string, idCurso: string): Observable<Indicador[]>{
    return this.http.get<Indicador[]>(`${this.endpoint}/filtro/organizacao/subordinadas/${cdOrg}/curso/${idCurso}`).pipe(take(1));
  }
}
