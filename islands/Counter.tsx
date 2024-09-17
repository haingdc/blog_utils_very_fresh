import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { useEffect } from "preact/hooks";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  useEffect(() => {
    console.log('inspect.default', props.count.value);
  }, [props.count.value]);
  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => props.count.value -= 1}>-1</Button>
      <p class="text-3xl tabular-nums">{props.count}</p>
      <Button onClick={() => props.count.value += 1}>+1</Button>
    </div>
  );
}
