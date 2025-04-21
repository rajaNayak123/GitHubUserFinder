import { ExternalLink, Users, GitFork, BookOpen } from "lucide-react";

function UserDetails({ user }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 pb-0 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={user.avatar_url || "/placeholder.svg"}
              alt={`${user.login}'s avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
            <p className="text-gray-500 mb-2">@{user.login}</p>
            <button
              className="mt-2 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
              onClick={() => window.open(user.html_url, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on GitHub
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {user.bio && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Bio</h3>
            <p className="text-gray-700">{user.bio}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <BookOpen className="h-6 w-6 text-gray-700 mb-2" />
            <span className="text-2xl font-bold">{user.public_repos}</span>
            <span className="text-gray-500">Repositories</span>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <Users className="h-6 w-6 text-gray-700 mb-2" />
            <span className="text-2xl font-bold">{user.followers}</span>
            <span className="text-gray-500">Followers</span>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <GitFork className="h-6 w-6 text-gray-700 mb-2" />
            <span className="text-2xl font-bold">{user.following}</span>
            <span className="text-gray-500">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
