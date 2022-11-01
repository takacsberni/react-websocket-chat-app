import {Box, Container, Divider, Grid, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {Fragment, useState} from "react";

export default function Chat(){

    const [chatMessages, setChatMessages] = useState([]);
    const listChatMessages = chatMessages.map( (chatMessageDto, index) =>
        <ListItem key={index}>
            <ListItemText primary={`${chatMessageDto.user}: ${chatMessageDto.message}`} />
        </ListItem>
    );

    return (
        <Fragment>
            <Container>
                {/*Container centers everything horizontally*/}
                <Paper elevation={5}>
                    <Box p={3}>
                        <Typography variant="h4" gutterBottom>
                            Happy Chatting!
                        </Typography>
                        <Divider />
                        <Grid container spacing={4} alignItems="center">
                            <Grid item>
                                <List>
                                    {listChatMessages}
                                </List>
                            </Grid>
                            <Grid item></Grid>
                            <Grid item></Grid>
                            <Grid item></Grid>
                        </Grid>
                    </Box>

                </Paper>
            </Container>
        </Fragment>
    );
}
