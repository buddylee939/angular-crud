import { PostsService } from './../posts.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../post';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {

  constructor(
    private postService: PostsService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  receivePost(form: NgForm) {
    this.postService.addPost(form.value)
      .subscribe(post => {
        this.router.navigate(['/blog/post', post.id]);
      });
  }
}
