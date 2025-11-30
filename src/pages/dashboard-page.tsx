import { useAuthStore } from "@/modules/auth/store/auth-store";
import { H1, P } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <H1>Dashboard</H1>
        <P className="mt-2 text-gray-600">
          Welcome back, {user?.name}! This is your dashboard.
        </P>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary-600">150</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-success-600">42</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-warning-600">8</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

