import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { processImageWithAI } from "@/utils/imageProcessing";

const premadeDesigns = [
  { 
    id: 1, 
    name: "Floral Embroidered Teal Saree", 
    image: "/lovable-uploads/89bb8383-c2f1-4750-b600-8db4a67cd729.png", 
    price: "$599" 
  },
  { 
    id: 2, 
    name: "Blue Embellished Cape", 
    image: "/lovable-uploads/1e344ff8-9335-4eb2-81fb-4dcb9cd09b41.png", 
    price: "$799" 
  },
  { 
    id: 3, 
    name: "Lavender Embroidered Saree", 
    image: "/lovable-uploads/81779e30-c065-43cc-b8f5-cfce5be3ae11.png", 
    price: "$499" 
  },
  { 
    id: 4, 
    name: "Red Embroidered Drape", 
    image: "/lovable-uploads/f107cf0c-ae81-406f-9165-dda39508fd7a.png", 
    price: "$699" 
  },
  { 
    id: 5, 
    name: "Mauve Embellished Gown", 
    image: "/lovable-uploads/91fe675a-416f-4f1a-b9d4-3402a46f30a2.png", 
    price: "$899" 
  },
  { 
    id: 6, 
    name: "Teal Embroidered Kurta", 
    image: "/lovable-uploads/cc4e60b4-9b9e-405d-a663-a7503b971c5a.png", 
    price: "$399" 
  },
];

export const VirtualTryOn = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [customOrder, setCustomOrder] = useState({
    measurements: "",
    material: "",
    color: "",
    timeframe: "",
    occasion: "",
    designFile: null as string | null,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setProcessedImage(null); // Reset processed image when new image is uploaded
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const processImages = async () => {
    if (!selectedImage || !selectedDesign) {
      toast.error("Please select both an image and a design");
      return;
    }

    setIsProcessing(true);
    try {
      const design = premadeDesigns.find(d => d.id === selectedDesign);
      if (!design) {
        throw new Error("Selected design not found");
      }

      const result = await processImageWithAI(selectedImage, design.image);
      setProcessedImage(result);
    } catch (error) {
      toast.error("Error processing image. Please try again.");
      console.error("Image processing error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCustomDesignUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomOrder(prev => ({ ...prev, designFile: reader.result as string }));
        toast.success("Design file uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitCustomOrder = () => {
    if (!customOrder.designFile) {
      toast.error("Please upload your design file");
      return;
    }
    toast.success("Custom order submitted successfully! We'll contact you soon.");
  };

  const getSelectedDesignImage = () => {
    if (selectedDesign) {
      const design = premadeDesigns.find(d => d.id === selectedDesign);
      return design?.image;
    }
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-playfair text-maroon mb-4">Upload Your Photo</h2>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
            />
            {selectedImage && (
              <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-playfair text-maroon mb-4">Select Design</h2>
            <Tabs defaultValue="premade" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="premade">Premade Designs</TabsTrigger>
                <TabsTrigger value="custom">Custom Design</TabsTrigger>
              </TabsList>
              <TabsContent value="premade">
                <div className="grid grid-cols-2 gap-4">
                  {premadeDesigns.map((design) => (
                    <div
                      key={design.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedDesign === design.id ? 'border-maroon bg-maroon/5' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedDesign(design.id)}
                    >
                      <img 
                        src={design.image} 
                        alt={design.name} 
                        className="w-full h-60 object-contain rounded-md mb-2 bg-gray-50"
                      />
                      <h3 className="font-medium text-gray-900">{design.name}</h3>
                      <p className="text-maroon">{design.price}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="custom">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Design Reference</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomDesignUpload}
                      className="mb-4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Measurements</label>
                    <Textarea
                      placeholder="Enter detailed measurements..."
                      value={customOrder.measurements}
                      onChange={(e) => setCustomOrder(prev => ({ ...prev, measurements: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Material</label>
                      <Input
                        type="text"
                        placeholder="e.g., Silk, Cotton"
                        value={customOrder.material}
                        onChange={(e) => setCustomOrder(prev => ({ ...prev, material: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Color Preference</label>
                      <Input
                        type="text"
                        placeholder="e.g., Royal Blue"
                        value={customOrder.color}
                        onChange={(e) => setCustomOrder(prev => ({ ...prev, color: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
                      <Input
                        type="text"
                        placeholder="e.g., 2 months"
                        value={customOrder.timeframe}
                        onChange={(e) => setCustomOrder(prev => ({ ...prev, timeframe: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
                      <Input
                        type="text"
                        placeholder="e.g., Wedding"
                        value={customOrder.occasion}
                        onChange={(e) => setCustomOrder(prev => ({ ...prev, occasion: e.target.value }))}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleSubmitCustomOrder}
                    className="w-full bg-maroon hover:bg-maroon/90 text-white mt-4"
                  >
                    Submit Custom Order
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-playfair text-maroon mb-4">Garment Preview</h2>
            <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {selectedImage && selectedDesign ? (
                <>
                  {processedImage ? (
                    <img
                      src={processedImage}
                      alt="AI Processed Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Button
                        onClick={processImages}
                        disabled={isProcessing}
                        className="bg-maroon hover:bg-maroon/90 text-white"
                      >
                        {isProcessing ? "Processing..." : "Generate Preview"}
                      </Button>
                      {isProcessing && (
                        <div className="animate-pulse text-gray-500">
                          Processing your image with AI...
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : selectedImage ? (
                <div className="text-center text-gray-500">
                  Please select a design to see the preview
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Upload a photo to see the preview
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-playfair text-maroon mb-4">Customization Options</h2>
            <div className="space-y-4">
              <Button
                onClick={() => toast.info("This feature is coming soon!")}
                className="w-full bg-gold hover:bg-gold/90 text-white"
              >
                Try Different Styles
              </Button>
              <Button
                onClick={() => toast.info("This feature is coming soon!")}
                className="w-full bg-maroon hover:bg-maroon/90 text-white"
              >
                Customize Embroidery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
