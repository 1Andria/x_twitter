import { usePostData, useSearchValue } from "@/app/common/hooks/Store";
import PostItem from "../PostItem/PostItem";
function Post() {
  const posts = usePostData((state) => state.posts);
  const searchValue = useSearchValue((state) => state.searchValue);
  const FilterByName = posts.filter((post) =>
    post.name.toLocaleLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full">
      {searchValue.trim() === "" &&
        posts.map((post) => <PostItem key={post.id} post={post} />)}
      {searchValue.length > 0 &&
        searchValue.trim() != "" &&
        FilterByName.map((post) => <PostItem key={post.id} post={post} />)}
    </div>
  );
}

export default Post;
