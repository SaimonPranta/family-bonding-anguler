import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageLoadErrorDirective} from './image-load-error.directive';
import {ImageProfileErrorDirective} from "./image-profile-error.directive";
import {NoWhitespaceDirective} from "./no-whitespace.directive";



@NgModule({
  declarations: [
    ImageLoadErrorDirective,
    ImageProfileErrorDirective,
    NoWhitespaceDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImageLoadErrorDirective,
    ImageProfileErrorDirective,
    NoWhitespaceDirective
  ]
})
export class DirectivesModule { }
