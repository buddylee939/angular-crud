import { PostsService } from './../posts.service';
import { Post } from './../post';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    // the + converts the id string to a number, because the params are passed as strings
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
      .subscribe(post => this.post = post);
  }

  onDelete(post: Post): void {
    if (window.confirm('Are you sure')) {
      this.postService.deletePost(post)
        .subscribe(() => {
          this.router.navigate(['/blog/posts']);
        });
    }
  }
}
