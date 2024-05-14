import { SignupForm } from "@frontend/components/dashboard/signup-form";
import { Container, Heading } from "@medusajs/ui";

export default function SignupPage() {
  return (
    <Container className="flex flex-col gap-4">
      <Heading level="h1" className="text-xl">
        Create your Medusa Eats account
      </Heading>
      <SignupForm />
    </Container>
  );
}
