import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@/config/web3';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {/* We will add ThemeProvider and AuthProvider here later */}
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
};