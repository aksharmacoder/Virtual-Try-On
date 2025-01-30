import { Header } from "@/components/Header";
import { VirtualTryOn } from "@/components/VirtualTryOn";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-playfair text-maroon text-center mb-8">
          Virtual Try-On & Customization Studio
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Experience our exclusive ethnic wear collection virtually. Upload your photo,
          try on different styles, and customize embroidery patterns to create your
          perfect outfit.
        </p>
        <VirtualTryOn />
      </main>
    </div>
  );
};

export default Index;