import { EnvStore } from "@/common/types/custom";
import { environmentStore } from "@/store/jotaiStore";
import { Add, Delete, Edit, FileDownload } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
} from "@mui/material";
import { useAtom } from "jotai";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

function EnvironmentVariables() {
  const [storedEnv, setStoredEnv] = useAtom(environmentStore);
  const [open, setOpen] = useState(false);
  function handleDeleteEnv({ id }: { id?: string }) {
    if (!id) return;
    setStoredEnv((prev) => prev.filter((env) => env.id !== id));
  }

  function downloadEnv() {
    const env = storedEnv.map((env) => `${env.key}=${env.value}`).join("\n");
    const blob = new Blob([env], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".env";
    a.click();
  }

  return (
    <Paper elevation={1}>
      <div className="p-5">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-bold">Environment Variables</h2>
          <div className="flex items-center">
            <IconButton aria-label="add-env" onClick={() => setOpen(true)}>
              <Add />
            </IconButton>
            <IconButton aria-label="download-env" onClick={downloadEnv}>
              <FileDownload />
            </IconButton>
          </div>
        </div>
        <List className="items-start justify-between">
          {storedEnv.map((env, index) => (
            <>
              <ListItem
                className="flex w-full justify-between rounded-lg border-2 px-4 py-2"
                key={index}
              >
                <div className="flex w-full basis-4/5 items-center">
                  <span className="basis-1/2 font-bold">
                    <strong>Key:</strong> {env.key}
                  </span>
                  <span className="basis-1/2">
                    <strong>Value:</strong> {env.value}
                  </span>
                </div>
                <div className="flex basis-auto items-center justify-between">
                  <IconButton
                    aria-label="edit-env"
                    onClick={() => setOpen(true)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete-env"
                    onClick={() => handleDeleteEnv({ id: env.id })}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </div>
      {open && <EnvDrawer open={open} handleClose={setOpen} />}
    </Paper>
  );
}

export default EnvironmentVariables;

function EnvDrawer({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [storedEnv, setStoredEnv] = useAtom(environmentStore);

  const { control, register } = useForm<Record<"envStore", EnvStore[]>>({
    defaultValues: {
      envStore: storedEnv,
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "envStore",
    },
  );
  function handleSaveEnv() {
    setStoredEnv(fields);
  }
  function handleAdd() {
    append({ key: "", value: "" });
  }

  return (
    <>
      <Drawer
        open={open}
        onClose={() => handleClose(false)}
        anchor="right"
        variant="temporary"
        ModalProps={{
          keepMounted: false,
        }}
      >
        <form>
          <List className="w-full">
            {fields.map((field, index) => (
              <ListItem key={index} className="space-x-5">
                <Controller
                  control={control}
                  key={field.id}
                  {...register(`envStore.${index}.key`)}
                  render={({ field }) => (
                    <TextField label="Key" size="small" {...field} />
                  )}
                />
                <Controller
                  control={control}
                  key={field.id}
                  {...register(`envStore.${index}.value`)}
                  render={({ field }) => (
                    <TextField label="Value" size="small" {...field} />
                  )}
                />
              </ListItem>
            ))}
          </List>

          <List className="w-full">
            <ListItem sx={{ display: "block" }}>
              <Box display="flex" justifyItems="end" width="100%">
                <Button className="capitalize" variant="outlined">
                  Cancel
                </Button>
                <Button
                  className="ml-4 capitalize"
                  variant="contained"
                  onClick={handleAdd}
                >
                  Add
                </Button>
                <Button
                  className="ml-4 capitalize"
                  variant="contained"
                  onClick={handleSaveEnv}
                >
                  Save
                </Button>
              </Box>
            </ListItem>
          </List>
        </form>
      </Drawer>
    </>
  );
}
