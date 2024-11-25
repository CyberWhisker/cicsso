import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { storeProject } from '../../../api/ProjectApi';
import { fetchCollections } from '../../../api/CollectionApi';

function Store({ getProjects, handleCloseModal }) {
    const [formData, setFormData] = useState({
        project: '',
        description: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const { project, description } = formData;
        if (!project || !description) {
            toast.error("All fields are required");
            return;
        }
        const { data, error } = await storeProject(formData)
        if (error) {
            toast.error(error)
        } else {
            getProjects();
            toast.success("Project added successfully");
            setFormData({ project: '', description: '' });
            handleCloseModal();
        }
        setSubmitted(false);
    };

    return (
        <Box sx={{ width: '60vh', p: 2 }}>
            <Typography variant='h4' fontWeight='bold'>Add Project</Typography>
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
                        <SelectCollection handleChange={handleChange}/>
                        <TextField
                            label='Project Details'
                            name='description'
                            variant="outlined"
                            sx={{ width: '100%' }}
                            value={formData.description}
                            onChange={handleChange}
                            error={submitted && !formData.description}
                            helperText={submitted && !formData.description ? "Required" : ""}
                            multiline
                            rows={4}
                        />
                        <Button type='submit' variant='contained' sx={{ mt: 2, width: '100%' }}>
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}

function SelectCollection({handleChange}) {
    const [collectionData, setCollectionData] = useState([])

    const handleGetCollection = async () => {
        const { data, error } = await fetchCollections()

        if (!error) {
            setCollectionData(data)
        }

    }

    useEffect(() => {
        handleGetCollection()
    }, [])

    return (
        <TextField select label="Select Collection Fund" onChange={handleChange} name='collectionId' defaultValue={""}>
            {collectionData.map((item, index) => (
                <MenuItem key={index} value={item._id}>{item.collectionName}</MenuItem>
            ))}
        </TextField>
    )
}

export default Store;
