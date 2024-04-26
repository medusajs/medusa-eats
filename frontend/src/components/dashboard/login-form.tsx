"use client";

import { login } from "@frontend/app/dashboard/actions";
import { useFormState } from "react-dom";
import { Label, Input, Button, Badge } from "@medusajs/ui";

export function LoginForm() {
  const [state, action] = useFormState(login, { message: "" });

  return (
    <form action={action} className="flex flex-col gap-4 max-w-96">
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
      </div>
      <Button type="submit" size="large" className="self-end">
        Login
      </Button>
      {state.message && (
        <Badge className="justify-center text-center">{state.message}</Badge>
      )}
    </form>
  );
}
