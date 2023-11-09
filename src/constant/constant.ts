import { QA_TALK_CATEGORY_LABEL, QATalkCategory } from "@src/constant/qa-talk";

export const Nope = () => null;

export const qaTalkCategoryOptions = Object.keys(QA_TALK_CATEGORY_LABEL).map(
  (category) => ({
    key: category as QATalkCategory,
    label:
      QA_TALK_CATEGORY_LABEL[category as keyof typeof QA_TALK_CATEGORY_LABEL],
  }),
);
