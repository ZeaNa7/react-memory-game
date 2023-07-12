import React, { useState, FormEvent } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StartComponent: React.FC = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        navigate(`/game?firstName=${encodeURIComponent(firstName)}`);
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="text-center">
                <Col>
                    <h1 className="display-2 font-weight-normal">Secret Memory Game</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label className='mb-3'>Enter your first name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="first name"
                                value={firstName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                                required
                                className='mb-3'
                            />
                        </Form.Group>
                        <Button variant="warning" size="lg" type="submit">
                            Start
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default StartComponent;
