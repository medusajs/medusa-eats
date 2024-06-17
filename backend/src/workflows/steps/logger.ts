import { createStep } from "@medusajs/workflows-sdk";

export const loggerStepId = "logger-step";
export const loggerStep = createStep(
  { name: loggerStepId },
  async function (
    {
      message,
    }: {
      message: string;
    },
    { container }
  ) {
    const logger = container.resolve("logger");
    logger.info({ message });
  }
);
