import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PersonService } from "../../services/person.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { catchError, Observable } from "rxjs";
import { compareObjectsById } from "../../utils/compareObjectsById";
import { Country } from "../../model/country.interface";
import { CountryService } from "../../services/country.service";
import { StateService } from "../../services/state.service";
import { State } from "../../model/state.interface";
import { User } from "../../model/person.interface";

@Component({
  selector: 'app-save-edit-person',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './save-edit-person.component.html',
  styleUrls: ['./save-edit-person.component.css']
})
export class SaveEditPersonComponent implements OnInit {
  personForm: FormGroup;
  isEditing: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  countries$: Observable<Country[]> | undefined;
  states: State[] = [];

  constructor (
    private router: Router,
    private activeRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private personService: PersonService,
    private countryService: CountryService,
    private stateService: StateService
  ) {
    // Inicialización del formulario
    this.personForm = this.formBuilder.group({
      id: [null],
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      age: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(110)
        ]
      ],
      country: ["", Validators.required],
      state: ["", Validators.required]
    });

    // Verificamos si se está creando o modificando un usuario
    this.activeRoute.paramMap.subscribe((params: any) => {
      const idUser = params.get('id') || null;

      if(idUser !== null) {
        this.isEditing = true;
        this.getUserById(idUser);
      }
    });

    // Manejador del selector de los paises
    this.personForm.get('country')?.valueChanges.subscribe((value: any) => {
      if(value && value.id) {
        this.handleCountryChange(value.id);
        this.personForm.get('state')?.setValue('');
      } else {
        this.states = [];
        this.personForm.get('state')?.setValue('');
      }
    });
  }

  ngOnInit(): void {
    // Obtener los paises para el formulario
    this.countries$ = this.countryService.getAllCountries().pipe(
      catchError((error) => {
        this.errorMessage = error.message;
        return [];
      })
    );
  }

  saveData(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if(this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    const userToSave: User = this.personForm.value;

    if(this.isEditing) {
      this.personService.editUser(userToSave).pipe(
        catchError((error) => {
          this.errorMessage = error.message;
          return [];
        })
      ).subscribe((resp: any) => {
        this.successMessage = 'Usuario editado correctamente';

        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/']);
        }, 3000);
      });
    } else {
      this.personService.setNewUser(userToSave).pipe(
        catchError((error) => {
          this.errorMessage = error.message;
          return [];
        })
      ).subscribe((resp: any) => {
        this.personForm.reset();
        this.successMessage = 'Usuario creado correctamente';

        setTimeout(() => {
          this.successMessage = '';
        }, 3500);
      });
    }
  }

  getUserById(id: number): void {
    this.personService.getUserById(id).pipe(
      catchError((error) => {
        this.errorMessage = error.message;
        return [];
      })
    ).subscribe((dataUser: User) => {
      // Establecer la información del usuario en el formulario
      this.personForm.get('id')?.setValue(dataUser.id);
      this.personForm.get('name')?.setValue(dataUser.name);
      this.personForm.get('lastname')?.setValue(dataUser.lastname);
      this.personForm.get('age')?.setValue(dataUser.age);
      this.personForm.get('country')?.setValue(dataUser.country);
      this.personForm.get('state')?.setValue(dataUser.state);

      if(dataUser.country && dataUser.country.id) {
        this.handleCountryChange(dataUser.country.id, dataUser.state);
      }
    });
  }

  // Función para obtener los estados por pais seleccionado
  handleCountryChange(id: number, initialState?: State): void {
    this.stateService.getStatesByCountry(id).pipe(
      catchError((error) => {
        this.errorMessage = error.message;
        this.states = [];
        return [];
      })
    ).subscribe((data: State[]) => {
      this.states = data;

      if(initialState) {
        this.personForm.get('state')?.setValue(initialState);
      }
    });
  }

  compareOptionsById(obj1: any, obj2: any) {
    return compareObjectsById(obj1, obj2);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
