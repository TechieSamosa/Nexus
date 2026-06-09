import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0c0b11',
          borderRadius: '50%',
          position: 'relative',
        }}
      >
        {/* Outer Ring */}
        <div
          style={{
            position: 'absolute',
            width: '85%',
            height: '85%',
            borderRadius: '50%',
            border: '2px solid rgba(0, 242, 254, 0.4)',
            boxShadow: '0 0 8px rgba(0, 242, 254, 0.6), inset 0 0 8px rgba(0, 242, 254, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner Core */}
          <div
            style={{
              width: '45%',
              height: '45%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ffffff 0%, #00f2fe 50%, rgba(0, 242, 254, 0.8) 100%)',
              boxShadow: '0 0 12px #00f2fe, 0 0 20px #00f2fe',
              display: 'flex',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
