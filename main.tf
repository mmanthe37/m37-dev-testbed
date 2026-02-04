terraform {
  required_providers {
    azurerm = {
      source  = "azurerm"
      version = "4.47.0"
    }
  }
}
provider "azurerm" {
  features {}
}
resource "azurerm_api_connection" "res-0" {
  display_name        = "mmanthe37@live.seminolestate.edu"
  managed_api_id      = "/subscriptions/aef65f68-df04-4e66-88a0-c7764d32b686/providers/Microsoft.Web/locations/eastus2/managedApis/arm"
  name                = "arm"
  parameter_values    = {}
  resource_group_name = "m37-student-subscription"
  tags                = {}
}
