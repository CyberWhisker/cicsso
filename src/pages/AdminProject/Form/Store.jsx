import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { storeProject } from '../../../api/ProjectApi';
import { fetchCollections } from '../../../api/CollectionApi';
import { fetchActiveSchoolYear } from '../../../api/SchoolYearApi';

function Store({ getProjects, handleCloseModal }) {
    const [schoolYearId, setSchoolYearId] = useState("");
    const [formData, setFormData] = useState({
        schoolYearId: "",
        project: "",
        collectionId: "",
    });
    const [submitted, setSubmitted] = useState(false);

    // Fetch the active school year
    useEffect(() => {
        const fetchSchoolYear = async () => {
            const { data, error } = await fetchActiveSchoolYear();
            if (!error) {
                setSchoolYearId(data._id);
                setFormData((prev) => ({ ...prev, schoolYearId: data._id }));
            } else {
                toast.error("Failed to fetch active school year");
            }
        };
        fetchSchoolYear();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const { project, schoolYearId, collectionId } = formData;
        if (!project || !collectionId) {
            toast.error("All fields are required");
            return;
        }

        const { data, error } = await storeProject(formData);
        if (error) {
            toast.error(error);
        } else {
            getProjects();
            toast.success("Project added successfully");
            setFormData({
                schoolYearId,
                project: "",
                collectionId: "",
            });
            setSubmitted(false);
            handleCloseModal();
        }
    };

    return (
        <Box sx={{ width: '60vh', p: 2 }}>
            <Typography variant="h4" fontWeight="bold">
                Add Project
            </Typography>
            <Box mt={2}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Project Name"
                            name="project"
                            variant="outlined"
                            fullWidth
                            value={formData.project}
                            onChange={handleChange}
                            error={submitted && !formData.project}
                            helperText={submitted && !formData.project ? "Required" : ""}
                        />
                        <SelectCollection handleChange={handleChange} selectedValue={formData.collectionId} />
                        {/* <TextField
                            label="Project Details"
                            name="description"
                            variant="outlined"
                            fullWidth
                            value={formData.description}
                            onChange={handleChange}
                            error={submitted && !formData.description}
                            helperText={submitted && !formData.description ? "Required" : ""}
                            multiline
                            rows={4}
                        /> */}
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}

function SelectCollection({ handleChange, selectedValue }) {
    const [collectionData, setCollectionData] = useState([]);

    useEffect(() => {
        const fetchCollectionsData = async () => {
            const { data, error } = await fetchCollections();
            if (!error) {
                setCollectionData(data);
            } else {
                toast.error("Failed to fetch collections");
            }
        };
        fetchCollectionsData();
    }, []);

    return (
        <TextField
            select
            label="Select Collection Fund"
            name="collectionId"
            value={selectedValue || ""}
            onChange={handleChange}
            fullWidth
        >
            {collectionData.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                    {item.collectionName}
                </MenuItem>
            ))}
        </TextField>
    );
}

export default Store;
