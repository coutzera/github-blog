import { useCallback, useState, useEffect } from "react";
import { Post } from "./components/Post";
import { Profile } from "./components/Profile/Index";
import { SearchInput } from "./components/SearchInput";
import { PostsListContainer } from "./styles";
import { api } from "../../lib/axios";
import { Spinner } from "../../components/Spinner";

const username = import.meta.env.VITE_GITHUB_USERNAME;
const reponame = import.meta.env.VITE_GITHUB_REPONAME;

export interface IPost {
  id: number;
  title: string;
  body: string;
  created_at: string;
  number: number;
  html_url: string;
  comments: number;
  user: {
    login: string;
  };
}

export function Blog() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async (query: string = "") => {
    if (!username || !reponame) {
      console.error(
        "Username ou Reponame não definidos nas variáveis de ambiente."
      );
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await api.get(
        `/search/issues?q=${query}%20repo:${username}/${reponame}`
      );
      setPosts(data.items);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Callback sem dependência, para evitar renderizações desnecessárias
  const getPosts = useCallback(fetchPosts, []);

  useEffect(() => {
    fetchPosts(); // Inicializa a busca ao carregar o componente
  }, []); // Não há dependências, garantindo que a busca ocorra apenas uma vez

  return (
    <div>
      <Profile />
      <SearchInput onSearch={getPosts} postLength={posts.length} />

      {isLoading ? (
        <Spinner />
      ) : (
        <PostsListContainer>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </PostsListContainer>
      )}
    </div>
  );
}
