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
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 18,
          background: '#0c0b11',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00f2fe',
          borderRadius: '20%',
          border: '1px solid #1a1a2e',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          boxShadow: '0 0 10px rgba(0, 242, 254, 0.5)',
        }}
      >
        AK
      </div>
    ),
    {
      ...size,
    }
  );
}
