import { Home, ArrowLeft } from "lucide-react";
import { AmbientBackground } from "@/components/ui/backgrounds";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <AmbientBackground />
      <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <div className="font-mono text-sm uppercase tracking-[0.3em] text-brand-2">
          Error 404
        </div>
        <h1 className="mt-4 text-7xl font-semibold tracking-tighter text-gradient sm:text-8xl">
          404
        </h1>
        <p className="mt-4 max-w-md text-pretty text-muted">
          This page drifted off into latent space. Let's get you back to something real.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">
            <Home className="h-4 w-4" /> Back home
          </Button>
          <Button href="/projects" variant="outline" size="lg">
            <ArrowLeft className="h-4 w-4" /> View projects
          </Button>
        </div>
      </div>
    </>
  );
}
