import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Types
interface WishForm {
  title: string;
  category: string;
  description: string;
  location: string;
  budget: number;
  deadline: string;
  isPublic: boolean;
  tags: string[];
  media: File[];
}

const categories = [
  { id: 'charity', label: '公益' },
  { id: 'life', label: '生活' },
  { id: 'skill', label: '技能' },
  { id: 'emotion', label: '情感' },
  { id: 'education', label: '教育' },
  { id: 'health', label: '健康' },
  { id: 'travel', label: '出行' },
  { id: 'other', label: '其他' },
];

const CreateWish: React.FC = () => {
  const [formData, setFormData] = useState<WishForm>({
    title: '',
    category: '',
    description: '',
    location: '',
    budget: 0,
    deadline: '',
    isPublic: true,
    tags: [],
    media: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (field: keyof WishForm) => (
    e: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          发布愿望
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="愿望标题"
                value={formData.title}
                onChange={handleChange('title')}
                helperText="简短描述你的愿望（50字以内）"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>愿望分类</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleChange('category')}
                  label="愿望分类"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                type="number"
                label="预算金额"
                value={formData.budget}
                onChange={handleChange('budget')}
                InputProps={{
                  startAdornment: <Typography>¥</Typography>,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="详细描述"
                value={formData.description}
                onChange={handleChange('description')}
                helperText="请详细描述你的愿望（500字以内）"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="位置"
                value={formData.location}
                onChange={handleChange('location')}
                helperText="输入具体位置或选择地图位置"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                type="datetime-local"
                label="截止时间"
                value={formData.deadline}
                onChange={handleChange('deadline')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isPublic}
                    onChange={(e) =>
                      setFormData({ ...formData, isPublic: e.target.checked })
                    }
                  />
                }
                label="公开愿望"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                发布愿望
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateWish; 