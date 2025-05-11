import { json } from "@tanstack/react-start";
import { HttpStatus } from "./http-status";

export const okResponse = <T>(message: string, data?: T) =>
  json({ data, message, success: true }, { status: HttpStatus.Ok });

export const createdResponse = <T>(message: string, data?: T) =>
  json({ data, message, success: true }, { status: HttpStatus.Created });

export const noContentResponse = (message: string) =>
  json({ message, success: true }, { status: HttpStatus.NoContent });

export const notFoundResponse = (message: string) =>
  json(
    {
      message,
      success: false,
    },
    { status: HttpStatus.NotFound },
  );

export const badRequestResponse = (message: string) =>
  json(
    {
      message,
      success: false,
    },
    { status: HttpStatus.BadRequest },
  );

export const unauthorizedResponse = (message: string) =>
  json(
    {
      message,
      success: false,
    },
    { status: HttpStatus.Unauthorized },
  );

export const forbiddenResponse = (message: string) =>
  json(
    {
      message,
      success: false,
    },
    { status: HttpStatus.Forbidden },
  );

export const conflictResponse = (message: string) =>
  json(
    {
      message,
      success: false,
    },
    { status: HttpStatus.Conflict },
  );

export const unprocessableEntityResponse = (message: string, details: any) =>
  json(
    {
      message,
      success: false,
      details,
    },
    { status: HttpStatus.UnprocessableEntity },
  );

export const tooManyRequestsResponse = (message: string) =>
  json(
    {
      message,
      success: false,
    },
    { status: HttpStatus.ToManyRequests },
  );

export const internalServerErrorResponse = (message: string) =>
  json(
    {
      message,
      success: false,
    },
    { status: HttpStatus.InternalServerError },
  );

export const serviceUnavailableResponse = (message: string) =>
  json(
    {
      message,
      success: false,
    },
    { status: HttpStatus.ServiceUnavailable },
  );
