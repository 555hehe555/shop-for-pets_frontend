import { Box, FormGroup, Radio, Typography } from "@mui/material";
import { styles } from "./PetModal.styles";
import Modal from "@/ui/Modal/Modal";
import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import type { PetRequest } from "@/types/api";

export interface PetModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  newPet: Omit<PetRequest, "id">;
  handleAddPet: (newPet: PetRequest) => void;
  handlePetInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PetModal({
  isModalOpen,
  closeModal,
  newPet,
  handleAddPet,
  handlePetInputChange,
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
              <Typography component="label" sx={styles.label}>
                кличка вашої тваринки
              </Typography>
              <Input
                type="text"
                name="name"
                placeholder="кличка вашої тваринки"
                value={newPet.name}
                onChange={handlePetInputChange}
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
                    checked={newPet.species === "Dog"}
                    onChange={handlePetInputChange}
                    value="Dog"
                    name="species"
                    slotProps={{ input: { "aria-label": "Собака" } }}
                  />
                  <Typography component="span" sx={{ fontSize: "16px" }}>
                    Собака
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  <Radio
                    checked={newPet.species === "Cat"}
                    onChange={handlePetInputChange}
                    value="Cat"
                    name="species"
                    slotProps={{ input: { "aria-label": "Кіт" } }}
                  />
                  <Typography component="span" sx={{ fontSize: "16px" }}>
                    Кіт
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={styles.field}>
              <Typography component="label" sx={styles.label}>
                Дата народження
              </Typography>
              <Input
                type="date"
                name="dateOfBirth"
                placeholder="Дата народження"
                value={newPet.dateOfBirth}
                onChange={handlePetInputChange}
              />
            </Box>
          </FormGroup>

          <Button
            size="md"
            type="submit"
            style={{ alignSelf: "center", minWidth: 180 }}
          >
            Додати
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
