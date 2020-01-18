import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostFormComponent } from './post-form/post-form.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostNewComponent } from './post-new/post-new.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PostsListComponent, PostDetailComponent, PostNewComponent, PostEditComponent, PostFormComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    PostRoutingModule
  ]
})
export class BlogModule { }
