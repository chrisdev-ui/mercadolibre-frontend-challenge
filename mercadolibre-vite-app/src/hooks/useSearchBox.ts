import { inputSearchError } from '@/common/constants/searchbox';
import { searchByQueryUrl } from '@constants/navigation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface SearchBoxProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const useSearchBox = (): SearchBoxProps => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>('');

  // TODO: Try to save the search in context in order to keep an history of searches
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchInput.trim() === '') return toast.error(inputSearchError);
    navigate(`${searchByQueryUrl}${searchInput}`);
  };

  return { searchInput, setSearchInput, handleSubmit };
};

export default useSearchBox;
