import "@styles/index.scss" with { type: "scss" };
import { AnimatedGradient } from "@components/Canvas.tsx";

function App() {
  return (
    <>
      <AnimatedGradient />
      <section className="size-full flex flex-col justify-center items-center text-shadow-lg">
        <h1 className="text-6xl">Faster Animated Gradient</h1>
        <p>WebGL2 Performance: Required only JavaScript</p>
      </section>
    </>
  );
}

export default App;
