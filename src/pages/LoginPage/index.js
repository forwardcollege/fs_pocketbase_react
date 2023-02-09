import React, { useState, useMemo } from 'react';
import { Card, Container, PasswordInput, Space, Title, Button, TextInput, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';

const LoginPage = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);

    const disabled = useMemo(() => {
        return loading;
    }, [loading]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            setLoading(false);
            showNotification({
                title: 'Success',
                message: 'You have successfully logged in.',
                color: 'green',
                icon: <i className="bi bi-check-circle"></i>
            });
            navigate('/');
        } catch (error) {
            setLoading(false);
            showNotification({
                title: 'Error',
                message: error.message,
                color: 'red',
                icon: <i className="bi bi-x-circle"></i>
            });
        }
    }

    return (
    <Container
        size="xs"
        pt="60px"
        pb="45px"
        >
        <Card 
            shadow="sm" padding="md">
            <Title order={3} align="center">Login</Title>
            <Space h="md" />
            <TextInput
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                disabled={disabled}
            />
            <Space h="md" />
            <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                disabled={disabled}
            />
            <Space h="md" />
            <Button
                fullWidth
                variant="filled"
                color="blue"
                loading={loading}
                onClick={handleSubmit}>
                Sign Up
            </Button>
        </Card>
        <Group
            mt="lg"
            position='apart'
            >   
            <Button
                variant='subtle'
                color='blue'
                onClick={() => navigate('/')}
                leftIcon={<i className="bi bi-arrow-left"></i>}
                disabled={disabled}
                >
                Go back
            </Button>
            <Button
                variant='subtle'
                color='blue'
                rightIcon={<i className="bi bi-arrow-right"></i>}
                onClick={() => navigate('/signup')}
                disabled={disabled}
                >
                Don't have an account? Sign up here
            </Button>
        </Group>

    </Container>
    );
}

export default LoginPage;