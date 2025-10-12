'use client'
import { useState } from 'react'
import { Input } from '@heroui/react'
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <div className="mb-8 w-full max-w-[1208px] mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-black">Поиск</h1>
      <form onSubmit={handleSubmit}>
        <div className="relative w-full">
          <Input
            type="text"
            radius="sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Найти товар"
            variant="flat"
            size="lg"
            classNames={{
              // add right padding so the absolute icon doesn't overlap the text
              input: "text-black pr-10",
              inputWrapper: "bg-white shadow-sm w-full border-2 border-green-300 data-[hover=true]:bg-white group-data-[focus=true]:bg-default-0",
            }}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </form>
    </div>
  )
}

export default SearchBar
