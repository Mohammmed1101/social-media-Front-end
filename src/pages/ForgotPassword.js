import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useContext } from "react"
import PostsContext from '../utils/PostsContext';


const theme = createTheme()

export default function ForgotPassword() {
    const { errorForgetPassword, forgetPassword, successForgetPassword } = useContext(PostsContext)


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>

                    {/* _____________________________Alert success____________________________________ */}
                    {successForgetPassword !== null && !errorForgetPassword ? <Alert severity="success">{successForgetPassword}</Alert> : null}
                    {/* _____________________________Alert error____________________________________ */}
                    {errorForgetPassword !== null ? <Alert severity="error">{errorForgetPassword}</Alert> : null}

                    {/* if(errorForgetPassword !== null || !message) */}
                    <Box component="form" noValidate onSubmit={forgetPassword} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="text"
                                    label="Email or Username"
                                    name="emailOrUsername"

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 1 }}
                                >
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container >
        </ThemeProvider >

    )
}



