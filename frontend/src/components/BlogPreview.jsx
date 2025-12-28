import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../mockData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPreview = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Latest Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Varanasi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the stories, culture, and spiritual essence of the eternal city
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-orange-600 text-white border-0">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-gray-900 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {post.date}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  Read More
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/blog">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8"
            >
              View All Articles
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;