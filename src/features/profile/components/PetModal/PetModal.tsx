import {
  Box,
  FormControl,
  FormGroup,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { styles } from "./PetModal.styles";
import Modal from "@/ui/Modal/Modal";
import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import type { PetRequest } from "@/types/api";

export type PetFormValues = Omit<PetRequest, "birthday"> & {
  birthday: string;
};

export interface PetModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  newPet: PetFormValues;
  handleAddPet: (newPet: PetRequest) => void;
  handlePetInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSpecies: (speciesId: number) => void;
  speciesData: { id: number; name: string }[];
}

export function PetModal({
  isModalOpen,
  closeModal,
  newPet,
  handleAddPet,
  handlePetInputChange,
  handleSpecies,
  speciesData,
}: PetModalProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    handleAddPet(newPet);
    closeModal();
  }

  return (
    <Modal onClose={closeModal} isOpen={isModalOpen}>
      <Box sx={{ backgroundColor: "white" }}>
        <Box component="form" sx={styles.form} onSubmit={handleSubmit}>
          <Typography variant="h2" component="h2" sx={styles.title}>
            Додати тваринку
          </Typography>
          <FormGroup sx={styles.formGroup}>
            <Box sx={styles.field}>
              <Typography
                component="label"
                htmlFor="pet-name"
                sx={styles.label}
              >
                кличка вашої тваринки
              </Typography>
              <Input
                id="pet-name"
                type="text"
                name="name"
                placeholder="кличка вашої тваринки"
                value={newPet.name}
                onChange={handlePetInputChange}
              />
            </Box>

            <Box sx={styles.field}>
              <Typography
                component="label"
                htmlFor="pet-species"
                sx={styles.label}
              >
                Вид
              </Typography>

              <FormControl fullWidth>
                <Select
                  id="pet-species"
                  name="species"
                  value={newPet.species || ""}
                  displayEmpty
                  onChange={(e) => handleSpecies(Number(e.target.value))}
                >
                  <MenuItem value="" disabled>
                    Виберіть вид тваринки
                  </MenuItem>

                  {speciesData.map((species) => (
                    <MenuItem key={species.id} value={species.id}>
                      {species.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={styles.field}>
              <Typography
                component="label"
                htmlFor="pet-birthday"
                sx={styles.label}
              >
                Дата народження
              </Typography>
              <Input
                id="pet-birthday"
                type="date"
                name="birthday"
                placeholder="Дата народження"
                value={newPet.birthday}
                onChange={handlePetInputChange}
              />
            </Box>
          </FormGroup>

          <Button size="md" type="submit" sx={styles.submitButton}>
            Додати
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
