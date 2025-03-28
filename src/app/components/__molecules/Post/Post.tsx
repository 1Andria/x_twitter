import { usePostData } from "@/app/common/hooks/Store";
import PostItem from "../PostItem/PostItem";
function Post() {
  const posts = usePostData((state) => state.posts);

  return (
    <div className="flex flex-col w-full">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Post;
