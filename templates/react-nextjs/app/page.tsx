export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Next.js! 🚀
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Get started by editing <code className="bg-gray-100 px-2 py-1 rounded">app/page.tsx</code>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <a
            href="https://nextjs.org/docs"
            className="p-6 border border-gray-300 rounded-lg hover:border-primary-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-xl font-semibold mb-2">
              Documentation →
            </h2>
            <p className="text-gray-600">
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="p-6 border border-gray-300 rounded-lg hover:border-primary-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-xl font-semibold mb-2">
              Learn →
            </h2>
            <p className="text-gray-600">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js"
            className="p-6 border border-gray-300 rounded-lg hover:border-primary-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-xl font-semibold mb-2">
              Templates →
            </h2>
            <p className="text-gray-600">
              Explore starter templates for Next.js.
            </p>
          </a>

          <a
            href="https://vercel.com/new"
            className="p-6 border border-gray-300 rounded-lg hover:border-primary-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-xl font-semibold mb-2">
              Deploy →
            </h2>
            <p className="text-gray-600">
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </a>
        </div>
      </div>
    </main>
  )
}
