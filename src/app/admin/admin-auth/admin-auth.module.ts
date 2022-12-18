import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminAuthComponent} from './admin-auth.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgxSpinnerModule} from 'ngx-spinner';

const routes: Routes = [
  {path: '', component: AdminAuthComponent},
];

@NgModule({
  declarations: [AdminAuthComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatIconModule,
        NgxSpinnerModule,
    ]
})
export class AdminAuthModule {
}
