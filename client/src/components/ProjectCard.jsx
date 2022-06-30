import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProjectCard({ project }) {
  return (
    <Card sx={{ minWidth: 275, marginBottom: '1rem' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Project {project.id}
        </Typography>
        <Typography variant="h5" component="div">
          {project.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {project.description}
        </Typography>
        {/* <Typography variant="body2">
          {project.description}
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">More</Button>
      </CardActions>
    </Card>
  );
}
