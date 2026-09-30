import Main from "@/components/layout/Main/Main";
import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import { Box, Divider, Typography } from "@mui/material";
import { styles } from "./ProfilePage.styles";

export function ProfilePage() {
  return (
    <Main>
      <Box sx={styles.profileContainer}>
        <Typography component="h1">Profile page</Typography>
        <Divider></Divider>

        <Box>
          <Box className="mainInfo">
            <Box>
              <img
                src="https://nerdik.club/content/images/41/310x189l85nn0/copy_nabir-hralnykh-kubykiv-chessex-marble-polyhedral-oxi-copper-white-7-die-set-59787158102035.jpg"
                alt="user image"
              />
              <Typography component="h2">Username</Typography>
            </Box>

            <Box>
              <Button>change image</Button>
            </Box>
          </Box>
        </Box>
        <Divider></Divider>

        <Box className="tableContainer">
          <Box className="tableInfo">
            <Typography component="h3" sx={{ fontSize: "16px" }}>
              sdsfg
            </Typography>
            <Typography component="h3" sx={{ fontSize: "16px" }}>
              sdsfg
            </Typography>
            <Typography component="h3" sx={{ fontSize: "16px" }}>
              sdsfg
            </Typography>
            <Typography component="h3" sx={{ fontSize: "16px" }}>
              sdsfg
            </Typography>
            <Typography component="h3" sx={{ fontSize: "16px" }}>
              sdsfg
            </Typography>
          </Box>
          <Box className="tableInfo">
            <Input
              value="hello"
              inputSize="manual"
              sx={{ fontSize: "16px" }}
              disabled
            />
            <Input
              value="hello"
              inputSize="manual"
              sx={{ fontSize: "16px" }}
              disabled
            />
            <Input
              value="hello"
              inputSize="manual"
              sx={{ fontSize: "16px" }}
              disabled
            />
            <Input
              value="hello"
              inputSize="manual"
              sx={{ fontSize: "16px" }}
              disabled
            />
            <Input
              value="hello"
              inputSize="manual"
              sx={{ fontSize: "16px" }}
              disabled
            />
          </Box>
          <Box className="tableInfo">
            <Button variant="text" size="manual">
              change
            </Button>
            <Button variant="text" size="manual">
              change
            </Button>
            <Button variant="text" size="manual">
              change
            </Button>
            <Button variant="text" size="manual">
              change
            </Button>
            <Button variant="text" size="manual">
              change
            </Button>
          </Box>
        </Box>
      </Box>
    </Main>
  );
}
