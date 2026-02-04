import SwiftUI

struct ContentView: View {
    @StateObject private var viewModel = SampleViewModel()
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                Image(systemName: "swift")
                    .font(.system(size: 80))
                    .foregroundStyle(.orange)
                
                Text("Welcome to SwiftUI!")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                
                Text("Build beautiful apps with Swift")
                    .font(.headline)
                    .foregroundStyle(.secondary)
                
                Spacer()
                    .frame(height: 40)
                
                VStack(alignment: .leading, spacing: 16) {
                    FeatureRow(
                        icon: "paintbrush.fill",
                        title: "Declarative UI",
                        description: "Build user interfaces with SwiftUI's declarative syntax"
                    )
                    
                    FeatureRow(
                        icon: "arrow.triangle.2.circlepath",
                        title: "Reactive",
                        description: "Automatically update your UI when data changes"
                    )
                    
                    FeatureRow(
                        icon: "hammer.fill",
                        title: "Native Performance",
                        description: "Get the best performance on Apple platforms"
                    )
                }
                .padding()
                .background(Color(.systemBackground))
                .cornerRadius(12)
                .shadow(radius: 2)
                
                Spacer()
            }
            .padding()
            .navigationTitle("My SwiftUI App")
        }
    }
}

struct FeatureRow: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundStyle(.blue)
                .frame(width: 30)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                
                Text(description)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
    }
}

#Preview {
    ContentView()
}
