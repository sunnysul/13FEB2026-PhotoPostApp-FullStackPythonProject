export interface Post {
  id: number;
  title: string;
  description: string;
  image_url: string;
  user_id: number;
  username?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreatePostRequest {
  title: string;
  description: string;
  image_url: string;
}

export interface UpdatePostRequest {
  title?: string;
  description?: string;
  image_url?: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
