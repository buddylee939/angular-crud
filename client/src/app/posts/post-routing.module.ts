import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsListComponent } from './posts-list/posts-list.component';
import { PostNewComponent } from './post-new/post-new.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostEditComponent } from './post-edit/post-edit.component';

const routes: Routes = [
  { path: 'posts', component: PostsListComponent },
  { path: 'post/new', component: PostNewComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'post/:id/edit', component: PostEditComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PostRoutingModule { }
