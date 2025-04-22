import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Search, TrendingUp, Code, MapPin, Building } from "lucide-react";

 function SearchSuggestions({ onSelectSuggestion }) {
  const suggestions = [
    {
      category: "Popular Searches",
      icon: TrendingUp,
      items: [
        {
          label: "Top JavaScript Developers",
          query: "language:javascript followers:>1000",
        },
        { label: "React Experts", query: "react followers:>500" },
        { label: "Open Source Contributors", query: "type:user repos:>10" },
      ],
    },
    {
      category: "By Location",
      icon: MapPin,
      items: [
        {
          label: "Developers in San Francisco",
          query: 'location:"san francisco"',
        },
        { label: "Developers in New York", query: 'location:"new york"' },
        { label: "Developers in London", query: "location:london" },
      ],
    },
    {
      category: "By Company",
      icon: Building,
      items: [
        { label: "Google Engineers", query: "company:google" },
        { label: "Microsoft Engineers", query: "company:microsoft" },
        { label: "Facebook Engineers", query: "company:facebook" },
      ],
    },
    {
      category: "By Language",
      icon: Code,
      items: [
        { label: "Python Developers", query: "language:python" },
        { label: "TypeScript Developers", query: "language:typescript" },
        { label: "Rust Developers", query: "language:rust" },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Suggested Searches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestions.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                <div className="flex items-center gap-2 font-medium text-sm">
                  <group.icon className="h-4 w-4 text-muted-foreground" />
                  {group.category}
                </div>
                <div className="space-y-2">
                  {group.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm font-normal hover:bg-muted/50 h-auto py-2"
                        onClick={() => onSelectSuggestion(item.query)}
                      >
                        {item.label}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
export {SearchSuggestions}