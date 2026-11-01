"use server";

import prisma from "@/lib/prisma";
import { setAdminSession, clearAdminSession, isAuthenticated } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginAdminAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Verify against user in DB or default fallback credentials
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if ((user && user.password === password) || (email === "admin@yenidogansk.org.tr" && password === "admin")) {
    await setAdminSession();
    redirect("/admin");
  }

  return { error: "Geçersiz e-posta veya şifre!" };
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createNewsAction(formData: FormData) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Yetkisiz işlem");

  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const imageUrl = (formData.get("imageUrl") as string) || "/image/1920x700 erkek takım.jpg";
  const categoryId = formData.get("categoryId") as string;

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9ğüşıöç\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/[ğ]/g, "g")
    .replace(/[ü]/g, "u")
    .replace(/[ş]/g, "s")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ç]/g, "c")
    .trim() + "-" + Date.now().toString().slice(-4);

  await prisma.news.create({
    data: {
      title,
      slug,
      summary,
      content,
      imageUrl,
      categoryId: categoryId || null,
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  revalidatePath("/");
  revalidatePath("/haberler");
  revalidatePath("/admin/haberler");
  redirect("/admin/haberler");
}

export async function deleteNewsAction(id: string) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Yetkisiz işlem");

  await prisma.news.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/haberler");
  revalidatePath("/admin/haberler");
}

export async function createPlayerAction(formData: FormData) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Yetkisiz işlem");

  const name = formData.get("name") as string;
  const number = parseInt(formData.get("number") as string, 10);
  const position = formData.get("position") as string;
  const teamId = formData.get("teamId") as string;
  const photoUrl = (formData.get("photoUrl") as string) || "/image/MEHMET BARAN.jpeg";
  const bio = formData.get("bio") as string;

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9ğüşıöç\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/[ğ]/g, "g")
    .replace(/[ü]/g, "u")
    .replace(/[ş]/g, "s")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ç]/g, "c")
    .trim();

  await prisma.player.create({
    data: {
      name,
      slug,
      number: isNaN(number) ? 10 : number,
      position,
      teamId,
      photoUrl,
      bio,
      matchesPlayed: 0,
      goals: 0,
      assists: 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/takim");
  revalidatePath("/admin/oyuncular");
  redirect("/admin/oyuncular");
}

export async function deletePlayerAction(id: string) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Yetkisiz işlem");

  await prisma.player.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/takim");
  revalidatePath("/admin/oyuncular");
}

export async function updateMatchScoreAction(formData: FormData) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Yetkisiz işlem");

  const id = formData.get("id") as string;
  const homeScore = parseInt(formData.get("homeScore") as string, 10);
  const awayScore = parseInt(formData.get("awayScore") as string, 10);
  const status = formData.get("status") as string;

  await prisma.match.update({
    where: { id },
    data: {
      homeScore: isNaN(homeScore) ? null : homeScore,
      awayScore: isNaN(awayScore) ? null : awayScore,
      status: status || "FINISHED",
    },
  });

  revalidatePath("/");
  revalidatePath("/fikstur");
  revalidatePath("/admin/maclar");
  redirect("/admin/maclar");
}

export async function syncTffU17Action() {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Yetkisiz işlem");

  try {
    const { synchronize } = await import("@/lib/tff-u17/sync");
    await synchronize({ force: true });

    revalidatePath("/");
    revalidatePath("/fikstur");
    revalidatePath("/puan-durumu");
    revalidatePath("/admin/maclar");
    redirect("/admin/maclar?tffSuccess=true");
  } catch (error: any) {
    if (error?.message === "NEXT_REDIRECT" || error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    console.error("[syncTffU17Action]", error);
    redirect(`/admin/maclar?tffError=${encodeURIComponent(error.message || "TFF sunucusuna erişilemedi.")}`);
  }
}

export async function syncTffU17FromHtmlAction(formData: FormData) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Yetkisiz işlem");

  try {
    const html = formData.get("html") as string;
    if (!html || html.trim().length < 100) {
      throw new Error("Lütfen geçerli bir TFF sayfa kaynağı (HTML) yapıştırın.");
    }

    const { processSnapshotHtml } = await import("@/lib/tff-u17/sync");
    await processSnapshotHtml(html);

    revalidatePath("/");
    revalidatePath("/fikstur");
    revalidatePath("/puan-durumu");
    revalidatePath("/admin/maclar");
    redirect("/admin/maclar?tffSuccess=true");
  } catch (error: any) {
    if (error?.message === "NEXT_REDIRECT" || error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    console.error("[syncTffU17FromHtmlAction]", error);
    redirect(`/admin/maclar?tffError=${encodeURIComponent(error.message || "HTML ayrıştırılamadı.")}`);
  }
}


