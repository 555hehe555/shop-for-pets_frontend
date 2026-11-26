import type { ProductImage } from "@/types/api";
import { CatPlaseholder } from "@/data/images";

export function mainImgResolver(
  images: ProductImage[] | undefined,
): ProductImage | undefined {
  if (!images || images.length === 0) {
    const placeholderImg: ProductImage = {
      id: -1,
      image: CatPlaseholder,
      alt: "no image",
      is_main: true,
    };

    return placeholderImg;
  }

  const main = images.find((image) => image.is_main);
  if (main) return main;

  return images[0];
}
