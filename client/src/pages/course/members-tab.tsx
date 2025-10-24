import React, { useState } from 'react';
import { Search, Mail, User as UserIcon } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';

interface Member {
  id: number;
  name: string;
  avatar?: string;
  role: 'student' | 'tutor' | 'admin';
  joined_at: string;
}

const mockMembers: Member[] = [
  { id: 1, name: 'Rakks Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rakks', role: 'student', joined_at: '2025-08-01' },
  { id: 2, name: 'Priya S', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', role: 'tutor', joined_at: '2025-07-15' },
  { id: 3, name: 'Arun M', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arun', role: 'student', joined_at: '2025-08-05' },
  { id: 4, name: 'Divya R', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Divya', role: 'student', joined_at: '2025-08-10' },
  { id: 5, name: 'Kiran P', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kiran', role: 'student', joined_at: '2025-08-12' },
  { id: 6, name: 'Sneha K', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha', role: 'student', joined_at: '2025-08-15' },
];

interface MembersTabProps {
  courseId: number;
}

export function MembersTab({ courseId }: MembersTabProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'tutor':
        return 'default';
      case 'admin':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 text-sm text-muted-foreground">
        <span>{filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Members Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="p-5">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="truncate">{member.name}</h4>
                  <Badge variant={getRoleBadgeVariant(member.role)} className="text-xs shrink-0">
                    {member.role}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Joined {new Date(member.joined_at).toLocaleDateString()}
                </p>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <UserIcon className="w-3 h-3 mr-1.5" />
                    Profile
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Mail className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No members found</p>
        </Card>
      )}
    </div>
  );
}
