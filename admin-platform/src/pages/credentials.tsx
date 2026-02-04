import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { apiCredentials } from '@/data/profile';

export default function Credentials() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const toggleKeyVisibility = (name: string) => {
    setShowKeys(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'apple': return '🍎';
      case 'google cloud': return '☁️';
      case 'microsoft azure': return '⚡';
      case 'github': return '🐙';
      case 'coinbase': return '₿';
      case 'openai': return '🤖';
      case 'supabase': return '🗄️';
      default: return '🔑';
    }
  };

  const getDaysUntilRotation = (lastRotated?: string) => {
    if (!lastRotated) return null;
    const rotationDate = new Date(lastRotated);
    const nextRotation = new Date(rotationDate);
    nextRotation.setDate(nextRotation.getDate() + 90); // 90 days rotation policy
    const today = new Date();
    const daysLeft = Math.floor((nextRotation.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const getRotationStatus = (daysLeft: number | null) => {
    if (daysLeft === null) return { color: 'bg-gray-500/10 text-gray-500 border-gray-500/20', text: 'N/A' };
    if (daysLeft < 0) return { color: 'bg-red-500/10 text-red-500 border-red-500/20', text: 'Expired' };
    if (daysLeft < 14) return { color: 'bg-orange-500/10 text-orange-500 border-orange-500/20', text: `${daysLeft}d left` };
    return { color: 'bg-green-500/10 text-green-500 border-green-500/20', text: `${daysLeft}d left` };
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">API Credentials</h1>
          <p className="text-gray-400">
            Manage your API keys, tokens, and service credentials securely
          </p>
        </div>

        {/* Security Notice */}
        <div className="card bg-yellow-500/10 border-yellow-500/30 mb-8">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-lg font-bold text-yellow-500 mb-1">Security Notice</h3>
              <p className="text-sm text-gray-300">
                This dashboard shows which credentials you have configured. Actual keys are stored securely and never displayed.
                Rotate your credentials regularly and never commit them to version control.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <p className="text-gray-400 text-sm">Total Credentials</p>
            <p className="text-3xl font-bold text-white mt-2">{apiCredentials.length}</p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">Active</p>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {apiCredentials.filter(c => c.hasKey).length}
            </p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">Need Rotation</p>
            <p className="text-3xl font-bold text-orange-500 mt-2">
              {apiCredentials.filter(c => {
                const days = getDaysUntilRotation(c.lastRotated);
                return days !== null && days < 14;
              }).length}
            </p>
          </div>
          <div className="card">
            <p className="text-gray-400 text-sm">Platforms</p>
            <p className="text-3xl font-bold text-primary-500 mt-2">
              {new Set(apiCredentials.map(c => c.platform)).size}
            </p>
          </div>
        </div>

        {/* Credentials List */}
        <div className="space-y-4">
          {apiCredentials.map(credential => {
            const daysLeft = getDaysUntilRotation(credential.lastRotated);
            const status = getRotationStatus(daysLeft);

            return (
              <div key={credential.name} className="card hover-lift">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <span className="text-4xl">{getPlatformIcon(credential.platform)}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{credential.name}</h3>
                        {credential.hasKey && (
                          <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-medium border border-green-500/20">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{credential.platform} • {credential.type}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        {credential.lastRotated && (
                          <div>
                            Last rotated: {new Date(credential.lastRotated).toLocaleDateString()}
                          </div>
                        )}
                        {credential.expiresAt && (
                          <div>
                            Expires: {new Date(credential.expiresAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded border ${status.color}`}>
                      {status.text}
                    </span>
                    <button
                      onClick={() => toggleKeyVisibility(credential.name)}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded text-sm font-medium transition"
                    >
                      {showKeys[credential.name] ? 'Hide' : 'Show'} Key
                    </button>
                  </div>
                </div>

                {showKeys[credential.name] && (
                  <div className="mt-4 pt-4 border-t border-[#1e293b]">
                    <div className="bg-[#0a0e1a] rounded p-4">
                      <p className="text-xs text-gray-400 mb-2">API Key:</p>
                      <p className="font-mono text-sm text-gray-300">
                        {'•'.repeat(32)} (Hidden for security)
                      </p>
                      <p className="text-xs text-yellow-500 mt-2">
                        ⚠️ Never share your actual API keys
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Best Practices */}
        <div className="card mt-8 bg-primary-500/10 border-primary-500/30">
          <h3 className="text-lg font-bold text-white mb-4">🔒 Security Best Practices</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Rotate credentials every 90 days
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Use environment variables, never hardcode keys
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Enable MFA on all platforms
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Use Azure Key Vault or similar for production
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Monitor API usage for anomalies
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
