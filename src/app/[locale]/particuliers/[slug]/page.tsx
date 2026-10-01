import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/site/services/ServicePage";
import { resolveService, serviceMetadata, serviceStaticParams } from "@/lib/services/route";

export function generateStaticParams() {
  return serviceStaticParams("particuliers");
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const { locale, service } = resolveService(rawLocale, slug, "particuliers");
  return service ? serviceMetadata(locale, service) : {};
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const { error } = await searchParams;
  const { locale, service } = resolveService(rawLocale, slug, "particuliers");
  if (!service) notFound();
  return <ServicePage locale={locale} service={service} error={error} />;
}
