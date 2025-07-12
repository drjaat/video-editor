/**
 * Utility functions for importing media into the editor
 */

interface ImportedMedia {
  id: string;
  type: 'video' | 'image' | 'audio';
  url: string;
  name: string;
  duration?: number;
  width?: number;
  height?: number;
  metadata?: Record<string, any>;
}

/**
 * Open a file picker and import selected media
 * @param options - Import options
 * @returns Promise with the imported media information
 */
export async function importMedia(
  options: {
    acceptedTypes?: string[];
    multiple?: boolean;
  } = {}
): Promise<ImportedMedia[]> {
  const { acceptedTypes = ['video/*', 'image/*', 'audio/*'], multiple = false } = options;
  
  return new Promise((resolve, reject) => {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = acceptedTypes.join(',');
    fileInput.multiple = multiple;
    
    fileInput.onchange = async (event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      
      if (!files || files.length === 0) {
        resolve([]);
        return;
      }
      
      try {
        const mediaItems: ImportedMedia[] = [];
        
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileType = file.type.split('/')[0] as 'video' | 'image' | 'audio';
          const objectUrl = URL.createObjectURL(file);
          
          // Generate a unique ID
          const id = `media_${Date.now()}_${i}`;
          
          mediaItems.push({
            id,
            type: fileType,
            url: objectUrl,
            name: file.name,
            metadata: {
              size: file.size,
              lastModified: file.lastModified,
            }
          });
          
          // If it's a video or audio, get duration
          if (fileType === 'video' || fileType === 'audio') {
            const element = document.createElement(fileType);
            element.src = objectUrl;
            
            await new Promise<void>((resolveLoad) => {
              element.onloadedmetadata = () => {
                if (mediaItems[i]) {
                  mediaItems[i].duration = element.duration;
                  if (fileType === 'video') {
                    // Use type assertion to access video-specific properties
                    const videoElement = element as HTMLVideoElement;
                    mediaItems[i].width = videoElement.videoWidth;
                    mediaItems[i].height = videoElement.videoHeight;
                  }
                }
                resolveLoad();
              };
              element.onerror = () => {
                console.error(`Error loading ${fileType} metadata`);
                resolveLoad();
              };
            });
          }
        }
        
        resolve(mediaItems);
      } catch (error) {
        console.error('Error importing media:', error);
        reject(error);
      }
    };
    
    // Trigger file selection dialog
    fileInput.click();
  });
}
