import { Link } from "react-router-dom";
import { type Post as PostType } from "../types";

interface PostItemProps {
  post: PostType;
}

const PostItem = ({ post }: PostItemProps ) => {

  const { slug, title, description, image, category } = post;

  return (
    <Link
      to={`/post/${slug}`}
      className="flex group overflow-hidden h-fit border-b-2 border-primary/15 last:border-none gap-3 px-4 py-6"
      aria-label={`Leer más sobre ${title}`}
    >
      <div className="flex flex-col grow max-h-80 gap-3">
        {category && (
          <div className="flex">
            <span className="flex w-fit rounded-full items-center justify-center text-primary text-sm font-headings bg-secondary/10 px-3 py-1">
              {category.title}
            </span>
          </div>
        )}
        <h5 className="text-2xl font-semibold font-headings tracking-tight text-gray-900">{title}</h5>
        <p className="font-normal text-gray-700">{description}</p>
      </div>
      {image && (
        <img src={image} alt={title} className="h-40 aspect-[4/3] object-cover rounded-lg" />
      )}
    </Link>
  );
};

export default PostItem;
