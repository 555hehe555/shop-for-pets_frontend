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
import { useGetMe } from "@/queries/auth/useAuthQueries";
import type { PatchedUpdateCustomUserRequest } from "@/types/api";
import { useUpdateUser } from "@/queries/auth/useAuthMutations";

export function ProfileUser() {
  const { data: userData } = useGetMe();

  const [draft, setDraft] = useState<null | PatchedUpdateCustomUserRequest>(
    null,
  );

  const isEditing = draft !== null;

  function startEditing() {
    if (userData) {
      setDraft({
        full_name: userData?.full_name,
        email: userData?.email,
        phone_number: userData?.phone_number,
        date_of_birth: userData?.date_of_birth,
      });
    }
  }

  const { logoutUser } = useAuth();

  const { mutate: updateUser } = useUpdateUser();

  const values = draft;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const closeAndLogoutDialog = () => {
    closeDialog();
    logoutUser();
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((prevData) =>
      prevData ? { ...prevData, [name]: value } : prevData,
    );
  }

  function handleSave() {
    if (values && userData && userData.id) {
      updateUser({ id: userData.id, inData: values });

      setDraft(null);
    }
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
                    name="full_name"
                    value={values?.full_name}
                    className="tableInput"
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography className="tableValue">
                    {userData?.full_name}
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
                    value={values?.email}
                    className="tableInput"
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography className="tableValue">
                    {userData?.email}
                  </Typography>
                )}
              </Box>
              <Divider />

              <Box className="tableInfo">
                <Typography className="tableLabel">Номер телефону</Typography>

                {isEditing ? (
                  <Input
                    inputSize="sm"
                    name="phone_number"
                    value={values?.phone_number ?? ""}
                    className="tableInput"
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography className="tableValue">
                    {userData?.phone_number}
                  </Typography>
                )}
              </Box>
              <Divider />

              <Box className="tableInfo">
                <Typography className="tableLabel">Дата народження</Typography>

                {isEditing ? (
                  <Input
                    inputSize="sm"
                    type="date"
                    name="date_of_birth"
                    value={values?.date_of_birth ?? ""}
                    className="tableInput"
                    onChange={handleInputChange}
                  />
                ) : (
                  <Typography className="tableValue">
                    {userData?.date_of_birth}
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
                onClick={handleSave}
              >
                Зберегти
              </Button>
            ) : (
              <Button
                variant="tertiary"
                size="sm"
                className="editButton"
                onClick={startEditing}
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
