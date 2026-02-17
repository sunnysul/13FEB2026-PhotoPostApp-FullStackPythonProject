import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  users = signal<User[]>([]);
  posts = signal<Post[]>([]);
  isLoadingUsers = signal<boolean>(true);
  isLoadingPosts = signal<boolean>(true);
  errorMessage = signal<string>('');
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  activeTab = signal<'users' | 'posts'>('users');

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadPosts();
  }

  loadUsers(): void {
    this.isLoadingUsers.set(true);
    this.errorMessage.set('');
    
    this.adminService.getAllUsers().subscribe({
      next: (response) => {
        this.users.set(response.users);
        this.isLoadingUsers.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load users');
        this.isLoadingUsers.set(false);
      }
    });
  }

  loadPosts(page: number = 1): void {
    this.isLoadingPosts.set(true);
    this.errorMessage.set('');
    
    this.adminService.getAllPosts(page, 10).subscribe({
      next: (response) => {
        this.posts.set(response.posts);
        this.currentPage.set(response.page);
        this.totalPages.set(response.total_pages);
        this.isLoadingPosts.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load posts');
        this.isLoadingPosts.set(false);
      }
    });
  }

  onPageChange(page: number): void {
    this.loadPosts(page);
  }

  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      this.adminService.deletePost(postId).subscribe({
        next: () => {
          this.loadPosts(this.currentPage());
        },
        error: (error) => {
          alert('Failed to delete post');
        }
      });
    }
  }

  switchTab(tab: 'users' | 'posts'): void {
    this.activeTab.set(tab);
  }
}
