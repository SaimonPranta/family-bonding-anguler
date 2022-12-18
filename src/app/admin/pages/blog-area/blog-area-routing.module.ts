import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddBlogComponent} from './blog/add-blog/add-blog.component';
import {AllBlogsComponent} from './blog/all-blogs/all-blogs.component';

const routes: Routes = [
  {path: '', redirectTo: 'all-countries'},
  {path: 'all-countries', component: AllBlogsComponent},
  {path: 'add-country', component: AddBlogComponent},
  {path: 'edit-blog/:id', component: AddBlogComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogAreaRoutingModule {
}
