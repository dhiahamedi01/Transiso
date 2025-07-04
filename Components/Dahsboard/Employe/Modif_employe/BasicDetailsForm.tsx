"use client";

import React, { useState } from 'react';

import {
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

export default function UserInfo() {
  const [formData, setFormData] = useState({
    basicDetails: {
      firstName: '',
      lastName: '',
      middleName: '',
      dateOfBirth: '',
      gender: '',
    },
    contactDetails: {
      email: '',
      mobileNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleBasicDetailsChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      basicDetails: {
        ...prev.basicDetails,
        [field]: value,
      },
    }));
  };

  const handleContactDetailsChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contactDetails: {
        ...prev.contactDetails,
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.basicDetails.firstName) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.basicDetails.lastName) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!formData.basicDetails.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }
    if (!formData.basicDetails.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.contactDetails.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactDetails.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.contactDetails.mobileNumber) {
      newErrors.mobileNumber = 'Mobile Number is required';
    }
    if (!formData.contactDetails.addressLine1) {
      newErrors.addressLine1 = 'Address Line 1 is required';
    }
    if (!formData.contactDetails.city) {
      newErrors.city = 'City is required';
    }
    if (!formData.contactDetails.state) {
      newErrors.state = 'State is required';
    }
    if (!formData.contactDetails.postalCode) {
      newErrors.postalCode = 'Postal Code is required';
    }
    if (!formData.contactDetails.country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data:', formData);
      // Submit form or do other action
    }
  };

  // Helper Box style for input containers
  const inputBoxStyle = { flex: '1 1 30%', minWidth: 200 };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 700,
        mx: 'auto',
        p: 3,
        bgcolor: '#f9f9f9',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography variant="h5">Basic Details</Typography>

      {/* Basic Details inputs */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={inputBoxStyle}>
          <TextField
            label="First Name"
            value={formData.basicDetails.firstName}
            onChange={(e) => handleBasicDetailsChange('firstName', e.target.value)}
            fullWidth
            required
            error={!!errors.firstName}
            helperText={errors.firstName}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="medium"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={inputBoxStyle}>
          <TextField
            label="Middle Name"
            value={formData.basicDetails.middleName}
            onChange={(e) => handleBasicDetailsChange('middleName', e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="medium"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={inputBoxStyle}>
          <TextField
            label="Last Name"
            value={formData.basicDetails.lastName}
            onChange={(e) => handleBasicDetailsChange('lastName', e.target.value)}
            fullWidth
            required
            error={!!errors.lastName}
            helperText={errors.lastName}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="medium"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={{ flex: '1 1 45%', minWidth: 200 }}>
          <TextField
            label="Date of Birth"
            type="date"
            value={formData.basicDetails.dateOfBirth}
            onChange={(e) => handleBasicDetailsChange('dateOfBirth', e.target.value)}
            fullWidth
            required
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="medium"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={{ flex: '1 1 45%', minWidth: 200 }}>
          <FormControl
            fullWidth
            required
            error={!!errors.gender}
            sx={{ '& .MuiInputLabel-root': { fontWeight: 500 } }}
          >
            <InputLabel id="gender-label" shrink>
              Gender
            </InputLabel>
            <Select
              labelId="gender-label"
              value={formData.basicDetails.gender}
              onChange={(e) => handleBasicDetailsChange('gender', e.target.value)}
              size="medium"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
          </FormControl>
        </Box>
      </Box>

      <Typography variant="h5">Contact Details</Typography>

      {/* Contact Details inputs */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: '1 1 45%', minWidth: 200 }}>
          <TextField
            label="Email"
            type="email"
            value={formData.contactDetails.email}
            onChange={(e) => handleContactDetailsChange('email', e.target.value)}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="medium"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={{ flex: '1 1 45%', minWidth: 200 }}>
          <TextField
            label="Mobile Number"
            type="tel"
            value={formData.contactDetails.mobileNumber}
            onChange={(e) => handleContactDetailsChange('mobileNumber', e.target.value)}
            fullWidth
            required
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="medium"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={{ flex: '1 1 100%', minWidth: 200 }}>
          <TextField
            label="Address Line 1"
            value={formData.contactDetails.addressLine1}
            onChange={(e) => handleContactDetailsChange('addressLine1', e.target.value)}
            fullWidth
            required
            error={!!errors.addressLine1}
            helperText={errors.addressLine1}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="medium"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={{ flex: '1 1 100%', minWidth: 200 }}>
          <TextField
            label="Address Line 2"
            value={formData.contactDetails.addressLine2}
            onChange={(e) => handleContactDetailsChange('addressLine2', e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="medium"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={inputBoxStyle}>
          <TextField
            label="City"
            value={formData.contactDetails.city}
            onChange={(e) => handleContactDetailsChange('city', e.target.value)}
            fullWidth
            required
            error={!!errors.city}
            helperText={errors.city}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="medium"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={inputBoxStyle}>
          <TextField
            label="State"
            value={formData.contactDetails.state}
            onChange={(e) => handleContactDetailsChange('state', e.target.value)}
            fullWidth
            required
            error={!!errors.state}
            helperText={errors.state}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="medium"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={inputBoxStyle}>
          <TextField
            label="Postal Code"
            value={formData.contactDetails.postalCode}
            onChange={(e) => handleContactDetailsChange('postalCode', e.target.value)}
            fullWidth
            required
            error={!!errors.postalCode}
            helperText={errors.postalCode}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="medium"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={{ flex: '1 1 45%', minWidth: 200 }}>
          <TextField
            label="Country"
            value={formData.contactDetails.country}
            onChange={(e) => handleContactDetailsChange('country', e.target.value)}
            fullWidth
            required
            error={!!errors.country}
            helperText={errors.country}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="medium"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button type="submit" variant="contained" color="primary" size="large">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
