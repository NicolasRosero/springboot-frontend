import { Routes } from '@angular/router';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { SaveEditPersonComponent } from './components/save-edit-person/save-edit-person.component';
import { DetailPersonComponent } from './components/detail-person/detail-person.component';

export const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent,
    pathMatch: 'full'
  },
  {
    path: 'person/:id',
    component: DetailPersonComponent
  },
  {
    path: 'add-person',
    component: SaveEditPersonComponent
  }, {
    path: 'edit-person/:id',
    component: SaveEditPersonComponent
  }
];
