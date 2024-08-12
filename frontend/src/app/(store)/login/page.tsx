import { LoginForm } from "@frontend/components/dashboard/login-form";
import { Container, Heading, Text } from "@medusajs/ui";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <Container className="flex flex-col gap-4">
        <Heading level="h1" className="text-xl text-center">
          {process.env.NEXT_PUBLIC_DEMO_MODE === "true"
            ? "Log in as a demo admin"
            : "Log in to your Medusa Eats account"}
        </Heading>
        <LoginForm />
      </Container>
    </div>
  );
}
