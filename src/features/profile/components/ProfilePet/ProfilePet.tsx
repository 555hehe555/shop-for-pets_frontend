import Button from "@/ui/Button/Button";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { styles } from "./ProfilePet.styles";
import { useState } from "react";
import { SlArrowUp } from "react-icons/sl";
import ConfirmDialog from "@/ui/ConfirmDialog/ConfirmDialog";
import { PetModal } from "../PetModal/PetModal";

interface PetData {
  id?: number;
  name: string;
  species: string;
  dateOfBirth: string;
}

export function ProfilePet() {
  const [petsData, setPetsData] = useState<PetData[]>([
    {
      id: 1,
      name: "Buddy",
      species: "Dog",
      dateOfBirth: "2018-05-15",
    },
  ]);

  const [newPet, setNewPet] = useState<Omit<PetData, "id">>({
    name: "",
    species: "",
    dateOfBirth: "",
  });

  function handleAddPet(newPet: PetData) {
    setPetsData((prevPets) => [...prevPets, newPet]);
    setNewPet({ name: "", species: "", dateOfBirth: "" });
  }

  function handlePetInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNewPet((prevPet) => ({ ...prevPet, [name]: value }));
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const closeAndLogoutDialog = () => {
    closeDialog();
    // deletePet
  };

  return (
    <>
      <Box sx={styles.profileContainer}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography className="tableTitle" component="h3">
            Мої домашні улюбленці
          </Typography>
          <Button
            variant="secondary"
            size="sm"
            className="addPetButton"
            onClick={openModal}
          >
            Додати тварину
          </Button>
        </Box>

        {petsData.map((pet, index) => (
          <Accordion key={index}>
            <AccordionSummary
              className="tableTitle"
              aria-controls="pet-data-content"
              id="pet-data-header"
              expandIcon={<SlArrowUp />}
            >
              <Typography className="petName">{pet.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="petInfo">
                <Typography className="petSpecies">{pet.species}</Typography>
                <Typography className="petDateOfBirth">
                  {pet.dateOfBirth}
                </Typography>
              </Box>
            </AccordionDetails>
            <AccordionActions>
              <Button
                variant="secondary"
                size="sm"
                className="button"
                onClick={() => { }}
              >
                Змінити
              </Button>
              <Button
                variant="tertiary"
                size="sm"
                className="button"
                onClick={() => {
                  setPetsData((prevPets) =>
                    prevPets.filter((p) => p.id !== pet.id),
                  );
                }}
              >
                Видалити
              </Button>
            </AccordionActions>
          </Accordion>
        ))}
      </Box>

      <ConfirmDialog
        question="Ви впевнені, що хочете вийти?"
        isDialogOpen={isDialogOpen}
        onCancel={closeDialog}
        onConfirm={closeAndLogoutDialog}
      />

      <PetModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}
