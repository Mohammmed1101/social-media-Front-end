import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Col, Row } from 'react-bootstrap';

export default function userFoundProf() {
    return (
        <Row className='container mt-3'>

            <Col className='row d-flex  justify-content-center'>
                <Col className="col-md-10">
                    <Col className="card  py-4">
                        <Stack spacing={1}>

                            <Col> <Skeleton sx={{
                                textAlign: "center",
                                height: "100%",
                                width: "100%"
                            }} variant="circular" width={100} height={80} /></Col>
                            <Col><Skeleton variant="rectangular" width={600} height={300} /></Col>

                        </Stack>

                    </Col>
                </Col>
            </Col>
        </Row>
    );
}