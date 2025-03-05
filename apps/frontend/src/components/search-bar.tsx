import { Input } from './ui/input';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="flex size-full flex-col">
      <div className="flex size-full flex-col">
        <Input
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}
