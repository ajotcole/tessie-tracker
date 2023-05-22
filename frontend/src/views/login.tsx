import { UnlockIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../api/loginService';
import { AuthContext } from '../auth/authContext';

export const Login = () => {
  // TODO add correct check for empty fields
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(' ');
  const [password, setPassword] = useState<string>(' ');
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string>();
  const handleClick = () => setShow(!show);

  const { setAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = async () => {
    try {
      setIsLoading(true);
      await AuthService.login({
        email,
        password,
      });

      setIsLoading(false);
      setAuthenticated(true);
      navigate('/map');
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setError('An error occured during login, please check the console');
    }
  };

  return (
    <Center h="100vh">
      <Card minW="sm">
        <CardHeader>
          <Heading size="lg">Tessie Tracker v2 - Login</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={3}>
            <Input isInvalid={!email} placeholder="E-Mail" onChange={(event) => setEmail(event.target.value)} />
            <InputGroup size="md">
              <Input
                isInvalid={!password}
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {error && (
              <>
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Your credentials are incorrect!</AlertTitle>
                </Alert>
              </>
            )}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              isLoading={isLoading}
              leftIcon={<UnlockIcon />}
              variant="solid"
              colorScheme="red"
              onClick={() => {
                if (!!email && !!password) {
                  login();
                } else {
                  console.error('Credentials empty');
                }
              }}
            >
              Login
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={() => window.open('/register', '_self')} isDisabled={isLoading}>
              Signup
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Center>
  );
};
