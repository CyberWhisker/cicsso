import { useState } from 'react'
import { CloudUpload } from '@mui/icons-material'
import { Box, Button, Paper, Stack, styled, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { storeTransaction } from '../../../api/TransactionApi'
import { toast } from 'react-toastify'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function Payment({selected, handleGetData, handleCloseModal}) {
    const [dataForm, setDataForm] = useState(selected.dataForm)
    const [paymentType, setPaymentType] = useState(true);
    const handleTogglePayment = (value) => {
        setPaymentType(value == 'Cash' ? true : false)
        setDataForm({
            ...dataForm,
            payment: value
        })
    }
    const handleSubmit = async () => {
        const {data, error} = await storeTransaction(dataForm)
        if (error) {
            toast.error(error)
        } else {
            toast.success('Successfully Submitted')
            handleGetData();
            handleCloseModal();
        }
    }
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Stack p={2} spacing={2} width={'60vh'}>
                <Typography variant='h4' fontWeight={'bold'}>Payment</Typography>
                <TextField
                    label='Collection Name'
                    name='collection'
                    value={selected.collectionName}
                    disabled
                />
                <TextField
                    label='Amount'
                    name='amount'
                    value={selected.fine}
                    disabled
                />
                <Typography>AY</Typography>
                <DatePicker
                label='Start Date'
                value={moment(selected.startDate)}
                disabled
                />
                <DatePicker
                label='End Date'
                value={moment(selected.endDate)}
                disabled
                />
                <Stack direction={'row'} spacing={2}>
                    <Button variant='contained' color='success' sx={{width: '100%'}} onClick={() => handleTogglePayment('Cash')}>Cash</Button>
                    <Button variant='contained' sx={{width: '100%'}} onClick={() => handleTogglePayment('GCash')}>Gcash</Button>
                </Stack>
                {paymentType ? (
                    <CashForm/>
                ) : (
                    <GcashForm setDataForm={setDataForm} dataForm={dataForm} handleSubmit={handleSubmit} selected={selected}/>
                )}
            </Stack>
        </LocalizationProvider>
    )
}

function GcashForm ({setDataForm, dataForm, handleSubmit, selected}) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setDataForm({ ...dataForm, file: selectedFile });
        if (selectedFile) {
            setError('');
        }
    }

    const handleFormSubmit = () => {
        if (!file) {
            setError('File is required');
            return;
        }
        handleSubmit();
    }

    return (
        <Stack spacing={2}>
            <Typography textAlign={'center'} fontWeight={'bold'}>Please upload the Gcash Transaction here</Typography>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUpload />}
              sx={{width: '100%'}}
            >
              Upload Gcash
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </Button>
            {error && <Typography color='error' textAlign={'center'}>{error}</Typography>}
            <Button variant='contained' onClick={handleFormSubmit} disabled={selected.transaction}>Submit</Button>
        </Stack>
    )
} 

function CashForm () {
    return (
        <Stack spacing={2}>
            <Paper sx={{padding: 2}}>
                <Typography textAlign={'center'} fontWeight={'bold'}>Kindly remit your payment to the current Treasurer of the CICSSO organization at your earliest convenience.</Typography>
            </Paper>
        </Stack>
    )
}

export default Payment
