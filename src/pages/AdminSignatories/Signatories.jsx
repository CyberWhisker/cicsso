import React, { useEffect, useMemo, useState } from "react";
import {
    Accordion,
    AccordionSummary,
    Box,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import Master from "../../layouts/Master";
import { ExpandMore } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

function Signatories() {
    const [storeModal, setStoreModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const handleGetData = async () => {
        setIsLoading(true)
        const { data, error } = await fetchSchoolYear();
        if (error) {
            toast.error(error)
        } else {
            setData(data)
        }
        setIsLoading(false)
    };

    useEffect(() => {
        handleGetData();
    }, []);
    return (
        <Master>
            <Stack spacing={1}>
                <Typography variant="h4" fontWeight="bold">
                    Signatories
                </Typography>
                <Divider />
                <AccordionList />
            </Stack>
        </Master>
    );
}

function AccordionList() {
    return (
        <Box>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>Sememter AY</AccordionSummary>
                <DataGrid columns={['id', 'name']} rows={[]} />
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>Sememter AY</AccordionSummary>
            </Accordion>
        </Box>
    )
}

export default Signatories