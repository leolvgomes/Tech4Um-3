import React from "react";

type State = { hasError: boolean; error?: unknown; errorInfo?: React.ErrorInfo | null };
type Props = React.PropsWithChildren<{}>;

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: unknown): Partial<State> {
        return { hasError: true, error };
    }

    componentDidCatch(error: unknown, info: React.ErrorInfo) {
        // Log to console and also save the info so it can be displayed
        // without relying on the devtools only.
        // eslint-disable-next-line no-console
        console.error("Uncaught error in React component:", error, info);
        this.setState({ error, errorInfo: info });
    }

    render() {
        if (this.state.hasError) {
            const message = this.state.error instanceof Error ? this.state.error.message : String(this.state.error ?? "Unknown error");
            const stack = this.state.error instanceof Error ? this.state.error.stack : undefined;

            return (
                <div style={{ padding: 24 }}>
                    <h2>Ocorreu um erro na aplicação</h2>
                    <div style={{ color: "#c00", whiteSpace: "pre-wrap", marginTop: 8 }}>
                        <strong>Mensagem:</strong>
                        <div>{message}</div>
                        {stack && (
                            <>
                                <strong>Stack:</strong>
                                <pre style={{ whiteSpace: "pre-wrap" }}>{stack}</pre>
                            </>
                        )}
                        {this.state.errorInfo?.componentStack && (
                            <>
                                <strong>Component stack:</strong>
                                <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.errorInfo.componentStack}</pre>
                            </>
                        )}
                    </div>
                    <p>Abra o console do navegador (F12) para mais detalhes ou cole o erro aqui.</p>
                </div>
            );
        }

        return this.props.children as React.ReactElement;
    }
}

export default ErrorBoundary;
