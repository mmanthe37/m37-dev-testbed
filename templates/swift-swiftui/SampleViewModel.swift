import Foundation
import SwiftUI

@MainActor
class SampleViewModel: ObservableObject {
    @Published var items: [SampleModel] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    init() {
        loadSampleData()
    }
    
    func loadSampleData() {
        items = [
            SampleModel(title: "First Item", description: "This is the first sample item"),
            SampleModel(title: "Second Item", description: "This is the second sample item"),
            SampleModel(title: "Third Item", description: "This is the third sample item")
        ]
    }
    
    func fetchData() async {
        isLoading = true
        errorMessage = nil
        
        do {
            // Simulate network call
            try await Task.sleep(nanoseconds: 1_000_000_000)
            
            // Update items
            loadSampleData()
            isLoading = false
        } catch {
            errorMessage = error.localizedDescription
            isLoading = false
        }
    }
    
    func addItem(title: String, description: String) {
        let newItem = SampleModel(title: title, description: description)
        items.append(newItem)
    }
    
    func deleteItem(at offsets: IndexSet) {
        items.remove(atOffsets: offsets)
    }
}
