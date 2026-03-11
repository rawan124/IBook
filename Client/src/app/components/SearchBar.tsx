import { Input } from "antd";

const { Search } = Input;

interface Props {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  return (
    <Search
      placeholder="Search books..."
      allowClear
      enterButton
      size="large"
      onSearch={onSearch}
    />
  );
}
