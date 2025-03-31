import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Emma Johnson",
    role: "Home Chef",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    content: "This recipe app has transformed how I cook. The meal planner is incredibly intuitive, and I love how I can filter recipes based on what I have in my fridge!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Food Blogger",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    content: "As someone who reviews recipes for a living, I'm impressed by the detail and accuracy of the recipes here. The nutrition calculator is a game-changer!",
    rating: 5
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "Busy Parent",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    content: "The meal planning feature has saved me so much time. I can plan our family meals for the week in minutes and generate a shopping list instantly.",
    rating: 4
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Fitness Enthusiast",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    content: "I love that I can filter recipes based on nutritional content. It helps me stay on track with my fitness goals while enjoying delicious food.",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000); // Change every 6 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-50 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Join thousands of satisfied users who have transformed their cooking experience with Recipe Hub.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="flex overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`w-full flex-shrink-0 transition-all duration-500 transform ${
                    index === activeIndex 
                      ? 'opacity-100 translate-x-0' 
                      : index < activeIndex 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                  }`}
                  style={{ position: index === activeIndex ? 'relative' : 'absolute' }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name.replace(' ', '+')}&background=random`;
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="text-primary mb-4">
                        <FaQuoteLeft size={24} />
                      </div>
                      <p className="text-gray-700 italic mb-4">{testimonial.content}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-gray-500">{testimonial.role}</p>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < testimonial.rating ? 'opacity-100' : 'opacity-30'} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex ? 'bg-primary w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
