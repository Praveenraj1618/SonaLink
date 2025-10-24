import React, { useState } from 'react';
import { Search, Bell, Settings, LogOut, User, Menu } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SonaLinkLogo } from './sonalink-logo';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { useAuth } from '../lib/auth-context';
import { mockNotifications } from '../lib/mock-data';

interface AppHeaderProps {
  onNavigate: (page: string) => void;
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
}

export function AppHeader({ onNavigate, onSearch, onMenuClick }: AppHeaderProps) {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [notifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Mock search suggestions
  const mockSuggestions = [
    { type: 'material', label: 'Data Structures Notes', id: 1, meta: 'CS301' },
    { type: 'course', label: 'Computer Networks', id: 302, meta: 'Prof. Kumar' },
    { type: 'post', label: 'How to implement binary tree?', id: 5, meta: '3 answers' },
    { type: 'person', label: 'Priya S', id: 2, meta: 'Student' }
  ].filter(s => searchQuery && s.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      onNavigate(`search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'material') {
      onNavigate(`course/301/materials/${suggestion.id}`);
    } else if (suggestion.type === 'course') {
      onNavigate(`course/${suggestion.id}`);
    } else if (suggestion.type === 'post') {
      onNavigate(`course/301/forum/${suggestion.id}`);
    } else if (suggestion.type === 'person') {
      onNavigate(`profile`);
    }
    setShowSuggestions(false);
    setSearchQuery('');
  };

  const handleLogout = () => {
    logout();
    onNavigate('landing');
  };

  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          
          {/* Logo */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-1.5 shrink-0"
            style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
          >
            <SonaLinkLogo className="w-8 h-8" />
            <span className="hidden sm:inline" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>SonaLink</span>
          </button>
        </div>

        {/* Search with Suggestions */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search materials, courses, posts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10"
            />
          </div>
          
          {/* Search Suggestions Dropdown */}
          {showSuggestions && mockSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg overflow-hidden z-50">
              {mockSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 hover:bg-muted/50 transition-colors text-left flex items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{suggestion.label}</div>
                    <div className="text-xs text-muted-foreground">{suggestion.meta}</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {suggestion.type}
                  </Badge>
                </button>
              ))}
            </div>
          )}
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h4>Notifications</h4>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => onNavigate(notification.link)}
                      className={`w-full p-4 text-left hover:bg-muted transition-colors border-b last:border-b-0 ${
                        !notification.isRead ? 'bg-primary/5' : ''
                      }`}
                    >
                      <p className="text-sm mb-1">{notification.body}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">{user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate('profile')}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
