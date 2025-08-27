import "@styles/index.scss" with { type: "scss" };
import { AnimatedGradient } from "@components/Canvas.tsx";

function App() {
  return (
    <>
      <AnimatedGradient />
      <section className="size-full">
        <p>hello</p>
      </section>
    </>
  );
}

export default App;
