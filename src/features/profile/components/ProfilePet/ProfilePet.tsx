import Button from "@/ui/Button/Button";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { styles } from "./ProfilePet.styles";
import { useEffect, useState } from "react";
import { SlArrowUp } from "react-icons/sl";
import ConfirmDialog from "@/ui/ConfirmDialog/ConfirmDialog";
import { PetModal, type PetFormValues } from "../PetModal/PetModal";
import { usePets } from "@/queries/profile/useProfileQueries";
import { getPetById } from "@/features/profile/api/petApi";
import type { PetRequest, Species } from "@/types/api";
import {
  useCreatePet,
  useDeletePet,
} from "@/queries/profile/useProfileMutations";
import { fetchSpecies } from "@/features/catalog/api/catalogApi";
import Input from "@/ui/Input/Input";

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

  const [draft, setDraft] = useState<null | PetFormValues>(null);

  const [editingId, setEditingId] = useState<null | number>(null);

  useEffect(() => {
    async function fetchPetData() {
      if (editingId !== null) {
        const petData = await getPetById(editingId);
        setDraft({
          name: petData.name,
          species: petData.species,
          birthday: petData.birthday || "",
        });
      } else {
        setDraft(null);
      }
    }
    fetchPetData();
  }, [editingId]);

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
                <Box sx={styles.tableContainer}>
                  <Box className="tableInfo">
                    <Typography className="tableLabel">
                      Кличка улюбленця
                    </Typography>

                    {editingId ? (
                      <Input
                        id="pet-name"
                        type="text"
                        name="name"
                        placeholder="кличка вашої тваринки"
                        value={draft?.name}
                        onChange={handlePetInputChange}
                      />
                    ) : (
                      <Typography className="tableValue">
                        {draft?.name || pet.name}
                      </Typography>
                    )}
                  </Box>
                  <Divider />
                  
                </Box>
              </AccordionDetails>
              <AccordionActions>
                <Button
                  variant="secondary"
                  size="sm"
                  className="button"
                  onClick={() => setEditingId(editingId === pet.id ? null : pet.id)}
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
        handleSpecies={handleSpecies}
        speciesData={speciesData}
      />
    </>
  );
}
