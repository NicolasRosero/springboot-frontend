import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PersonService } from "../../services/person.service";
import { catchError, finalize, Observable } from "rxjs";
import { User } from "../../model/person.interface";

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  users$: Observable<User[]> | undefined;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor (
    private router: Router,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.loading = true;

    this.users$ = this.personService.getAllUsers().pipe(
      catchError((error) => {
        this.errorMessage = error.message;
        return [];
      }),
      finalize(() => {
        this.loading = false;
      }),
    );
  }

  deleteUser(user: User): void {
    if(confirm(`Estás seguro de eliminar a ${user.name} ${user.lastname}`)) {
      this.personService.deleteUser(user.id).pipe(
        catchError((error) => {
          this.errorMessage = error.message;
          return [];
        })
      )
      .subscribe((resp: any) => {
        this.getAllUsers();
        this.successMessage = 'Usuario eliminado correctamente';

        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      });
    }
  }

  goToNewUserForm(): void {
    this.router.navigate(['/add-person']);
  }

  editUser(user: User): void {
    this.router.navigate(['/edit-person', user.id]);
  }
}
