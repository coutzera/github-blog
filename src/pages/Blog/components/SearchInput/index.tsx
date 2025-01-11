import { useForm } from "react-hook-form";
import { SearchInputContainer } from "./styles";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = z.object({
  query: z.string().optional(), // Torna o campo "query" opcional para maior flexibilidade
});

interface SearchInputProps {
  postLength: number;
  onSearch: (query?: string) => Promise<void>;
}

type SearchFormInput = z.infer<typeof searchFormSchema>;

export function SearchInput({ postLength, onSearch }: SearchInputProps) {
  const { register, handleSubmit } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
  });

  const handleSearchPosts = async (data: SearchFormInput) => {
    await onSearch(data.query);
  };

  return (
    <SearchInputContainer onSubmit={handleSubmit(handleSearchPosts)}>
      <header>
        <h3>Publicações</h3>
        <span>{postLength} publicações</span>
      </header>

      <input type="text" placeholder="Buscar conteúdo" {...register("query")} />
    </SearchInputContainer>
  );
}
