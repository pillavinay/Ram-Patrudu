import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center pt-24">
      <div className="container-x text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-6 text-[clamp(3rem,9vw,8rem)]">
          Page not <span className="accent-word">found.</span>
        </h1>
        <p className="mt-6 text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex justify-center">
          <Button href="/" arrow>
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
