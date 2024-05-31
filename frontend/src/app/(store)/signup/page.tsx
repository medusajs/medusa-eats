import { SignupForm } from "@frontend/components/dashboard/signup-form";
import { Container, Heading } from "@medusajs/ui";
import { listRestaurants } from "@frontend/lib/data";

export default async function SignupPage() {
  const restaurants = await listRestaurants();

  return (
    <Container className="flex flex-col gap-4">
      <Heading level="h1" className="text-xl">
        Create your Medusa Eats account
      </Heading>
      <SignupForm restaurants={restaurants} />
    </Container>
  );
}
