import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { API_URL } from "../enviroment";
import { State } from "../model/state.interface";
import { handleServiceError } from "../utils/handleServiceError";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(
    private http: HttpClient
  ) {}

  // Función para consultar todos los paises
  getStatesByCountry(idCountry: number): Observable<State[]> {
    const url = `${API_URL}/state/${idCountry}`;

    return this.http.get<State[]>(url).pipe(
      catchError(handleServiceError)
    );
  }
}
