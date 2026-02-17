import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-my-posts',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit {
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
    
    this.postService.getMyPosts(page, 12).subscribe({
      next: (response) => {
        this.posts.set(response.posts);
        this.currentPage.set(response.page);
        this.totalPages.set(response.total_pages);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load your posts');
        this.isLoading.set(false);
      }
    });
  }

  onPageChange(page: number): void {
    this.loadPosts(page);
    window.scrollTo(0, 0);
  }

  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.loadPosts(this.currentPage());
        },
        error: (error) => {
          alert('Failed to delete post');
        }
      });
    }
  }
}
