import { LoginForm } from "@frontend/components/dashboard/login-form";
import { Container, Heading } from "@medusajs/ui";

export default function LoginPage() {
  return (
    <Container className="flex flex-col gap-4">
      <Heading level="h1" className="text-xl">
        Log in to your Medusa Eats account
      </Heading>
      <LoginForm />
    </Container>
  );
}
