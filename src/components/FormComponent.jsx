import React, { useState } from 'react';
import { Box, Button, List, Stack, TextField } from '@mui/material';
import { Form } from 'react-router-dom';

function FormComponent({ formData, setFormData, onSubmit }) {
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        onSubmit(formData, setSubmitted);
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Box gap={2} display={'flex'} flexDirection={'column'} width={'100%'}>
                {Object.entries(formData).map(([key, value]) => (
                    <TextField
                        key={key}
                        label={`Enter ${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}`}
                        variant="outlined"
                        sx={{ width: '100%' }}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        type={key.includes('password') ? 'password' : 'text'}
                        error={submitted && !value}
                        // helperText={submitted && !value && 'Required'}
                    />
                ))}
                <Button variant='contained' sx={{ width: '100%' }} type='submit'>Register</Button>
            </Box>
        </Form>
    )
}

export default FormComponent