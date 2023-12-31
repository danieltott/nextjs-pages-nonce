import { NonceContext } from './_app';
import { useContext } from 'react';

export default function Home() {
  const nonce = useContext(NonceContext);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">
        Index{' '}
        <small>
          Nonce: <code>{nonce}</code>
        </small>
      </h1>
    </div>
  );
}
