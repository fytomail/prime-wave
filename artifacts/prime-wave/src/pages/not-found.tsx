export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-display font-bold text-primary">404</h1>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <a href="/" className="text-primary hover:underline font-medium">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}
