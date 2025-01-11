import { IPost } from "../..";
import { relativeDateFormatter } from "../../../../utlis/formater";
import { PostContainer } from "./styles";

interface PostProps {
  post: IPost;
}

export function Post({ post }: PostProps) {
  const formattedDate = relativeDateFormatter(post.created_at);
  return (
    <PostContainer to={`/post/${post.number}`}>
      <header>
        <strong>{post.title}</strong>
        <span>{formattedDate}</span>
      </header>
      <p>{post.body}</p>
    </PostContainer>
  );
}
