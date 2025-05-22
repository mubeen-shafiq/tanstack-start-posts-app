import { authHelpers } from "@/api/helpers/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerInitialValues } from "@/lib/initial-values/auth";
import { errorToast, successToast } from "@/lib/toast";
import { makeFullName } from "@/lib/utils";
import { setValidations } from "@/lib/utils/set-validations";
import { RegisterBody, registerSchema } from "@/lib/validation-schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const RegisterForm = () => {
  const registerMutation = authHelpers.useRegisterMutation();
  const form = useForm({
    mode: "onBlur",
    defaultValues: registerInitialValues,
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate({ from: "/auth/register" });

  const onSubmitHandler = async (data: RegisterBody) => {
    try {
      const response = await registerMutation.mutateAsync(data);
      successToast(response.message);
      navigate({
        to: "/auth/register/success",
        search: {
          id: response.data.id,
          email: data.email,
          name: makeFullName(data.firstName, data.lastName),
        },
      });
    } catch (error) {
      errorToast(error.message);
      setValidations(form.setError, error.details);
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Welcome to Start</CardTitle>
        <CardDescription>
          Fill the form to become a member of Start.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <Form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmitHandler)}
          >
            <div className="flex gap-4 items-start">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                </FormItem>
              )}
            />
            <Button
              type="submit"
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
              block
            >
              Register
            </Button>
          </Form>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Button
            type="button"
            variant="link"
            size="sm"
            className="ms-0.5 px-1"
            asChild
          >
            <Link to="/auth/login">Login</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};
