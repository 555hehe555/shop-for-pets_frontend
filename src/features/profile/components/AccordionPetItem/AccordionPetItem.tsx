import Button from "@/ui/Button/Button";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { SlArrowUp } from "react-icons/sl";
import Input from "@/ui/Input/Input";
import type { PatchedPetRequest, Pet, Species } from "@/types/api";
import { useState } from "react";
import { useUpdatePet } from "@/queries/profile/useProfileMutations";
import type { PetFormValues } from "../PetModal/PetModal";
import { styles } from "../ProfilePet/ProfilePet.styles";

interface AccordionPetItemProps {
  pet: Pet;
  index: number;
  openDeleteDialog: (id?: number) => void;
  speciesData: Species[];
}

export function AccordionPetItem({
  pet,
  index,
  openDeleteDialog,
  speciesData,
}: AccordionPetItemProps) {
  const { mutate: updatePet } = useUpdatePet();

  const [draft, setDraft] = useState<null | PetFormValues>(null);

  const [editingId, setEditingId] = useState<null | number>(null);

  function handleDraftChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setDraft((prev) => (prev ? { ...prev, [name]: value } : prev));
  }

  function startEditing(pet: Pet) {
    setEditingId(pet.id);

    setDraft({
      name: pet.name,
      species: pet.species,
      birthday: pet.birthday ?? "",
    });
  }

  function cancelEditing() {
    setEditingId(null);
    setDraft(null);
  }

  function handleSavePet() {
    if (editingId === null && !draft) return;

    const inData: PatchedPetRequest = {
      ...(draft?.name ? { name: draft.name.trim() } : {}),
      ...(draft?.species ? { species: draft.species } : {}),
      ...(draft?.birthday ? { birthday: draft.birthday } : {}),
    };

    updatePet(
      { id: editingId!, inData },
      {
        onSuccess: () => {
          cancelEditing();
        },
      },
    );
  }

  return (
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
            <Typography className="tableLabel">Кличка улюбленця</Typography>

            {editingId && editingId === pet.id ? (
              <Input
                id={`pet-name-${pet.id}`}
                type="text"
                name="name"
                placeholder="кличка вашої тваринки"
                className="tableInput"
                value={draft?.name}
                onChange={handleDraftChange}
              />
            ) : (
              <Typography className="tableValue">{pet.name}</Typography>
            )}
          </Box>
          <Divider className="divader" />

          <Box className="tableInfo">
            <Typography
              component="label"
              htmlFor={`pet-species-${pet.id}`}
              className="tableLabel"
            >
              Вид
            </Typography>

            {editingId && editingId === pet.id ? (
              <FormControl>
                <Select
                  id={`pet-species-${pet.id}`}
                  name="species"
                  value={draft?.species ?? pet.species}
                  className="tableSelect"
                  displayEmpty
                  onChange={(e) => {
                    setDraft((prev) =>
                      prev
                        ? { ...prev, species: Number(e.target.value) }
                        : prev,
                    );
                  }}
                >
                  {speciesData.map((species) => (
                    <MenuItem key={species.id} value={species.id}>
                      {species.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Typography className="tableValue">
                {speciesData.find((s) => s.id === pet.species)?.name ??
                  "Невідомий вид"}
              </Typography>
            )}
          </Box>
        </Box>
        <Divider className="divader" />

        <Box className="tableInfo">
          <Typography
            component="label"
            htmlFor={`pet-birthday-${pet.id}`}
            className="tableLabel"
          >
            Дата народження
          </Typography>
          {editingId && editingId === pet.id ? (
            <Input
              id={`pet-birthday-${pet.id}`}
              type="date"
              name="birthday"
              placeholder="Дата народження"
              className="tableInput"
              value={draft?.birthday ?? ""}
              onChange={handleDraftChange}
            />
          ) : (
            <Typography className="tableValue">
              {pet.birthday ?? "Невідома дата"}
            </Typography>
          )}
        </Box>
      </AccordionDetails>
      <AccordionActions>
        {editingId && editingId === pet.id ? (
          <>
            <Button
              variant="tertiary"
              size="sm"
              className="button"
              onClick={cancelEditing}
            >
              Скасувати
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="button"
              onClick={handleSavePet}
            >
              Зберегти
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              size="sm"
              className="button"
              onClick={() => startEditing(pet)}
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
          </>
        )}
      </AccordionActions>
    </Accordion>
  );
}
