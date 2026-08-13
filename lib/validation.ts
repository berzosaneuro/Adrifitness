import { z } from "zod";

// Esquema único compartido entre el formulario (validación optimista en
// cliente) y /api/leads (validación real, la que importa). Evita duplicar
// reglas y mantiene los mensajes de error consistentes.
export const leadSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Escribe tu nombre completo.")
      .max(100, "Nombre demasiado largo."),
    contactMethod: z.enum(["whatsapp", "email"], {
      errorMap: () => ({ message: "Selecciona un método de contacto." }),
    }),
    contactValue: z.string().trim().min(3, "Este campo es obligatorio."),
    goal: z
      .string()
      .trim()
      .min(5, "Cuéntanos brevemente tu objetivo (mín. 5 caracteres).")
      .max(500, "Máximo 500 caracteres."),
  })
  .superRefine((data, ctx) => {
    if (data.contactMethod === "email") {
      const emailCheck = z.string().email().safeParse(data.contactValue);
      if (!emailCheck.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["contactValue"],
          message: "Escribe un email válido.",
        });
      }
    } else {
      // Validación laxa de teléfono: dígitos, espacios, +, guiones (7-15 dígitos).
      const digits = data.contactValue.replace(/\D/g, "");
      if (digits.length < 7 || digits.length > 15) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["contactValue"],
          message: "Escribe un número de WhatsApp válido.",
        });
      }
    }
  });

export type LeadFormValues = z.infer<typeof leadSchema>;
