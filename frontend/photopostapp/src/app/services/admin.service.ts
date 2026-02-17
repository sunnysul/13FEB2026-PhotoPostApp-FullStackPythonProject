import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../models/user.model';
import { PostsResponse } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(`${environment.apiUrl}/admin/users`);
  }

  getAllPosts(page: number = 1, perPage: number = 10): Observable<PostsResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
    
    return this.http.get<PostsResponse>(`${environment.apiUrl}/admin/posts`, { params });
  }

  deletePost(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.apiUrl}/admin/posts/${id}`);
  }
}
