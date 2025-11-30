import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../hooks/use-auth";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { FiMail, FiLock } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { FormWrapper } from "@/components/form/form-wrapper";
import { FormFieldInput } from "@/components/form/form-field-wrapper";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (err: Error) => {
        form.setError("root", {
          message: err.message || "Login failed",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <CardDescription className="text-center">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              create a new account
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormWrapper form={form} onSubmit={onSubmit}>
            <div className="space-y-4">
              <FormFieldInput
                name="email"
                label="Email address"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                icon={<FiMail className="h-5 w-5" />}
                required
              />

              <FormFieldInput
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                icon={<FiLock className="h-5 w-5" />}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
              size="lg"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p className="font-medium mb-2">Demo Credentials:</p>
              <p>Admin: admin@example.com / admin123</p>
              <p>User: user@example.com / user123</p>
            </div>
          </FormWrapper>
        </CardContent>
      </Card>
    </div>
  );
};
