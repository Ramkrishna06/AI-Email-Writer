import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  CssBaseline,
  Switch,
  Avatar,
  Fade,
  Tooltip,
  IconButton,
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Animated and styled button
const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: 'transform 0.18s cubic-bezier(.31,1.44,.97,1.02), box-shadow 0.18s',
  boxShadow: theme.shadows[2],
  '&:hover': {
    transform: 'scale(1.06)',
    boxShadow: theme.shadows[6],
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}));

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  // For demonstration: example user
  //const user = { name: "Ram", email: "jane@domain.com" };

  // Enhanced theme: neutral light mode, true black dark mode, more vivid hover colors
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
        contrastText: darkMode ? '#181818' : '#ffffff'
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#008080',
      },
      background: {
        default: darkMode ? '#000' : '#f3f4f6',
        paper: darkMode ? '#181818' : '#ececec',
      },
      text: {
        primary: darkMode ? '#fafafa' : '#181818',
        secondary: darkMode ? '#b0b0b0' : '#666666',
      },
    },
    typography: {
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      button: { textTransform: 'none', fontWeight: 600 }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            minHeight: 44,
            letterSpacing: .05,
          },
        },
      }
    }
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   setError('');
  //   try {
  //     const response = await axios.post('http://localhost:8080/api/email/generate', {
  //       emailContent,
  //       tone,
  //     });
  //     setGeneratedReply(
  //       typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
  //     );
  //   } catch (error) {
  //     setError('Failed to get response email. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const handleSubmit = async () => {
  setLoading(true);
  setError('');
  try {
    // const response = await axios.post(`${API_BASE_URL}/api/email/generate`, {
    //   emailContent,
    //   tone,
    // });/
    const response = await axios.post(
  'https://mailreply-ai.onrender.com/api/email/generate',
  { emailContent, tone }
);

    setGeneratedReply(
      typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
    );
  } catch (error) {
    setError('Failed to get response email. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
            Email Reply Generator
          </Typography>
          <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <IconButton
              aria-label="Toggle dark mode"
              onClick={() => setDarkMode(!darkMode)}
              color="primary"
            >
              <Avatar sx={{
                bgcolor: darkMode ? '#000' : '#ececec',
                color: darkMode ? '#90caf9' : '#1976d2',
                width: 38, height: 38, fontWeight: 700
              }}>
                {darkMode ? '🌙' : '🌞'}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ mx: 0 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 2 }}
            inputProps={{ 'aria-label': 'Original Email Content' }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="tone-label">Tone (optional)</InputLabel>
            <Select
              labelId="tone-label"
              value={tone}
              label="Tone (optional)"
              onChange={(e) => setTone(e.target.value)}
              aria-label="Select tone"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="funny">Funny</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>
          <AnimatedButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
            aria-label="Generate Reply"
            sx={{ my: 1 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
          </AnimatedButton>
          
           {/* ⏳ Loading Message */}
          {loading && (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1, textAlign: 'center' }}
            >
              Please wait at least 2 minutes — it may take some time for the free server to generate a response.
            </Typography>
          )}
        </Box>
        
        {error && (
          <Typography color="error" sx={{ mt: 3 }} role="alert">
            {error}
          </Typography>
        )}
        <Fade in={!!generatedReply}>
          <Box sx={{ mt: 4 }}>
            {generatedReply && <>
              <Typography variant="h6" gutterBottom color="secondary">
                Generated Reply:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                value={generatedReply}
                inputProps={{ readOnly: true, 'aria-label': 'Reply Output' }}
                sx={{ mb: 2 }}
              />
              <AnimatedButton
                variant="outlined"
                color="secondary"
                onClick={() => navigator.clipboard.writeText(generatedReply)}
                aria-label="Copy reply to clipboard"
              >
                Copy to Clipboard
              </AnimatedButton>
            </>}
          </Box>
        </Fade>
      </Container>
    </ThemeProvider>
  );
}

export default App;
