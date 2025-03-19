import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { updateProject } from '../../../api/ProjectApi';
import { fetchCollections } from '../../../api/CollectionApi';

function Update({ selected, handleCloseModal, getProjects }) {
    const [formData, setFormData] = useState({ ...selected, collectionId: selected.collectionId._id });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const { project, status } = formData;
        if (!project || !status) {
            toast.error("All fields are required");
            return;
        }

        const { data, error } = await updateProject(formData)
        if (error) {
            toast.error(error)
        } else {
            handleCloseModal();
            getProjects();
            toast.success("Event added successfully");
            setFormData({ project: '' });
        }
        setSubmitted(false);
    };
    return (
        <Box sx={{ width: '60vh', p: 2 }}>
            <Typography variant='h4' fontWeight='bold'>Update Project</Typography>
            <Box mt={2}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label='Project Name'
                            name='project'
                            variant="outlined"
                            sx={{ width: '100%' }}
                            value={formData.project}
                            onChange={handleChange}
                            error={submitted && !formData.project}
                            helperText={submitted && !formData.project ? "Required" : ""}
                        />
                        <SelectCollection handleChange={handleChange} formData={formData} />
                        {/* <TextField
                            label='Project Details'
                            name='description'
                            variant="outlined"
                            sx={{ width: '100%'}}
                            value={formData.description}
                            onChange={handleChange}
                            error={submitted && !formData.description}
                            helperText={submitted && !formData.description ? "Required" : ""}
                            multiline
                            rows={4}
                        /> */}
                        <TextField
                            label='Status'
                            name='status'
                            variant="outlined"
                            sx={{ width: '100%' }}
                            value={formData.status}
                            onChange={handleChange}
                            error={submitted && !formData.status}
                            helperText={submitted && !formData.status ? "Required" : ""}
                            select
                        >
                            <MenuItem value="Ongoing">Ongoing</MenuItem>
                            <MenuItem value="Complete">Complete</MenuItem>
                        </TextField>
                        <Button type='submit' variant='contained' sx={{ mt: 2, width: '100%' }}>
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}

function SelectCollection({ handleChange, formData }) {
    const [collectionData, setCollectionData] = useState([])
    const [loading, isLoading] = useState(true)

    const handleGetCollection = async () => {
        isLoading(true)
        const { data, error } = await fetchCollections()

        if (!error) {
            setCollectionData(data)
        }
        isLoading(false)

    }

    useEffect(() => {
        handleGetCollection()
    }, [])

    return (
        <TextField select label="Select Collection Fund" onChange={handleChange} name='collectionId' value={!loading ? formData?.collectionId : ''}>
            {collectionData.map((item, index) => (
                <MenuItem key={index} value={item._id}>{item.collectionName}</MenuItem>
            ))}
        </TextField>
    )
}

export default Update;
