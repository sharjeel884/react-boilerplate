import { H1, P } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <H1>Settings</H1>
        <P className="mt-2 text-gray-600">Manage your application settings here.</P>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Settings content will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

