import React, { useState, useMemo, useEffect } from 'react';
import { Box, Table, Group, Button, Space, Badge, LoadingOverlay, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { openConfirmModal } from '@mantine/modals';

import AddNewClaim from './add_new';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.REACT_APP_POCKETBASE_URL);

const Claims = () => {
    const [ claims, setClaims ] = useState([]);
    const [ loaded, setLoaded ] = useState(false);
    
    useEffect(() => {
        if (!loaded)
            getClaims();
    },[ loaded ]);

    const getClaims = async () => {
        setLoaded(false);
        try {
            const records = await pb.collection('claims').getFullList(200, {
                sort: '-created',
                filter: `user.id = "${pb.authStore.model.id}"`,
                $autoCancel: false
            });
            setClaims(records);
            setLoaded(true);
        } catch (error) {
            showNotification({
                title: 'Error',
                message: error.message,
                color: 'red',
                icon: <i className="bi bi-x-circle"></i>
            });
            setLoaded(true);
        }
    }

    const handleClaimDelete = (claim_id) => async () => {
        setLoaded(false);
        try {
            await pb.collection('claims').delete(claim_id);
            getClaims();
        } catch (error) {
            showNotification({
                title: 'Error',
                message: error.message,
                color: 'red',
                icon: <i className="bi bi-x-circle"></i>
            });
            setLoaded(true);
        }
    }

    const openDeleteModal = (claim_id) => () => openConfirmModal({
        title: 'Please confirm your action',
        centered: true,
        children: (
          <Text size="sm">
            Are you sure you want to delete this claim? This action cannot be undone.
          </Text>
        ),
        labels: { confirm: 'Delete', cancel: 'Cancel' },
        confirmProps: { color: 'red' },
        onCancel: () => {},
        onConfirm: handleClaimDelete(claim_id),
    });

    return (
    <Box>
        <LoadingOverlay
            visible={!loaded}
            />
        <AddNewClaim
            onRefresh={getClaims}
            />
        <Space h="md" />
        <Table>
            <thead>
                <tr>
                    <th>Submission Date</th>
                    <th>Approval Status</th>
                    <th>Receipt Date</th>
                    <th>Total Amount</th>
                    <th>Notes</th>
                    <th>Action(s)</th>
                </tr>
            </thead>
            <tbody>
            { claims.length > 0 ? claims.map(claim => (
                <tr key={claim.id}>
                    <td>{new Date(claim.created).toDateString()}</td>
                    <td>{ claim.approved ? <Badge color="green">Approved</Badge> : <Badge color="yellow">Pending</Badge> }</td>
                    <td>{new Date(claim.receipt_date).toDateString('YYYY-MM-DD')}</td>
                    <td>MYR {claim.total_amount}</td>
                    <td>{claim.notes}</td>
                    <td>
                        <Group position="center">
                            <Button
                                component='a'
                                href={ process.env.REACT_APP_POCKETBASE_URL +'api/files/'+claim.collectionId+'/'+claim.id+'/'+claim.receipt}
                                target={"_blank"}
                                variant="filled"
                                color="blue"
                                compact
                                leftIcon={<i className="bi bi-eye"></i>}
                                >View Receipt
                            </Button>
                            <Button
                                variant="filled"
                                color="red"
                                compact
                                leftIcon={<i className="bi bi-trash"></i>}
                                onClick={openDeleteModal(claim.id)}>
                                Delete
                            </Button>
                        </Group>
                    </td>
                </tr>
            )) : (
                <tr>
                    <td colSpan="6" align="center">No claims submitted yet.</td>
                </tr>
            ) }
            </tbody>
        </Table>
    </Box>
    );
}

export default Claims;