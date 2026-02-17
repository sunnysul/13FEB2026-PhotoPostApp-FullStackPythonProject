import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  errorMessage = signal<string>('');
  successMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  postId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image_url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postId = +id;
      this.isEditMode.set(true);
      this.loadPost(this.postId);
    }
  }

  loadPost(id: number): void {
    this.isLoading.set(true);
    this.postService.getPost(id).subscribe({
      next: (response) => {
        const post = response.post;
        this.postForm.patchValue({
          title: post.title,
          description: post.description,
          image_url: post.image_url
        });
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load post');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');
      
      const formData = this.postForm.value;
      const request = this.isEditMode() && this.postId
        ? this.postService.updatePost(this.postId, formData)
        : this.postService.createPost(formData);

      request.subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.successMessage.set(response.message);
          setTimeout(() => {
            this.router.navigate(['/my-posts']);
          }, 1500);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.error?.message || 'Operation failed. Please try again.');
        }
      });
    }
  }
}
