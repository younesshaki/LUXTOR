import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class ServiceError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "ServiceError";
    this.status = status;
  }
}

export function getErrorResponse(
  error: unknown,
  fallbackMessage = "Something went wrong.",
  fallbackStatus = 500
) {
  if (error instanceof ServiceError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  if (error instanceof ZodError) {
    const issue = error.issues[0];
    return NextResponse.json(
      { error: issue?.message ?? "Please check your input and try again." },
      { status: 400 }
    );
  }

  console.error(error);
  return NextResponse.json({ error: fallbackMessage }, { status: fallbackStatus });
}
