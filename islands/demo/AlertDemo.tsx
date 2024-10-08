import DemoWrapper from "../_DemoWrapper.tsx";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../components/ui/alert.tsx";

const Code = `
import IconAlertCircle from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/alert-circle.tsx"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "https://deno.land/x/testing_shadcn_ui_for_deno@0.1.2/components/alert.tsx"

export function AlertDemo() {
  return (
    <Alert class="h-fit" variant="destructive">
      <IconAlertCircle class="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  )
}
`;

const info = {
  title: "Alert",
  text: "Displays a callout for user attention.",
};

export function AlertDemo() {
  return (
    <DemoWrapper code_text={Code.trim()} info={info}>
      <Alert variant="destructive">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    </DemoWrapper>
  );
}
