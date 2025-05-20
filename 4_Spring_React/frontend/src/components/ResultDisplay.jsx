import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';

const ResultDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const { rollNumber } = location.state?.studentData || {};
        if (!rollNumber) {
          setError('No roll number provided');
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:8080/api/students/result/${rollNumber}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student result');
        }

        const data = await response.json();
        setStudentData({
          name: data.name,
          rollNumber: data.rollNumber,
          marks: data.marks.reduce((acc, mark) => ({
            ...acc,
            [mark.subjectName]: {
              mse: mark.mseMarks.toString(),
              ese: mark.eseMarks.toString()
            }
          }), {})
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [location.state]);

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
          Loading Result...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')}>
          Go Back
        </Button>
      </Box>
    );
  }

  if (!studentData) {
    return (
      <Box textAlign="center" py={4}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          No result data available
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')}>
          Go Back
        </Button>
      </Box>
    );
  }

  const calculateTotal = (mse, ese) => {
    const mseScore = (parseFloat(mse) * 0.3);
    const eseScore = (parseFloat(ese) * 0.7);
    return (mseScore + eseScore).toFixed(2);
  };

  const calculateGrade = (total) => {
    const score = parseFloat(total);
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const subjects = Object.keys(studentData.marks);
  const totalMarks = subjects.reduce((acc, subject) => {
    const total = calculateTotal(
      studentData.marks[subject].mse,
      studentData.marks[subject].ese
    );
    return acc + parseFloat(total);
  }, 0);
  const percentage = (totalMarks / subjects.length).toFixed(2);

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Semester Result
      </Typography>
      
      <Box sx={{ 
        mb: 4, 
        p: 3, 
        borderRadius: 2,
        bgcolor: 'background.default',
        border: '1px solid',
        borderColor: 'primary.light',
      }}>
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>Student Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Name:</Box>
              {studentData.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Roll Number:</Box>
              {studentData.rollNumber}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 500 }}>Subject</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 500 }}>MSE (30%)</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 500 }}>ESE (70%)</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 500 }}>Total</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 500 }}>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subject) => {
              const total = calculateTotal(
                studentData.marks[subject].mse,
                studentData.marks[subject].ese
              );
              return (
                <TableRow key={subject} sx={{
                  '&:nth-of-type(odd)': {
                    bgcolor: 'background.default',
                  },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}>
                  <TableCell component="th" scope="row">
                    {subject}
                  </TableCell>
                  <TableCell align="right">{studentData.marks[subject].mse}</TableCell>
                  <TableCell align="right">{studentData.marks[subject].ese}</TableCell>
                  <TableCell align="right">{total}</TableCell>
                  <TableCell align="right">{calculateGrade(total)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ 
        mt: 4, 
        p: 3, 
        borderRadius: 2,
        bgcolor: 'primary.light',
        color: 'white',
        textAlign: 'right' 
      }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
          Overall Percentage: <Box component="span" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>{percentage}%</Box>
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Final Grade: <Box component="span" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>{calculateGrade(percentage)}</Box>
        </Typography>
      </Box>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ 
            mr: 2,
            height: 48,
            fontSize: '1.1rem',
            fontWeight: 500,
            minWidth: 200
          }}
        >
          Enter New Result
        </Button>
      </Box>
    </Paper>
  );
};

export default ResultDisplay;