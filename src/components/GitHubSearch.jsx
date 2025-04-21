import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import UserDetails from "./UserDetails";
import SearchBar from "./SearchBar";
import { Loader2 } from "lucide-react";

function GitHubSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchQuery.trim() === "") {
        setUsers([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${searchQuery}`
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.items || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching users"
        );
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchUsers();
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const fetchUserDetails = async (username) => {
    setDetailsLoading(true);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      setSelectedUser(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching user details"
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleUserSelect = (username) => {
    fetchUserDetails(username);
  };

  const handleBackToResults = () => {
    setSelectedUser(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!selectedUser && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search GitHub users..."
          />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center my-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onSelect={() => handleUserSelect(user.login)}
                />
              ))}
            </div>
          )}

          {!loading && searchQuery && users.length === 0 && !error && (
            <p className="text-center text-gray-500 my-8">
              No users found matching "{searchQuery}"
            </p>
          )}
        </>
      )}

      {selectedUser && (
        <div>
          <button
            onClick={handleBackToResults}
            className="mb-4 text-gray-600 hover:text-gray-900 flex items-center"
          >
            ← Back to search results
          </button>

          {detailsLoading ? (
            <div className="flex justify-center my-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : (
            <UserDetails user={selectedUser} />
          )}
        </div>
      )}
    </div>
  );
}

export default GitHubSearch;
