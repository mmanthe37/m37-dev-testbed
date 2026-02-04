import React from 'react';
import Layout from '@/components/Layout';
import { azureSubscriptions, azureResources } from '@/data/profile';

export default function Azure() {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Azure Resources</h1>
          <p className="text-gray-400">
            Monitor and manage your Microsoft Azure cloud infrastructure
          </p>
        </div>

        {/* Subscriptions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Subscriptions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {azureSubscriptions.map(sub => (
              <div key={sub.id} className="card hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{sub.name}</h3>
                    <p className="text-sm text-gray-400 mt-1 font-mono">{sub.subscriptionId}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium border border-green-500/20">
                    {sub.state}
                  </span>
                </div>
                <div className="pt-4 border-t border-[#1e293b]">
                  <a
                    href={`https://portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/${sub.subscriptionId}/overview`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 text-sm font-medium"
                  >
                    Open in Azure Portal →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Resources</h2>
          <div className="card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e293b]">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Location</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Resource Group</th>
                </tr>
              </thead>
              <tbody>
                {azureResources.map(resource => (
                  <tr key={resource.id} className="border-b border-[#1e293b] hover:bg-[#1e293b]/50">
                    <td className="py-3 px-4 text-white font-medium">{resource.name}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{resource.type}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{resource.location}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{resource.resourceGroup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="https://portal.azure.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover-lift cursor-pointer bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Azure Portal</h3>
                <p className="text-sm text-gray-400">Open full portal</p>
              </div>
              <span className="text-3xl">🌐</span>
            </div>
          </a>

          <a
            href="https://shell.azure.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover-lift cursor-pointer bg-gradient-to-br from-green-600/20 to-teal-600/20 border-green-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Cloud Shell</h3>
                <p className="text-sm text-gray-400">CLI access</p>
              </div>
              <span className="text-3xl">⚡</span>
            </div>
          </a>

          <a
            href="https://learn.microsoft.com/en-us/azure/"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover-lift cursor-pointer bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Documentation</h3>
                <p className="text-sm text-gray-400">Azure docs</p>
              </div>
              <span className="text-3xl">📚</span>
            </div>
          </a>
        </div>
      </div>
    </Layout>
  );
}
