import {Fragment} from "react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';

export default function Bar() {
    return (
        <Fragment>
            <Box mb={4}>
                <AppBar position="static">
                    <Toolbar>
                        <Box mr={2}>
                            <ChatIcon fontSize={'large'}/>
                        </Box>
                        <Typography variant="h6">
                            React - Websocket Chat Application
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
    )
}
