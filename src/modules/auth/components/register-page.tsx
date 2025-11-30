import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useRegister } from "../hooks/use-auth";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { FormWrapper } from "@/components/form/form-wrapper";
import { FormFieldInput } from "@/components/form/form-field-wrapper";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegister();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    register(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (err: Error) => {
        form.setError("root", {
          message: err.message || "Registration failed",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <CardDescription className="text-center">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              sign in to your existing account
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormWrapper form={form} onSubmit={onSubmit}>
            <div className="space-y-4">
              <FormFieldInput
                name="name"
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                icon={<FiUser className="h-5 w-5" />}
                required
              />

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
                autoComplete="new-password"
                placeholder="Enter your password"
                icon={<FiLock className="h-5 w-5" />}
                required
              />
            </div>

            <Button type="submit" disabled={isPending} className="w-full" size="lg">
              {isPending ? "Creating account..." : "Create account"}
            </Button>
          </FormWrapper>
        </CardContent>
      </Card>
    </div>
  );
};

