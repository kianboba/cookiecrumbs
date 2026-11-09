import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error("Unhandled error:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container-page py-16 text-center">
          <h1 className="heading-1">Something went wrong</h1>
          <p className="mt-2 text-ink-600">
            An unexpected error occurred. Please refresh the page.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
