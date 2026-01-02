import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Container maxWidth="md">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '100vh',
                            textAlign: 'center',
                            padding: 3
                        }}
                    >
                        <ErrorOutlineIcon 
                            sx={{ 
                                fontSize: 80, 
                                color: '#800000',
                                marginBottom: 2
                            }} 
                        />
                        <Typography variant="h4" gutterBottom>
                            Oops! Something went wrong
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            We're sorry for the inconvenience. The application encountered an unexpected error.
                        </Typography>
                        <Button 
                            variant="contained" 
                            onClick={this.handleReload}
                            sx={{
                                backgroundColor: '#800000',
                                '&:hover': {
                                    backgroundColor: '#5c0000'
                                },
                                marginTop: 2
                            }}
                        >
                            Reload Page
                        </Button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <Box
                                sx={{
                                    marginTop: 4,
                                    padding: 2,
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: 1,
                                    width: '100%',
                                    textAlign: 'left',
                                    overflow: 'auto'
                                }}
                            >
                                <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {this.state.error.toString()}
                                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

