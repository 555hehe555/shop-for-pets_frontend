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
import { usePets } from "@/queries/profile/useProfileQueries";
import type { Pet, PetRequest } from "@/types/api";
import { useCreatePet } from "@/queries/profile/useProfileMutations";

const species = ["Dogs", "Cats", "Birds", "Fish", "Small Pets", "Reptiles"];

export function ProfilePet() {
  const { data: petsData } = usePets();

  const { mutate: createPet } = useCreatePet();

  const [newPet, setNewPet] = useState<Omit<Pet, "id" | "owner">>({
    name: "",
    species: 0,
    birthday: "",
  });

  function handleAddPet(petData: PetRequest) {
    createPet({ inData: petData });
    setNewPet({ name: "", species: "", dateOfBirth: "" });
  }

  function handlePetInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNewPet((prevPet) => ({ ...prevPet, [name]: value }));
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewPet({ name: "", species: "", dateOfBirth: "" });
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState<number | null>(null);

  const openDeleteDialog = (id?: number) => {
    if (id !== undefined) {
      setPetToDelete(id);
      setIsDialogOpen(true);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setPetToDelete(null);
  };

  const confirmDeletePet = () => {
    if (petToDelete !== null) {
      setPetsData((prevPets) => prevPets.filter((p) => p.id !== petToDelete));
    }
    closeDialog();
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

        {petsData ? (
          petsData.map((pet, index) => (
            <Accordion key={pet.id ?? index}>
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
                    {pet.birthday}
                  </Typography>
                </Box>
              </AccordionDetails>
              <AccordionActions>
                <Button
                  variant="secondary"
                  size="sm"
                  className="button"
                  onClick={() => {}}
                >
                  Змінити
                </Button>
                <Button
                  variant="tertiary"
                  size="sm"
                  className="button"
                  onClick={() => openDeleteDialog(pet.id)}
                >
                  Видалити
                </Button>
              </AccordionActions>
            </Accordion>
          ))
        ) : (
          <Typography component="h3" variant="h3">
            У вас поки нема домашніх улюбленців
          </Typography>
        )}
      </Box>

      <ConfirmDialog
        question="Ви впевнені, що хочете видалити тваринку?"
        isDialogOpen={isDialogOpen}
        onCancel={closeDialog}
        onConfirm={confirmDeletePet}
      />

      <PetModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        newPet={newPet}
        handleAddPet={handleAddPet}
        handlePetInputChange={handlePetInputChange}
      />
    </>
  );
}
