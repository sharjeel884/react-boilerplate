import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/modules/auth/store/auth-store";
import { useLogout } from "@/modules/auth/hooks/use-auth";
import { FiLogOut, FiUser } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-primary-600">
              MyApp
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FiUser className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                  <Badge variant="default">{user.role}</Badge>
                </div>
                <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
                  <FiLogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
