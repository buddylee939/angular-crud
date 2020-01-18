import { Post } from './posts/post';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const posts = [
      {id: 1, title: 'Post 1', body: 'This is my very first post'},
      {id: 2, title: 'Post 2', body: 'This is my second post'},
      {id: 3, title: 'Post 3', body: 'This is my third post'},
      {id: 4, title: 'Post 4', body: 'This is my fourth post'},
      {id: 5, title: 'Post 5', body: 'This is my fifth post'},
      {id: 6, title: 'Post 6', body: 'This is my sixth post'},
      {id: 7, title: 'Post 7', body: 'This is my seventh post'},
      {id: 8, title: 'Post 8', body: 'This is my eigth post'}
    ];
    return {posts};
  }

  // Overrides the genId method to ensure that a post always has an id.
  // If the posts array is empty,
  // the method below returns the initial number (11).
  // if the posts array is not empty, the method below returns the highest
  // post id + 1.
  genId(posts: Post[]): number {
    return posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 11;
  }
}
