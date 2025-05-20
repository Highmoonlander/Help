import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container, CssBaseline, Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
import StudentForm from './components/StudentForm';
import ResultDisplay from './components/ResultDisplay';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      marginBottom: '1.5rem',
    },
    h6: {
      fontWeight: 500,
      color: '#1976d2',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 4, pb: 6 }}>
          <Container maxWidth="md">
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 4, 
                textAlign: 'center',
                background: 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)',
                color: 'white'
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
                Student Marksheet System
              </Typography>
            </Paper>
            <Routes>
              <Route path="/" element={<StudentForm />} />
              <Route path="/result" element={<ResultDisplay />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
