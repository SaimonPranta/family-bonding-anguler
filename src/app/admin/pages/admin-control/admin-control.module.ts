import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminControlRoutingModule } from './admin-control-routing.module';
import { AllAdminsComponent } from './all-admins/all-admins.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";
import {NgxPaginationModule} from "ngx-pagination";
import {PipesModule} from "../../../shared/pipes/pipes.module";
import { AddAdminComponent } from './add-admin/add-admin.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {DirectivesModule} from "../../../shared/directives/directives.module";
import {DigitOnlyModule} from '@uiowa/digit-only';


@NgModule({
  declarations: [
    AllAdminsComponent,
    AddAdminComponent
  ],
    imports: [
        CommonModule,
        AdminControlRoutingModule,
        FormsModule,
        MaterialModule,
        NgxPaginationModule,
        PipesModule,
        FlexLayoutModule,
        DirectivesModule,
        DigitOnlyModule
    ]
})
export class AdminControlModule { }
