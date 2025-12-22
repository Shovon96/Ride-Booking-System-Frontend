export const NewsletterSection = () => {
  return (
    <div className="mx-auto pt-16 pb-12 bg-gray-900">
      <strong className="block text-center text-xl font-bold text-white sm:text-3xl">
        Want us to email you with the latest blockbuster news?
      </strong>

      <form className="mt-6 mx-auto max-w-md">
        <div className="relative max-w-lg">
          <label className="sr-only" htmlFor="email"> Email </label>

          <input
            className="w-full rounded-full border border-input bg-muted p-4 pe-32 text-sm font-medium text-foreground placeholder:text-muted-foreground"
            id="email"
            type="email"
            placeholder="john@doe.com"
          />

          <button
            className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};
