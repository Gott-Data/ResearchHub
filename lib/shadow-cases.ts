export type ShadowCase = {
  slug: string;
  categoryAndGeography: string;
  engagementYear: number;
  publishedAt: string;
  updatedAt?: string;
  theQuestion: string;
  whyExistingResearchCouldntAnswerIt: string;
  whatWeDid: string;
  whatWeDelivered: string;
  whatChanged?: string;
  clientApproved: boolean;
};

export const shadowCases: ShadowCase[] = [];

export function publishedShadowCases(): ShadowCase[] {
  return shadowCases
    .filter((c) => c.clientApproved)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getShadowCase(slug: string): ShadowCase | undefined {
  return shadowCases.find((c) => c.slug === slug && c.clientApproved);
}
