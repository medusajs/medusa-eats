"use client";

import { login } from "@frontend/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Label, Input, Button, Badge, Select } from "@medusajs/ui";
import { Link } from "next-view-transitions";

function Submit() {
  const status = useFormStatus();

  return (
    <Button
      type="submit"
      size="large"
      className="self-end"
      isLoading={status.pending}
    >
      Login
    </Button>
  );
}

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
        <div>
          <Label htmlFor="actor_type">I&apos;m a...</Label>
          <Select name="actor_type">
            <Select.Trigger>
              <Select.Value></Select.Value>
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="restaurant">Restaurant</Select.Item>
              <Select.Item value="driver">Driver</Select.Item>
            </Select.Content>
          </Select>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <Link href="/signup">
          <Button variant="transparent" size="large">
            Create account
          </Button>
        </Link>
        <Submit />
      </div>
      {state.message && (
        <Badge className="justify-center text-center">{state.message}</Badge>
      )}
    </form>
  );
}
