import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { styles } from "./ProfileUser.styles";
import { useState } from "react";
import { SlArrowUp } from "react-icons/sl";
import { useAuth } from "@/features/auth/context/AuthContext";
import ConfirmDialog from "@/ui/ConfirmDialog/ConfirmDialog";

export function ProfileUser() {
  const [isEditing, setIsEditing] = useState(false);
  const [personalData, setPersonalData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    dateOfBirth: "1990-01-01",
  });

  const { logoutUser } = useAuth();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const closeAndLogoutDialog = () => {
    closeDialog();
    logoutUser();
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setPersonalData((prevData) => ({ ...prevData, [name]: value }));
  }

  return (
    <>
      <Box sx={styles.profileContainer}>
        <Typography className="pageTitle" component="h2">
          Профіль користувача
        </Typography>

        <Accordion
          slotProps={{
            heading: { component: "h3" },
            transition: { unmountOnExit: true },
          }}
          className="accordion"
        >
          <AccordionSummary
            className="tableTitle"
            aria-controls="personal-data-content"
            id="personal-data-header"
            expandIcon={<SlArrowUp />}
          >
            Особисті дані
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={styles.tableContainer}>
              <Box className="tableInfo">
                <Typography className="tableLabel">Повне ім'я</Typography>

                {isEditing ? (
                  <Input
                    inputSize="sm"
                    name="fullName"
                    value={personalData.fullName}
                    className="tableInput"
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography className="tableValue">
                    {personalData.fullName}
                  </Typography>
                )}
              </Box>
              <Divider />

              <Box className="tableInfo">
                <Typography className="tableLabel">Електронна пошта</Typography>

                {isEditing ? (
                  <Input
                    inputSize="sm"
                    name="email"
                    value={personalData.email}
                    className="tableInput"
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography className="tableValue">
                    {personalData.email}
                  </Typography>
                )}
              </Box>
              <Divider />

              <Box className="tableInfo">
                <Typography className="tableLabel">Номер телефону</Typography>

                {isEditing ? (
                  <Input
                    inputSize="sm"
                    name="phone"
                    value={personalData.phone}
                    className="tableInput"
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography className="tableValue">
                    {personalData.phone}
                  </Typography>
                )}
              </Box>
              <Divider />

              <Box className="tableInfo">
                <Typography className="tableLabel">Дата народження</Typography>

                {isEditing ? (
                  <Input
                    inputSize="sm"
                    name="dateOfBirth"
                    value={personalData.dateOfBirth}
                    className="tableInput"
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography className="tableValue">
                    {personalData.dateOfBirth}
                  </Typography>
                )}
              </Box>
            </Box>
          </AccordionDetails>
          <AccordionActions>
            <Button
              size="sm"
              variant="tertiary"
              className="logoutButton"
              onClick={openDialog}
            >
              Logout
            </Button>
            {isEditing ? (
              <Button
                variant="secondary"
                size="sm"
                className="editButton"
                onClick={() => setIsEditing(false)}
              >
                Зберегти
              </Button>
            ) : (
              <Button
                variant="tertiary"
                size="sm"
                className="editButton"
                onClick={() => setIsEditing(true)}
              >
                Змінити
              </Button>
            )}
          </AccordionActions>
        </Accordion>
      </Box>

      <ConfirmDialog
        question="Ви впевнені, що хочете вийти?"
        isDialogOpen={isDialogOpen}
        onCancel={closeDialog}
        onConfirm={closeAndLogoutDialog}
      />
    </>
  );
}
