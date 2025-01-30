export const processImageWithAI = async (userImage: string, designImage: string): Promise<string> => {
  try {
    const response = await fetch('/api/process-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userImage,
        designImage,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to process image');
    }

    const data = await response.json();
    return data.processedImage;
  } catch (error) {
    console.error('Error in processImageWithAI:', error);
    throw error;
  }
};