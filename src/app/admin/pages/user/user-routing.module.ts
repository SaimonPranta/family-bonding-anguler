import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllUserComponent} from './all-user/all-user.component';
import {AddUserComponent} from './add-user/add-user.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-user'},

  {path: 'all-user', component: AllUserComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: 'edit-user/:id', component: AddUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
