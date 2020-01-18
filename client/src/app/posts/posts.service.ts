import { MessageService } from './../message.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from './post';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsUrl = 'api/posts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl)
      .pipe(
        tap(_ => this.log('fetched posts', 'success')),
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }

  getPost(id: number): Observable<Post> {
    // Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url)
      .pipe(
        tap(_ => this.log(`fetched post id=${id}`, 'success')),
        catchError(this.handleError<Post>(`getPost id=${id}`))
      );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, this.httpOptions)
      .pipe(
        tap((newPost: Post) => this.log(`added post w/ id=${newPost.id}`, 'success')),
        catchError(this.handleError<Post>('addPost'))
      );
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put(this.postsUrl, post, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated post id=${post.id}`, 'success')),
        catchError(this.handleError<any>('updatePost'))
      );
  }

  deletePost(post: Post): Observable<Post> {
    const url = `${this.postsUrl}/${post.id}`;

    return this.http.delete<Post>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted post id=${post.id}`, 'success')),
        catchError(this.handleError<Post>('deletePost'))
      );
  }

  /** Log a PostService message with the MessageService */
  private log(message: string, status: string) {
    this.messageService.add(message, status);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.body.error}`, 'danger');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
