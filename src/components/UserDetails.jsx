import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Skeleton } from "../components/ui/skeleton"
import { ExternalLink, Users, GitFork, X, MapPin, Building, Calendar } from "lucide-react"

function UserDetails({ username, onClose }) {
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUserDetails = async () => {
    if (!username) {
      setError("Username is missing")
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const url = `https://api.github.com/users/${username}`
      console.log("Fetching:", url)

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setUserDetails(data)
    } catch (err) {
      console.error("Fetch error:", err)
      setError(err.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [username])

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !userDetails) {
    return (
      <Card>
        <CardContent className="p-6 text-center space-y-4">
          <p className="text-destructive">{error || "Failed to load user details"}</p>
          <div className="flex justify-center gap-2">
            <Button onClick={fetchUserDetails}>Retry</Button>
            <Button onClick={onClose} variant="outline">Close</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-fit overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/50">
        <CardTitle className="text-xl">{userDetails.name || userDetails.login}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-background/80">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Avatar className="h-24 w-24 border-4 border-background shadow-md">
              <AvatarImage src={userDetails.avatar_url || "/placeholder.svg"} alt={userDetails.login} />
              <AvatarFallback>{userDetails.login.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="space-y-2">
            <div>
              <h3 className="font-medium text-lg">@{userDetails.login}</h3>
              {userDetails.bio && <p className="text-muted-foreground">{userDetails.bio}</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              {userDetails.location && (
                <Badge variant="outline" className="flex items-center gap-1 bg-background">
                  <MapPin className="h-3 w-3" />
                  {userDetails.location}
                </Badge>
              )}
              {userDetails.company && (
                <Badge variant="outline" className="flex items-center gap-1 bg-background">
                  <Building className="h-3 w-3" />
                  {userDetails.company}
                </Badge>
              )}
              <Badge variant="outline" className="flex items-center gap-1 bg-background">
                <Calendar className="h-3 w-3" />
                Joined {formatDate(userDetails.created_at)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: GitFork, label: "Repositories", value: userDetails.public_repos },
            { icon: Users, label: "Followers", value: userDetails.followers },
            { icon: Users, label: "Following", value: userDetails.following },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-4 flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted">
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button
            variant="default"
            className="w-full sm:w-auto group"
            onClick={() => window.open(userDetails.html_url, "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
            View GitHub Profile
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}

export { UserDetails }
