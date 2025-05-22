import { loginInitialValues } from "@/lib/initial-values/auth";
import { LoginBody, loginSchema } from "@/lib/validation-schemas/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { authHelpers } from "@/api/helpers/auth";
import { errorToast, successToast } from "@/lib/toast";
import { setValidations } from "@/lib/utils/set-validations";

export const LoginForm = ({ redirectFrom }: { redirectFrom?: string }) => {
  const loginMutation = authHelpers.useLoginMutation();
  const form = useForm({
    mode: "onBlur",
    defaultValues: loginInitialValues,
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate({ from: "/auth/login" });

  const onSubmitHandler = async (data: LoginBody) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      successToast(response.message);
      navigate({
        to: redirectFrom ? redirectFrom : "/app/home",
        replace: true,
      });
    } catch (error) {
      errorToast(error.message);
      setValidations(form.setError, error.details);
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login to Start</CardTitle>
        <CardDescription>
          Fill the form and press the login button to access the app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <Form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmitHandler)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-end">
                    <Button type="button" size="sm" variant="link" asChild>
                      <Link to="/auth/forget-password">Forget Password</Link>
                    </Button>
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
              block
            >
              Login
            </Button>
          </Form>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?{" "}
          <Button
            type="button"
            variant="link"
            size="sm"
            className="ms-0.5 px-1"
            asChild
          >
            <Link to="/auth/register">Register</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};
