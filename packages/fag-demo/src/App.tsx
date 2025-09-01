import "@styles/index.scss" with { type: "scss" };
import { AnimatedGradient } from "@components/Canvas.tsx";

function App() {
  return (
    <>
      <AnimatedGradient />
      <section className="size-full flex flex-col justify-center items-center">
        <p className="text-6xl text-center">Faster Animated Gradient</p>
      </section>
    </>
  );
}

export default App;
