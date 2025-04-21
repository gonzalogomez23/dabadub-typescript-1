import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import { type Post as PostType } from "../types";

interface PostCardProps {
  post: PostType;
}

const PostCard = ({post}: PostCardProps) => {

  const { slug, title, description, image } = post;

  return (
    <Link  to={`/post/${slug}`} className="group overflow-hidden h-fit bg-white/40 border border-border1 hover:border-secondary hover:bg-gradient-to-tl from-secondary/10 to-transparent rounded-xl shadow-sm gap-3">
      {image && (
        <img src={image} alt={title} className="w-full aspect-video object-cover" />
      )}
      <div className="flex flex-col p-6">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
        <p className="font-normal text-gray-700">{description}</p>
        <div className="flex grow items-end justify-end">
          <span className="w-7 h-7 rounded-full flex items-center justify-center border-2 border-primary text-primary group-hover:text-white group-hover:bg-secondary group-hover:border-secondary transition-all">
            <ArrowRightIcon className='size-4' />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
