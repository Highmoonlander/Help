import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'];

const sampleData = {
  name: 'Arya Rajvaidya',
  rollNumber: '20BCE1234',
  marks: {
    Mathematics: { mse: '85', ese: '92' },
    Physics: { mse: '78', ese: '88' },
    Chemistry: { mse: '82', ese: '90' },
    'Computer Science': { mse: '90', ese: '95' }
  }
};

const StudentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    marks: subjects.reduce((acc, subject) => ({
      ...acc,
      [subject]: { mse: '', ese: '' }
    }), {})
  });

  const handleInputChange = (e, subject = null) => {
    const { name, value } = e.target;
    if (subject) {
      const [examType] = name.split('_');
      setFormData(prev => ({
        ...prev,
        marks: {
          ...prev.marks,
          [subject]: {
            ...prev.marks[subject],
            [examType]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateTotal = (mse, ese) => {
    if (mse === '' || ese === '') return '';
    const mseScore = (parseFloat(mse) * 0.3);
    const eseScore = (parseFloat(ese) * 0.7);
    return (mseScore + eseScore).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/students/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to save student result');
      }

      const savedData = await response.json();
      navigate('/result', { state: { studentData: formData } });
    } catch (error) {
      console.error('Error saving student result:', error);
      alert('Failed to save student result. Please try again.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Student Result Entry
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Student Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Roll Number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
            />
          </Grid>

          {subjects.map((subject) => (
            <Grid item xs={12} key={subject}>
              <Box sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'primary.light',
              }}>
                <Typography variant="h6" gutterBottom sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'primary.main',
                  '&::before': {
                    content: '""',
                    width: 4,
                    height: 24,
                    bgcolor: 'primary.main',
                    borderRadius: 2,
                  },
                }}>
                  {subject}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="MSE Marks (30%)"
                      type="number"
                      name={`mse_${subject}`}
                      value={formData.marks[subject].mse}
                      onChange={(e) => handleInputChange(e, subject)}
                      inputProps={{ min: 0, max: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="ESE Marks (70%)"
                      type="number"
                      name={`ese_${subject}`}
                      value={formData.marks[subject].ese}
                      onChange={(e) => handleInputChange(e, subject)}
                      inputProps={{ min: 0, max: 100 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={() => setFormData(sampleData)}
                variant="outlined"
                color="secondary"
                fullWidth
                size="large"
                sx={{
                  height: 48,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                }}
              >
                Load Sample Data
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  height: 48,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                }}
              >
                Calculate Result
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default StudentForm;