import { json } from "@tanstack/react-start";
import { HttpStatus } from "./http-status";
import { ErrorCodes } from "@/definitions/enums/common";

export const okResponse = <T>(message: string, data?: T) =>
  json({ data, message, success: true }, { status: HttpStatus.Ok });

export const createdResponse = <T>(message: string, data?: T) =>
  json({ data, message, success: true }, { status: HttpStatus.Created });

export const noContentResponse = (message: string) =>
  json({ message, success: true }, { status: HttpStatus.NoContent });

export const notFoundResponse = ({
  message,
  code,
}: {
  message: string;
  code: ErrorCodes;
}) =>
  json(
    {
      message,
      code,
      success: false,
    },
    { status: HttpStatus.NotFound },
  );

export const badRequestResponse = ({
  message,
  code,
}: {
  message: string;
  code: ErrorCodes;
}) =>
  json(
    {
      message,
      code,
      success: false,
    },
    { status: HttpStatus.BadRequest },
  );

export const unauthorizedResponse = ({
  message,
  code,
}: {
  message: string;
  code: ErrorCodes;
}) =>
  json(
    {
      message,
      code,
      success: false,
    },
    { status: HttpStatus.Unauthorized },
  );

export const forbiddenResponse = ({
  message,
  code,
}: {
  message: string;
  code: ErrorCodes;
}) =>
  json(
    {
      message,
      code,
      success: false,
    },
    { status: HttpStatus.Forbidden },
  );

export const conflictResponse = ({
  message,
  code,
}: {
  message: string;
  code: ErrorCodes;
}) =>
  json(
    {
      message,
      code,
      success: false,
    },
    { status: HttpStatus.Conflict },
  );

export const unprocessableContentResponse = (
  { message, code }: { message: string; code: ErrorCodes },
  details?: Record<string, string>,
) =>
  json(
    {
      message,
      code,
      success: false,
      details,
    },
    { status: HttpStatus.UnprocessableContent },
  );

export const tooManyRequestsResponse = (
  {
    message,
    code,
  }: {
    message: string;
    code: ErrorCodes;
  },
  details: Record<string, any>,
) =>
  json(
    {
      message,
      code,
      details,
      success: false,
    },
    { status: HttpStatus.TooManyRequests },
  );

export const internalServerErrorResponse = ({
  message,
  code,
}: {
  message: string;
  code: ErrorCodes;
}) =>
  json(
    {
      message,
      code,
      success: false,
    },
    { status: HttpStatus.InternalServerError },
  );

export const serviceUnavailableResponse = ({
  message,
  code,
}: {
  message: string;
  code: ErrorCodes;
}) =>
  json(
    {
      message,
      code,
      success: false,
    },
    { status: HttpStatus.ServiceUnavailable },
  );
