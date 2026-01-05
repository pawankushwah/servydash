export default function DashboardBlogs() {
  const dummyBlogs = [
    {
      title: "How to Grow Your Service Business",
      summary: "Tips and strategies for scaling your digital services.",
      author: "Jane Doe",
      date: "2026-01-01",
    },
    {
      title: "Top 5 Mistakes Service Providers Make",
      summary: "Avoid these common pitfalls to succeed in the marketplace.",
      author: "John Smith",
      date: "2025-12-15",
    },
    {
      title: "Marketing Your Services Online",
      summary: "A guide to effective online marketing for service businesses.",
      author: "Alex Lee",
      date: "2025-11-20",
    },
  ];
  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Blogs</h1>
      <div className="space-y-6">
        {dummyBlogs.map((blog, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">{blog.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{blog.summary}</p>
            <div className="flex justify-between text-xs text-gray-400">
              <span>By {blog.author}</span>
              <span>{blog.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
