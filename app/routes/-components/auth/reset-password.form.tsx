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
import { ErrorCodes } from "@/definitions/enums/common";
import { resetPasswordInitialValues } from "@/lib/initial-values/auth";
import { errorToast, successToast } from "@/lib/toast";
import { setValidations } from "@/lib/utils/set-validations";
import {
  ResetPasswordBody,
  resetPasswordSchema,
} from "@/lib/validation-schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const navigate = useNavigate({ from: "/auth/reset-password" });
  const formMethods = useForm({
    mode: "onBlur",
    defaultValues: { ...resetPasswordInitialValues, token },
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutateAsync } = authHelpers.useResetPasswordMutation();

  const onSubmitHandler = async (data: ResetPasswordBody) => {
    try {
      const response = await mutateAsync(data);
      successToast(response.message);
      navigate({ to: "/auth/reset-password/success", replace: true });
    } catch (error) {
      if (
        error.code === ErrorCodes.NotFound ||
        error.code === ErrorCodes.InvalidToken
      ) {
        errorToast("We are unable to process this request! Please try again.");
        return;
      }
      if (error.code === ErrorCodes.InvalidParams) {
        errorToast("Invalid form input. Please verify!");
        setValidations(formMethods.setError, error.details);
        return;
      }

      errorToast(error.message);
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
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
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
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
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
            <Button
              type="submit"
              disabled={formMethods.formState.isSubmitting}
              loading={formMethods.formState.isSubmitting}
              block
            >
              Reset & Continue
            </Button>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
