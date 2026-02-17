import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/',
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock next/image — render as plain <img> in tests
jest.mock('next/image', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  // eslint-disable-next-line @next/next/no-img-element
  return function Image({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', { src, alt, ...props });
  };
});

// Mock next/dynamic — return the component directly for testing
jest.mock('next/dynamic', () => {
  return function dynamic(
    fn: () => Promise<{ default: React.ComponentType }>,
    _options?: unknown
  ): React.ComponentType {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react');
    // Return a placeholder for dynamic components in tests
    const MockComponent = () => React.createElement('div', { 'data-testid': 'dynamic-component' });
    MockComponent.displayName = 'MockDynamic';
    return MockComponent as unknown as React.ComponentType;
  };
});
