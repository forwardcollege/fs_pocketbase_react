import React, { useState, useMemo } from 'react';
import { Card, Container, Group, Button, Space, Title, Grid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';

import Claims from '../../modules/Claims';

const pb = new PocketBase('https://nathanonn-special-telegram-7r64v976jq2xxq7-8090.preview.app.github.dev');

const Dashboard = () => {
    const navigate = useNavigate();

    const isLoggedIn = useMemo(() => {
        return pb.authStore.isValid;
    },[ pb.authStore.isValid ]);

    return (
    <Container
        size="md"
        pt="60px"
        pb="45px"
        >
        <Title order={2} align="center">
            Your Claim(s)
        </Title>
        <Space h="md" />
        <Card
            shadow="sm"
            padding="md"
            >

            { isLoggedIn ? (
                <Claims />
            ) : (
            <Grid
                align={"center"}
                sx={() => ({
                    minHeight: '300px',
                })}
                >
                <Grid.Col 
                    span={6}
                    align="center"
                    >
                    <Title order={4} align="center">
                        If you have an account, please login.
                    </Title>
                    <Space h="md" />
                    <Button
                        variant="outline"
                        color="blue"
                        onClick={() => navigate('/login')}
                        >
                        Login
                    </Button>
                </Grid.Col>
                <Grid.Col
                    span={6}
                    align="center">
                    <Title order={4} align="center">
                        If you don't have an account, please sign up.
                    </Title>
                    <Space h="md" />
                    <Button
                        variant="outline"
                        color="blue"
                        onClick={() => navigate('/signup')}
                        >
                        Sign Up
                    </Button>
                </Grid.Col>
            </Grid>
            ) }

        </Card>
        { isLoggedIn && (
            <Group position="center" mt="lg">
                <Button
                    variant="subtle"
                    color="gray"
                    onClick={() => {
                        pb.authStore.clear();
                        navigate('/');
                    }}
                    >
                    Logout
                </Button>
            </Group>
        ) }
    </Container>
    );
}

export default Dashboard;