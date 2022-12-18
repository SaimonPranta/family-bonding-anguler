import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsLetterComponent } from './news-letter.component';

const routes: Routes = [
  {path: '', component: NewsLetterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsLetterRoutingModule { }
