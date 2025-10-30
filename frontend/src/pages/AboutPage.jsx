import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Vibe Commerce</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Your premier destination for high-quality products at unbeatable prices. 
              We're committed to providing an exceptional shopping experience.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2023, Vibe Commerce started with a simple mission: to make quality products 
                accessible to everyone. What began as a small online store has grown into a trusted 
                platform serving thousands of customers worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We believe that shopping should be more than just a transaction. It should be an 
                experience that brings joy, convenience, and value to your life. That's why we've 
                carefully curated our product selection and built a platform that prioritizes 
                user experience above all else.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" 
                alt="Our team" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality First</h3>
              <p className="text-gray-600">
                We carefully select every product to ensure it meets our high standards 
                for quality, durability, and value.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast Delivery</h3>
              <p className="text-gray-600">
                Lightning-fast shipping and delivery so you get your products when you need them, 
                without the wait.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Love</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're here to help with friendly, 
                responsive customer service every step of the way.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">100K+</div>
              <div className="text-gray-600">Products Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>

        {/* Monthly Sales Chart */}
        <div className="mb-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Monthly Sales Growth</h2>
          <div className="flex items-end justify-between h-64 gap-4">
            {[
              { month: 'Jan', sales: 12500, height: '40%' },
              { month: 'Feb', sales: 15800, height: '50%' },
              { month: 'Mar', sales: 18200, height: '58%' },
              { month: 'Apr', sales: 21000, height: '67%' },
              { month: 'May', sales: 24500, height: '78%' },
              { month: 'Jun', sales: 28000, height: '89%' },
              { month: 'Jul', sales: 31400, height: '100%' },
            ].map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all hover:opacity-80" 
                     style={{ height: data.height }}>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-700">{data.month}</div>
                <div className="text-xs text-gray-500">${(data.sales / 1000).toFixed(1)}K</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-6">
            📈 We've seen <span className="font-bold text-primary-600">151% growth</span> in sales over the past 7 months!
          </p>
        </div>

        {/* Customer Reviews */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Verified Buyer',
                rating: 5,
                review: 'Amazing products and super fast delivery! The quality exceeded my expectations. I\'ve already recommended Vibe Commerce to all my friends.',
                avatar: 'https://i.pravatar.cc/150?img=1',
                product: 'iPhone 15 Pro Max'
              },
              {
                name: 'Michael Chen',
                role: 'Regular Customer',
                rating: 5,
                review: 'Best online shopping experience I\'ve ever had. The customer service is outstanding and the prices are unbeatable. Will definitely shop here again!',
                avatar: 'https://i.pravatar.cc/150?img=12',
                product: 'Wireless Headphones'
              },
              {
                name: 'Emily Davis',
                role: 'Fashion Enthusiast',
                rating: 5,
                review: 'Love the variety of products available! The website is easy to navigate and checkout was seamless. Got my order within 2 days. Highly recommend!',
                avatar: 'https://i.pravatar.cc/150?img=5',
                product: 'Designer Handbag'
              },
              {
                name: 'David Rodriguez',
                role: 'Tech Lover',
                rating: 5,
                review: 'Found exactly what I was looking for at a great price. The product descriptions are accurate and helpful. Five stars all the way!',
                avatar: 'https://i.pravatar.cc/150?img=8',
                product: 'Smart Watch'
              },
              {
                name: 'Jessica Williams',
                role: 'Home Decor Fan',
                rating: 5,
                review: 'Excellent quality products and fantastic customer support. They answered all my questions promptly. This is now my go-to online store!',
                avatar: 'https://i.pravatar.cc/150?img=9',
                product: 'Stainless Steel Water Bottle'
              },
              {
                name: 'James Anderson',
                role: 'Fitness Enthusiast',
                rating: 5,
                review: 'Great prices, fast shipping, and quality products. What more could you ask for? Vibe Commerce has earned a loyal customer in me!',
                avatar: 'https://i.pravatar.cc/150?img=14',
                product: 'Organic Cotton T-Shirt'
              }
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-3">{review.review}</p>
                <div className="text-sm text-primary-600 font-medium">
                  Purchased: {review.product}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of satisfied customers and discover amazing deals today!
          </p>
          <Link
            to="/"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
