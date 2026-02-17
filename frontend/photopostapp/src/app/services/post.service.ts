import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PostsResponse
} from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(page: number = 1, perPage: number = 10): Observable<PostsResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
    
    return this.http.get<PostsResponse>(`${environment.apiUrl}/posts`, { params });
  }

  getPost(id: number): Observable<{ post: Post }> {
    return this.http.get<{ post: Post }>(`${environment.apiUrl}/posts/${id}`);
  }

  getMyPosts(page: number = 1, perPage: number = 10): Observable<PostsResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
    
    return this.http.get<PostsResponse>(`${environment.apiUrl}/users/me/posts`, { params });
  }

  createPost(data: CreatePostRequest): Observable<{ message: string; post: Post }> {
    return this.http.post<{ message: string; post: Post }>(
      `${environment.apiUrl}/posts`,
      data
    );
  }

  updatePost(id: number, data: UpdatePostRequest): Observable<{ message: string; post: Post }> {
    return this.http.put<{ message: string; post: Post }>(
      `${environment.apiUrl}/posts/${id}`,
      data
    );
  }

  deletePost(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.apiUrl}/posts/${id}`);
  }
}
