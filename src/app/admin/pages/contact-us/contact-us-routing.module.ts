import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewsletterComponent} from './newsletter/newsletter.component';
import {ContactComponent} from './contact/contact.component';

const routes: Routes = [
  {path: '', redirectTo: 'newsletter'},
  {path: 'newsletter', component: NewsletterComponent},
  {path: 'contact-data', component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
