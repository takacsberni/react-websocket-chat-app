import {
    Box,
    Container,
    Divider,
    FormControl,
    Grid, IconButton,
    List,
    ListItem,
    ListItemText,
    Paper, TextField,
    Typography
} from "@mui/material";
import {Fragment, useEffect, useRef, useState} from "react";
import {ChatMessagesDto} from "../../model/ChatMessagesDto";
import './chat.css';
import SendIcon from '@mui/icons-material/Send';

export default function Chat(){

    const webSocket = useRef(null);

    const [chatMessages, setChatMessages] = useState([]);
    const listChatMessages = chatMessages.map( (chatMessageDto, index) =>
        <ListItem key={index}>
            <ListItemText primary={`${chatMessageDto.user}: ${chatMessageDto.message}`} />
        </ListItem>
    );
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");

    useEffect( () => {
        console.log("Opening websocket");
        webSocket.current = new WebSocket('ws://localhost:8080');
        webSocket.current.onopen = (event) => {
            console.log('Fronted message: Opened event: ', event);
        }
        webSocket.current.onclose = (event) => {
            console.log('Fronted message: Closed event: ', event);
        }
        return () => {
            if (webSocket.current.readyState === 1) { // <-- This is important
                webSocket.current.close();
                console.log("Closing websocket");
            }
        }
    }, []);

    useEffect( () => {
        webSocket.current.onmessage = (event) => {
            const chatMessageDto = JSON.parse(event.data);
            setChatMessages([...chatMessages, {
                user: chatMessageDto.user,
                message: chatMessageDto.message
            }]);
        }
    }, [chatMessages]);

    const handleUserChange = (e) => {
        setUser(e.target.value);
    }
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = ()=> {
        if (user !== "" && message !== ""){
            console.log(`Button works, user, message: ${user}, ${message}`);
            try {
                webSocket.current.send(
                    JSON.stringify(new ChatMessagesDto(user, message))
                );
            } catch (err){
                console.log(err.message);
            }
            setMessage('');
        }
    }

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
                            <Grid item id="chat-window" xs={12}>
                                <List id="chat-window-messages">
                                    {listChatMessages}
                                </List>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={user}
                                        label="Username"
                                        variant="standard"
                                        onChange={handleUserChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={9}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={message}
                                        label="Here comes your message: "
                                        variant="standard"
                                        onChange={handleMessageChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton
                                    aria-label="send"
                                    color="primary"
                                    onClick={sendMessage}
                                >
                                    <SendIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>

                </Paper>
            </Container>
        </Fragment>
    );
}
