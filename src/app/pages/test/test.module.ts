import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import {MaterialModule} from "../../material/material.module";
import {QuillModule} from "ngx-quill";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    MaterialModule,
    QuillModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class TestModule { }
