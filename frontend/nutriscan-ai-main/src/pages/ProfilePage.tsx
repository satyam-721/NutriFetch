import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, Palette, Save, Trash2, LogOut, Camera, Mail, Phone, MapPin, Calendar, Ruler, Weight, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  dietaryPreference: string;
  allergies: string[];
  goalType: string;
  targetCalories: string;
}

interface NotificationSettings {
  mealReminders: boolean;
  nutrientAlerts: boolean;
  weeklyReport: boolean;
  goalProgress: boolean;
  pushNotifications: boolean;
  emailDigest: boolean;
}

interface AppPreferences {
  units: string;
  language: string;
  theme: string;
  defaultServingSize: string;
  autoScan: boolean;
  showHealthScore: boolean;
}

const defaultProfile: UserProfile = {
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  dateOfBirth: "1995-06-15",
  gender: "male",
  height: "175",
  weight: "72",
  activityLevel: "moderate",
  dietaryPreference: "balanced",
  allergies: ["gluten", "lactose"],
  goalType: "maintain",
  targetCalories: "2200",
};

const defaultNotifications: NotificationSettings = {
  mealReminders: true,
  nutrientAlerts: true,
  weeklyReport: true,
  goalProgress: false,
  pushNotifications: true,
  emailDigest: false,
};

const defaultPreferences: AppPreferences = {
  units: "metric",
  language: "en",
  theme: "dark",
  defaultServingSize: "100",
  autoScan: true,
  showHealthScore: true,
};

const allergenOptions = ["gluten", "lactose", "nuts", "soy", "eggs", "shellfish", "fish", "wheat"];

const ProfilePage = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [notifications, setNotifications] = useState<NotificationSettings>(defaultNotifications);
  const [preferences, setPreferences] = useState<AppPreferences>(defaultPreferences);

  useEffect(() => {
    const saved = localStorage.getItem("nutriscan-profile");
    if (saved) setProfile(JSON.parse(saved));
    const savedNotif = localStorage.getItem("nutriscan-notifications");
    if (savedNotif) setNotifications(JSON.parse(savedNotif));
    const savedPrefs = localStorage.getItem("nutriscan-preferences");
    if (savedPrefs) setPreferences(JSON.parse(savedPrefs));
  }, []);

  const saveProfile = () => {
    localStorage.setItem("nutriscan-profile", JSON.stringify(profile));
    localStorage.setItem("nutriscan-notifications", JSON.stringify(notifications));
    localStorage.setItem("nutriscan-preferences", JSON.stringify(preferences));
    toast({ title: "Profile Saved", description: "Your settings have been updated successfully." });
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
    setNotifications(defaultNotifications);
    setPreferences(defaultPreferences);
    localStorage.removeItem("nutriscan-profile");
    localStorage.removeItem("nutriscan-notifications");
    localStorage.removeItem("nutriscan-preferences");
    toast({ title: "Profile Reset", description: "All settings have been reset to defaults." });
  };

  const toggleAllergen = (allergen: string) => {
    setProfile((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergen)
        ? prev.allergies.filter((a) => a !== allergen)
        : [...prev.allergies, allergen],
    }));
  };

  const initials = `${profile.firstName[0] || ""}${profile.lastName[0] || ""}`.toUpperCase();

  const bmi = profile.height && profile.weight
    ? (parseFloat(profile.weight) / Math.pow(parseFloat(profile.height) / 100, 2)).toFixed(1)
    : "—";

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground text-xs sm:text-sm">Manage your account and preferences</p>
        </div>
        <Button onClick={saveProfile} className="gap-2 w-full sm:w-auto">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      {/* Profile Header Card */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 text-xl sm:text-2xl">
                <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold text-foreground">{profile.firstName} {profile.lastName}</h2>
              <p className="text-muted-foreground text-sm">{profile.email}</p>
              <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  BMI: {bmi}
                </span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium capitalize">
                  {profile.goalType} Weight
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium capitalize">
                  {profile.dietaryPreference} Diet
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="bg-secondary border border-border w-full grid grid-cols-4">
          <TabsTrigger value="personal" className="gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-1 sm:px-3">
            <User className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="health" className="gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-1 sm:px-3">
            <Activity className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Health</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-1 sm:px-3">
            <Bell className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-1 sm:px-3">
            <Palette className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Prefs</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="personal">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-10 bg-secondary border-border" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-10 bg-secondary border-border" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10 bg-secondary border-border" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-10 bg-secondary border-border" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-10 bg-secondary border-border" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-10 bg-secondary border-border" type="date" value={profile.dateOfBirth} onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Gender</Label>
                  <Select value={profile.gender} onValueChange={(v) => setProfile({ ...profile, gender: v })}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health & Diet */}
        <TabsContent value="health">
          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Body Metrics</CardTitle>
                <CardDescription>Your physical measurements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Height (cm)</Label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-10 bg-secondary border-border" type="number" value={profile.height} onChange={(e) => setProfile({ ...profile, height: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Weight (kg)</Label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-10 bg-secondary border-border" type="number" value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">BMI</Label>
                    <div className="h-10 px-3 py-2 rounded-md bg-secondary border border-border flex items-center text-sm font-medium text-primary">
                      {bmi}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Activity Level</Label>
                    <Select value={profile.activityLevel} onValueChange={(v) => setProfile({ ...profile, activityLevel: v })}>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary</SelectItem>
                        <SelectItem value="light">Lightly Active</SelectItem>
                        <SelectItem value="moderate">Moderately Active</SelectItem>
                        <SelectItem value="active">Very Active</SelectItem>
                        <SelectItem value="athlete">Athlete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Target Daily Calories</Label>
                    <Input className="bg-secondary border-border" type="number" value={profile.targetCalories} onChange={(e) => setProfile({ ...profile, targetCalories: e.target.value })} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Dietary Preferences</CardTitle>
                <CardDescription>Set your diet type and allergens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Diet Type</Label>
                    <Select value={profile.dietaryPreference} onValueChange={(v) => setProfile({ ...profile, dietaryPreference: v })}>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="keto">Keto</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="paleo">Paleo</SelectItem>
                        <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Goal</Label>
                    <Select value={profile.goalType} onValueChange={(v) => setProfile({ ...profile, goalType: v })}>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lose">Lose Weight</SelectItem>
                        <SelectItem value="maintain">Maintain Weight</SelectItem>
                        <SelectItem value="gain">Gain Weight</SelectItem>
                        <SelectItem value="muscle">Build Muscle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Allergies & Intolerances</Label>
                  <div className="flex flex-wrap gap-2">
                    {allergenOptions.map((a) => (
                      <button
                        key={a}
                        onClick={() => toggleAllergen(a)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
                          profile.allergies.includes(a)
                            ? "bg-destructive/20 text-destructive border border-destructive/30"
                            : "bg-secondary text-muted-foreground border border-border hover:border-primary/30"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Notification Settings</CardTitle>
              <CardDescription>Control how and when you receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {([
                { key: "mealReminders", label: "Meal Reminders", desc: "Get reminded to log your meals" },
                { key: "nutrientAlerts", label: "Nutrient Alerts", desc: "Warnings for high sugar, sodium, etc." },
                { key: "weeklyReport", label: "Weekly Report", desc: "Receive a weekly nutrition summary" },
                { key: "goalProgress", label: "Goal Progress", desc: "Updates on your diet goals" },
                { key: "pushNotifications", label: "Push Notifications", desc: "Browser push notifications" },
                { key: "emailDigest", label: "Email Digest", desc: "Monthly email with insights" },
              ] as const).map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">App Preferences</CardTitle>
              <CardDescription>Customize your NutriScan experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Units</Label>
                  <Select value={preferences.units} onValueChange={(v) => setPreferences({ ...preferences, units: v })}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                      <SelectItem value="imperial">Imperial (lb, in)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Default Serving (g)</Label>
                  <Input className="bg-secondary border-border" type="number" value={preferences.defaultServingSize} onChange={(e) => setPreferences({ ...preferences, defaultServingSize: e.target.value })} />
                </div>
              </div>
              <div className="space-y-5 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto-Scan Mode</p>
                    <p className="text-xs text-muted-foreground">Automatically start camera on scan page</p>
                  </div>
                  <Switch checked={preferences.autoScan} onCheckedChange={(v) => setPreferences({ ...preferences, autoScan: v })} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Show Health Score</p>
                    <p className="text-xs text-muted-foreground">Display health score badges on food items</p>
                  </div>
                  <Switch checked={preferences.showHealthScore} onCheckedChange={(v) => setPreferences({ ...preferences, showHealthScore: v })} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/30 bg-card mt-4">
            <CardHeader>
              <CardTitle className="text-lg text-destructive flex items-center gap-2">
                <Shield className="w-5 h-5" /> Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Reset All Data</p>
                  <p className="text-xs text-muted-foreground">Clear all saved profile and nutrition data</p>
                </div>
                <Button variant="destructive" size="sm" onClick={resetProfile} className="gap-2">
                  <Trash2 className="w-4 h-4" /> Reset Data
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Log Out</p>
                  <p className="text-xs text-muted-foreground">Sign out of your account</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10">
                  <LogOut className="w-4 h-4" /> Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
