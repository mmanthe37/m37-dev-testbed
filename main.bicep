param connections_arm_name string

resource connections_arm_name_resource 'Microsoft.Web/connections@2016-06-01' = {
  name: connections_arm_name
  location: 'eastus2'
  kind: 'V1'
  properties: {
    displayName: 'mmanthe37@live.seminolestate.edu'
    statuses: [
      {
        status: 'Connected'
      }
    ]
    customParameterValues: {}
    nonSecretParameterValues: {}
    createdTime: '2026-01-24T00:50:33.7376035Z'
    changedTime: '2026-01-24T02:36:53.4659538Z'
    api: {
      name: connections_arm_name
      displayName: 'Azure Resource Manager'
      description: 'Azure Resource Manager exposes the APIs to manage all of your Azure resources.'
      iconUri: 'https://conn-afd-prod-endpoint-bmc9bqahasf3grgk.b01.azurefd.net/v1.0.1751/1.0.1751.4207/${connections_arm_name}/icon.png'
      id: '/subscriptions/aef65f68-df04-4e66-88a0-c7764d32b686/providers/Microsoft.Web/locations/eastus2/managedApis/${connections_arm_name}'
      type: 'Microsoft.Web/locations/managedApis'
    }
    testLinks: []
  }
}
