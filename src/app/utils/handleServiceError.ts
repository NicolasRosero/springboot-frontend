import { throwError } from "rxjs";

export const handleServiceError = (error: any) => {
  let errorMessage = '';

  if(error.error instanceof ErrorEvent) {
    errorMessage = `Error: ${error.error?.message}`;
  } else {
    errorMessage = `Error del servidor: ${error?.message}.\nCódigo: ${error?.status}`;
  }

  console.error('Error al realizar la consulta en un servicio: ', error);

  return throwError(() => new Error('Algo salió mal al obtener los datos. Por favor, comunícate con el administrador.'));
};
