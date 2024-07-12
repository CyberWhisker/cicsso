import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import PanToolIcon from '@mui/icons-material/PanTool';
import { DocumentScanner, Fingerprint} from '@mui/icons-material';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { Box } from '@mui/material';

export default function Procedure() {
  return (
    <Box textAlign='center'>
        <Typography variant="h4" component="span" fontWeight='bold'>Procedure</Typography>
        <Timeline position="alternate">
        <TimelineItem>
            <TimelineSeparator>
            <TimelineDot color="warning">
                <Fingerprint sx={{fontSize: 40}}/>
            </TimelineDot>
            <TimelineConnector sx={{height: 100}}/>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
                Biometrics
            </Typography>
            <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Typography>
            </TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineSeparator>
            <TimelineDot color="primary">
            <PanToolIcon sx={{fontSize: 40}}/>
            </TimelineDot>
            <TimelineConnector color='success'  sx={{height: 100}}/>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
                Attendance
            </Typography>
            <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Typography>
            </TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineSeparator>
            <TimelineDot color="success" variant="outlined">
                <PaymentsOutlinedIcon sx={{fontSize: 40}}/>
            </TimelineDot>
            <TimelineConnector sx={{height: 100 }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
                Payment
            </Typography>
            <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Typography>
            </TimelineContent>
        </TimelineItem>
        <TimelineItem>
            <TimelineSeparator>
            <TimelineDot sx={{
                backgroundColor: '#f44336'
            }}>
                <DocumentScanner sx={{fontSize: 40}}/>
            </TimelineDot>
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
                Clearance
            </Typography>
            <Typography>Download Clearance in PDF file with Signature</Typography>
            </TimelineContent>
        </TimelineItem>
        </Timeline>
    </Box>
  );
}