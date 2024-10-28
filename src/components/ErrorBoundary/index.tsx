import { Component, ErrorInfo, ReactNode } from "react";
import FallBack404 from "./Fallback";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  // Add a method to reset the hasError state
  public resetError = () => {
    this.setState({ hasError: false });
  };

  // Add an event listener to detect back button press
  componentDidMount() {
    window.addEventListener("popstate", this.resetErrorOnBack);
  }

  // Remove the event listener when the component is unmounted
  componentWillUnmount() {
    window.removeEventListener("popstate", this.resetErrorOnBack);
  }

  // Reset the error state when the back button is pressed
  resetErrorOnBack = () => {
    this.resetError();
  };

  public render() {
    if (this.state.hasError) {
      return <FallBack404 resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
