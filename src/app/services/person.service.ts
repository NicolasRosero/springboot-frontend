import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { API_URL } from "../enviroment";
import { User } from "../model/person.interface";
import { handleServiceError } from "../utils/handleServiceError";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(
    private http: HttpClient
  ) {}

  // Función para consultar todos los usuarios
  getAllUsers(): Observable<User[]> {
    const url = `${API_URL}/person`;

    return this.http.get<User[]>(url).pipe(
      catchError(handleServiceError)
    );
  }

  // Función para obtener un usuario por Id
  getUserById(id: number): Observable<User> {
    const url = `${API_URL}/person/${id}`;

    return this.http.get<User>(url).pipe(
      catchError(handleServiceError)
    );
  }

  // Función para crear un usuario nuevo
  setNewUser(data: User): Observable<any> {
    const url = `${API_URL}/person`;
    return this.http.post(url, data).pipe(
      catchError(handleServiceError)
    );
  }

  // Función para editar un usuario
  editUser(data: User): Observable<any> {
    const url = `${API_URL}/person/edit/${data.id}`;

    return this.http.put(url, data).pipe(
      catchError(handleServiceError)
    );
  }

  // Función para eliminar un usuario
  deleteUser(id: number): Observable<any> {
    const url = `${API_URL}/person/delete/${id}`;

    return this.http.delete(url).pipe(
      catchError(handleServiceError)
    );
  }
}
