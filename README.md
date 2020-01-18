# Angular starter with Post CRUD

## STEPS

1. [Create the app](#appCreate)
1. [Add bootstrap 4 via CDN](#bootstrapCDN)
1. [Create Post Class](#postClass)
1. [Create Post List Component](#postList)
1. [Create Post Mock-Data file](#postMock)
1. [Create Post Services file](#postServices)
1. [Adding Flash Messages](#flashMessages)
1. [Create Post Detail Component](#postDetail)
1. [Adding a simulated data server](#dataServer)
1. [Getting the Posts via HTTP from In Memory Api Data Server](#httpPosts)
1. [Getting the Single Post via HTTP from In Memory Api Data Server](#httpPost)
1. [Create Post New Component](#postNew)
1. [Create Post Edit Component](#postEdit)
1. [Deleting a Post](#postDelete)
1. [How to add the delete and update confirmations](#deleteConfirm)
1. [Refactor form to its own component](#refactorForm)
1. [Run ng serve for local network to test on various machines includeing phone](#localNetwork)
1. [All post routes together as children routes](#postRouting)
1. [Adding basic bootstrap spinner](#bootSpinner)
1. [Adding an ngx-spinner loader](#ngxSpinner)
1. [using angular notifier for messages](#ngNotifier)
1. [How to add bootstrap pagination](#pagination)
1. [Add a category to the posts](#bootstrapCDN)
1. [Add a comments to the posts](#bootstrapCDN)
1. [Make 1 form with all possible form fields for angular forms app](#bootstrapCDN)


<hr>

## Link with Rails
## How to have associations, Categories: Sports, Entertainment, Finance etc. and link the posts with categories, Category has many posts, post belongs to category

<hr>

## Link with Mongo/Express/Node

<hr>  

### <a name="appCreate"></a> Creating the APP

- in terminal: mkdir blogApp && cd blogApp
- in blogApp: mkdir client && mkdir server && cd client
- in client: ng new myBlogs (ng new myBlogs --skipTests=true)
- routing?: y
- css?: scss
- once done, get all the files from the 'myBlogs' directory and move them to the 'client' directory
- delete the 'myBlogs' empty directory
- in the client directory type: code .
- in the client directory type: ng serve, and the app should be running
- (INSERT PHOTO HERE)

### <a name="bootstrapCDN"></a> Bootstrap 4 via CDN

- go to [https://getbootstrap.com/](https://getbootstrap.com/)
- copy the bootstrap cdn: css and js lines
- (INSERT PHOTO HERE)
- update the index.html file 

```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>My Blogs</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>  
</body>
</html>
```

- in vs code, open the terminal window: CTRL-~ or terminal/new terminal
- make sure you are in the client directory, create the navbar component by typing: ng g c shared/navbar --skipTests=true
- update the navbar.comp.html file
- the links have the data-toggle to hide the menu when on mobile after clicking the link [from this stack overflow](https://stackoverflow.com/questions/16680543/hide-twitter-bootstrap-nav-collapse-on-click)

```
<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
  <a
    class="navbar-brand"
    [routerLink]="['/']">My Blogs
  </a>
  <button 
    class="navbar-toggler" 
    type="button" 
    data-toggle="collapse" 
    data-target="#navbarsExampleDefault" 
    aria-controls="navbarsExampleDefault" 
    aria-expanded="false" 
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul class="navbar-nav mr-auto">
      <li 
        data-toggle="collapse" 
        data-target=".navbar-collapse.show"      
        class="nav-item"
        [routerLinkActive]="['active']"
        [routerLinkActiveOptions] = "{exact:true}">
        <a
        class="nav-link" 
        [routerLink]="['/home']">Home <span></span></a
        >
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li 
      data-toggle="collapse" 
      data-target=".navbar-collapse.show"
      class="nav-item"  
      [routerLinkActive]="['active']" 
      [routerLinkActiveOptions] = "{exact:true}">
        <a
          class="nav-link" 
          [routerLink]="['/posts']">Posts </a
          >
      </li>
      <li class="nav-item"  [routerLinkActive]="['active']" [routerLinkActiveOptions] = "{exact:true}">
        <a class="nav-link" [routerLink]="['/']">Profile </a>
      </li>
      <li class="nav-item"  [routerLinkActive]="['active']" [routerLinkActiveOptions] = "{exact:true}">
        <a class="nav-link" [routerLink]="['/']">Login </a>
      </li>
      <li class="nav-item"  [routerLinkActive]="['active']" [routerLinkActiveOptions] = "{exact:true}">
        <a class="nav-link" [routerLink]="['/']">Register</a>
      </li>
      <li class="nav-item" ><a class="nav-link" (click)="onLogoutClick($event)" href="#">Logout</a>
      </li>
    </ul>
  </div>
</nav>
```

- update navbar.comp.ts

```
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onLogoutClick(event: any) {
    event.preventDefault();
    console.log('Logged out');
  }
}
```

- navbar.comp.scss stays blank
- update app.comp.scss if the navbar is static

```
.main {
  padding-top: 3.5rem;
}
```

- to create the footer component in terminal type: ng g c shared/footer --skipTests=true
- update the footer.comp.html file

```
<footer class="container">
  <p>&copy; Company 2020-2021</p>
</footer>
```

- footer.comp.ts stays as is
- update footer.comp.scss

```
footer {
  text-align: center;
  padding: 2rem;
}
```

- update the app.comp.html with the navbar component and add a div around the router control for the scss to work

```
<app-navbar></app-navbar>
<div class="main">
  <router-outlet></router-outlet>
</div>
<app-footer></app-footer>
```

- no update to the app.comp.ts file
- to create a home component in terminal type: ng g c home --skipTests=true
- add the home route as the default route in app-routing.module.ts and import the component up top

```
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];
```

- update the home.comp.html file

```
  <!-- Main jumbotron for a primary marketing message or call to action -->
  <div class="jumbotron">
    <div class="container">
      <h1 class="display-3">Hello, world!</h1>
      <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
      <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
    </div>
  </div>

  <div class="container">
    <!-- Example row of columns -->
    <div class="row">
      <div class="col-md-4">
        <h2>Heading</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
        <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
      </div>
      <div class="col-md-4">
        <h2>Heading</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
        <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
      </div>
      <div class="col-md-4">
        <h2>Heading</h2>
        <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
        <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
      </div>
    </div>

    <hr>

  </div> <!-- /container -->
```

- home.comp.ts and home.comp.scss stay as is for now
- refresh and test out the site, make sure the navbar collapse is working so far
- (INSERT PICTURE OF HOME PAGE WITH NAVBAR AND COLLAPSED VERSION AS WELL)

### <a name="postClass"></a> Creating the Post Class

- in the terminal type: ng g cl posts/post
- update the post.ts file

```
export class Post {
  id: number;
  title: string;
  body: string;
}
```

### <a name="postList"></a> Creating the Post List

- in terminal type: ng g c posts/posts-list --skipTests=true
- update app-routing.module.ts with the posts link

```
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsListComponent },
];
```

- update the navbar posts link to properly link to the post-list component

```
<li class="nav-item"  [routerLinkActive]="['active']" [routerLinkActiveOptions] = "{exact:true}">
  <a class="nav-link" [routerLink]="['/posts']">Posts </a>
</li>
```

- update posts-list.comp.ts to add a list of posts

```
import { Post } from './../post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [
    {id: 1, title: 'Post 1', body: 'This is my very first post'},
    {id: 2, title: 'Post 2', body: 'This is my second post'},
    {id: 3, title: 'Post 3', body: 'This is my third post'},
    {id: 4, title: 'Post 4', body: 'This is my fourth post'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
```

- update posts-list.comp.html to display the static posts

```
<div class="container">
  <div class="row">
    <h3 class="my-heading">
      My List of Posts
      <small class="text-muted">written by: John Smith</small>
    </h3>    
  </div>
  <div class="row mt-3">
    <div class="col-sm-6" *ngFor="let post of posts">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.body | slice:0:20  }}...</p>
          <a href="#" class="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
  </div>  
</div>
```

- update posts-list.comp.scss to add basic styling

```
.my-heading {
  padding: 50px 20px 20px;
  border-bottom: 1px dashed red;
}
```

### <a name="postMock"></a> Creating the Post Mock Data file

- in the app/posts folder, create the file: mock-posts.ts and add the code:

```
import { Post } from './post';

export const POSTS: Post[] = [
  {id: 1, title: 'Post 1', body: 'This is my very first post'},
  {id: 2, title: 'Post 2', body: 'This is my second post'},
  {id: 3, title: 'Post 3', body: 'This is my third post'},
  {id: 4, title: 'Post 4', body: 'This is my fourth post'},
  {id: 5, title: 'Post 5', body: 'This is my fifth post'},
  {id: 6, title: 'Post 6', body: 'This is my sixth post'}
];
```

- update posts-list.comp.ts file to use this data instead of the posts array we added

```
import { POSTS } from './../mock-posts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts = POSTS;

  constructor() { }

  ngOnInit() {
  }

}
```

- refresh the posts page and we should now see the static data from the mock-posts file instead

### <a name="postServices"></a> Creating the Post Services

- in terminal type: ng g s posts/posts
- update the posts.service.ts file to import the POSTS mock-data then create a function to get those posts

```
import { Injectable } from '@angular/core';
import { Post } from './post';
import { POSTS } from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  getPosts(): Post[] {
    return POSTS;
  }
}
```

- update the posts-list.comp.ts to use the post service instead of directly calling the POSTS data in the class

```
import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Post[];

  constructor(
    private postService: PostsService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.posts = this.postService.getPosts();
  }

}
```

- don't change the code in the posts-list.comp.html and posts-list.comp.scss files
- refresh the posts page and we should see the posts again, but this time we are using the posts service to call the mock posts data
- MAKING THE POSTS DATA RETURN AS AN OBSERVABLE INSTEAD AND SUBSCRIBING TO THE OBSERVABLE
- update posts.service.ts

```
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post';
import { POSTS } from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  getPosts(): Observable<Post[]> {
    return of(POSTS);
  }
}
```

- update posts-list.comp.ts to subscribe to the observable

```
import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Post[];

  constructor(
    private postService: PostsService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

}
```

- refresh the posts page and we should still see the posts, but now we are retrieving them as an observable

### <a name="flashMessages"></a> Adding Flash Messages

- in terminaly type: npm install angular2-flash-messages --save
- update app.module.ts to import the flash messages module

```
import { FlashMessagesModule } from 'angular2-flash-messages';
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
```

- update app.comp.html to display the messages

```
<app-navbar></app-navbar>
<div class="main">
  <flash-messages></flash-messages>
  <router-outlet></router-outlet>
</div>
<app-footer></app-footer>
```

- in terminal create the message service: ng g s message
- update the message.service.ts file

```
import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private flashMessage: FlashMessagesService
  ) { }

  add(message: string, status: string) {
    this.flashMessage.show(message, {cssClass: `alert-${status}`, timeout: 3000});
  }
}

```

- update the posts.service.ts file to use the message service

```
import { MessageService } from './../message.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post';
import { POSTS } from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private messageService: MessageService
  ) { }

  getPosts(): Observable<Post[]> {
    this.messageService.add('Fetched all posts', 'success');
    return of(POSTS);
  }
}
```

- refresh the posts page and we should see the message appear for 3 seconds up top

### <a name="postDetail"></a> Creating the Post Detail Component

- interminal type: ng g c posts/post-detail --skipTests=true
- add the detail route to app-routing.module.ts

```
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsListComponent },
  { path: 'post/:id', component: PostDetailComponent },
];
```

- if you go to: http://localhost:4200/post/123, we should see 'post-detail works'
- update post-detail.comp.ts with a static post

```
import { Post } from './../post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post = {
    id: 1,
    title: 'Post 1',
    body: 'This is the first sentence \n\nthis is a new line \nthis is another line'
  };
  constructor() { }

  ngOnInit() {
  }

}
```

- update posts-detail.comp.html

```
<div class="container">
  <div class="row m-5">
    <div class="col-lg">
      <h1 class="text-center">{{ post.title }}</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-lg">
      <div class="post-body">{{ post.body }}</div>
    </div>
  </div>
</div>
```

- update post-detail.comp.scss

```
.post-body {
  white-space: pre-wrap;
}
```

- LINKING THE POSTS-LIST SO WHEN WE CLICK ON THE TITLE IT TAKES US TO THE POST-DETAIL
- update the 'read more' button in posts-list.comp.html

```
<a [routerLink]="['/post', post.id]" class="btn btn-primary">Read More</a>
```

- since we are passing the id to the link and it appears in the url, we have access to it in the posts-detail.comp.ts so we can find the correct post
- but first, update posts.service.ts to get a single post

```
import { MessageService } from './../message.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post';
import { POSTS } from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private messageService: MessageService
  ) { }

  getPosts(): Observable<Post[]> {
    this.messageService.add('Fetched all posts', 'success');
    return of(POSTS);
  }

  getPost(id: number): Observable<Post> {
    // Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    this.messageService.add(`Fetched post number: ${id}`, 'success');
    return of(POSTS.find(post => post.id === id));
  }
}

```

- update posts-detail.comp.ts to use the getPost service

```
import { PostsService } from './../posts.service';
import { Post } from './../post';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
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

}
```

- refresh the posts page and click on a 'read more' button and we should see the correct post, and the post message displaying the post number

### <a name="dataServer"></a> Adding In Memory Web Api Simulated Data Server

- in terminal type: npm install angular-in-memory-web-api --save
- create the in memory data service: ng g s InMemoryData
- update the in-memory-data.service.ts file

```
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
```

- update app module with HttpClientModule and the in memory imports

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PostsListComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### <a name="httpPosts"></a> Using HTTP to get the posts from the in memory data service

- make sure app.module.ts has the HttpClientModule imported, from a previous section

```
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
```

- update posts.service.ts file to use httpclient, create a postsUrl to pull data from the in memory api, create the log method to pass the flash messages since we will use it a lot, create the error handling section to be called by the catchError

```
import { MessageService } from './../message.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from './post';
import { POSTS } from './mock-posts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsUrl = 'api/posts';  // URL to web api

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
    this.messageService.add(`Fetched post number: ${id}`, 'success');
    return of(POSTS.find(post => post.id === id));
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

```

- refresh and we should see all the posts from the in memory service
- and we should see the flash messages working
- to test the error, update the postsUrl with a wrong endpoint

```
private postsUrl = 'api/postss';  // URL to web api
```

- refresh the page and we should see the error saying: 'getPosts failed: Collection 'postss' not found'
- put the postsUrl back to api/posts for it to work again

### <a name="httpPost"></a> Getting the single post from http

- update the getPost method in the posts.service.ts file

```
  getPost(id: number): Observable<Post> {
    // Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url)
      .pipe(
        tap(_ => this.log(`fetched post id=${id}`, 'success')),
        catchError(this.handleError<Post>(`getPost id=${id}`))
      );
  }
```

- update the post-detail.comp.html in case the 'post' hasn't loaded yet to avoid the error in the console

```
<div class="container">
  <div class="row m-5">
    <div class="col-lg">
      <h1 class="text-center">{{ post?.title }}</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-lg">
      <div class="post-body">{{ post?.body }}</div>
    </div>
  </div>
</div>
```

- refresh the posts page and click on a post, we should see the new post being called from the in memory api data server

### <a name="postNew"></a> Creating the Post New Component with the Template Driven approach

- add the formsmodule to the app.module.ts file

```
import { FormsModule } from '@angular/forms';
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
```

- in terminal: ng g c posts/post-new
- update app-routing.module.ts

```
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsListComponent },
  { path: 'post/new', component: PostNewComponent },
  { path: 'post/:id', component: PostDetailComponent },
];
```

- notice it has to go before the post/:id because if not the router will think that post/new is a post with the id of 'new'
- update the posts-list.comp.html with a button to link to the post-new component

```
  <div class="row">
    <div class="col-lg">
      <a routerLink="/post/new" class="btn btn-secondary">New Post</a>
    </div>
  </div>
```

- update the post-new.comp.scss file

```
.my-heading {
  padding: 50px 20px 20px;
  border-bottom: 1px dashed red;
}
```

- add the form to the post-new.comp.html

```
<div class="container">
  <div class="row">
    <h3 class="my-heading">
      New Post
    </h3>    
  </div>
  <div class="row mt-3">
    <div class="col-lg">
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input 
            name="title"
            class="form-control"
            id="title"
            type="text">
        </div>
        <div class="form-group">
          <label for="body">Body</label>
          <textarea 
            name="body"
            class="form-control" 
            id="body" 
            rows="10"></textarea>
        </div>
        <button
          class="btn btn-primary"
          type="submit">Add Post</button>
      </form>
    </div>
  </div>
</div>
```

- update the form inputs with the ngModel directive to let angular know which fields we will use

```
  <div class="form-group">
    <label for="title">Title</label>
    <input
      ngModel 
      name="title"
      class="form-control"
      id="title"
      type="text">
  </div>
  <div class="form-group">
    <label for="body">Body</label>
    <textarea 
      ngModel
      name="body"
      class="form-control" 
      id="body" 
      rows="10"></textarea>
  </div>
```

- update the form tag with the ngForm, onSubmit method passing it the form
- we also add the html5 'novalidate' to disable any validations caused by the browsers, since we will handle our own validation

```
<form #postForm="ngForm" (ngSubmit)="onSubmit(postForm)" novalidate>
```

- add the onSubmit method to the post-new.comp.ts file

```
import { NgForm } from '@angular/forms';
  onSubmit(form: NgForm) {
    console.log(form.value);
  }
```

- add temporary section at the bottom of form so we can see the value and the validity of the form

```
<div class="container">
  <div class="row">
    <div class="col-lg">
      <div>
        {{ postForm.value | json }}
      </div>
      <div>
        Form validity: {{ postForm.valid }}
      </div>
      <div>
        The Form is: {{ postForm.status }}
      </div>
    </div>
  </div>
</div>
```

- refresh the post/new page and test out the form, we should see the values at the bottom of the page, and when you click on 'add post' button we should see the form value in the console
- ADDING VALIDITY
- to see the current classes on a form field update the form:

```
  <div class="form-group">
    <label for="title">Title</label>
    <input
      ngModel
      name="title"
      class="form-control"
      id="title"
      type="text"
      #spy>
      <br>TODO: remove this: {{ spy.className }}
  </div>
```

- currently the valid state is always true because we haven't added any validations to the form
- update the input fields with the required and minlength validators

```
  <div class="form-group">
    <label for="title">Title</label>
    <input
      ngModel
      required
      minlength="3" 
      name="title"
      class="form-control"
      id="title"
      type="text">
  </div>
  <div class="form-group">
    <label for="body">Body</label>
    <textarea 
      ngModel
      required
      minlength="50"
      name="body"
      class="form-control" 
      id="body" 
      rows="10"></textarea>
  </div>
```

- refresh and we should see the form validity as false, because the fields are empty, type in both fields and we should see it is now true
- to disable the button as long as the form is invalid, update the button:

```
<button
  [disabled]="!postForm.valid"
  class="btn btn-primary"
  type="submit">Add Post</button>
```

- refresh and we should see the button greyed out, and if you click it nothing happens
- type in the fields and the button should turn blue and be submittable again
- ADDING VISUAL FEEDBACK TO THE USER, LETTING THEM KNOW WHICH FIELDS ARE INVALID AND WHY
- update the form fields with local variable with ngModel, and the class is-invalid if the fields are both invalid and touched

```
<div class="form-group">
  <label for="title">Title</label>
  <input
    #title="ngModel"
    [class.is-invalid]="title.invalid && title.touched"
    ngModel
    required
    minlength="3" 
    name="title"
    class="form-control"
    id="title"
    type="text">
</div>
<div class="form-group">
  <label for="body">Body</label>
  <textarea
    #body="ngModel" 
    [class.is-invalid]="body.invalid && body.touched"
    ngModel
    required
    minlength="50"
    name="body"
    class="form-control" 
    id="body" 
    rows="10"></textarea
    >
</div>
```        

- DISPLAYING ERROR MESSAGES SO THE USER KNOWS WHAT TO CORRECT
- using a simple display none, add the small tags under the input and textarea

```
  <div class="form-group">
    <label for="title">Title</label>
    <input
      #title="ngModel"
      [class.is-invalid]="title.invalid && title.touched"
      ngModel
      required
      minlength="3" 
      name="title"
      class="form-control"
      id="title"
      type="text"
      #spy>
      <br>TODO: remove this: {{ spy.className }}
  </div>
  <small class="text-danger" [class.d-none]="title.valid || title.untouched">Title is required</small>
  <div class="form-group">
    <label for="body">Body</label>
    <textarea
      #body="ngModel" 
      [class.is-invalid]="body.invalid && body.touched"
      ngModel
      required
      minlength="50"
      name="body"
      class="form-control" 
      id="body" 
      rows="10"></textarea
      >
      <small class="text-danger" [class.d-none]="body.valid || body.untouched">Body is required</small>
  </div>
```        

- displaying the errors based on the type of validation
- update the form with the ngIf directive to test the errors
- [from the angular site](https://angular.io/guide/form-validation)

```
<div class="form-group">
  <label for="title">Title</label>
  <input
    #title="ngModel"
    [class.is-invalid]="title.invalid && title.touched"
    ngModel
    required
    minlength="3" 
    name="title"
    class="form-control"
    id="title"
    type="text">
</div>
<div 
  *ngIf="title.invalid && (title.dirty || title.touched)"
  class="alert alert-danger">
  <small *ngIf="title.errors.required">Title is required.</small>
  <small *ngIf="title.errors.minlength">Title must be at least 3 characters long.</small>
</div>
<div class="form-group">
  <label for="body">Body</label>
  <textarea
    #body="ngModel" 
    [class.is-invalid]="body.invalid && body.touched"
    ngModel
    required
    minlength="50"
    name="body"
    class="form-control" 
    id="body" 
    rows="10"></textarea>
  </div>
  <div 
    *ngIf="body.invalid && (body.dirty || body.touched)"
    class="alert alert-danger">
    <small *ngIf="body.errors.required">Body is required.</small>
    <small *ngIf="body.errors.minlength">Body must be at least 50 characters long.</small>
  </div>
```
- PASSING THE FORM VALUE TO THE POST SERVICE TO THE DATA SERVER
- update the post.service with the addPost method and the httpOptions with httpHeaders

```
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
```

- update post-new.comp.ts onSumbit method to pass the form value to the post service and route to the newly created post

```
import { PostsService } from './../posts.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

  onSubmit(form: NgForm) {
    this.postService.addPost(form.value)
      .subscribe(post => {
        this.router.navigate(['/post', post.id]);
      });
  }
}
```

- to reset the form on submit, update the form tag on the post-new.comp.html

```
<form #postForm="ngForm" (ngSubmit)="onSubmit(postForm); postForm.reset()" novalidate>
```

- refresh and test it out, create a new post with some [hipster ipsum](https://hipsum.co/)
- if you go to the posts list page, you can see the newly created posts,
- if you click on the read more, you can see the post-detail page of the new post
- if you reload the any of the pages, the post disappears because the in memory api data server is only keeping the new posts temporarily
- we will fix that when we link the front-end with a back end that will persist the data

### <a name="postEdit"></a> Edit an existing Post

- in terminal type: ng g c posts/post-edit
- update app-routing.module.ts to include the post edit component

```
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsListComponent },
  { path: 'post/new', component: PostNewComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'post/:id/edit', component: PostEditComponent },
];
```

- in browser type: http://localhost:4200/post/2/edit
- we should see 'post-edit works'
- update post-edit.comp.scss

```
.my-heading {
  padding: 50px 20px 20px;
  border-bottom: 1px dashed red;
}
```

- update post-edit.comp.ts to first get the post when the page loads, and assign it to a local variable

```
import { PostsService } from './../posts.service';
import { Post } from './../post';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
      .subscribe(post => this.post = post);
  }

  onSubmit() {
    console.log(this.post);
  }

}
```

- add the form to the post-edit.comp.html
- we do 2 way binding so the data from the loaded post gets passed to the form fields and when we edit and submit we don't have to pass the form through the onSubmit because of the 2 way binding, the post with the updates is already set
- we add an ngIf to test if the post value has been set and then we display the form

```
<div class="container" *ngIf="post">
  <div class="row">
    <h3 class="my-heading">
      Edit Post
    </h3>    
  </div>
  <div class="row mt-3">
    <div class="col-lg">
      <form #postForm="ngForm" (ngSubmit)="onSubmit(); postForm.reset()" novalidate>
        <div class="form-group">
          <label for="title">Title</label>
          <input
            #title="ngModel"
            [class.is-invalid]="title.invalid && title.touched"
            [(ngModel)]="post.title"
            required
            minlength="3" 
            name="title"
            class="form-control"
            id="title"
            type="text">
        </div>
        <div 
          *ngIf="title.invalid && (title.dirty || title.touched)"
          class="alert alert-danger">
          <small *ngIf="title.errors.required">Title is required.</small>
          <small *ngIf="title.errors.minlength">Title must be at least 3 characters long.</small>
        </div>
        <div class="form-group">
          <label for="body">Body</label>
          <textarea
            #body="ngModel" 
            [class.is-invalid]="body.invalid && body.touched"
            [(ngModel)]="post.body"
            required
            minlength="50"
            name="body"
            class="form-control" 
            id="body" 
            rows="10"></textarea>
          </div>
          <div 
            *ngIf="body.invalid && (body.dirty || body.touched)"
            class="alert alert-danger">
            <small *ngIf="body.errors.required">Body is required.</small>
            <small *ngIf="body.errors.minlength">Body must be at least 50 characters long.</small>
          </div>
        <button
          [disabled]="!postForm.valid"
          class="btn btn-primary"
          type="submit">Update Post</button>
      </form>
    </div>
  </div>
  <div class="row">
    <div class="col-lg">
      <div>
        {{ postForm.value | json }}
      </div>
      <div>
        Form validity: {{ postForm.valid }}
      </div>
      <div>
        The Form is: {{ postForm.status }}
      </div>
    </div>
  </div>
</div>
```

- adding the update to the post service
- update the posts.service.ts file with the updatePost method

```
  updatePost(post: Post): Observable<any> {
    return this.http.put(this.postsUrl, post, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated post id=${post.id}`, 'success')),
        catchError(this.handleError<any>('updatePost'))
      );
  }

```

- update the onSubmit method in post-edit.comp.ts to pass the post to the post service, and reroute to the update post page

```
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

  onSubmit(): void {
    this.postService.updatePost(this.post)
      .subscribe(post => {
        this.router.navigate(['/post', this.post.id]);
      });
  }
}
```

- update the post-detial.comp.html with a link to edit the post

```
<div class="container">
  <div class="row m-5">
    <div class="col-lg">
      <h1 class="text-center">{{ post?.title }}</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-lg">
      <div class="post-body">{{ post?.body }}</div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg">
      <a routerLink="/post/{{post?.id}}/edit" class="btn btn-success">Edit Post</a>
    </div>
  </div>
</div>
```

- add a cancel button to the post-new.comp.html

```
<button
  [disabled]="!postForm.valid"
  class="btn btn-primary"
  type="submit">Add Post</button>
<a routerLink="/posts" class="btn btn-secondary">Cancel</a>
</form>
```

- add a cancel button to the post-edit.comp.html

```
<button
  [disabled]="!postForm.valid"
  class="btn btn-primary"
  type="submit">Update Post</button>
  <a routerLink="/post/{{post?.id}}" class="btn btn-secondary">Cancel</a>
```

- refresh and try editing different posts
- once edited and rerouted to the edited post, it should appear correct, and if you go to the posts list page, it should be edited as well
- if you reload any of the pages, the edited content will disappear because we are not persisting the data to a back end data base, we are only editing the displayed data from the in memory api data server

### <a name="postDelete"></a> Deleting a post

- update the posts.service.ts with the deletePost method

```
  deletePost(post: Post): Observable<Post> {
    const url = `${this.postsUrl}/${post.id}`;

    return this.http.delete<Post>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted post id=${post.id}`, 'success')),
        catchError(this.handleError<Post>('deletePost'))
      );
  }
```

- update the post-detail.comp.html to add a delete button next to the edit button

```
  <div class="row">
    <div class="col-lg">
      <a routerLink="/post/{{post?.id}}/edit" class="btn btn-success">Edit Post</a>
      <button 
        class="btn btn-danger"
        (click)="onDelete(post)"
        type="button">Delete Post</button>
    </div>
  </div>
```

- update the post-detail.comp.ts file with the onDelete method

```
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
    this.postService.deletePost(post)
      .subscribe(() => {
        this.router.navigate(['/posts']);
      });
  }
}

```

- update the posts-list.comp.html with a delete button next to the read more button, so we can see a delete while filtering the displayed posts list

```
<div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title">{{ post.title }}</h5>
    <p class="card-text">{{ post.body | slice:0:20  }}...</p>
    <a [routerLink]="['/post', post.id]" class="btn btn-primary">Read More</a>
    <button 
      (click)="onDelete(post)"
      class="btn btn-danger">Delete Post</button>
  </div>
```

- update the posts-list.comp.ts with the onDelete method

```
  onDelete(post: Post): void {
    this.posts = this.posts.filter(p => p !== post);
    this.postService.deletePost(post).subscribe();
  }
```

- refresh and test out the delete buttons

### <a name="deleteConfirm"></a> Adding a confirmation when deleting a post

- update the onDelete method in the posts-list with the window.confirm if condition

```
  onDelete(post: Post): void {
    if (window.confirm('Are you sure')) {
      this.posts = this.posts.filter(p => p !== post);
      this.postService.deletePost(post).subscribe();
    }
  }
```

### <a name="refactorForm"></a> Refactor the form to its own component

- in terminal: ng g c posts/post-form
- copy just the form section from post-new.comp.html and put in post-form.comp.html
- update the ngModel to 2 way binding for both fields
- update the buttons to test if we are in edit mode or not, and display the proper button

```
<form #postForm="ngForm" (ngSubmit)="onSubmit(postForm); postForm.reset()" novalidate>
  <div class="form-group">
    <label for="title">Title</label>
    <input
      #title="ngModel"
      [class.is-invalid]="title.invalid && title.touched"
      [(ngModel)]="currentPost.title"
      required
      minlength="3" 
      name="title"
      class="form-control"
      id="title"
      type="text">
  </div>
  <div 
    *ngIf="title.invalid && (title.dirty || title.touched)"
    class="alert alert-danger">
    <small *ngIf="title.errors.required">Title is required.</small>
    <small *ngIf="title.errors.minlength">Title must be at least 3 characters long.</small>
  </div>
  <div class="form-group">
    <label for="body">Body</label>
    <textarea
      #body="ngModel" 
      [class.is-invalid]="body.invalid && body.touched"
      [(ngModel)]="currentPost.body"
      required
      minlength="50"
      name="body"
      class="form-control" 
      id="body" 
      rows="10"></textarea>
    </div>
    <div 
      *ngIf="body.invalid && (body.dirty || body.touched)"
      class="alert alert-danger">
      <small *ngIf="body.errors.required">Body is required.</small>
      <small *ngIf="body.errors.minlength">Body must be at least 50 characters long.</small>
    </div>
  <button
    [disabled]="!postForm.valid"
    class="btn btn-primary"
    type="submit">
    {{!editMode ? 'Add Post' : 'Update Post'}}</button>
  <a 
    [routerLink]="!editMode ? ['/posts'] : ['/post', currentPost?.id]" 
    class="btn btn-secondary">
    Cancel</a>
</form>
<div class="container">
  <div class="row">
    <div class="col-lg">
      <div>
        {{ postForm.value | json }}
      </div>
      <div>
        Form validity: {{ postForm.valid }}
      </div>
      <div>
        The Form is: {{ postForm.status }}
      </div>
    </div>
  </div>
</div>
```

- remember the section at the bottom will need to be deleted before actual use
- update the post-form.comp.ts with an Output event emitter
- update the post-form.comp.ts with the onSubmit to pass that emitted event up to the parent file which is post-new.comp.html
- add an input to receive the current post if we are in edit mode
- create the editMode variable set to true
- on ngoninit, check if the current post has been set, meaning we are in the edit mode, if not it sets blank default values for the 2 way binding to work

```
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

```

- update the post-new.comp.html to display the post-form component and listen for that event being passed
- it then takes that and passes it to the receive post method which will pass it to the ts file where it will be submitted to the data serve

```
<div class="container">
  <div class="row">
    <h3 class="my-heading">
      New Post
    </h3>    
  </div>
  <div class="row mt-3">
    <div class="col-lg">
      <app-post-form
        (passPost)="receivePost($event)"
      ></app-post-form>
    </div>
  </div>
</div>
```

- update post-new.comp.ts file removing the previous onSubmit method and creatin the receive post method to take the event passed to the html, which is the form, and pass it to the data server

```
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
        this.router.navigate(['/post', post.id]);
      });
  }
}
```

- refresh and try to create a new post, it should work
- REFACTORING THE FORM SO IT WORKS WITH THE POST-EDIT AS WELL
- update the post-edit.comp.html, it receives the post and assigns it to current post
- passPort listens for an event emitter and passes it to receivePost method

```
<div class="container" *ngIf="post">
  <div class="row">
    <h3 class="my-heading">
      Edit Post
    </h3>    
  </div>
  <div class="row mt-3">
    <div class="col-lg">
      <app-post-form
      [currentPost]="post"
      (passPost)="receivePost($event)"
      ></app-post-form>
    </div>
  </div>
```

- update post-edit.comp.ts 
- get rid of original onSubmit method and add the receivePost method to take the even emitted by the post-form and pass it to the post.service update

```
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
        this.router.navigate(['/post', this.post.id]);
      });
  }
}
```

### <a name="localNetwork"></a> Running ng serve with current computer ip to run the app on different devices including phonw

- [from here](https://stackoverflow.com/questions/47493325/how-do-i-use-a-mobile-phone-to-open-localhost4200)
- in terminal, quit the current server and type

```
If you don't know what is your LAN address you can execute:
ifconfig | grep broadcast on unix-based OS - the first IP is your computer, or 
ipconfig on Windows machine.

then type:

ng serve --host 192.168.1.137 (or whatever your local computer ip is)
```

- then make sure all the devices are on the same wi-fi network

### <a name="postRouting"></a> Setting a post routing to keep all the post routes together

- in terimaly type: ng g module posts/blog --flat
- update the code by importing all the posts components, forms module

```
import { PostFormComponent } from './post-form/post-form.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostNewComponent } from './post-new/post-new.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PostsListComponent, PostDetailComponent, PostNewComponent, PostEditComponent, PostFormComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class BlogModule { }
```

- update app.module.ts to import the blogmodule and get rid of all the post components in the declerations and the imports

```
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    BlogModule,
    HttpClientModule,
```

- in terminal type: ng g module posts/post-routing --flat 
- update the code by importing the router module and all the post components
- create the routes for the posts
- and add to imports: routermodule.forChild(routes)

```
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

```

- update the blog.module to use the post routing module

```
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostFormComponent } from './post-form/post-form.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostNewComponent } from './post-new/post-new.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';

@NgModule({
  declarations: [PostsListComponent, PostDetailComponent, PostNewComponent, PostEditComponent, PostFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    PostRoutingModule
  ]
})
export class BlogModule { }

```

- update the app-routing.module.ts to use the blog module to load the children post routes

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'blog', loadChildren: './posts/blog.module#BlogModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

- update app.module.ts to take out forms module, since we are using it in the blog.module, and take out blogModule since we are lazy loading it through the routing

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

- update all the links in the post components, where it says '/posts' it now has to say '/blog/posts' since they are being loaded through the blog.module
- navbar.comp.html

```
  <li 
  data-toggle="collapse" 
  data-target=".navbar-collapse.show"
  class="nav-item"  
  [routerLinkActive]="['active']" 
  [routerLinkActiveOptions] = "{exact:true}">
    <a
      class="nav-link" 
      [routerLink]="['/blog/posts']">Posts </a
      >
  </li>
```

- posts-list.comp.html

```

<div class="container">
  <div class="row">
    <h3 class="my-heading">
      My List of Posts
      <small class="text-muted">written by: John Smith</small>
    </h3>    
  </div>
  <div class="row">
    <div class="col-lg">
      <a routerLink="/blog/post/new" class="btn btn-secondary">New Post</a>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-sm-6" *ngFor="let post of posts">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.body | slice:0:20  }}...</p>
          <a [routerLink]="['/blog/post', post.id]" class="btn btn-primary">Read More</a>
          <button 
            (click)="onDelete(post)"
            class="btn btn-danger">Delete Post</button>
        </div>
      </div>
    </div>
  </div>  
</div>
```

- etc. keep going through the other components and change the links to '/blog...'
- refresh and test it out, it should work
- go to the home page, open the console and choose 'network'
- click on the posts link in the navbar, we should see the post-blog module loaded there

### <a name="bootSpinner"></a> Adding a simple bootstrap spinner while waiting form data to load

- [from the bootstrap site](https://getbootstrap.com/docs/4.4/components/spinners/)
- add a loading boolean in the posts-list.comp.ts
- then set it to true when the getPosts gets called, and set it to false when it is done retrieving the data

```
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
```

- update the posts-list.comp.html to show the data or not based on the value of loading

```
  <div class="row mt-3" *ngIf="!loading">
    <div class="col-sm-6" *ngFor="let post of posts | paginate: { itemsPerPage: perPage, currentPage: page, totalItems: postsCount }">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.body | slice:0:20  }}...</p>
          <a [routerLink]="['/blog/post', post.id]" class="btn btn-primary">Read More</a>
          <button 
            (click)="onDelete(post)"
            class="btn btn-danger">Delete Post</button>
        </div>
      </div>
    </div>
  </div>  
  <div class="row mt-5">
    <div class="spinner-border text-primary m-5 mx-auto" style="width: 3rem; height: 3rem;" *ngIf="loading">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="mx-auto" *ngIf="!loading">
      <pagination-controls (pageChange)="page = $event"></pagination-controls>
    </div>  
  </div>
```

### <a name="ngxSpinner"></a> Adding an ngx-spinner

- [from here](https://www.npmjs.com/package/ngx-spinner)
- in terminal type:  npm install ngx-spinner --save
- import to app.module.ts

```
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
 
@NgModule({
  imports: [
    // ...
    NgxSpinnerModule
  ]
})
export class AppModule {}
```

- add the component to the app.comp.html

```
<app-navbar></app-navbar>
<div class="main">
  <flash-messages></flash-messages>
  <ngx-spinner></ngx-spinner>
  <router-outlet></router-outlet>
</div>
<app-footer></app-footer>
```

- add to the posts-list.comp.ts while fetching the posts

```
  constructor(
    private postService: PostsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.spinner.show();
    this.postService.getPosts()
      .subscribe(posts => {
        this.spinner.hide();
        this.posts = posts;
      });
  }
```

- refresh and test it out, because we are lazy loading it doesn't happen every time

### <a name="ngNotifier"></a> Using angular notifer for messages

- [from angular notifier](https://www.npmjs.com/package/angular-notifier)
- in terminal type: npm install angular-notifier --save
- update app.module.ts to import the modifier, with config options

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 80,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotifierModule.withConfig(customNotifierOptions),
    FlashMessagesModule.forRoot(),
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

- update app.comp.html to display the component
- put the component at the bottom because on top of router outlet it leaves a space in the html above the header

```
<app-navbar></app-navbar>
<div class="main">
  <router-outlet></router-outlet>
  <notifier-container></notifier-container>
</div>
<app-footer></app-footer>
```

- update the styles.scss file of the whole app found in src/styles.scss

```
@import "~angular-notifier/styles";
```

- update message.service to use the notifier

```
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly notifier: NotifierService;

  constructor(
    notifierService: NotifierService
  ) {
      this.notifier = notifierService;
  }


  add(message: string, status: string) {
    this.notifier.notify(status, message);
  }
}
```

- in posts.service.ts we already have the use of messages in place so it should work
- refresh and see if the messages appear

### <a name="pagination"></a> Adding pagination to the posts

- [from here](http://michaelbromley.github.io/ngx-pagination/#/)
- in terminal type: npm install ngx-pagination --save
- add to blog.module, or app.module if you want it avaliable to any component, the ngx pagination module

```
import { NgxPaginationModule } from 'ngx-pagination';
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    PostRoutingModule
  ]
```

- update the posts-list.comp.ts with the perpage, page, post count variables
- set posts count based on the length of the posts returned
- update the posts count to the new filtered length in the on delete method

```
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
```

- update the posts-list.comp.html with the code for the pagination

```
<div class="container">
  <div class="row">
    <h3 class="my-heading">
      My List of Posts
      <small class="text-muted">written by: John Smith</small>
    </h3>    
  </div>
  <div class="row">
    <div class="col-lg">
      <a routerLink="/blog/post/new" class="btn btn-secondary">New Post</a>
    </div>
  </div>
  <div class="row mt-3" *ngIf="!loading">
    <div class="col-sm-6" *ngFor="let post of posts | paginate: { itemsPerPage: perPage, currentPage: page, totalItems: postsCount }">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.body | slice:0:20  }}...</p>
          <a [routerLink]="['/blog/post', post.id]" class="btn btn-primary">Read More</a>
          <button 
            (click)="onDelete(post)"
            class="btn btn-danger">Delete Post</button>
        </div>
      </div>
    </div>
  </div>  
  <div class="row mt-5">
    <div class="spinner-border text-primary m-5 mx-auto" style="width: 3rem; height: 3rem;" *ngIf="loading">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="mx-auto" style="width: 400px;" *ngIf="!loading">
      <pagination-controls (pageChange)="page = $event"></pagination-controls>
    </div>  
  </div>
</div>

```