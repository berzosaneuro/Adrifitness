import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { leadSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la petición inválido." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      contact_method: parsed.data.contactMethod,
      contact_value: parsed.data.contactValue,
      goal: parsed.data.goal,
    });

    if (error) {
      console.error("Supabase insert error (leads):", error.message);
      return NextResponse.json(
        { error: "No hemos podido guardar tu solicitud. Inténtalo de nuevo en unos minutos." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error creating lead:", error);
    return NextResponse.json(
      { error: "Error de configuración del servidor." },
      { status: 500 }
    );
  }
}
