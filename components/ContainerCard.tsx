export default function ContainerCard({children}: {children: React.ReactNode}) {
  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-800 p-8">
      {children}
    </div>
  );
}
