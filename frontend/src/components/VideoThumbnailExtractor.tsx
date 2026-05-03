interface VideoThumbnailExtractorProps {
  videoUrl: string;
  timeOffset?: number; // seconds, default 2
  quality?: number; // 0-1, default 0.8
  onThumbnailReady?: (dataUrl: string) => void;
  className?: string;
  alt?: string;
}

/**
 * Extract thumbnail dari video URL menggunakan Canvas API
 * Cocok untuk video yang sudah tersimpan di Strapi
 * 
 * Usage:
 * <VideoThumbnailExtractor 
 *   videoUrl="http://localhost:1337/uploads/video.mp4"
 *   timeOffset={2}
 *   onThumbnailReady={(thumb) => console.log(thumb)}
 * />
 */
/*
export function VideoThumbnailExtractor({
  videoUrl,
  timeOffset = 2,
  quality = 0.8,
  onThumbnailReady,
  className = 'w-full h-full object-cover',
  alt = 'Video thumbnail'
}: VideoThumbnailExtractorProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!videoUrl) {
      setError('No video URL provided');
      setIsLoading(false);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      setError('Video or canvas ref not available');
      setIsLoading(false);
      return;
    }

    try {
      // Set CORS untuk video dari Strapi
      video.crossOrigin = 'anonymous';
      video.src = videoUrl;
      video.preload = 'metadata';

      // Step 1: Metadata loaded
      const handleLoadedMetadata = () => {
        console.log('Video metadata loaded:', {
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
        });
        
        // Seek to offset time
        video.currentTime = Math.min(timeOffset, video.duration - 0.5);
      };

      // Step 2: Frame extracted
      const handleSeeked = () => {
        try {
          const context = canvas.getContext('2d');
          if (!context) {
            throw new Error('Failed to get canvas context');
          }

          // Set canvas size to video dimensions
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Draw video frame to canvas
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Convert canvas to image
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          
          setThumbnail(dataUrl);
          setIsLoading(false);
          setError(null);

          if (onThumbnailReady) {
            onThumbnailReady(dataUrl);
          }

          console.log('Thumbnail extracted successfully');

          // Cleanup
          cleanup();
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to extract thumbnail';
          setError(message);
          setIsLoading(false);
          console.error('Thumbnail extraction error:', err);
        }
      };

      // Error handling
      const handleError = (e: Event) => {
        const errorMsg = (e.target as HTMLVideoElement).error?.message || 'Failed to load video';
        setError(errorMsg);
        setIsLoading(false);
        console.error('Video loading error:', errorMsg);
      };

      // Cleanup listeners
      const cleanup = () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('seeked', handleSeeked);
        video.removeEventListener('error', handleError);
      };

      // Add listeners
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('seeked', handleSeeked);
      video.addEventListener('error', handleError);

      // Cleanup on unmount
      return cleanup;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      setIsLoading(false);
      console.error('Setup error:', err);
    }
  }, [videoUrl, timeOffset, quality, onThumbnailReady]);

  // Show error state
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-slate-800 ${className}`}>
        <div className="text-center text-slate-400 text-sm">
          <p>Cannot load thumbnail</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading && !thumbnail) {
    return (
      <div className={`flex items-center justify-center bg-slate-800 animate-pulse ${className}`}>
        <div className="text-slate-500 text-sm">Loading...</div>
      </div>
    );
  }

  // Show thumbnail
  return (
    <>
      {thumbnail && (
        <img
          src={thumbnail}
          alt={alt}
          className={className}
        />
      )}
      
      {/* Hidden video/canvas for extraction /}
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  );
}
*/

interface VideoThumbnailProps {
  videoUrl: string;
  timeOffset?: number; // detik ke berapa thumbnail diambil
  className?: string;
  poster?: string; // fallback jika ingin pakai gambar static
}

export function VideoThumbnailExtractor({
  videoUrl,
  timeOffset = 0.1,
  className = 'w-full h-full object-cover',
  poster,
}: VideoThumbnailProps) {
  
  if (!videoUrl) return null;

  // Append fragment jika belum ada
  const videoSrc = videoUrl.includes('#t=') 
    ? videoUrl 
    : `${videoUrl}#t=${timeOffset}`;

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      <video
        className="w-full h-full object-cover pointer-events-none"
        preload="metadata"
        poster={poster}
        muted
        //playsInline
        // 2. JANGAN tambahkan atribut 'controls' di sini
        // 3. Tambahkan inline styles untuk memastikan UI browser sembunyi
        style={{ userSelect: 'none' }}
      >
        <source src={videoSrc}/>
        {/* Fallback jika browser sangat jadul */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
