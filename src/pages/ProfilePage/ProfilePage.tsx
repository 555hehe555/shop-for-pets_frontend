import Main from "@/components/layout/Main/Main";
import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Radio,
  Typography,
} from "@mui/material";
import { styles } from "./ProfilePage.styles";
import { useState } from "react";
import { SlArrowUp } from "react-icons/sl";
import { useAuth } from "@/features/auth/context/AuthContext";
import ConfirmDialog from "@/ui/ConfirmDialog/ConfirmDialog";
import Modal from "@/ui/Modal/Modal";

interface PetData {
  id?: number;
  name: string;
  species: string;
  dateOfBirth: string;
}

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [personalData, setPersonalData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    dateOfBirth: "1990-01-01",
  });

  const [petsData, setPetsData] = useState<PetData[]>([
    {
      id: 1,
      name: "Buddy",
      species: "Dog",
      dateOfBirth: "2018-05-15",
    },
  ]);

  const { logoutUser } = useAuth();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => setIsDialogOpen(false);

  const closeAndLogoutDialog = () => {
    closeDialog();
    logoutUser();
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setPersonalData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleAddPet(newPet: PetData) {
    setPetsData((prevPets) => [...prevPets, newPet]);
  }

  return (
    <Main>
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
              variant="primary"
              size="sm"
              className="addPetButton"
              onClick={() =>
                handleAddPet({
                  name: "New Pet",
                  species: "Species",
                  dateOfBirth: "2020-01-01",
                })
              }
            >
              Додати тварину
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

        <Divider />

        <Typography className="tableTitle" component="h3">
          Мої домашні улюбленці
        </Typography>

        {/* {petsData.map((pet, index) => ())} */}

        <Button
          size="sm"
          variant="tertiary"
          className="logoutButton"
          onClick={() => setIsDialogOpen(true)}
        >
          Logout
        </Button>
      </Box>

      <ConfirmDialog
        question="Ви впевнені, що хочете вийти?"
        isDialogOpen={isDialogOpen}
        onCancel={closeDialog}
        onConfirm={closeAndLogoutDialog}
      />

      <Modal onClose={() => {}} isOpen={true}>
        <Box sx={{ backgroundColor: "white" }}>
          <Box component="form" sx={styles.form} action={() => {}}>
            <Typography variant="h2" component="h2" sx={styles.title}>
              Login
            </Typography>

            <Box sx={styles.field}>
              <Typography component="label" sx={styles.label}>
                кличка вашої тваринки
              </Typography>
              <Input
                type="text"
                name="name"
                placeholder="кличка вашої тваринки"
              />
            </Box>

            <Box sx={styles.field}>
              <Typography component="label" sx={styles.label}>
                {/* species: "Dog", */}
                Вид
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  <Radio
                    checked={true}
                    onChange={() => {}}
                    value="a"
                    name="radio-buttons"
                    slotProps={{ input: { "aria-label": "A" } }}
                  />
                  <Typography component="span" sx={{ fontSize: "16px" }}>
                    Dog
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  <Radio
                    checked={false}
                    onChange={() => {}}
                    value="b"
                    name="radio-buttons"
                    slotProps={{ input: { "aria-label": "B" } }}
                  />
                  <Typography component="span" sx={{ fontSize: "16px" }}>
                    Cat
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={styles.field}>
              <Typography component="label" sx={styles.label}>
                Дата народження
              </Typography>
              <Input
                type="text"
                name="dateOfBirth"
                placeholder="Дата народження"
              />
            </Box>

            <Button
              size="md"
              type="submit"
              style={{ alignSelf: "center", minWidth: 180 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Modal>
    </Main>
  );
}

// <Box className="tableInfo">
//             <Typography component="h3" sx={{ fontSize: "16px" }}>
//               sdsfg
//             </Typography>
//             <Typography component="h3" sx={{ fontSize: "16px" }}>
//               sdsfg
//             </Typography>
//             <Typography component="h3" sx={{ fontSize: "16px" }}>
//               sdsfg
//             </Typography>
//             <Typography component="h3" sx={{ fontSize: "16px" }}>
//               sdsfg
//             </Typography>
//             <Typography component="h3" sx={{ fontSize: "16px" }}>
//               sdsfg
//             </Typography>
//           </Box>
//           <Box className="tableInfo">
//             <Input
//               value="hello"
//               inputSize="manual"
//               sx={{ fontSize: "16px" }}
//               disabled
//             />
//             <Input
//               value="hello"
//               inputSize="manual"
//               sx={{ fontSize: "16px" }}
//               disabled
//             />
//             <Input
//               value="hello"
//               inputSize="manual"
//               sx={{ fontSize: "16px" }}
//               disabled
//             />
//             <Input
//               value="hello"
//               inputSize="manual"
//               sx={{ fontSize: "16px" }}
//               disabled
//             />
//             <Input
//               value="hello"
//               inputSize="manual"
//               sx={{ fontSize: "16px" }}
//               disabled
//             />
//           </Box>
//           <Box className="tableInfo">
//             <Button variant="text" size="manual">
//               change
//             </Button>
//             <Button variant="text" size="manual">
//               change
//             </Button>
//             <Button variant="text" size="manual">
//               change
//             </Button>
//             <Button variant="text" size="manual">
//               change
//             </Button>
//             <Button variant="text" size="manual">
//               change
//             </Button>
//           </Box>
