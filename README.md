# Alternative Payments Take-Home Assignment

A modern React application built with Next.js featuring character browsing capabilities, comprehensive testing suite, and atomic design architecture. The app provides both grid and table views for character data with search and infinite scroll functionality.

## Tech Stack

### Core Framework
- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - UI library with latest features
- **TypeScript 5** - Type-safe JavaScript development

### Data Management
- **Apollo Client 4.0.9** - GraphQL client with caching
- **GraphQL 16.12.0** - Query language for APIs

### UI & Styling
- **CSS Modules** - Component-scoped styling

### Dashboards
- **Recharts 3.3.0** - Data visualization library

### Development & Testing
- **Jest 30.2.0** - JavaScript testing framework
- **React Testing Library 16.3.0** - Component testing utilities
- **Biome 2.2.0** - Fast formatter and linter
- **TypeScript** - Static type checking

## Prerequisites

- Node.js >= 20.9.0 (recommended: v24.11.0 LTS)
- npm 11.6.1 or later

## Getting Started

### 1. Use the correct Node.js version

This project requires Node.js v24.11.0. If you have nvm installed:

```bash
nvm use
```

Or install the specific version:

```bash
nvm install 24.11.0
nvm use 24.11.0
```

### 2. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

### Development
- `npm run dev` - Start the development server on http://localhost:3000
- `npm run build` - Build the application for production
- `npm start` - Start the production server

### Code Quality
- `npm run lint` - Run Biome linter to check code quality
- `npm run format` - Format code with Biome

### Testing
- `npm run test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
src/
├── __tests__
│   └── integration/           # Integration tests
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout component
│   ├── page.tsx               # Home page
│   ├── globals.css            # Global styles
│   ├── design-system.css      # Design system styles
│   ├── characters/            # Characters page
│   ├── dashboard/             # Dashboard page
│   └── styleguide/            # Styleguide page (examples of usage)
├── components/                # Reusable UI components (Atomic Design)
│   ├── atoms/                 # Basic building blocks
│   ├── molecules/             # Component combinations
│   └── organisms/             # Complex UI sections│
├── graphql/                   # GraphQL queries
│   └── queries/│
├── hooks/                     # Custom React hooks
├── lib/                       # Utility libraries
├── providers/                 # React context providers
└── types/                     # TypeScript type definitions

Configuration Files:
├── biome.json                 # Biome linter/formatter config
├── jest.config.js            # Jest testing configuration
├── jest.setup.js             # Jest setup and mocks
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── .nvmrc                    # Node.js version specification
```

### Architecture Highlights

- **Atomic Design Pattern**: Components are organized in atoms → molecules → organisms hierarchy
- **Feature-Based Routing**: Next.js App Router with dedicated page directories
- **Type Safety**: Comprehensive TypeScript coverage with strict type checking
- **Testing Strategy**: 100% test coverage for atomic components and snapshot tests for organisms
- **Modern React**: Utilizes React 19 features and patterns
- **GraphQL Integration**: Apollo Client for efficient data fetching and caching

## Testing Strategy

The project features comprehensive test coverage across all component layers:

### Test Coverage by Component Type
- **Atoms**: 100% unit test coverage
- **Molecules**: @ToDo Implement tests for molecules components  
- **Organisms**: Snapshot testing for visual regression

### Testing Tools & Configuration
- **Jest**: Primary testing framework with coverage reporting
- **React Testing Library**: Component testing with best practices
- **Snapshot Testing**: Visual regression testing for complex components
- **Integration Testing**: Component interaction and data flow validation

### Running Tests
```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode for development
npm run test:coverage     # Generate coverage reports
```

Test files are co-located with components following the pattern `ComponentName.test.tsx`.

## Features

- 🔍 **Character Search**: Real-time search with debounced input
- 📊 **Data Visualization**: Interactive charts and statistics
- 🎛️ **View Modes**: Toggle between grid and table layouts
- ♾️ **Infinite Scroll**: Seamless data loading
- 📱 **Responsive Design**: Mobile-first approach
- ⚡ **Performance**: Optimized with Next.js and Apollo caching
- 🧪 **Tested**: Comprehensive test suite with high coverage

## Next Steps

The following improvements and enhancements are recommended for future development:

### 🎨 **Design System & Component Library**
- **Extract Design System**: If the design system will be used across multiple applications, consider extracting it into a separate package. This would allow installation as a dependency, making it more maintainable and easier to reuse across different projects.

- **Component Library Package**: Similarly, extract atoms and molecules components into a standalone component library package. This approach promotes consistency across applications and enables centralized component maintenance and versioning.

### 🚀 **Production Deployment**
- **CI/CD Pipelines**: Implement automated deployment pipelines for production environments. This should include:
  - Automated testing on pull requests
  - Build optimization and validation
  - Deployment to staging and production environments
  - Performance monitoring and health checks
  - Rollback capabilities for quick recovery

### 🧪 **Testing Enhancements**
- **Improve Test Coverage**: Expand test coverage beyond the current atomic and organism components to achieve comprehensive application coverage.

- **Molecule Component Testing**: Implement comprehensive behavioral tests for molecule components. These tests should cover:
  - User interactions and event handling
  - Component state management
  - Props validation and edge cases
  - Integration between atoms within molecules
  - Accessibility compliance testing

### 🔧 **Additional Considerations**
- **Performance Optimization**: Implement advanced performance monitoring and optimization strategies
- **Accessibility Audits**: Conduct comprehensive accessibility testing and improvements
- **Documentation**: Create comprehensive component documentation with Storybook integration
- **Monitoring & Analytics**: Add application performance monitoring and user analytics

## Learn More

### Documentation
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - Learn about React 19 features
- [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQL client documentation
- [TypeScript](https://www.typescriptlang.org/docs/) - TypeScript handbook
- [CSS Modules](https://github.com/css-modules/css-modules) - CSS Modules documentation
- [Jest Testing](https://jestjs.io/docs/getting-started) - Jest testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Component testing best practices

### Project Patterns
- **Atomic Design**: Components follow atomic design methodology
- **Custom Hooks**: Reusable logic with React hooks
- **TypeScript**: Strict type safety throughout the application
- **CSS Modules**: Scoped styling with CSS Modules
- **Testing**: Comprehensive testing strategy with high coverage
