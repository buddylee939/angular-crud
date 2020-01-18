import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';
import { POSTS } from '../mock-posts';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Post[];
  perPage = 4;
  page = 1;
  postsCount: number;
  loading: boolean;
  constructor(
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.loading = true;
    this.postService.getPosts()
      .subscribe(posts => {
        this.postsCount = posts.length;
        this.posts = posts;
        this.loading = false;
      });
  }

  onDelete(post: Post): void {
    if (window.confirm('Are you sure')) {
      this.posts = this.posts.filter(p => p !== post);
      this.postsCount = this.posts.length;
      this.postService.deletePost(post).subscribe();
    }
  }
}
