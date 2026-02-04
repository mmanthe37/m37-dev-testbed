import { useAccount, useConnect, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
// STUB: import { api } from '@/api';

export function LoginPage() {
  const { address, chainId, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { signMessageAsync } = useSignMessage();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleWeb3Login = async () => {
    try {
      if (!isConnected) {
        // For simplicity, we're connecting with the first available connector (e.g., MetaMask).
        const connector = connectors[0];
        if (connector) {
          await connect({ connector });
        }
        return; // The useEffect will handle the login after connection.
      }

      // 1. Get nonce from our backend
      // const nonce = await api.get('/auth/siwe/nonce'); STUB
      const nonce = "stub-nonce-from-backend"; // STUB

      // 2. Create SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the Gear AI app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });

      // 3. Sign the message
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // 4. Verify signature with the backend
      // const { data } = await api.post('/auth/siwe/verify', { message, signature }); STUB
      
      // STUBBED RESPONSE
      const data = { 
        token: 'stub-jwt-from-web3-login', 
        user: { id: 'user-web3-123', walletAddress: address, tier: 'free' } 
      };

      // 5. Update global state
      login(data.user, data.token);
      navigate('/dashboard');

    } catch (error) {
      console.error('SIWE Login Failed:', error);
      // Handle error display to the user
    }
  };
  
  // This effect triggers the login process once a wallet is connected.
  useEffect(() => {
    if (isConnected && address) {
      handleWeb3Login();
    }
  }, [isConnected, address]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 border border-gray-700 rounded-lg shadow-lg bg-gray-800 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Gear AI</h1>
        <p className="text-center text-gray-400 mb-8">Your Car's Digital Twin</p>
        
        {/* Web2 Login Form would go here */}
        <div className="mb-6">
          <h2 className="text-xl text-center">Web2 Login (Coming Soon)</h2>
        </div>

        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400">Or</span>
            <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {/* Web3 Login */}
        <button
          onClick={handleWeb3Login}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        >
          {isConnected ? 'Sign In With Your Wallet' : 'Connect Wallet'}
        </button>
        {address && <p className="text-center mt-4 text-sm text-gray-500">Connected: {`${address.slice(0, 6)}...${address.slice(-4)}`}</p>}
      </div>
    </div>
  );
}