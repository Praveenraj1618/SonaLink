import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export function TagInput({ tags, onTagsChange, placeholder = 'Add tags...', maxTags }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      if (!maxTags || tags.length < maxTags) {
        onTagsChange([...tags, trimmedValue]);
        setInputValue('');
      }
    }
  };

  const removeTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring">
      {tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="gap-1 pl-2 pr-1">
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="ml-1 hover:bg-muted rounded-sm p-0.5 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] border-0 shadow-none focus-visible:ring-0 p-0 h-auto"
      />
    </div>
  );
}
