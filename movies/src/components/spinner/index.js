// components/spinner/index.js
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // 使加载指示器在整个视窗垂直居中
        '& > * + *': {
          marginLeft: '2em', // 设置加载指示器之间的间距
        }
      }}
    >
      <CircularProgress />
      <CircularProgress />
    </Box>
  );
}
