import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { ExternalLink } from "lucide-react";

function FeaturedUsers({ onSelectUser }) {
  const [featuredUsers, setFeaturedUsers] = useState([]);

  useEffect(() => {
    const customUsers = [
      {
        id: "153702745",
        login: "rajaNayak123",
        avatar_url: "https://avatars.githubusercontent.com/u/153702745?v=4",
        html_url: "https://github.com/rajaNayak123",
      },
      {
        id: "153702744",
        login: "PiyushPanwarFST",
        avatar_url: "https://avatars.githubusercontent.com/u/153702744?v=4",
        html_url: "https://github.com/PiyushPanwarFST",
      },
      {
        id: "110075716",
        login: "rishavtarway",
        avatar_url: "https://avatars.githubusercontent.com/u/110075716?v=4",
        html_url: "https://github.com/rishavtarway",
      },
      {
        id: "152836307",
        login: "avinashkrsingh01",
        avatar_url: "https://avatars.githubusercontent.com/u/152836307?v=4",
        html_url: "https://github.com/avinashkrsingh01",
      },
    ];

    setFeaturedUsers(customUsers);
  }, []);

  if (featuredUsers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Featured Developers</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="border border-muted">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          Featured Developers
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {featuredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="border border-muted overflow-hidden relative">
              {user.login === "rajaNayak123" && (
                <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full z-10">
                  You
                </span>
              )}
              <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                <Avatar className="h-16 w-16 border-2 border-background shadow-md">
                  <AvatarImage
                    src={user.avatar_url || "/placeholder.svg"}
                    alt={user.login}
                  />
                  <AvatarFallback>
                    {user.login.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{user.login}</h3>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground flex items-center justify-center gap-1 hover:text-primary transition-colors"
                  >
                    GitHub Profile
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onSelectUser(user.login)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

export { FeaturedUsers };
