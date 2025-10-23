import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
interface SearchBarProps {
  onSearch: (city: string) => void;
  onUseLocation: () => void;
  isLoading: boolean;
  isDarkMode: boolean;
}
export function SearchBar({
  onSearch,
  onUseLocation,
  isLoading,
  isDarkMode
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };
  return <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <motion.div className="flex-1 relative" animate={{
        scale: isFocused ? 1.01 : 1
      }} transition={{
        duration: 0.2
      }}>
          <Search className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder="Search for a city..." className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border-2 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md ${isDarkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500 focus:border-red-600' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-500'}`} disabled={isLoading} />
        </motion.div>
        <motion.button type="submit" disabled={isLoading || !searchValue.trim()} whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} className="px-4 sm:px-6 py-2.5 text-black sm:py-3 text-sm sm:text-base bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md">
          Search
        </motion.button>
        <motion.button type="button" onClick={onUseLocation} disabled={isLoading} whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800 text-white disabled:bg-gray-800' : 'bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white'}`} title="Use my location">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </form>
    </div>;
}