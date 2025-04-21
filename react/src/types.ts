export type Post = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  category?: PostCategory;
}

export type PostCategory = {
  title: string;
  // slug: string;
  // description?: string;
  // image?: string;
  // color?: string;
  // icon?: string;
  // posts?: Post[];
}