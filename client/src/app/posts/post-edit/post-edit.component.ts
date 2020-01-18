import { PostsService } from './../posts.service';
import { Post } from './../post';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  post: Post;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
      .subscribe(post => {
        this.post = post;
      });
  }

  receivePost(form: NgForm) {
    this.postService.updatePost(this.post)
      .subscribe(post => {
        this.router.navigate(['/blog/post', this.post.id]);
      });
  }
}
