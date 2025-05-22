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
import { forgetPasswordInitialValues } from "@/lib/initial-values/auth";
import { errorToast, successToast } from "@/lib/toast";
import { setValidations } from "@/lib/utils/set-validations";
import {
  ForgetPasswordBody,
  forgetPasswordSchema,
} from "@/lib/validation-schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const ForgetPasswordForm = () => {
  const navigate = useNavigate({ from: "/auth/forget-password" });
  const formMethods = useForm({
    mode: "onBlur",
    defaultValues: forgetPasswordInitialValues,
    resolver: zodResolver(forgetPasswordSchema),
  });

  const { mutateAsync } = authHelpers.useForgetPasswordMutation();

  const onSubmitHandler = async (data: ForgetPasswordBody) => {
    try {
      const response = await mutateAsync(data);
      successToast(response.message);
      navigate({ to: "success" });
    } catch (error) {
      if (error.code === ErrorCodes.NotFound) {
        errorToast("We are unable to find user against this email!");
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
        <CardTitle>Forget Password</CardTitle>
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
              name="email"
              control={formMethods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter the email address for password reset
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
              Submit
            </Button>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
