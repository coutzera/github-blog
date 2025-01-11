import { useCallback, useEffect, useState } from "react";
import { PostHeader } from "./components/PostHeader";
import { IPost } from "../Blog";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

const username = import.meta.env.VITE_GITHUB_USERNAME;
const reponame = import.meta.env.VITE_GITHUB_REPONAME;

export function Post() {
  const [postData, setPostData] = useState<IPost>({} as IPost);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  // Define getPostDetails como uma função de callback
  const getPostDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      if (id) {
        const response = await api.get(
          `/repos/${username}/${reponame}/issues/${id}`
        );
        setPostData(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar os detalhes do post:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // useEffect depende de getPostDetails
  useEffect(() => {
    getPostDetails();
  }, [getPostDetails]);

  // Renderiza o componente
  return <PostHeader isLoading={isLoading} postData={postData} />;
}
