import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import React from "react";
import {useNavigate} from "react-router-dom";

const MyAccountCardComp = ({topic}) => {
    const nav = useNavigate()
    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <div style={{ width: 340, margin: 'auto' }}>
            <Card shadow="sm" p="lg">
                <Card.Section>
                    <Image src={topic.photo[0]} height={160} alt="Norway" />
                </Card.Section>

                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                    <Text weight={500}>{topic.title}</Text>
                    {topic.posts.length > 0 &&
                    <Badge color="green" variant="light">
                        Active
                    </Badge>
                    }
                    {topic.posts.length === 0 &&
                    <Badge color="red" variant="light">
                        Not active
                    </Badge>
                    }


                </Group>

                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                    {topic.description}
                </Text>

                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}
                onClick={() => nav('/topic/'+topic._id)}
                >
                    Visit your topic
                </Button>
            </Card>
        </div>
    );
}

export default MyAccountCardComp