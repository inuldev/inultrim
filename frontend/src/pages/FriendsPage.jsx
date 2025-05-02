import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon, UsersIcon } from "lucide-react";

import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // Filter friends based on search query
  const filteredFriends = friends.filter((friend) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      friend.fullName.toLowerCase().includes(query) ||
      friend.nativeLanguage.toLowerCase().includes(query) ||
      friend.learningLanguage.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto">
      <div className="container mx-auto space-y-6 h-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <UsersIcon className="size-6 text-primary" />
            Your Friends
          </h2>

          {/* Search bar */}
          <div className="relative w-full sm:w-64 md:w-80">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon className="size-4 text-base-content/50" />
            </div>
            <input
              type="text"
              className="input input-bordered w-full ps-10"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : filteredFriends.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">
              No matching friends found
            </h3>
            <p className="text-base-content/70">
              Try a different search term or clear your search
            </p>
            <button
              className="btn btn-outline btn-sm mt-4"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-base-content/70">
                Showing {filteredFriends.length} of {friends.length} friends
              </p>
              {searchQuery && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setSearchQuery("")}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFriends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
