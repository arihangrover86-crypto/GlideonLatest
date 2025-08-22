import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Zap, Award } from "lucide-react";
import type { Product } from "@shared/schema";

// Sample data for BioZyme Range and Preworkout products
const biozymeProducts = [
  {
    id: "biozyme-1",
    name: "BioZyme Ultra Digestive",
    description: "Advanced enzyme complex for optimal nutrient absorption and digestive health.",
    price: "39.99",
    salePrice: "34.99",
    image: "https://images.unsplash.com/photo-1556909202-f91e91ba7e6e?w=400",
    rating: 4.8,
    reviews: 156,
    badge: "Best Seller"
  },
  {
    id: "biozyme-2", 
    name: "BioZyme Recovery Pro",
    description: "Post-workout recovery formula with digestive enzymes and anti-inflammatory compounds.",
    price: "49.99",
    salePrice: "44.99",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400",
    rating: 4.9,
    reviews: 203,
    badge: "New"
  },
  {
    id: "biozyme-3",
    name: "BioZyme Complete",
    description: "All-in-one enzyme blend for maximum bioavailability of proteins, carbs, and fats.",
    price: "59.99",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400",
    rating: 4.7,
    reviews: 98,
    badge: "Premium"
  }
];

const preworkoutProducts = [
  {
    id: "preworkout-1",
    name: "Ignite Pre-Workout",
    description: "High-stimulant pre-workout for explosive energy and focus during intense training.",
    price: "44.99",
    salePrice: "39.99",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    rating: 4.9,
    reviews: 312,
    badge: "Best Seller"
  },
  {
    id: "preworkout-2",
    name: "Pump Matrix",
    description: "Stimulant-free pre-workout focused on muscle pumps and endurance.",
    price: "38.99",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
    rating: 4.6,
    reviews: 89,
    badge: "Caffeine Free"
  },
  {
    id: "preworkout-3",
    name: "Elite Performance",
    description: "Premium pre-workout with nootropics for enhanced mental focus and physical performance.",
    price: "54.99",
    salePrice: "49.99", 
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400",
    rating: 4.8,
    reviews: 167,
    badge: "Premium"
  }
];

const ProductCard = ({ product }: { product: any }) => {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Best Seller": return "bg-glideon-red text-white";
      case "New": return "bg-green-500 text-white";
      case "Premium": return "bg-purple-500 text-white";
      case "Caffeine Free": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className={`absolute top-2 left-2 ${getBadgeColor(product.badge)}`}>
          {product.badge}
        </Badge>
        {product.salePrice && (
          <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
            Save ${(parseFloat(product.price) - parseFloat(product.salePrice)).toFixed(2)}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-glideon-red transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.salePrice ? (
              <>
                <span className="text-xl font-bold text-glideon-red">${product.salePrice}</span>
                <span className="text-sm text-gray-500 line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
            )}
          </div>
          <Button 
            size="sm" 
            className="bg-glideon-red hover:bg-red-700 text-white"
            data-testid={`add-to-cart-${product.id}`}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function InHighDemandSection() {
  const [activeTab, setActiveTab] = useState("biozyme");

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-glideon-red mr-3" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white" data-testid="high-demand-title">
              In High <span className="text-glideon-red">Demand</span>
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-testid="high-demand-description">
            Our most popular products flying off the shelves. Don't miss out on these customer favorites.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger 
              value="biozyme" 
              className="flex items-center space-x-2"
              data-testid="biozyme-tab"
            >
              <Zap className="h-4 w-4" />
              <span>BioZyme Range</span>
            </TabsTrigger>
            <TabsTrigger 
              value="preworkout" 
              className="flex items-center space-x-2"
              data-testid="preworkout-tab"
            >
              <Award className="h-4 w-4" />
              <span>Pre-Workout</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="biozyme" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {biozymeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preworkout" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {preworkoutProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-glideon-red hover:bg-red-700 text-white font-semibold px-8 py-3"
            onClick={() => window.location.href = "/products"}
            data-testid="view-all-products"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}