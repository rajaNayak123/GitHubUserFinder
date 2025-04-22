"use client"

import { useState, useEffect } from "react"
import { Search, Code, Star, Zap, TrendingUp, Github } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UserList } from "../components/UserList.jsx"
import { UserDetails } from "../components/UserDetails.jsx"
import { Pagination } from "@/components/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { FeaturedUsers } from "../components/FeaturedUsers.jsx"
import { SearchSuggestions } from "../components/SearchSuggestions.jsx"

export function GitHubSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10
  const [hasSearched, setHasSearched] = useState(false)

  // Debounce search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setUsers([])
      setTotalCount(0)
      setHasSearched(false)
      return
    }

    const timer = setTimeout(() => {
      fetchUsers(searchQuery, currentPage)
      setHasSearched(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, currentPage])

  const fetchUsers = async (query, page) => {
    if (query.trim() === "") return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=${perPage}`)

      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }

      const data = await response.json()
      setUsers(data.items)
      setTotalCount(data.total_count)
    } catch (err) {
      setError("Error fetching users. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUserSelect = (username) => {
    setSelectedUser(username)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleCloseDetails = () => {
    setSelectedUser(null)
  }

  const handleQuickSearch = (term) => {
    setSearchQuery(term)
  }

  const totalPages = Math.min(Math.ceil(totalCount / perPage), 100) // GitHub API limits to 1000 results (100 pages)

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Banner */}
      <motion.div
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjR6bTAgMjRoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0tNi0yNGgtNHYtMmg0djJ6bTYgMGgtNHYtMmg0djJ6bTYgMGgtNHYtMmg0djJ6bTYgMGgtNHYtMmg0djJ6bS0yNCAwSDE4di0yaDR2MnptLTYgMGgtNHYtMmg0djJ6bS02IDBoLTR2LTJoNHYyem0tNiAwSDZ2LTJoNHYyem0zNi02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjZoMnY0em0wIDI0aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptLTYtMjRoLTR2LTJoNHYyem02IDBoLTR2LTJoNHYyem02IDBoLTR2LTJoNHYyem02IDBoLTR2LTJoNHYyem0tMjQgMEgxOHYtMmg0djJ6bS02IDBoLTR2LTJoNHYyem0tNiAwSDZ2LTJoNHYyeiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Discover GitHub Developers</h2>
            <p className="text-slate-300 mb-4">
              Find talented developers, explore their projects, and connect with the GitHub community
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge
                className="bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                onClick={() => handleQuickSearch("language:javascript")}
              >
                JavaScript
              </Badge>
              <Badge
                className="bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                onClick={() => handleQuickSearch("language:python")}
              >
                Python
              </Badge>
              <Badge
                className="bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                onClick={() => handleQuickSearch("language:react")}
              >
                React
              </Badge>
              <Badge
                className="bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                onClick={() => handleQuickSearch("location:san francisco")}
              >
                San Francisco
              </Badge>
            </div>
          </div>
          <div className="hidden md:block">
            <Github className="h-24 w-24 text-white/80" />
          </div>
        </div>
      </motion.div>

      {/* Search Input */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search GitHub users..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1) // Reset to first page on new search
          }}
          className="pl-10 py-6 text-lg transition-all duration-300 focus:ring-2 focus:ring-primary/50 shadow-md"
        />
      </motion.div>

      {/* Quick Search Categories */}
      {!hasSearched && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { icon: Star, label: "Top Developers", query: "followers:>1000" },
            { icon: Code, label: "JavaScript Devs", query: "language:javascript" },
            { icon: Zap, label: "React Experts", query: "react" },
            { icon: TrendingUp, label: "Trending", query: "created:>2023-01-01" },
          ].map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleQuickSearch(category.query)}
              >
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{category.label}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Featured Users Section (when no search) */}
      {!hasSearched && !loading && <FeaturedUsers onSelectUser={handleUserSelect} />}

      {/* Search Suggestions (when no search) */}
      {!hasSearched && !loading && <SearchSuggestions onSelectSuggestion={handleQuickSearch} />}

      {error && (
        <motion.div
          className="bg-destructive/15 text-destructive p-4 rounded-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}

      {loading ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            ))}
        </motion.div>
      ) : (
        <>
          <AnimatePresence>
            {users.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_3fr]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <UserList users={users} onSelectUser={handleUserSelect} selectedUser={selectedUser} />

                  {totalPages > 1 && (
                    <div className="mt-6">
                      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {selectedUser && (
                    <motion.div
                      key={selectedUser}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <UserDetails username={selectedUser} onClose={handleCloseDetails} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              searchQuery.trim() !== "" && (
                <motion.div
                  className="text-center py-8 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  No users found. Try a different search term.
                </motion.div>
              )
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
