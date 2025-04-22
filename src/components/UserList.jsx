import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ExternalLink } from "lucide-react";

function UserList({ users, onSelectUser, selectedUser }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>
      {users.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          className="transform transition-all duration-200"
        >
          <Card
            className={`transition-all duration-300 hover:shadow-md ${
              selectedUser === user.login ? "border-primary bg-primary/5" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="border-2 border-background shadow-sm">
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
                      className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      GitHub Profile
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <Button
                  variant={selectedUser === user.login ? "default" : "outline"}
                  size="sm"
                  onClick={() => onSelectUser(user.login)}
                  className="transition-all duration-300"
                >
                  {selectedUser === user.login ? "Selected" : "View Details"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
export { UserList };
