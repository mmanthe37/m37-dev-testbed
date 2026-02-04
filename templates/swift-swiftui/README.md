# Swift SwiftUI Template

A modern iOS/macOS application template with SwiftUI and MVVM architecture.

## Features

- 🍎 **SwiftUI** - Modern declarative UI framework
- 🏗️ **MVVM Architecture** - Clean separation of concerns
- 📱 **iOS 16+** - Latest iOS features
- 🎨 **Custom Components** - Reusable UI components
- 🧪 **Unit Tests** - Testing infrastructure ready
- 📊 **State Management** - ObservableObject patterns
- 🔄 **Async/Await** - Modern Swift concurrency

## Getting Started

### Prerequisites

- macOS 13.0 or later
- Xcode 15.0 or later
- Swift 5.9 or later

### Installation

1. Open the project in Xcode:
   ```bash
   open SwiftUIApp.xcodeproj
   ```

2. Select your target device or simulator

3. Press `⌘ + R` to build and run

## Project Structure

```
swift-swiftui/
├── App/
│   └── SwiftUIAppApp.swift      # App entry point
├── Models/
│   └── SampleModel.swift        # Data models
├── ViewModels/
│   └── SampleViewModel.swift    # View models (MVVM)
├── Views/
│   ├── ContentView.swift        # Main view
│   └── Components/              # Reusable components
├── Services/
│   └── APIService.swift         # Network services
├── Utilities/
│   └── Extensions.swift         # Helper extensions
└── Resources/
    └── Assets.xcassets          # Images and colors
```

## Architecture

This template follows the **MVVM (Model-View-ViewModel)** pattern:

- **Models**: Pure data structures
- **Views**: SwiftUI views (UI layer)
- **ViewModels**: Business logic and state management
- **Services**: Network, storage, and other services

## Key Concepts

### State Management

```swift
@StateObject private var viewModel = SampleViewModel()
@State private var isPresented = false
@Binding var selectedItem: Item
```

### Navigation

```swift
NavigationStack {
    // Your views here
}
```

### Async Operations

```swift
Task {
    await viewModel.fetchData()
}
```

## Available Features

### Custom Views
- Reusable button styles
- Custom cards and containers
- Loading states
- Error handling views

### Services
- API networking layer
- Local storage
- User preferences

### Utilities
- Extensions for common operations
- Custom modifiers
- Helper functions

## Testing

Run tests with:
- `⌘ + U` in Xcode
- Or via command line: `xcodebuild test`

## Building for Production

1. Update your app bundle identifier
2. Configure signing & capabilities
3. Archive the app: `Product > Archive`
4. Upload to App Store Connect

## Best Practices

1. **Keep Views Simple**: Move logic to ViewModels
2. **Use Extensions**: Keep code organized with extensions
3. **Handle Errors**: Always handle async errors gracefully
4. **Test Your Code**: Write unit tests for ViewModels and Services
5. **Follow Swift Guidelines**: Use Swift API Design Guidelines
6. **Use Preview**: Leverage SwiftUI previews for rapid development

## SwiftUI Tips

- Use `.task` for async operations in views
- Prefer `@StateObject` for owned objects
- Use `@ObservedObject` for passed-in objects
- Use `@EnvironmentObject` for app-wide state
- Keep state as private as possible
- Use proper view lifecycle modifiers

## Resources

- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui)
- [Swift Documentation](https://swift.org/documentation/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [WWDC Videos](https://developer.apple.com/videos/)

## Customization

1. Update `Info.plist` with your app details
2. Modify `Assets.xcassets` with your brand colors and images
3. Update the app name and bundle identifier
4. Add your app icon
5. Configure required permissions

---

**Happy SwiftUI coding! 🚀**
