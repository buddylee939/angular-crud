import { Post } from './../post';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Input() currentPost: Post;
  @Output() passPost = new EventEmitter();
  editMode = true;

  constructor() { }

  ngOnInit() {
    if (!this.currentPost) {
      this.editMode = false;
      this.setCurrentPost();
    }
  }

  setCurrentPost(): void {
    this.currentPost = {
      id: null,
      title: '',
      body: ''
    };
  }

  onSubmit(form: NgForm) {
    this.passPost.emit(form);
  }
}
