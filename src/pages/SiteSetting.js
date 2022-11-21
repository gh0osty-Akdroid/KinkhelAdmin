import React, { useEffect, useState } from 'react'
import { Card, Image, Text, Badge, Button, Group, Grid } from '@mantine/core';
import { adminTokenUrl, ImgUrl } from '../Urls';
import { fetchSiteSuccess } from '../action/SiteSetting';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import ErrorHandler from '../components/ErrorHandler';
import { Title } from '../components/Header';
import styled from 'styled-components';

const SiteSetting = () => {

    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(() => {
        Title('Sites')
        adminTokenUrl().get('/site-config').then((res) => {
            setData(res?.data?.data)
        }).catch(err=>ErrorHandler(err))
    })


    const handleAddSite = (e) => {
        if (confirm("Are you sure you want to select this site?")) {
            dispatch(fetchSiteSuccess(e))
            history('/')
        }
    }
    const token = useSelector(p => p?.token?.token)

    return (
        <>{token ?
            <Page>
                <div className='text-center text-white'>
                    <H2>Please Select Your Site</H2>

                </div>
            <Grid className='p-5'>
                {data.length > 0 ?
                    data.map((e, i) =>
                        <Grid.Col sm={3} key={i}>
                            <Card shadow="sm" p="sm" radius="md" withBorder className='bg-secondary-dark-bg text-white'>
                                <Card.Section >
                                    <Image
                                        src={`${ImgUrl}${e.logo}`}
                                        height={160}
                                        alt={e.site_region}
                                    />
                                </Card.Section>
                                <Group position="center" mt="md" mb="xs">
                                    <Text weight={500}>{e.sitename}</Text>
                                    <Text size="sm" color="dimmed">
                                        ({e.site_region})
                                    </Text>
                                </Group>
                                <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={() => { handleAddSite(e) }}>
                                    Select this site
                                </Button>
                            </Card>
                        </Grid.Col>
                    )
                    : <p>No sites are available.</p>
                }

            </Grid>
            </Page>
            
             : <Navigate to={'/login'} />
        }

        </>
    )
}

export default SiteSetting


const Page = styled.div`
  height: 100vh;
  font-family: Roboto, sans-serif;
  background: gray;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
`;


const H2 = styled.h2`	margin: 1em 0 0.5em 0;
color: #343434;
font-weight: normal;
font-size: 30px;
line-height: 40px;
font-family: 'Orienta', sans-serif;7;
`;