interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="search-bar mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="게시글 검색..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar 