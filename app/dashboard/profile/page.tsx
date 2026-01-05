export default function ProfilePage() {
  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Profile</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-8 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400 mr-4">
            JD
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">Jane Doe</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">jane.doe@email.com</div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Role:</span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">Service Provider</span>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Store Name:</span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">Jane's Digital Services</span>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Joined:</span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">Jan 1, 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}
