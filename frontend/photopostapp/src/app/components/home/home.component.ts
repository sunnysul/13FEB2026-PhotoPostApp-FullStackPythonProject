import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  posts = signal<Post[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(page: number = 1): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    this.postService.getAllPosts(page, 12).subscribe({
      next: (response) => {
        this.posts.set(response.posts);
        this.currentPage.set(response.page);
        this.totalPages.set(response.total_pages);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load posts');
        this.isLoading.set(false);
      }
    });
  }

  onPageChange(page: number): void {
    this.loadPosts(page);
    window.scrollTo(0, 0);
  }
}
