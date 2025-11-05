export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500/30 via-blue-400/30 to-indigo-500/30 animate-wave opacity-70 h-[200%] w-[200%] blur-3xl"></div>
    </div>
  );
}
