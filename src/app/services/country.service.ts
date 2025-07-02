import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { API_URL } from "../enviroment";
import { Country } from "../model/country.interface";
import { handleServiceError } from "../utils/handleServiceError";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(
    private http: HttpClient
  ) {}

  // Función para consultar todos los paises
  getAllCountries(): Observable<Country[]> {
    const url = `${API_URL}/country`;

    return this.http.get<Country[]>(url).pipe(
      catchError(handleServiceError)
    );
  }
}
