import { authHelpers } from "@/api/helpers/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { resetPasswordInitialValues } from "@/lib/initial-values/auth";
import { successToast } from "@/lib/toast";
import {
  ResetPasswordBody,
  resetPasswordSchema,
} from "@/lib/validation-schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const ResetPasswordForm = () => {
  const formMethods = useForm({
    mode: "onBlur",
    defaultValues: resetPasswordInitialValues,
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutateAsync } = authHelpers.useResetPasswordMutation();

  const onSubmitHandler = async (data: ResetPasswordBody) => {
    try {
      const response = await mutateAsync(data);
      successToast(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Fill the form and press the submit button.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...formMethods}>
          <Form
            className="space-y-6"
            onSubmit={formMethods.handleSubmit(onSubmitHandler)}
          >
            <FormField
              name="password"
              control={formMethods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your password..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter your new password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={formMethods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Confirm your password..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please repeat your new password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" block>
              Reset & Continue
            </Button>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
