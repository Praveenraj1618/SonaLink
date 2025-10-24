import React, { useState } from 'react';
import { User, Lock, Bell, Save, Upload as UploadIcon, Mail } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useAuth } from '../lib/auth-context';
import { toast } from 'sonner@2.0.3';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  const { user, updateUser } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    materialUploads: true,
    forumReplies: true,
    quizChallenges: true,
    weeklyDigest: false
  });

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-destructive' };
    if (password.length < 10) return { strength: 50, label: 'Fair', color: 'bg-yellow-500' };
    if (password.length < 14) return { strength: 75, label: 'Good', color: 'bg-primary' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(passwordData.new);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    updateUser({ name: profileData.name, bio: profileData.bio });
    setIsSaving(false);
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.new.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    setPasswordData({ current: '', new: '', confirm: '' });
    toast.success('Password changed successfully!');
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    toast.success('Notification preferences saved!');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar Navigation */}
        <div className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 h-11"
                onClick={() => setActiveSection(section.id)}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </Button>
            );
          })}
        </div>

        {/* Content Area */}
        <div>
          {activeSection === 'profile' && (
            <Card className="p-8 shadow-sm">
              <h2 className="mb-8">Profile Information</h2>

              <div className="space-y-8">
                {/* Avatar */}
                <div className="flex items-start gap-6">
                  <Avatar className="w-24 h-24 border-2 border-border">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-2xl">
                      {user ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Button variant="outline" size="sm" className="gap-2 mb-2">
                      <UploadIcon className="w-4 h-4" />
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max 2MB. Recommended size: 400x400px
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>

                {/* Email (read-only) */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    disabled
                    className="bg-muted/30"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed for security reasons
                  </p>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Brief description for your profile (max 200 characters)
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2">
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'password' && (
            <Card className="p-8 shadow-sm">
              <h2 className="mb-8">Change Password</h2>

              <div className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    placeholder="Enter current password"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="new-password" className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    placeholder="Enter new password"
                  />
                  {passwordData.new && (
                    <div className="space-y-1.5 mt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Password strength:</span>
                        <span className={`font-medium ${
                          passwordStrength.strength >= 75 ? 'text-green-600' :
                          passwordStrength.strength >= 50 ? 'text-primary' :
                          passwordStrength.strength >= 25 ? 'text-yellow-600' :
                          'text-destructive'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Use at least 6 characters with a mix of letters and numbers
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    placeholder="Confirm new password"
                  />
                  {passwordData.confirm && passwordData.new !== passwordData.confirm && (
                    <p className="text-xs text-destructive">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleChangePassword} disabled={isSaving} className="gap-2">
                    <Lock className="w-4 h-4" />
                    {isSaving ? 'Changing...' : 'Change Password'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card className="p-8 shadow-sm">
              <h2 className="mb-8">Notification Preferences</h2>

              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-4 h-4 text-primary" />
                      <h4>Email Notifications</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email for important updates
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="mb-1">New Material Uploads</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new study materials are uploaded to your courses
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.materialUploads}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({ ...notificationSettings, materialUploads: checked })
                      }
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="mb-1">Forum Replies</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone replies to your posts or mentions you
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.forumReplies}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({ ...notificationSettings, forumReplies: checked })
                      }
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="mb-1">Quiz Challenges</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone challenges you to a quiz
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.quizChallenges}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({ ...notificationSettings, quizChallenges: checked })
                      }
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="mb-1">Weekly Digest</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of your activity and updates
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyDigest}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({ ...notificationSettings, weeklyDigest: checked })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t">
                  <Button onClick={handleSaveNotifications} disabled={isSaving} className="gap-2">
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
