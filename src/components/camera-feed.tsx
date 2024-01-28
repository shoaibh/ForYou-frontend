import { forwardRef, useEffect } from 'react';

export const CameraFeed= forwardRef<HTMLVideoElement>((props, ref) => {
  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
              // @ts-ignore
              if (ref && ref.current) {
                  // @ts-ignore
                  ref.current.srcObject = stream;
              }
        })
        .catch(console.error);
    }
  }, [ref]);

  return <video ref={ref} autoPlay className='h-full transform scale-150' />;
});

