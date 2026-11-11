import Button from "@/ui/Button/Button";
import { Box, Typography } from "@mui/material";
import { styles } from "./ProfilePet.styles";
import { useEffect, useState } from "react";
import ConfirmDialog from "@/ui/ConfirmDialog/ConfirmDialog";
import { PetModal, type PetFormValues } from "../PetModal/PetModal";
import { usePets } from "@/queries/profile/useProfileQueries";
import type { PetRequest, Species } from "@/types/api";
import {
  useCreatePet,
  useDeletePet,
} from "@/queries/profile/useProfileMutations";
import { fetchSpecies } from "@/features/catalog/api/catalogApi";
import { AccordionPetItem } from "../AccordionPetItem/AccordionPetItem";

export function ProfilePet() {
  const { data: petsData } = usePets();
  const { mutate: createPet } = useCreatePet();
  const { mutate: deletePet } = useDeletePet();

  const [newPet, setNewPet] = useState<PetFormValues>({
    name: "",
    species: 0,
    birthday: "",
  });

  const [speciesData, setSpeciesData] = useState<Species[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState<number | null>(null);

  useEffect(() => {
    async function getSpecies() {
      const arrSpecies = await fetchSpecies();
      setSpeciesData(arrSpecies);
    }
    getSpecies();
  }, []);

  const resetNewPet = () => {
    setNewPet({ name: "", species: 0, birthday: "" });
  };

  function handleSpecies(speciesId: number) {
    setNewPet((prevPet) => ({ ...prevPet, species: speciesId }));
  }

  function handleAddPet(petData: PetRequest) {
    const inData: Omit<PetRequest, "id"> = {
      name: petData.name.trim(),
      species: petData.species,
      ...(petData.birthday ? { birthday: petData.birthday } : {}),
    };

    createPet({ inData });
    resetNewPet();
  }

  function handlePetInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNewPet((prevPet) => ({ ...prevPet, [name]: value }));
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    resetNewPet();
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setPetToDelete(null);
  };

  const openDeleteDialog = (id?: number) => {
    if (id !== undefined) {
      setPetToDelete(id);
      setIsDialogOpen(true);
    }
  };

  const confirmDeletePet = () => {
    if (petToDelete !== null) {
      deletePet({ id: petToDelete });
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
            <AccordionPetItem
              key={pet.id}
              pet={pet}
              index={index}
              openDeleteDialog={openDeleteDialog}
              speciesData={speciesData}
            />
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
        handleSpecies={handleSpecies}
        speciesData={speciesData}
      />
    </>
  );
}
