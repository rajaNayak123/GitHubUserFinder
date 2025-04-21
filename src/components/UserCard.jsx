import { ExternalLink } from "lucide-react";

function UserCard({ user, onSelect }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center p-4">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img
            src={user.avatar_url || "/placeholder.svg"}
            alt={`${user.login}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-medium text-lg mb-2">{user.login}</h3>
        <div className="flex gap-2 mt-2">
          <button
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={onSelect}
          >
            View Profile
          </button>
          <button
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
            onClick={() => window.open(user.html_url, "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
