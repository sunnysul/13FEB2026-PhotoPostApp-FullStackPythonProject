import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  post = signal<Post | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPost(+id);
    }
  }

  loadPost(id: number): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    this.postService.getPost(id).subscribe({
      next: (response) => {
        this.post.set(response.post);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load post');
        this.isLoading.set(false);
      }
    });
  }

  canEdit(): boolean {
    const post = this.post();
    const user = this.authService.currentUser();
    return !!post && !!user && post.user_id === user.id;
  }

  deletePost(): void {
    const post = this.post();
    if (post && confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(post.id).subscribe({
        next: () => {
          this.router.navigate(['/my-posts']);
        },
        error: (error) => {
          alert('Failed to delete post');
        }
      });
    }
  }
}
