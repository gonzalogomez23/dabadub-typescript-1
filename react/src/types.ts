// export type Post = {
//   slug: string;
//   title: string;
//   description: string;
//   image?: string;
//   category?: PostCategory;
// }

export interface PostCategory {
  id: number;
  title: string;
  slug: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
  image?: string;
  category?: PostCategory;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}