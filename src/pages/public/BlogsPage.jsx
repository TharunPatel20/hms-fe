import React from "react"
import { Search, Clock, Calendar, ChevronRight } from "lucide-react"
import Navbar from "../../components/layout/Navbar"
import Button from "../../components/common/Button"

// Mock blog data for demonstration
const blogPosts = [
  {
    id: "blog1",
    title:
      "Understanding Heart Health: Tips for a Healthy Cardiovascular System",
    excerpt:
      "Learn about the latest research on heart health and discover practical tips for maintaining a healthy cardiovascular system through diet, exercise, and lifestyle changes.",
    author: "Dr. John Smith",
    authorRole: "Cardiologist",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Heart Health",
    image:
      "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  },
  {
    id: "blog2",
    title: "The Importance of Mental Health in Modern Healthcare",
    excerpt:
      "Explore the growing emphasis on mental health in healthcare and how it impacts overall well-being. This article discusses strategies for maintaining good mental health.",
    author: "Dr. Emily Johnson",
    authorRole: "Psychiatrist",
    date: "2025-01-10",
    readTime: "8 min read",
    category: "Mental Health",
    image:
      "https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  },
  {
    id: "blog3",
    title: "Pediatric Nutrition: Ensuring Healthy Development in Children",
    excerpt:
      "Discover the essential nutrients children need for healthy growth and development. This comprehensive guide provides practical advice for parents on feeding children of all ages.",
    author: "Dr. Michael Chen",
    authorRole: "Pediatrician",
    date: "2025-01-05",
    readTime: "6 min read",
    category: "Pediatrics",
    image:
      "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  },
  {
    id: "blog4",
    title: "Advances in Cancer Treatment: New Hope for Patients",
    excerpt:
      "Learn about the latest breakthroughs in cancer research and treatment options. This article explores innovative therapies that are changing the outlook for cancer patients.",
    author: "Dr. Sarah Williams",
    authorRole: "Oncologist",
    date: "2024-12-28",
    readTime: "10 min read",
    category: "Oncology",
    image:
      "https://images.pexels.com/photos/3952224/pexels-photo-3952224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  },
  {
    id: "blog5",
    title: "COVID-19 Updates: What You Need to Know in 2025",
    excerpt:
      "Stay informed about the current state of COVID-19, including the latest variants, vaccination updates, and public health guidance for staying safe and healthy.",
    author: "Dr. Robert Lee",
    authorRole: "Infectious Disease Specialist",
    date: "2024-12-20",
    readTime: "7 min read",
    category: "Infectious Diseases",
    image:
      "https://images.pexels.com/photos/4031867/pexels-photo-4031867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  }
]

const categories = [
  "All Categories",
  "Heart Health",
  "Mental Health",
  "Pediatrics",
  "Oncology",
  "Infectious Diseases",
  "Nutrition",
  "Women's Health",
  "Men's Health"
]

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState(
    "All Categories"
  )

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "All Categories" ||
      post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-blue-600 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Health & Wellness Blog
          </h1>
          <p className="text-blue-100 text-center mb-8 max-w-3xl mx-auto">
            Explore the latest articles and insights from our medical experts on
            health, wellness, and medical advancements.
          </p>

          <div className="max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        selectedCategory === category
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>

              <hr className="my-6 border-gray-200" />

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Popular Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  COVID-19
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  Heart Health
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  Mental Wellness
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  Nutrition
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  Exercise
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  Sleep
                </span>
              </div>

              <hr className="my-6 border-gray-200" />

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Newsletter
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Subscribe to our newsletter to get the latest health tips and
                articles.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button variant="primary" fullWidth>
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === "All Categories"
                    ? "Recent Articles"
                    : selectedCategory}
                </h2>
                <div>
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <p className="text-gray-600">
                  No articles found matching your search criteria.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Featured Article */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <img
                        src={filteredPosts[0].image}
                        alt={filteredPosts[0].title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="md:w-3/5 p-6">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm mb-3">
                        {filteredPosts[0].category}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        {filteredPosts[0].title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {filteredPosts[0].excerpt}
                      </p>
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <p className="font-medium text-gray-800">
                            {filteredPosts[0].author}
                          </p>
                          <p className="text-sm text-gray-600">
                            {filteredPosts[0].authorRole}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar size={16} className="mr-1" />
                        <span className="mr-4">
                          {new Date(filteredPosts[0].date).toLocaleDateString()}
                        </span>
                        <Clock size={16} className="mr-1" />
                        <span>{filteredPosts[0].readTime}</span>
                      </div>
                      <Button variant="outline">Read Article</Button>
                    </div>
                  </div>
                </div>

                {/* Other Articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.slice(1).map(post => (
                    <div
                      key={post.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm mb-3">
                          {post.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar size={16} className="mr-1" />
                          <span className="mr-4">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <Clock size={16} className="mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                        <a
                          href="#"
                          className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors"
                        >
                          Read More <ChevronRight size={16} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button variant="outline">Load More Articles</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogsPage
