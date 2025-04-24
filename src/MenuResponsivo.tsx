import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import React from "react";

interface Props {
  menuAberto: boolean;
  fecharMenu: () => void;
}

export default function MenuResponsivo({ menuAberto, fecharMenu }: Props) {
  const safeProps = {
    placeholder: "",
    onPointerEnterCapture: () => {},
    onPointerLeaveCapture: () => {},
  };

  return (
    <Dialog
      open={menuAberto}
      handler={fecharMenu}
      size="xs"
      className="rounded-2xl bg-[#f0f9ff] font-sans relative"
      {...safeProps}
    >
      {/* Botão de fechar fixo no canto superior direito */}
      <IconButton
        size="lg"
        variant="text"
        className="!absolute top-3 right-3 text-blue-900 hover:text-red-500 z-50"
        onClick={fecharMenu}
        {...safeProps}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </IconButton>

      <DialogHeader className="items-start pb-0" {...safeProps}>
        <div>
          <Typography variant="h5" color="black" className="text-xl font-bold" {...safeProps}>
            Menu do Aluno
          </Typography>
          <Typography color="black" variant="paragraph" className="text-sm" {...safeProps}>
            Acesse as opções abaixo
          </Typography>
        </div>
      </DialogHeader>

      <DialogBody className="overflow-y-auto px-4 py-4" {...safeProps}>
        <div className="flex flex-col gap-4 font-sans">
          {[
            "Sobre nós",
            "Horários",
            "Perfil",
            "Como chegar",
            "Área do Aluno",
          ].map((item) => (
            <MenuItem
              key={item}
              className="flex items-center justify-center gap-2 py-3 shadow-md rounded-lg text-blue-900 bg-white hover:bg-blue-50 transition"
              {...safeProps}
            >
              <Typography
                color="blue-gray"
                variant="h6"
                className="font-semibold tracking-wide"
                {...safeProps}
              >
                {item}
              </Typography>
            </MenuItem>
          ))}
        </div>
      </DialogBody>
    </Dialog>
  );
}
